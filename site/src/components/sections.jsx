import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, CalendarDays, Clock3, Globe2, Languages, Sprout, UsersRound } from 'lucide-react';
import { Reveal } from '../lib/motion';

export function TrustStrip() {
  return <div className="container trust-strip">
    {[
      [UsersRound, 'Women-led.', 'Taught with care.'],
      [BookOpen, 'Girls & women at every class.', 'Boys up to Class 4.'],
      [Globe2, 'From Kerala to the Gulf.', 'Online, wherever you are.'],
      [Languages, 'A language they’re at home in.', 'Malayalam or English.'],
    ].map(([Icon, top, bottom], i) => <Reveal key={top} delay={i * 70}>
      <Icon /><span>{top}<br /><strong>{bottom}</strong></span>
    </Reveal>)}
  </div>;
}

export const choices = [
  [CalendarDays, 'Your days', 'Two days or more — choose a weekly rhythm that works for your child.'],
  [Clock3, 'Your timings', 'After school, around family time. We work around your week.'],
  [Languages, 'Your language', 'Learn in Malayalam or English. Understanding comes first.'],
  [Sprout, 'Their own pace', 'Time to revisit, ask again, and grow in confidence. No keeping up with a group.'],
];

export function Flexibility() {
  return <section className="section flexibility">
    <div className="container flexibility-inner">
      <Reveal className="flexibility-intro">
        <span className="eyebrow">BUILT AROUND YOUR FAMILY</span>
        <h2>One teacher.<br />Your timetable.<br /><em>A better fit.</em></h2>
        <p>Life in the Gulf doesn’t run on Kerala time. And no two children learn the same way. That’s why your classes are shaped around you.</p>
        <Link className="text-link" to="/plan#plan">Try it on your own week <ArrowUpRight size={18} /></Link>
      </Reveal>
      <div className="choices-grid">
        {choices.map(([Icon, title, text], i) => <Reveal className="choice" key={title} delay={i * 80}>
          <span className="choice-icon"><Icon size={23} strokeWidth={1.4} /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

export function Steps() {
  return <section className="section steps-section">
    <div className="container">
      <div className="centered-heading">
        <span className="eyebrow">A CONVERSATION IS ALL IT TAKES</span>
        <h2>A simple start. A steady journey.</h2>
        <p>No forms, no complicated sign-ups. Just tell us what your child needs.</p>
      </div>
      <div className="steps">
        {[
          ['01', 'Build the plan.', 'Choose her board, class, language, days and timing on this site. It takes about a minute.'],
          ['02', 'Send it on WhatsApp.', 'Your choices travel with the message, so the first reply can already be useful.'],
          ['03', 'Start learning.', 'Meet your teacher and begin one-to-one lessons alongside your madrassa.'],
        ].map(([n, title, text], i) => <Reveal className="step" key={n} delay={i * 90}>
          <span className="step-number">{n}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

export function TeacherTeaser() {
  return <section className="teacher-teaser">
    <div className="container teacher-teaser-inner">
      <div className="teacher-art" aria-hidden="true">
        <div className="teacher-arch">
          <BookOpen size={65} strokeWidth={.8} />
          <span>Patience.<br />Understanding.<br /><em>A familiar voice.</em></span>
        </div>
        <span className="art-flower">✳</span>
      </div>
      <Reveal>
        <span className="eyebrow">REAL CARE, ON THE OTHER SIDE OF THE SCREEN</span>
        <h2>A teacher who makes<br />room for <em>every question.</em></h2>
        <p>Women-led and taught by women from Kerala. A one-to-one space where your child can say “I don’t understand” — and find the time and attention to try again.</p>
        <Link className="text-link" to="/teachers">About our teachers <ArrowUpRight size={18} /></Link>
      </Reveal>
    </div>
  </section>;
}

export function PageIntro({ eyebrow, title, children }) {
  return <div className="page-intro container">
    <Link to="/" className="breadcrumb">Home <span>/</span></Link>
    <span className="eyebrow">{eyebrow}</span>
    <h1>{title}</h1>
    {children && <p>{children}</p>}
  </div>;
}
