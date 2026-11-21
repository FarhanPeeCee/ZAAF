import React, { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, BookOpen, CalendarDays, CircleHelp, Clock3, Compass, Globe2,
  GraduationCap, Languages, RotateCcw, Sparkles,
} from 'lucide-react';
import {
  BOARDS, CLASS_NUMBERS, EXAM_CLASSES, INTENTIONS, LANGUAGES, SLOTS,
  STARTING_POINTS, SUBJECTS, TRACKS, TYPICAL_AGE, WEEKDAYS, ZONES,
} from '../lib/config';
import { dayShift, format, parse, slotComfort, toKerala, zoneById } from '../lib/time';
import { orderedDays, orderedSubjects, planMessage, planProgress, planSummary, usePlan } from '../lib/plan';
import { ChatButton, Segmented } from './ui';
import { Reveal } from '../lib/motion';

const comfortCopy = {
  easy: 'A comfortable hour for a mentor in Kerala.',
  stretch: 'Late in Kerala, but usually possible. Worth asking.',
  late: 'Outside normal teaching hours in Kerala — ask us what else is open.',
};

/* --- the choice everything else follows from ------------------------------ */

function TrackChoice({ track, onChoose }) {
  return <div className="track-choice" role="radiogroup" aria-label="Who is learning?">
    {TRACKS.map(item => <button
      key={item.id}
      type="button"
      role="radio"
      aria-checked={track === item.id}
      className={`track-card ${track === item.id ? 'is-selected' : ''} track-${item.id}`}
      onClick={() => onChoose(item.id)}
    >
      <span className="track-icon">{item.id === 'self' ? <Compass size={21} strokeWidth={1.5} /> : <GraduationCap size={21} strokeWidth={1.5} />}</span>
      <strong>{item.label}</strong>
      <span className="track-short">{item.short}</span>
      <small>{item.who}</small>
    </button>)}
  </div>;
}

/* --- personalised-course steps -------------------------------------------- */

function SubjectPicker({ chosen, onToggle }) {
  return <>
    <div className="subject-picker" role="group" aria-label="What would you like to learn?">
      {SUBJECTS.map(subject => <button
        key={subject.id}
        type="button"
        aria-pressed={chosen.includes(subject.id)}
        className={chosen.includes(subject.id) ? 'is-selected' : ''}
        onClick={() => onToggle(subject.id)}
      >{subject.label}</button>)}
    </div>
    <div className="subject-notes" aria-live="polite">
      {chosen.length
        ? orderedSubjects(chosen).map(s => <p key={s.id}><strong>{s.label}.</strong> {s.note}</p>)
        : <p className="step-note">Choose as many as you like, or just one. Your mentor shapes them into a single syllabus — this is not a list of fixed packages.</p>}
    </div>
  </>;
}

/* --- madrassa-tuition steps ----------------------------------------------- */

function AgeHelper({ onPick }) {
  const [age, setAge] = useState('');
  const id = useId();
  const suggestion = useMemo(() => {
    const n = Number(age);
    if (!n || n < 4 || n > 20) return null;
    return Math.min(12, Math.max(1, n - 4));
  }, [age]);
  return <div className="age-helper">
    <label htmlFor={id}><CircleHelp size={15} /> Not sure of the class?</label>
    <div className="age-row">
      <input id={id} type="number" min="4" max="20" inputMode="numeric" placeholder="Age"
        value={age} onChange={e => setAge(e.target.value)} />
      <p aria-live="polite">
        {suggestion
          ? <>A child of {age} is usually around <button type="button" className="inline-pick" onClick={() => onPick(suggestion)}>Class {suggestion}</button>. Your madrassa decides the class, so pick the one she actually attends.</>
          : 'Enter an age and we’ll suggest the usual class. Indicative only.'}
      </p>
    </div>
  </div>;
}

/* --- shared steps ---------------------------------------------------------- */

function WeekPreview({ days, slot, zoneId }) {
  if (!days.length || !slot || !zoneId) return null;
  const zone = zoneById(zoneId);
  const kerala = toKerala(slot, zone);
  const shift = dayShift(slot, zone);
  return <div className="week-preview">
    <div className="week-strip" role="list" aria-label="Chosen days">
      {WEEKDAYS.map(day => <span role="listitem" key={day.id} className={days.includes(day.id) ? 'is-on' : ''} title={day.label}>
        {day.short.slice(0, 1)}
      </span>)}
    </div>
    <div className="week-times">
      <div><span className="zone-label">{zone.label}</span><strong>{format(parse(slot))}</strong></div>
      <span className="week-arrow" aria-hidden="true">→</span>
      <div><span className="zone-label">Kerala (IST)</span><strong>{format(kerala)}{shift ? <small> {shift}</small> : null}</strong></div>
    </div>
    <p className={`comfort comfort-${slotComfort(slot, zone)}`}>{comfortCopy[slotComfort(slot, zone)]}</p>
  </div>;
}

