import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { SUBJECTS } from '../lib/config';
import { orderedSubjects, planMessage, usePlan } from '../lib/plan';
import { ChatButton } from './ui';
import { Reveal } from '../lib/motion';

// The subject list is the personalised course made visible. Choosing here is
// the same choice as step two of the planner, so a visitor who starts on this
// section finds her picks waiting when she gets there.
export function Subjects({ compact = false }) {
  const { plan, set, toggleSubject } = usePlan();
  const chosen = plan.subjects;

  function pick(id) {
    if (plan.track !== 'self') set({ track: 'self' });
    toggleSubject(id);
  }

  return <section id="subjects" className="section subjects-section" aria-labelledby="subjects-title">
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">NOTHING HERE COMES IN A BOX</span>
          <h2 id="subjects-title">Choose what you want to learn.<br /><em>We’ll build the syllabus around it.</em></h2>
          <p>Tap anything that speaks to you. One subject is a real beginning, and your mentor will weave whatever you choose into a single course.</p>
        </div>
        {!compact && <Link className="text-link" to="/learn">How a personalised course works <ArrowUpRight size={17} /></Link>}
      </div>

      <div className="subject-grid" role="group" aria-label="Subjects you can study">
        {SUBJECTS.map((subject, i) => {
          const on = chosen.includes(subject.id);
          return <Reveal key={subject.id} delay={i * 45}>
            <button type="button" aria-pressed={on} className={`subject-card ${on ? 'is-selected' : ''}`} onClick={() => pick(subject.id)}>
              <span className="subject-mark" aria-hidden="true">{on ? <Check size={14} /> : null}</span>
              <h3>{subject.label}</h3>
              <p>{subject.note}</p>
            </button>
          </Reveal>;
        })}
      </div>

      <div className={`subject-basket ${chosen.length ? 'is-on' : ''}`} aria-live="polite">
        {chosen.length ? <>
          <div>
            <span className="eyebrow">YOUR COURSE, SO FAR</span>
            <strong>{orderedSubjects(chosen).map(s => s.label).join(' · ')}</strong>
          </div>
          <div className="subject-basket-actions">
            <Link className="text-link" to="/plan#plan">Add your days and timings <ArrowUpRight size={15} /></Link>
            <ChatButton context="subjects" message={planMessage({ ...plan, track: 'self' })} light>Ask about this</ChatButton>
          </div>
        </> : <p className="step-note">Nothing chosen yet. Whatever you tap stays saved on this device.</p>}
      </div>
    </div>
  </section>;
}
