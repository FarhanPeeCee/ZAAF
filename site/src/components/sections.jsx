import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, BookOpen, CalendarDays, ClipboardList, Clock3, Globe2,
  Languages, MessagesSquare, Repeat, Sprout, UserRound, UsersRound,
} from 'lucide-react';
import { Reveal } from '../lib/motion';

export function TrustStrip() {
  return <div className="container trust-strip">
    {[
      [UsersRound, 'Women-led.', 'Taught by women.'],
      [UserRound, 'Any woman, any age.', 'No madrassa needed.'],
      [Globe2, 'From Kerala to the Gulf.', 'Online, wherever you are.'],
      [Languages, 'A language you’re at home in.', 'Malayalam or English.'],
    ].map(([Icon, top, bottom], i) => <Reveal key={top} delay={i * 70}>
      <Icon /><span>{top}<br /><strong>{bottom}</strong></span>
    </Reveal>)}
  </div>;
}

export const choices = [
  [BookOpen, 'Your syllabus', 'You choose the subjects. Your mentor turns them into a plan with a beginning, a next step and a pace you both agree.'],
  [CalendarDays, 'Your days', 'One session a week, or four. Whatever fits the week you already have.'],
  [Clock3, 'Your timings', 'After work, after the children are asleep, early morning before the house wakes. We work around you.'],
  [Sprout, 'Your own pace', 'Time to go back over something, to ask again, to let it settle. Nobody is racing you.'],
];

export function Flexibility() {
  return <section className="section flexibility">
    <div className="container flexibility-inner">
      <Reveal className="flexibility-intro">
        <span className="eyebrow">BUILT AROUND YOUR LIFE</span>
        <h2>One mentor.<br />Your timetable.<br /><em>A better fit.</em></h2>
        <p>Life in the Gulf does not run on Kerala time, and no two women want the same thing from their learning. That is why nothing here comes ready-made.</p>
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

// How a personalised course is actually agreed. The collaboration with the
// mentor is the product, so it is drawn out rather than summarised in a line.
const mentorSteps = [
  [ClipboardList, '01', 'Tell us what you want to learn.', 'The subjects, where you are starting from, what you are hoping for. There is no test, and no wrong answer.'],
  [MessagesSquare, '02', 'Meet your mentor.', 'One conversation, just the two of you. She listens for what you already know and what you would love to be able to do.'],
  [BookOpen, '03', 'Agree the syllabus together.', 'She suggests an order, a pace and a first milestone. You change whatever does not fit. The course is yours.'],
  [Repeat, '04', 'Sessions, and a plan that bends.', 'At your timings, in your language. When life gets heavy you slow down or pause, and nothing is lost.'],
];

export function MentorFlow() {
  return <section className="section mentor-flow" aria-labelledby="mentor-flow-title">
    <div className="container">
      <div className="centered-heading">
        <span className="eyebrow">A COURSE MADE WITH YOU, NOT HANDED TO YOU</span>
        <h2 id="mentor-flow-title">How a personalised course comes together.</h2>
        <p>No cohorts. No enrolment window. No syllabus decided before anyone has met you.</p>
      </div>
      <div className="mentor-steps">
        {mentorSteps.map(([Icon, n, title, text], i) => <Reveal className="mentor-step" key={n} delay={i * 85}>
          <span className="mentor-step-icon"><Icon size={21} strokeWidth={1.4} /></span>
          <span className="mentor-step-number">{n}</span>
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
        <p>No forms, no accounts, nothing to sign up for. Just tell us what you would like to learn.</p>
      </div>
      <div className="steps">
        {[
          ['01', 'Build the plan.', 'Choose your subjects, or her class, then the language, days and timing. A minute, no more.'],
          ['02', 'Send it on WhatsApp.', 'Everything you chose travels with the message, so the first reply can actually help you.'],
          ['03', 'Begin.', 'Meet your mentor, agree the syllabus between you, and start.'],
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
        <h2>A mentor who makes<br />room for <em>every question.</em></h2>
        <p>Women from Kerala, teaching women and girls. A quiet space where you can say “I haven’t understood this”, at eight years old or at forty-eight, and be met with patience rather than a sigh.</p>
        <Link className="text-link" to="/teachers">About our mentors <ArrowUpRight size={18} /></Link>
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
