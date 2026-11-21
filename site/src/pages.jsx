import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BookOpen, Calculator, CalendarDays, Check, Compass,
  GraduationCap, Heart, HeartHandshake, Languages, MessageCircle, RotateCcw,
  ShieldCheck, Sprout, UserRound,
} from 'lucide-react';
import { BOARDS, CLASS_NUMBERS, EXAM_CLASSES, LANGUAGES, SUBJECTS, TYPICAL_AGE } from './lib/config';
import { planMessage, planProgress, usePlan } from './lib/plan';
import { Hero, PathChooser } from './components/Hero';
import { Subjects } from './components/Subjects';
import { ClassesSection } from './components/Classes';
import { Planner, PlanNudge } from './components/Planner';
import { TimetableDiagram } from './components/Timetable';
import { FounderVoice, ParentFeedback } from './components/Stories';
import { FAQ } from './components/Faq';
import { Closing } from './components/Closing';
import { ContactLines } from './components/Footer';
import {
  Flexibility, MentorFlow, PageIntro, Steps, TeacherTeaser, TrustStrip, choices,
} from './components/sections';
import { ChatButton, Segmented } from './components/ui';
import { Reveal } from './lib/motion';

export function Home() {
  return <>
    <Hero />
    <TrustStrip />
    <PathChooser />
    <PlanNudge />
    <Subjects />
    <MentorFlow />
    <Planner compact />
    <Flexibility />
    <ClassesSection />
    <TeacherTeaser />
    <ParentFeedback />
    <FounderVoice />
    <FAQ />
    <Closing />
  </>;
}

/* --- the personalised course: the main category --------------------------- */

const forWhom = [
  [UserRound, 'You never joined a madrassa', 'Or you left it early. Starting now is ordinary here, and nobody will ask you to catch up with anyone.'],
  [RotateCcw, 'You studied once, years ago', 'Marriage, work, children. The thread is easy to pick up again when the plan is built around the week you actually have.'],
  [Compass, 'You want to go deeper', 'You read comfortably and want a subject studied properly — Tafsir, Fiqh, Hadith or Arabic — at a serious pace.'],
];

