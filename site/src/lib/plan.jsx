import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BOARDS, BOYS_UP_TO, EXAM_CLASSES, LANGUAGES, WEEKDAYS, ZONES } from './config';
import { dayShift, format, parse, toKerala, zoneById } from './time';

const STORE = 'zaaf.plan.v1';

const empty = {
  board: null,
  classNo: null,
  language: null,
  days: [],
  slot: null,
  zoneId: null,
};

function read() {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return empty;
    const saved = JSON.parse(raw);
    return {
      ...empty,
      ...saved,
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
  const reset = useCallback(() => setPlan(empty), []);

  const value = useMemo(() => ({ plan, set, toggleDay, reset }), [plan, set, toggleDay, reset]);
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

export function planProgress(plan) {
  const steps = [
    Boolean(plan.board),
    Boolean(plan.classNo),
    Boolean(plan.language),
    plan.days.length > 0,
    Boolean(plan.slot && plan.zoneId),
  ];
  return { done: steps.filter(Boolean).length, total: steps.length, steps };
}

// The pre-filled message is the whole handover: with no forms, it is the only
// way the site can pass on what it already knows about this family.
export function planMessage(plan) {
  const lines = ['Hi Zaaf, I would like to ask about one-to-one madrassa tuition for my child.'];
  const facts = [];
  if (plan.classNo) facts.push(`Class ${plan.classNo}`);
  if (plan.board) facts.push(`${plan.board} syllabus`);
  if (plan.language) facts.push(`lessons in ${plan.language}`);
  if (facts.length) lines.push(`• ${facts.join(', ')}`);

  if (plan.days.length) {
    const names = orderedDays(plan.days).map(d => d.short).join(', ');
    lines.push(`• ${plan.days.length} ${plan.days.length === 1 ? 'day' : 'days'} a week: ${names}`);
  }

  if (plan.slot && plan.zoneId) {
    const zone = zoneById(plan.zoneId);
    const shift = dayShift(plan.slot, zone);
    const kerala = `${format(toKerala(plan.slot, zone))}${shift ? ' ' + shift : ''} in Kerala`;
    lines.push(`• Preferred time: ${format(parse(plan.slot))} my time in ${zone.label} (${kerala})`);
  }

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
  if (plan.classNo) bits.push(`Class ${plan.classNo}`);
  if (plan.board) bits.push(plan.board);
  if (plan.language) bits.push(plan.language);
  if (plan.days.length) bits.push(`${plan.days.length}× a week`);
  if (plan.slot && plan.zoneId) bits.push(`${format(parse(plan.slot))} ${zoneById(plan.zoneId).short}`);
  return bits;
}
