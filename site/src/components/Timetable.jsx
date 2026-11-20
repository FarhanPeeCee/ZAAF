import React, { useState } from 'react';
import { CalendarDays, Clock3, Languages, MoveRight } from 'lucide-react';
import { LANGUAGES, SLOTS, WEEKDAYS, ZONES } from '../lib/config';
import { dayShift, format, parse, slotComfort, toKerala, zoneById } from '../lib/time';
import { usePlan } from '../lib/plan';
import { ChatButton, Segmented } from './ui';
import { Reveal } from '../lib/motion';

// DIA-02: how a timetable is actually agreed — days, timing and language —
// shown by letting a parent move the pieces rather than describing it.
export function TimetableDiagram() {
  const { plan, set, toggleDay } = usePlan();
  const [zoneId, setZoneId] = useState(plan.zoneId || 'AE');
  const zone = zoneById(plan.zoneId || zoneId);
  const slot = plan.slot || '18:00';
  const comfort = slotComfort(slot, zone);
  const shift = dayShift(slot, zone);

  return <section className="section timetable-section" aria-labelledby="timetable-title">
    <div className="container">
      <div className="centered-heading">
        <span className="eyebrow">THE TIME DIFFERENCE, SOLVED OUT LOUD</span>
        <h2 id="timetable-title">Your evening. Her teaching hours.</h2>
        <p>Kerala runs an hour and a half to two and a half hours ahead of the Gulf. Move the pieces below and see the lesson in both clocks at once.</p>
      </div>

      <Reveal className="timetable">
        <div className="timetable-controls">
          <div>
            <span className="field-label"><CalendarDays size={14} /> Days</span>
            <div className="day-picker" role="group" aria-label="Choose the days of the week">
              {WEEKDAYS.map(day => <button
                key={day.id}
                type="button"
                aria-pressed={plan.days.includes(day.id)}
                className={plan.days.includes(day.id) ? 'is-selected' : ''}
                onClick={() => toggleDay(day.id)}
              >{day.short}</button>)}
            </div>
          </div>
          <div>
            <span className="field-label"><Clock3 size={14} /> Time, where you are</span>
            <div className="slot-picker" role="radiogroup" aria-label="Preferred lesson time in your local time">
              {SLOTS.map(value => <button
                key={value}
                type="button"
                role="radio"
                aria-checked={slot === value}
                className={`${slot === value ? 'is-selected' : ''} slot-${slotComfort(value, zone)}`}
                onClick={() => set({ slot: value })}
              >{format(parse(value))}</button>)}
            </div>
          </div>
          <div className="timetable-pair">
            <div>
              <span className="field-label">Your country</span>
              <select
                className="zone-select"
                aria-label="Your country"
                value={zone.id}
                onChange={e => { setZoneId(e.target.value); set({ zoneId: e.target.value }); }}
              >
                {ZONES.map(z => <option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
            </div>
            <div>
              <span className="field-label"><Languages size={14} /> Language</span>
              <Segmented size="sm" label="Teaching language" name="tt-language" options={LANGUAGES} value={plan.language} onChange={v => set({ language: v })} />
            </div>
          </div>
        </div>

        <div className="timetable-result">
          <div className="clock-pair">
            <div className="clock">
              <span className="zone-label">{zone.label}</span>
              <strong>{format(parse(slot))}</strong>
              <small>{plan.days.length ? `${plan.days.length} × a week` : 'pick your days'}</small>
            </div>
            <MoveRight size={20} aria-hidden="true" />
            <div className="clock is-kerala">
              <span className="zone-label">Her teacher, in Kerala</span>
              <strong>{format(toKerala(slot, zone))}</strong>
              <small>{shift || 'same day'}</small>
            </div>
          </div>
          <p className={`comfort comfort-${comfort}`}>
            {comfort === 'easy' && 'That lands inside normal teaching hours in Kerala. Easy to staff.'}
            {comfort === 'stretch' && 'That is late evening in Kerala. Often possible — worth asking before you plan around it.'}
            {comfort === 'late' && 'That falls outside teaching hours in Kerala. Tell us and we will suggest the nearest slot that works.'}
          </p>
          <ChatButton context="timetable" message={buildMessage(plan, zone, slot)}>Ask for this timetable</ChatButton>
          <small>Timings are agreed with you and depend on teacher availability. Nothing here is a booking.</small>
        </div>
      </Reveal>
    </div>
  </section>;
}

function buildMessage(plan, zone, slot) {
  const days = WEEKDAYS.filter(w => plan.days.includes(w.id)).map(d => d.short).join(', ');
  const lines = ['Hi Zaaf, I would like to ask about a timetable for my child.'];
  if (plan.classNo) lines.push(`• Class ${plan.classNo}${plan.board ? `, ${plan.board} syllabus` : ''}`);
  if (days) lines.push(`• Days: ${days}`);
  lines.push(`• Time: ${format(parse(slot))} in ${zone.label} (${format(toKerala(slot, zone))} in Kerala)`);
  if (plan.language) lines.push(`• Language: ${plan.language}`);
  lines.push('Does that work with your teachers?');
  return lines.join('\n');
}