export function Learn() {
  const { plan, set } = usePlan();
  useEffect(() => {
    if (plan.track !== 'self') set({ track: 'self' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>
    <PageIntro eyebrow="PERSONALISED COURSES" title={<>A course of your own,<br /><em>built with your mentor.</em></>}>
      Any woman, at any age. Choose what you want to learn, say where you are starting from, and agree a syllabus and a timetable together with a mentor. No cohort, no enrolment window, no fixed package.
    </PageIntro>

    <section className="container content-section">
      <div className="whom-grid">
        {forWhom.map(([Icon, title, text], i) => <Reveal as="article" className="whom-card" key={title} delay={i * 80}>
          <span className="choice-icon"><Icon size={22} strokeWidth={1.4} /></span>
          <h3>{title}</h3>
          <p>{text}</p>
        </Reveal>)}
      </div>
      <div className="info-notice">
        <HeartHandshake size={22} />
        <p>Zaaf is women-led and taught by women. The personalised course is open to women and girls of any age, whether or not they have ever attended a madrassa. Boys are taught only in the madrassa tuition track, up to Class 4.</p>
      </div>
    </section>

    <Subjects />
    <MentorFlow />
    <Planner lockTrack="self" />
    <Flexibility />
    <TimetableDiagram />
    <ParentFeedback />
    <FAQ initial="self" />
    <Closing />
  </>;
}

/* --- madrassa tuition ------------------------------------------------------ */

export function ClassDetail() {
  const { slug } = useParams();
  const { search } = useLocation();
  const { plan, set } = usePlan();
  const n = Number(String(slug).replace('class-', ''));
  const queryBoard = new URLSearchParams(search).get('board');
  const board = plan.board || (BOARDS.includes(queryBoard) ? queryBoard : BOARDS[0]);

  useEffect(() => {
    if (CLASS_NUMBERS.includes(n)) set({ track: 'child', classNo: n, board });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  if (!CLASS_NUMBERS.includes(n)) return <NotFound />;

  return <>
    <PageIntro eyebrow={`MADRASSA TUITION · ${board} SYLLABUS`} title={<>A little extra help<br />with Class {n}.</>}>
      Support alongside your child’s madrassa, in Malayalam or English, at timings you choose.
    </PageIntro>
    <section className="container detail-layout">
      <div className="detail-content">
        <Segmented label="Choose your syllabus" name="detail-board" options={BOARDS} value={board} onChange={v => set({ board: v })} />
        <h2>Familiar syllabus.<br />Individual attention.</h2>
        <p>Ask us about Class {n} tuition for the {board} syllabus. Your teacher works with your child alongside their existing madrassa lessons. Children in Class {n} are usually around {TYPICAL_AGE[n]}, though the madrassa decides the class.</p>
        <div className="info-notice">
          <BookOpen size={22} />
          <p>Detailed Class {n} syllabus coverage is awaiting confirmation from the teaching lead. We’ll talk through your child’s textbooks and learning needs before agreeing classes.</p>
        </div>
        {EXAM_CLASSES.includes(n) && <div className="exam-detail">
          <GraduationCap />
          <h3>A little more support for an exam year.</h3>
          <p>Ask about focused Class {n} preparation for {board}. Exam dates and preparation plans are confirmed separately for each board.</p>
          <Link className="text-link" to="/exams">See exam support <ArrowRight size={16} /></Link>
        </div>}
        <div className="cross-sell">
          <Compass size={20} />
          <p>Not attending a madrassa, or learning for yourself? A <Link to="/learn">personalised course</Link> starts from what you want to learn instead of from a class.</p>
        </div>
      </div>
      <aside className="enquiry-card">
        <span className="eyebrow">LET’S MAKE A PLAN</span>
        <h3>Class {n},<br />at your timings.</h3>
        <ul>
          <li><Check />{n <= 4 ? 'Girls and boys welcome' : 'For girls and women'}</li>
          <li><Check />Taught by women</li>
          <li><Check />Malayalam or English</li>
          <li><Check />One-to-one, online</li>
        </ul>
        <ChatButton context={`class-${n}`} message={`Assalamu alaikum Zaaf, I am asking about Class ${n} classes for my child. We follow the ${board} syllabus.`}>
          Ask about Class {n}
        </ChatButton>
        <Link className="card-link" to="/plan#plan">Add your days and timings <ArrowUpRight size={14} /></Link>
      </aside>
    </section>
    <ClassesSection initialBoard={board} />
    <Closing />
  </>;
}

export function Exams() {
  const { plan, set } = usePlan();
  const board = plan.board || BOARDS[0];
  return <>
    <PageIntro eyebrow="BOARD EXAM SUPPORT" title={<>Less overwhelm.<br /><em>More confidence.</em></>}>
      One-to-one preparation for Classes 5, 7, 10 and 12, alongside your child’s madrassa lessons.
    </PageIntro>
    <PlanNudge />
    <section className="container content-section">
      <div className="section-heading">
        <div>
          <h2>Their board. Their class.</h2>
          <p>Select the syllabus your child follows.</p>
        </div>
        <Segmented label="Choose your syllabus" name="exam-board" options={BOARDS} value={board} onChange={v => set({ board: v })} />
      </div>
      <div className="exam-options">
        {EXAM_CLASSES.map((n, i) => <Reveal key={n} delay={i * 70}>
          <Link className="exam-option" to={`/classes/class-${n}?board=${board}`} onClick={() => set({ track: 'child', classNo: n, board })}>
            <GraduationCap size={27} strokeWidth={1.3} />
            <span>{board} · BOARD EXAM</span>
            <h3>Class {n}</h3>
            <p>Individual support, with space to revisit what needs more attention.</p>
            <span className="text-link">Explore Class {n} <ArrowUpRight size={17} /></span>
          </Link>
        </Reveal>)}
      </div>
      <div className="info-notice">
        <CalendarDays />
        <p>SKIMVB and SKSVB have separate exam schedules. Ask us about your board’s dates and the right time to begin; no unconfirmed dates are published here.</p>
      </div>
    </section>
    <FAQ initial="child" />
    <Closing />
  </>;
}

/* --- fees, mentors, about -------------------------------------------------- */

const SESSION_LENGTHS = [30, 45, 60];

export function Fees() {
  const { plan, set } = usePlan();
  const [days, setDays] = useState(plan.days.length || 2);
  const [length, setLength] = useState(45);
  const monthly = Math.round(days * 4.3);

  return <>
    <PageIntro eyebrow="FEES, WITHOUT THE GUESSWORK" title={<>Your sessions.<br /><em>Your own rhythm.</em></>}>
      Your fee follows the plan you agree with your mentor — the subject, the language, the session length and how many sessions a week. No one-size-fits-all packages, for either track.
    </PageIntro>
    <section className="container detail-layout">
      <div className="detail-content">
        <h2>What shapes the fee?</h2>
        {[
          [BookOpen, 'What you study', 'A memorisation plan, a Tafsir course and madrassa tuition are not the same work, and the fee follows the session rather than a package.'],
          ...choices.slice(1, 4).map(c => c),
        ].slice(0, 4).map(([Icon, title, text]) => <div className="fee-factor" key={title}>
          <Icon />
          <div><h3>{title}</h3><p>{text}</p></div>
        </div>)}
        <div className="info-notice">
          <ShieldCheck />
          <p>Rates, currency, session lengths and missed-session terms are awaiting confirmation. We won’t show made-up prices. Ask for a full quote before agreeing to start.</p>
        </div>
      </div>
      <aside className="enquiry-card fee-picker">
        <span className="eyebrow"><Calculator size={12} /> WORK OUT YOUR MONTH</span>
        <h3>How many sessions?</h3>
        <span className="field-label">Teaching language</span>
        <Segmented size="sm" label="Teaching language" name="fee-language" options={LANGUAGES} value={plan.language} onChange={v => set({ language: v })} />
        <span className="field-label">Sessions per week</span>
        <div className="day-options" role="radiogroup" aria-label="Sessions per week">
          {[1, 2, 3, 4, 5, 6].map(n => <button
            key={n}
            type="button"
            role="radio"
            aria-checked={days === n}
            aria-label={`${n} ${n === 1 ? 'session' : 'sessions'} a week`}
            className={days === n ? 'is-selected' : ''}
            onClick={() => setDays(n)}
          >{n}</button>)}
        </div>
        <span className="field-label">Session length</span>
        <Segmented size="sm" label="Session length in minutes" name="fee-length"
          options={SESSION_LENGTHS.map(m => ({ value: m, label: `${m} min` }))} value={length} onChange={setLength} />
        <div className="fee-sum" aria-live="polite">
          <div><strong>{monthly}</strong><span>sessions a month</span></div>
          <div><strong>{Math.round(monthly * length / 60)}h</strong><span>of one-to-one time</span></div>
        </div>
        <p className="fee-formula">
          {monthly} sessions × your agreed rate per session = your monthly fee.
          The rate depends on the subject, language and length, and is <strong>still to be confirmed</strong> by the academy — so this works out the sessions, never the money.
        </p>
        <ChatButton context="fees" message={`Assalamu alaikum Zaaf, I would like a quote for ${days} ${days === 1 ? 'session' : 'sessions'} a week${plan.language ? ` in ${plan.language}` : ''}, ${length} minutes each. That is about ${monthly} sessions a month.`}>
          Ask for my quote
        </ChatButton>
        <small>No commitment. Just a conversation.</small>
      </aside>
    </section>
    <TimetableDiagram />
    <Closing />
  </>;
}

export function Teachers() {
  return <>
    <PageIntro eyebrow="WOMEN-LED. TAUGHT WITH CARE." title={<>A familiar voice.<br /><em>A patient mentor.</em></>}>
      Women teachers and mentors from Kerala, who plan a course with you and then sit with you through it, one session at a time.
    </PageIntro>
    <section className="container content-section">
      <div className="values-grid">
        {[
          [Heart, 'Space to ask again', 'One learner and one mentor, with time for the questions that get lost in a group — at any age.'],
          [Compass, 'She plans it with you', 'Your mentor proposes the syllabus, the order and the pace, then changes what does not fit your life.'],
          [Languages, 'Understanding comes first', 'Choose Malayalam or English as the teaching language that feels right for you or your child.'],
        ].map(([Icon, title, text], i) => <Reveal as="article" key={title} delay={i * 80}>
          <Icon /><h3>{title}</h3><p>{text}</p>
        </Reveal>)}
      </div>
      <div className="editorial-note">
        <Sprout size={34} strokeWidth={1.2} />
        <h2>Get to know who will teach you.</h2>
        <p>Mentor profiles, subjects and qualifications will be published after details and consent are confirmed. In the meantime, ask us who teaches the subject you have in mind.</p>
        <ChatButton context="teachers" message="Assalamu alaikum Zaaf, I would like to know about the mentor for the subject I want to study.">Ask about our mentors</ChatButton>
      </div>
    </section>
    <Closing />
  </>;
}

export function Features() {
  return <>
    <PageIntro eyebrow="THE WAY WE LEARN" title={<>Your lessons.<br /><em>Your kind of week.</em></>}>
      One-to-one learning, designed around the life you already have — whether the course is yours or your child’s.
    </PageIntro>
    <MentorFlow />
    <Flexibility />
    <TimetableDiagram />
    <Steps />
    <FAQ />
    <Closing />
  </>;
}

export function About() {
  return <>
    <PageIntro eyebrow="A LITTLE ABOUT ZAAF" title={<>A course of your own.<br /><em>On your side, either way.</em></>}>
      Rooted in Kerala, made for women and girls whose learning continues wherever they call home.
    </PageIntro>
    <section className="container about-layout content-section">
      <div className="about-art" aria-hidden="true">
        <div className="about-arch"><BookOpen size={54} strokeWidth={.8} /><span>Qur’an · Hifz<br />Hadith · Fiqh<br />Arabic</span></div>
      </div>
      <div>
        <span className="eyebrow">TWO WAYS TO LEARN, ONE IDEA</span>
        <h2>Sometimes, a little<br />extra time is everything.</h2>
        <p>Zaaf is a women-led academy teaching one to one, online. Most of the women who come to us are learning for themselves: they choose their subjects — Qur’an and Tajweed, Hifz, Tafsir, Hadith, Fiqh, Aqeedah, Arabic, Seerah — and build a syllabus and a timetable together with a mentor. There is no cohort to join and no package to pick from.</p>
        <p>Alongside that, we give one-to-one tuition to children already studying in the Samastha madrassa system, supporting both SKIMVB and SKSVB from Class 1 to Class 12. That track supports a madrassa; it does not replace one.</p>
        <p>Girls and women are welcome at any age, whether or not they have ever studied formally. Boys are taught in the tuition track up to Class 4. You choose the days, timings and teaching language, and we work around the time difference between Kerala and the Gulf.</p>
        <div className="info-notice">
          <ShieldCheck size={22} />
          <p>We provide supporting tuition and personalised courses, not madrassa enrolment or certification. Syllabus references do not imply board affiliation or endorsement.</p>
        </div>
      </div>
    </section>
    <FounderVoice />
    <Closing />
  </>;
}

export function Reviews() {
  return <>
    <PageIntro eyebrow="LEARNER STORIES · DESIGN PREVIEW" title={<>Small steps.<br /><em>Stories worth sharing.</em></>}>
      Explore sample feedback while we gather real stories from the women and families who learn with us. All quotes below are fictional design placeholders, not verified reviews.
    </PageIntro>
    <ParentFeedback fullPage />
    <section className="container content-section">
      <div className="editorial-note">
        <MessageCircle size={38} strokeWidth={1.2} />
        <h2>Good stories deserve permission.</h2>
        <p>These samples will be replaced with real reviews only after written permission and attribution are confirmed.</p>
        <ChatButton context="reviews" message="Assalamu alaikum Zaaf, I read the stories and would like to know more about learning with you.">Talk to us about learning</ChatButton>
      </div>
    </section>
    <Closing />
  </>;
}

export function Contact({ teaching = false }) {
  const { plan } = usePlan();
  const { done } = planProgress(plan);
  return <>
    <PageIntro
      eyebrow={teaching ? 'GROW WITH ZAAF' : 'LET’S TALK'}
      title={teaching ? <>Bring your patience.<br /><em>Make a difference.</em></> : <>Every good journey<br /><em>starts with salaam.</em></>}
    >
      {teaching
        ? 'We’re interested in hearing from women who can mentor a learner through a subject she has chosen, and from women who know the madrassa syllabus well.'
        : 'Tell us what you would like to learn, or your child’s board and class. We’ll work out the next step together.'}
    </PageIntro>
    <section className="container detail-layout">
      <div className="detail-content">
        <h2>{teaching ? 'A conversation, not a form.' : 'A few details help us help you.'}</h2>
        <ul className="checklist">
          {(teaching
            ? ['The subjects you can mentor — Qur’an, Hifz, Tafsir, Hadith, Fiqh, Arabic and so on', 'Your qualifications and teaching experience', 'Whether you teach in Malayalam, English, or both', 'Your timezone and possible weekly commitment']
            : ['What you would like to learn, or your child’s class and board', 'Where you are starting from — there is no wrong answer', 'Your preferred teaching language', 'Your country, and the days and timings that suit you']
          ).map(t => <li key={t}><Check size={18} />{t}</li>)}
        </ul>
        {!teaching && <p>Or let the site do it for you: <Link className="text-link" to="/plan#plan">build your plan <ArrowUpRight size={14} /></Link> and every one of those details travels with your message.</p>}
        <p>{teaching
          ? 'Current openings, expected qualifications and teaching commitments will be confirmed in the conversation. Please do not send children’s personal information.'
          : 'No accounts. No forms. You stay in control of what you share.'}</p>
        <ContactLines />
      </div>
      <aside className="enquiry-card">
        <MessageCircle size={29} strokeWidth={1.3} />
        <h3>{teaching ? 'Say hello to Zaaf.' : 'A little help starts here.'}</h3>
        <p>{teaching ? 'Introduce yourself and the subjects you’d like to mentor.' : 'One-to-one learning, at your timings, in a language that feels like home.'}</p>
        <ChatButton
          context={teaching ? 'teach' : 'contact'}
          message={teaching ? 'Assalamu alaikum Zaaf, I would like to apply to teach or mentor.' : (done ? planMessage(plan) : undefined)}
        >{teaching ? 'Ask about mentoring' : done ? 'Send my saved plan' : 'Chat on WhatsApp'}</ChatButton>
        <small>Business number and reply hours are awaiting confirmation.</small>
      </aside>
    </section>
  </>;
}

export function Syllabus() {
  const { board } = useParams();
  const { set } = usePlan();
  const key = String(board).toLowerCase();
  useEffect(() => {
    if (['skimvb', 'sksvb'].includes(key)) set({ track: 'child', board: key.toUpperCase() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  if (!['skimvb', 'sksvb'].includes(key)) return <NotFound />;
  return <>
    <PageIntro eyebrow="THE SYLLABUS THEY ALREADY KNOW" title={<>{key.toUpperCase()} support.<br /><em>One child at a time.</em></>}>
      Your child stays with her madrassa. We give her a little extra help with the same syllabus, online, in Malayalam or English.
    </PageIntro>
    <ClassesSection initialBoard={key.toUpperCase()} />
    <Closing />
  </>;
}

export function Privacy() {
  return <>
    <PageIntro eyebrow="PRIVACY, IN PLAIN WORDS" title={<>A small website.<br /><em>A light footprint.</em></>} />
    <section className="container prose content-section">
      <h2>We don’t collect enquiries here.</h2>
      <p>This website has no enquiry forms, learner accounts, bookings or payments. There is no server that receives anything you choose on these pages.</p>
      <h3>Your plan stays on your own device.</h3>
      <p>The plan you build — the subjects you pick, where you are starting from, your child’s class and board, the language, days and timing — is kept in your browser’s local storage so you can come back to it. It never leaves your device, we cannot read it, and clearing your browser data removes it.</p>
      <h3>Conversations happen on WhatsApp.</h3>
      <p>Once the academy’s business number is confirmed, WhatsApp buttons will open a conversation with your message ready to send, which you can edit first. WhatsApp handles those messages under its own terms and privacy policy. Avoid sharing sensitive information about children.</p>
      <h3>No analytics service, no cookies.</h3>
      <p>This version sets no cookies and loads no analytics provider. When you tap a WhatsApp button the page notes the event in the browser itself — the page you were on and whether you are on a phone or a computer — so that a counting tool can be added later if the academy wants one. Nothing is sent anywhere, and nothing identifies you. Hosting providers may process technical request logs under their own policies.</p>
      <h3>Before launch</h3>
      <p>Contact details, reply hours and any future analytics provider must be confirmed and reflected in this notice.</p>
    </section>
  </>;
}

export function PlanPage() {
  return <>
    <PageIntro eyebrow="BUILD YOUR PLAN" title={<>A few choices.<br /><em>One good message.</em></>}>
      Tell us who the learning is for, then the subjects or the class, the language, days and timing. We carry all of it into WhatsApp so the first reply can already be useful.
    </PageIntro>
    <Planner />
    <TimetableDiagram />
    <FAQ />
    <Closing />
  </>;
}

export function NotFound() {
  return <div className="container page-intro">
    <span className="eyebrow">LET’S FIND YOUR WAY</span>
    <h1>A little off course.</h1>
    <p>This page doesn’t exist. Let’s go back to familiar ground.</p>
    <Link className="button button-green" to="/">Back to home <ArrowRight size={18} /></Link>
  </div>;
}