function Step({ tag, title, icon: Icon, children }) {
  return <div className="planner-step">
    <span className="step-tag">{tag}</span>
    <div>
      <h3>{Icon && <Icon size={18} />}{title}</h3>
      {children}
    </div>
  </div>;
}

/* --- the builder ----------------------------------------------------------- */

export function Planner({ compact = false, lockTrack = null }) {
  const { plan, set, toggleDay, toggleSubject, reset } = usePlan();
  const track = lockTrack || plan.track;
  const { done, total } = planProgress({ ...plan, track });
  const message = planMessage({ ...plan, track });
  const zone = plan.zoneId ? zoneById(plan.zoneId) : null;
  const self = track === 'self';

  const headings = self
    ? { eyebrow: 'YOUR SUBJECTS. YOUR PACE. YOUR TIMETABLE.', title: <>Build the course<br /><em>you have been meaning to start.</em></> }
    : track === 'child'
      ? { eyebrow: 'THE SAME SYLLABUS, WITH TIME TO ASK', title: <>Shape your child’s week.<br /><em>We’ll pick it up from there.</em></> }
      : { eyebrow: 'BUILD IT WITH US, BEFORE YOU MESSAGE', title: <>Start where you are.<br /><em>We’ll shape the rest together.</em></> };

  return <section id="plan" className={`section planner-section ${compact ? 'is-compact' : ''} ${self ? 'is-self' : ''}`} aria-labelledby="planner-title">
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="eyebrow"><Sparkles size={12} /> {headings.eyebrow}</span>
          <h2 id="planner-title">{headings.title}</h2>
          <p>A few small choices. Nothing is sent anywhere until you tap WhatsApp, and we carry every answer into the message so there is less to explain.</p>
        </div>
        <div className="planner-progress" aria-live="polite">
          <svg viewBox="0 0 44 44" width="56" height="56" aria-hidden="true">
            <circle cx="22" cy="22" r="19" fill="none" stroke="#dfe2d4" strokeWidth="3" />
            <circle cx="22" cy="22" r="19" fill="none" stroke="currentColor" strokeWidth="3"
              strokeLinecap="round" strokeDasharray={`${(done / total) * 119.4} 119.4`}
              transform="rotate(-90 22 22)" className="progress-ring" />
          </svg>
          <span>{done} of {total}<small>chosen so far</small></span>
        </div>
      </div>

      <div className="planner">
        <div className="planner-steps">
          {!lockTrack && <Step tag="01" title="Who is the learning for?">
            <TrackChoice track={track} onChoose={id => set({ track: id })} />
          </Step>}

          {self && <>
            <Step tag={lockTrack ? '01' : '02'} title="What would you like to learn?" icon={BookOpen}>
              <SubjectPicker chosen={plan.subjects} onToggle={toggleSubject} />
            </Step>
            <Step tag={lockTrack ? '02' : '03'} title="Where are you starting from?" icon={Compass}>
              <Segmented
                label="Where you are starting from"
                name="starting-point"
                options={STARTING_POINTS.map(s => ({ value: s.value, label: s.label }))}
                value={plan.startingPoint}
                onChange={v => set({ startingPoint: v })}
              />
              <p className="step-note">
                {plan.startingPoint
                  ? STARTING_POINTS.find(s => s.value === plan.startingPoint).note
                  : 'There is no entrance test and no wrong answer. It only tells your mentor where to begin.'}
              </p>
              <span className="field-label">And what are you hoping for?</span>
              <div className="intention-picker" role="radiogroup" aria-label="What you are hoping for">
                {INTENTIONS.map(item => <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={plan.intention === item.value}
                  className={plan.intention === item.value ? 'is-selected' : ''}
                  onClick={() => set({ intention: item.value })}
                >{item.label}</button>)}
              </div>
            </Step>
          </>}

          {track === 'child' && <>
            <Step tag={lockTrack ? '01' : '02'} title="Which board does she follow?" icon={GraduationCap}>
              <Segmented label="Choose your syllabus board" name="board" options={BOARDS} value={plan.board} onChange={v => set({ board: v })} />
              <p className="step-note">We support both. A parent is usually loyal to one, so we start here.</p>
            </Step>
            <Step tag={lockTrack ? '02' : '03'} title="Which class is she in?">
              <div className="class-picker" role="radiogroup" aria-label="Choose a class">
                {CLASS_NUMBERS.map(n => <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={plan.classNo === n}
                  className={`${plan.classNo === n ? 'is-selected' : ''} ${EXAM_CLASSES.includes(n) ? 'is-exam' : ''}`}
                  onClick={() => set({ classNo: n })}
                >{String(n).padStart(2, '0')}<small>{TYPICAL_AGE[n]} yrs</small></button>)}
              </div>
              <p className="step-note">
                <span className="exam-dot" /> Classes 5, 7, 10 and 12 are board exam years.
                {plan.classNo && plan.classNo <= 4 ? ' Girls and boys are both welcome at this class.' : plan.classNo ? ' This class is for girls and women.' : ''}
              </p>
              <AgeHelper onPick={n => set({ classNo: n })} />
            </Step>
          </>}

          {track && <>
            <Step tag={lockTrack ? '03' : '04'} title={self ? 'In which language should we teach?' : 'In which language should she learn?'} icon={Languages}>
              <Segmented label="Teaching language" name="language" options={LANGUAGES} value={plan.language} onChange={v => set({ language: v })} />
              <p className="step-note">Understanding comes first. The language also affects the fee, so it is worth saying now.</p>
            </Step>

            <Step tag={lockTrack ? '04' : '05'} title="Which days suit your week?" icon={CalendarDays}>
              <div className="day-picker" role="group" aria-label="Choose the days of the week">
                {WEEKDAYS.map(day => <button
                  key={day.id}
                  type="button"
                  aria-pressed={plan.days.includes(day.id)}
                  className={plan.days.includes(day.id) ? 'is-selected' : ''}
                  onClick={() => toggleDay(day.id)}
                >{day.short}</button>)}
              </div>
              <p className="step-note" aria-live="polite">
                {plan.days.length
                  ? `${plan.days.length} ${plan.days.length === 1 ? 'session' : 'sessions'} a week: ${orderedDays(plan.days).map(d => d.label).join(', ')}.`
                  : self
                    ? 'One steady session a week is a real start. Two or three if you want to move faster.'
                    : 'Most families choose two or three. You can change this later.'}
              </p>
            </Step>

            <Step tag={lockTrack ? '05' : '06'} title="What time works where you are?" icon={Clock3}>
              <label className="field-label" htmlFor="zone-select"><Globe2 size={14} /> Where are you?</label>
              <select id="zone-select" className="zone-select" value={plan.zoneId || ''} onChange={e => set({ zoneId: e.target.value || null })}>
                <option value="">Choose your country</option>
                {ZONES.map(z => <option key={z.id} value={z.id}>{z.label} · {z.short}</option>)}
              </select>
              <div className="slot-picker" role="radiogroup" aria-label="Preferred session time, in your own local time">
                {SLOTS.map(slotValue => {
                  const comfort = zone ? slotComfort(slotValue, zone) : 'easy';
                  return <button
                    key={slotValue}
                    type="button"
                    role="radio"
                    aria-checked={plan.slot === slotValue}
                    className={`${plan.slot === slotValue ? 'is-selected' : ''} slot-${comfort}`}
                    disabled={!zone}
                    onClick={() => set({ slot: slotValue })}
                  >{format(parse(slotValue))}{zone && <small>{format(toKerala(slotValue, zone))} IST</small>}</button>;
                })}
              </div>
              <p className="step-note">{zone ? 'Times are shown in your own time first, then in Kerala time — the gap is the whole reason this page exists.' : 'Choose your country to see each time in Kerala time too.'}</p>
            </Step>
          </>}
        </div>

        <aside className="planner-result">
          <span className="eyebrow">YOUR MESSAGE, SO FAR</span>
          <h3>{track ? 'Ready when you are.' : 'Start with one choice.'}</h3>
          {!track && <p className="step-note">Tell us who the learning is for and the rest of the questions appear. Most people are here for themselves.</p>}
          <WeekPreview days={plan.days} slot={plan.slot} zoneId={plan.zoneId} />
          <div className="message-draft" aria-live="polite">{message}</div>
          <ChatButton message={message} context={`planner-${track || 'none'}`}>
            {done === total ? 'Send my plan on WhatsApp' : 'Send what I have'}
          </ChatButton>
          <div className="planner-foot">
            <button type="button" className="reset-plan" onClick={reset}><RotateCcw size={13} /> Start again</button>
            <Link to="/fees">How the fee is worked out <ArrowUpRight size={13} /></Link>
          </div>
          <small>Your choices stay on this device so you can come back to them. Nothing is sent to us until you tap the button.</small>
        </aside>
      </div>
    </div>
  </section>;
}

// A short, promptable version for the top of pages that are not the planner.
export function PlanNudge() {
  const { plan } = usePlan();
  const { done, total } = planProgress(plan);
  if (!plan.track || done < 2) return null;
  const summary = planSummary(plan);
  return <Reveal className={`container plan-nudge ${plan.track === 'self' ? 'is-self' : ''}`}>
    <div>
      <span className="eyebrow">YOUR SAVED PLAN · {plan.track === 'self' ? 'PERSONALISED COURSE' : 'MADRASSA TUITION'}</span>
      <strong>{summary.join(' · ')}</strong>
      <small>{done} of {total} answered{done < total ? ' — add the rest whenever you like.' : ' — all set.'}</small>
    </div>
    <div className="plan-nudge-actions">
      <Link className="text-link" to="/plan#plan">Open my plan <ArrowUpRight size={15} /></Link>
      <ChatButton message={planMessage(plan)} context="saved-plan" light>Send it now</ChatButton>
    </div>
  </Reveal>;
}
