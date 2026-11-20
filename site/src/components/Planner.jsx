import React, { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, CircleHelp, Clock3, Globe2, GraduationCap, Languages, RotateCcw, Sparkles } from 'lucide-react';
import { BOARDS, CLASS_NUMBERS, EXAM_CLASSES, LANGUAGES, SLOTS, TYPICAL_AGE, WEEKDAYS, ZONES } from '../lib/config';
import { dayShift, format, parse, slotComfort, toKerala, zoneById } from '../lib/time';
import { orderedDays, planMessage, planProgress, usePlan } from '../lib/plan';
import { ChatButton, Segmented } from './ui';
import { Reveal } from '../lib/motion';

const comfortCopy = {
  easy: 'A comfortable hour for a teacher in Kerala.',
  stretch: 'Late in Kerala, but usually possible. Worth asking.',
  late: 'Outside normal teaching hours in Kerala — ask us what else is open.',
};

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
      <input
        id={id}
        type="number"
        min="4"
        max="20"
        inputMode="numeric"
        placeholder="Age"
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <p aria-live="polite">
        {suggestion
          ? <>A child of {age} is usually around <button type="button" className="inline-pick" onClick={() => onPick(suggestion)}>Class {suggestion}</button>. Your madrassa decides the class, so pick the one she actually attends.</>
          : 'Enter an age and we’ll suggest the usual class. Indicative only.'}
      </p>
    </div>
  </div>;
}

function WeekPreview({ days, slot, zoneId }) {
  if (!days.length || !slot || !zoneId) return null;
  const zone = zoneById(zoneId);
  const kerala = toKerala(slot, zone);
  const shift = dayShift(slot, zone);
  return <div className="week-preview">
    <div className="week-strip" role="list" aria-label="Chosen days">
      {WEEKDAYS.map(day => {
        const on = days.includes(day.id);
        return <span role="listitem" key={day.id} className={on ? 'is-on' : ''} title={day.label}>
          {day.short.slice(0, 1)}
        </span>;
      })}
    </div>
    <div className="week-times">
      <div><span className="zone-label">{zone.label}</span><strong>{format(parse(slot))}</strong></div>
      <span className="week-arrow" aria-hidden="true">→</span>
      <div><span className="zone-label">Kerala (IST)</span><strong>{format(kerala)}{shift ? <small> {shift}</small> : null}</strong></div>
    </div>
    <p className={`comfort comfort-${slotComfort(slot, zone)}`}>{comfortCopy[slotComfort(slot, zone)]}</p>
  </div>;
}

