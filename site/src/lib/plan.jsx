import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  BOARDS, BOYS_UP_TO, EXAM_CLASSES, INTENTIONS, LANGUAGES, STARTING_POINTS,
  SUBJECTS, TRACKS, WEEKDAYS, ZONES, subjectById,
} from './config';
import { dayShift, format, parse, toKerala, zoneById } from './time';

const STORE = 'zaaf.plan.v2';

const empty = {
  track: null,          // 'self' is her own course, 'child' is madrassa tuition
  subjects: [],
  startingPoint: null,
  intention: null,
  board: null,
  classNo: null,
  language: null,
  days: [],
  slot: null,
  zoneId: null,
};

function keep(list, value) {
  return list.some(item => (item.value ?? item.id) === value) ? value : null;
}

function read() {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return empty;
    const saved = JSON.parse(raw);
    return {
      ...empty,
      ...saved,
      track: keep(TRACKS, saved.track),
      subjects: Array.isArray(saved.subjects) ? saved.subjects.filter(subjectById) : [],
      startingPoint: keep(STARTING_POINTS, saved.startingPoint),
      intention: keep(INTENTIONS, saved.intention),
      days: Array.isArray(saved.days) ? saved.days.filter(d => WEEKDAYS.some(w => w.id === d)) : [],
      board: BOARDS.includes(saved.board) ? saved.board : null,
      language: LANGUAGES.includes(saved.language) ? saved.language : null,
      zoneId: ZONES.some(z => z.id === saved.zoneId) ? saved.zoneId : null,
    };
  } catch {
    return empty;
  }
}

const PlanContext = createContext(null);
const EnquiryContext = createContext(() => {});

export function PlanProvider({ children, onEnquire }) {
  const [plan, setPlan] = useState(read);

  useEffect(() => {
    try { localStorage.setItem(STORE, JSON.stringify(plan)); } catch { /* private mode */ }
  }, [plan]);

  const set = useCallback((patch) => setPlan(p => ({ ...p, ...patch })), []);
  const toggleDay = useCallback((id) => setPlan(p => ({
    ...p,
    days: p.days.includes(id) ? p.days.filter(d => d !== id) : [...p.days, id],
  })), []);
  const toggleSubject = useCallback((id) => setPlan(p => ({
    ...p,
    subjects: p.subjects.includes(id) ? p.subjects.filter(s => s !== id) : [...p.subjects, id],
  })), []);
  const reset = useCallback(() => setPlan(empty), []);

  const value = useMemo(
    () => ({ plan, set, toggleDay, toggleSubject, reset }),
    [plan, set, toggleDay, toggleSubject, reset],
  );
  return <PlanContext.Provider value={value}>
    <EnquiryContext.Provider value={onEnquire}>{children}</EnquiryContext.Provider>
  </PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlan needs a PlanProvider');
  return ctx;
}

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function orderedDays(days) {
  return WEEKDAYS.filter(w => days.includes(w.id));
}

export function orderedSubjects(subjects) {
  return SUBJECTS.filter(s => subjects.includes(s.id));
}

export function labelFor(list, value) {
  return list.find(item => (item.value ?? item.id) === value)?.label || '';
}

// Six answers either way, so the progress count means the same thing on both
// tracks even though the questions differ.
export function planProgress(plan) {
  const common = [Boolean(plan.language), plan.days.length > 0, Boolean(plan.slot && plan.zoneId)];
  const steps = plan.track === 'child'
    ? [true, Boolean(plan.board), Boolean(plan.classNo), ...common]
    : plan.track === 'self'
      ? [true, plan.subjects.length > 0, Boolean(plan.startingPoint && plan.intention), ...common]
      : [false, false, false, ...common];
  return { done: steps.filter(Boolean).length, total: steps.length, steps };
}

function timeLine(plan) {
  if (!(plan.slot && plan.zoneId)) return null;
  const zone = zoneById(plan.zoneId);
  const shift = dayShift(plan.slot, zone);
  const kerala = `${format(toKerala(plan.slot, zone))}${shift ? ' ' + shift : ''} in Kerala`;
  return `• Preferred time: ${format(parse(plan.slot))} my time in ${zone.label} (${kerala})`;
}

function daysLine(plan) {
  if (!plan.days.length) return null;
  const names = orderedDays(plan.days).map(d => d.short).join(', ');
  return `• ${plan.days.length} ${plan.days.length === 1 ? 'session' : 'sessions'} a week: ${names}`;
}

// The pre-filled message is the whole handover: with no forms, it is the only
// way the site can pass on what it already knows.
export function planMessage(plan) {
  return plan.track === 'child' ? childMessage(plan) : selfMessage(plan);
}

function selfMessage(plan) {
  const lines = ['Assalamu alaikum Zaaf, I would like to start a personalised course of my own.'];
  if (plan.subjects.length) {
    lines.push(`• What I want to learn: ${orderedSubjects(plan.subjects).map(s => s.label).join(', ')}`);
  }
  if (plan.startingPoint) lines.push(`• Where I am now: ${labelFor(STARTING_POINTS, plan.startingPoint)}`);
  if (plan.intention) lines.push(`• What I am hoping for: ${labelFor(INTENTIONS, plan.intention).replace(/^To /, 'to ')}`);
  if (plan.language) lines.push(`• Sessions in ${plan.language}`);
  const days = daysLine(plan);
  if (days) lines.push(days);
  const time = timeLine(plan);
  if (time) lines.push(time);
  lines.push('Could we plan a syllabus together, and could you let me know the fee?');
  return lines.join('\n');
}

function childMessage(plan) {
  const lines = ['Assalamu alaikum Zaaf, I would like to ask about one-to-one madrassa tuition for my child.'];
  const facts = [];
  if (plan.classNo) facts.push(`Class ${plan.classNo}`);
  if (plan.board) facts.push(`${plan.board} syllabus`);
  if (plan.language) facts.push(`lessons in ${plan.language}`);
  if (facts.length) lines.push(`• ${facts.join(', ')}`);
  const days = daysLine(plan);
  if (days) lines.push(days);
  const time = timeLine(plan);
  if (time) lines.push(time);
  if (plan.classNo && EXAM_CLASSES.includes(plan.classNo)) {
    lines.push(`• Class ${plan.classNo} is a board exam year, so exam preparation matters to us.`);
  }
  if (plan.classNo && plan.classNo <= BOYS_UP_TO) {
    lines.push('• Please confirm whether a place is available for my child.');
  }
  lines.push('Could you let me know the fee and the next step?');
  return lines.join('\n');
}

export function planSummary(plan) {
  const bits = [];
  if (plan.track === 'child') {
    if (plan.classNo) bits.push(`Class ${plan.classNo}`);
    if (plan.board) bits.push(plan.board);
  } else if (plan.track === 'self') {
    const chosen = orderedSubjects(plan.subjects);
    if (chosen.length) bits.push(chosen.length > 2 ? `${chosen.length} subjects` : chosen.map(s => s.label.split(' ')[0]).join(' · '));
    if (plan.startingPoint) bits.push(labelFor(STARTING_POINTS, plan.startingPoint));
  }
  if (plan.language) bits.push(plan.language);
  if (plan.days.length) bits.push(`${plan.days.length}× a week`);
  if (plan.slot && plan.zoneId) bits.push(`${format(parse(plan.slot))} ${zoneById(plan.zoneId).short}`);
  return bits;
}