export function Planner({ compact = false }) {
  const { plan, set, toggleDay, reset } = usePlan();
  const { done, total } = planProgress(plan);
  const message = planMessage(plan);
  const zone = plan.zoneId ? zoneById(plan.zoneId) : null;

  return <section id="plan" className={`section planner-section ${compact ? 'is-compact' : ''}`} aria-labelledby="planner-title">
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="eyebrow"><Sparkles size={12} /> BUILD IT WITH US, BEFORE YOU MESSAGE</span>
          <h2 id="planner-title">Shape your child’s week.<br /><em>We’ll pick it up from there.</em></h2>
          <p>Five small choices. Nothing is sent anywhere until you tap WhatsApp, and we carry every answer into the message so there is less to explain.</p>
        </div>
        <div className="planner-progress" aria-live="polite">
          <svg viewBox="0 0 44 44" width="56" height="56" aria-hidden="true">
            <circle cx="22" cy="22" r="19" fill="none" stroke="#dfe2d4" strokeWidth="3" />
            <circle
              cx="22" cy="22" r="19" fill="none" stroke="#284f40" strokeWidth="3"
              strokeLinecap="round" strokeDasharray={`${(done / total) * 119.4} 119.4`}
              transform="rotate(-90 22 22)" className="progress-ring"
            />
          </svg>
          <span>{done} of {total}<small>chosen so far</small></span>
        </div>
      </div>

      <div className="planner">
        <div className="planner-steps">
          <div className="planner-step">
            <span className="step-tag">01</span>
            <div>
              <h3><GraduationCap size={18} /> Which board does she follow?</h3>
              <Segmented label="Choose your syllabus board" name="board" options={BOARDS} value={plan.board} onChange={v => set({ board: v })} />
              <p className="step-note">We support both. A parent is usually loyal to one, so we start here.</p>
            </div>
          </div>

          <div className="planner-step">
            <span className="step-tag">02</span>
            <div>
              <h3>Which class is she in?</h3>
              <div className="class-picker" role="radiogroup" aria-label="Choose a class">
                {CLASS_NUMBERS.map(n => <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={plan.classNo === n}
                  className={`${plan.classNo === n ? 'is-selected' : ''} ${EXAM_CLASSES.includes(n) ? 'is-exam' : ''}`}
                  onClick={() => set({ classNo: n })}
                >
                  {String(n).padStart(2, '0')}
                  <small>{TYPICAL_AGE[n]} yrs</small>
                </button>)}
              </div>
              <p className="step-note">
                <span className="exam-dot" /> Classes 5, 7, 10 and 12 are board exam years.
                {plan.classNo && plan.classNo <= 4 ? ' Girls and boys are both welcome at this class.' : plan.classNo ? ' This class is for girls and women.' : ''}
              </p>
              <AgeHelper onPick={n => set({ classNo: n })} />
            </div>
          </div>

          <div className="planner-step">
            <span className="step-tag">03</span>
            <div>
              <h3><Languages size={18} /> In which language should she learn?</h3>
              <Segmented label="Teaching language" name="language" options={LANGUAGES} value={plan.language} onChange={v => set({ language: v })} />
              <p className="step-note">Understanding comes first. The language also affects the fee, so it is worth saying now.</p>
            </div>
          </div>

          <div className="planner-step">
            <span className="step-tag">04</span>
            <div>
              <h3><CalendarDays size={18} /> Which days suit your week?</h3>
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
                  ? `${plan.days.length} ${plan.days.length === 1 ? 'day' : 'days'} a week: ${orderedDays(plan.days).map(d => d.label).join(', ')}.`
                  : 'Most families choose two or three. You can change this later.'}
              </p>
            </div>
          </div>

          <div className="planner-step">
            <span className="step-tag">05</span>
            <div>
              <h3><Clock3 size={18} /> What time works where you are?</h3>
              <label className="field-label" htmlFor="zone-select"><Globe2 size={14} /> Where are you?</label>
              <select
                id="zone-select"
                className="zone-select"
                value={plan.zoneId || ''}
                onChange={e => set({ zoneId: e.target.value || null })}
              >
                <option value="">Choose your country</option>
                {ZONES.map(z => <option key={z.id} value={z.id}>{z.label} · {z.short}</option>)}
              </select>
              <div className="slot-picker" role="radiogroup" aria-label="Preferred lesson time, in your own local time">
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
                  >
                    {format(parse(slotValue))}
                    {zone && <small>{format(toKerala(slotValue, zone))} IST</small>}
                  </button>;
                })}
              </div>
              <p className="step-note">{zone ? 'Times are shown in your own time first, then in Kerala time — the gap is the whole reason this page exists.' : 'Choose your country to see each time in Kerala time too.'}</p>
            </div>
          </div>
        </div>

        <aside className="planner-result">
          <span className="eyebrow">YOUR MESSAGE, SO FAR</span>
          <h3>Ready when you are.</h3>
          <WeekPreview days={plan.days} slot={plan.slot} zoneId={plan.zoneId} />
          <div className="message-draft" aria-live="polite">{message}</div>
          <ChatButton message={message} context="planner">
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
  if (!done) return null;
  const message = planMessage(plan);
  return <Reveal className="container plan-nudge">
    <div>
      <span className="eyebrow">YOUR SAVED PLAN</span>
      <strong>
        {[plan.classNo && `Class ${plan.classNo}`, plan.board, plan.language,
          plan.days.length && `${plan.days.length}× a week`,
          plan.slot && plan.zoneId && `${format(parse(plan.slot))} ${zoneById(plan.zoneId).short}`]
          .filter(Boolean).join(' · ')}
      </strong>
      <small>{done} of {total} answered{done < total ? ' — add the rest whenever you like.' : ' — all set.'}</small>
    </div>
    <div className="plan-nudge-actions">
      <Link className="text-link" to="/plan#plan">Open my plan <ArrowUpRight size={15} /></Link>
      <ChatButton message={message} context="saved-plan" light>Send it now</ChatButton>
    </div>
  </Reveal>;
}
