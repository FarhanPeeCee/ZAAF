import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Calculator, CalendarDays, Check, GraduationCap, Heart, Languages, MessageCircle, ShieldCheck, Sprout } from 'lucide-react';
import { BOARDS, CLASS_NUMBERS, EXAM_CLASSES, LANGUAGES, TYPICAL_AGE } from './lib/config';
import { planMessage, planProgress, usePlan } from './lib/plan';
import { Hero } from './components/Hero';
import { ClassesSection } from './components/Classes';
import { Planner, PlanNudge } from './components/Planner';
import { TimetableDiagram } from './components/Timetable';
import { FounderVoice, ParentFeedback } from './components/Stories';
import { FAQ } from './components/Faq';
import { Closing } from './components/Closing';
import { ContactLines } from './components/Footer';
import { Flexibility, PageIntro, Steps, TeacherTeaser, TrustStrip, choices } from './components/sections';
import { ChatButton, Segmented } from './components/ui';
import { Reveal } from './lib/motion';

export function Home() {
  return <>
    <Hero />
    <TrustStrip />
    <PlanNudge />
    <ClassesSection />
    <Planner compact />
    <Flexibility />
    <Steps />
    <TeacherTeaser />
    <ParentFeedback />
    <FounderVoice />
    <FAQ />
    <Closing />
  </>;
}

export function PlanPage() {
  return <>
    <PageIntro eyebrow="BUILD YOUR CHILD’S PLAN" title={<>Five choices.<br /><em>One good message.</em></>}>
      Choose the board, class, language, days and timing. We carry all of it into WhatsApp so the first reply can already be useful.
    </PageIntro>
    <Planner />
    <TimetableDiagram />
    <FAQ />
    <Closing />
  </>;
}

export function ClassDetail() {
  const { slug } = useParams();
  const { search } = useLocation();
  const { plan, set } = usePlan();
  const n = Number(String(slug).replace('class-', ''));
  const queryBoard = new URLSearchParams(search).get('board');
  const board = plan.board || (BOARDS.includes(queryBoard) ? queryBoard : BOARDS[0]);

  useEffect(() => {
    if (CLASS_NUMBERS.includes(n)) set({ classNo: n, board });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  if (!CLASS_NUMBERS.includes(n)) return <NotFound />;

  return <>
    <PageIntro eyebrow={`ONE-TO-ONE · ${board} SYLLABUS`} title={<>A little extra help<br />with Class {n}.</>}>
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
        <ChatButton
          context={`class-${n}`}
          message={`Hi Zaaf, I am asking about Class ${n} classes for my child. We follow the ${board} syllabus.`}
        >Ask about Class {n}</ChatButton>
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
          <Link className="exam-option" to={`/classes/class-${n}?board=${board}`} onClick={() => set({ classNo: n, board })}>
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
    <FAQ />
    <Closing />
  </>;
}

const SESSION_LENGTHS = [30, 45, 60];

export function Fees() {
  const { plan, set } = usePlan();
  const [days, setDays] = useState(plan.days.length || 3);
  const [length, setLength] = useState(45);
  const monthly = Math.round(days * 4.3);

  return <>
    <PageIntro eyebrow="FEES, WITHOUT THE GUESSWORK" title={<>Your classes.<br /><em>Your own rhythm.</em></>}>
      Your fee follows the plan we agree together — the language, session length and days per week. No one-size-fits-all packages.
    </PageIntro>
    <section className="container detail-layout">
      <div className="detail-content">
        <h2>What shapes the fee?</h2>
        {choices.slice(0, 3).map(([Icon, title, text]) => <div className="fee-factor" key={title}>
          <Icon />
          <div><h3>{title}</h3><p>{text}</p></div>
        </div>)}
        <div className="info-notice">
          <ShieldCheck />
          <p>Rates, currency, session lengths and missed-class terms are awaiting confirmation. We won’t show made-up prices. Ask for a full quote before agreeing to start.</p>
        </div>
      </div>
      <aside className="enquiry-card fee-picker">
        <span className="eyebrow"><Calculator size={12} /> WORK OUT YOUR MONTH</span>
        <h3>How many lessons?</h3>
        <span className="field-label">Teaching language</span>
        <Segmented size="sm" label="Teaching language" name="fee-language" options={LANGUAGES} value={plan.language} onChange={v => set({ language: v })} />
        <span className="field-label">Days per week</span>
        <div className="day-options" role="radiogroup" aria-label="Days per week">
          {[1, 2, 3, 4, 5, 6].map(n => <button
            key={n}
            type="button"
            role="radio"
            aria-checked={days === n}
            aria-label={`${n} ${n === 1 ? 'day' : 'days'} a week`}
            className={days === n ? 'is-selected' : ''}
            onClick={() => setDays(n)}
          >{n}</button>)}
        </div>
        <span className="field-label">Session length</span>
        <Segmented
          size="sm"
          label="Session length in minutes"
          name="fee-length"
          options={SESSION_LENGTHS.map(m => ({ value: m, label: `${m} min` }))}
          value={length}
          onChange={setLength}
        />
        <div className="fee-sum" aria-live="polite">
          <div><strong>{monthly}</strong><span>lessons a month</span></div>
          <div><strong>{Math.round(monthly * length / 60)}h</strong><span>of one-to-one time</span></div>
        </div>
        <p className="fee-formula">
          {monthly} lessons × your agreed rate per lesson = your monthly fee.
          The rate depends on the language and length, and is <strong>still to be confirmed</strong> by the academy — so this works out the lessons, never the money.
        </p>
        <ChatButton
          context="fees"
          message={`Hi Zaaf, I would like to know the fee for ${days} ${days === 1 ? 'day' : 'days'} a week${plan.language ? ` in ${plan.language}` : ''}, ${length}-minute lessons${plan.classNo ? `, for Class ${plan.classNo}` : ''}. That is about ${monthly} lessons a month.`}
        >Ask for my quote</ChatButton>
        <small>No commitment. Just a conversation.</small>
      </aside>
    </section>
    <TimetableDiagram />
    <Closing />
  </>;
}

export function Teachers() {
  return <>
    <PageIntro eyebrow="WOMEN-LED. TAUGHT WITH CARE." title={<>A familiar voice.<br /><em>A patient teacher.</em></>}>
      Women teachers from Kerala, supporting your child’s madrassa journey one lesson at a time.
    </PageIntro>
    <section className="container content-section">
      <div className="values-grid">
        {[
          [Heart, 'Space to ask again', 'One child and one teacher, with time for the questions that can get lost in a group.'],
          [Languages, 'Understanding comes first', 'Choose Malayalam or English as the teaching language that feels right for your child.'],
          [BookOpen, 'Their own syllabus', 'Support for SKIMVB and SKSVB, working alongside the lessons your child already follows.'],
        ].map(([Icon, title, text], i) => <Reveal as="article" key={title} delay={i * 80}>
          <Icon /><h3>{title}</h3><p>{text}</p>
        </Reveal>)}
      </div>
      <div className="editorial-note">
        <Sprout size={34} strokeWidth={1.2} />
        <h2>Get to know who will teach your child.</h2>
        <p>Teacher profiles and qualifications will be published after details and consent are confirmed. In the meantime, ask us who teaches your child’s board and class.</p>
        <ChatButton context="teachers" message="Hi Zaaf, I would like to know about the teacher for my child’s class and syllabus.">Ask about our teachers</ChatButton>
      </div>
    </section>
    <Closing />
  </>;
}

export function Features() {
  return <>
    <PageIntro eyebrow="THE WAY WE LEARN" title={<>Their lessons.<br /><em>Your kind of week.</em></>}>
      One-to-one support, designed around the life your family already has.
    </PageIntro>
    <Flexibility />
    <TimetableDiagram />
    <Steps />
    <FAQ />
    <Closing />
  </>;
}

export function About() {
  return <>
    <PageIntro eyebrow="A LITTLE ABOUT ZAAF" title={<>Alongside their madrassa.<br /><em>On your family’s side.</em></>}>
      Rooted in Kerala, made for families whose learning journey continues wherever they call home.
    </PageIntro>
    <section className="container about-layout content-section">
      <div className="about-art" aria-hidden="true">
        <div className="about-arch"><BookOpen size={54} strokeWidth={.8} /><span>Class 1<br />to Class 12</span></div>
      </div>
      <div>
        <span className="eyebrow">SUPPORT, NOT A SUBSTITUTE</span>
        <h2>Sometimes, a little<br />extra time is everything.</h2>
        <p>We’re a women-led tuition service for students already studying in the Samastha madrassa system. We teach one-to-one, online, so there’s room to slow down, revisit a lesson and ask again.</p>
        <p>We support both SKIMVB and SKSVB, from Class 1 to Class 12. Girls and women are welcome at every class, and boys up to Class 4.</p>
        <p>You choose the days, timings and teaching language. Together, we find a rhythm that fits around school, family and life in the Gulf or Kerala.</p>
        <div className="info-notice">
          <ShieldCheck size={22} />
          <p>We provide supporting tuition, not madrassa enrolment. Syllabus references do not imply board affiliation or endorsement.</p>
        </div>
      </div>
    </section>
    <FounderVoice />
    <Closing />
  </>;
}

export function Reviews() {
  return <>
    <PageIntro eyebrow="PARENT STORIES · DESIGN PREVIEW" title={<>Small steps.<br /><em>Stories worth sharing.</em></>}>
      Explore sample feedback while we gather real stories from families. All quotes below are fictional design placeholders, not verified reviews.
    </PageIntro>
    <ParentFeedback fullPage />
    <section className="container content-section">
      <div className="editorial-note">
        <MessageCircle size={38} strokeWidth={1.2} />
        <h2>Good stories deserve permission.</h2>
        <p>These samples will be replaced with real parent reviews only after written permission and attribution are confirmed.</p>
        <ChatButton context="reviews" message="Hi Zaaf, I read the reviews and would like to know more.">Talk to us about your child</ChatButton>
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
        ? 'We’re interested in hearing from women who know the madrassa syllabus and love helping a child understand.'
        : 'Tell us your child’s board, class and what they need a little help with. We’ll work out the next step together.'}
    </PageIntro>
    <section className="container detail-layout">
      <div className="detail-content">
        <h2>{teaching ? 'A conversation, not a form.' : 'A few details help us help you.'}</h2>
        <ul className="checklist">
          {(teaching
            ? ['The boards and classes you can teach', 'Your qualifications and teaching experience', 'Whether you teach in Malayalam, English, or both', 'Your timezone and possible weekly commitment']
            : ['Your child’s class and syllabus board', 'Your preferred teaching language', 'Where you live and your local timezone', 'The days and timings that suit your family']
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
        <p>{teaching ? 'Introduce yourself and the classes you’d like to teach.' : 'One-to-one tuition, at your timings, in a language that feels like home.'}</p>
        <ChatButton
          context={teaching ? 'teach' : 'contact'}
          message={teaching ? 'Hi Zaaf, I would like to apply to teach.' : (done ? planMessage(plan) : undefined)}
        >{teaching ? 'Ask about teaching' : done ? 'Send my saved plan' : 'Chat on WhatsApp'}</ChatButton>
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
    if (['skimvb', 'sksvb'].includes(key)) set({ board: key.toUpperCase() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  if (!['skimvb', 'sksvb'].includes(key)) return <NotFound />;
  return <>
    <PageIntro eyebrow="THE SYLLABUS THEY ALREADY KNOW" title={<>{key.toUpperCase()} support.<br /><em>One child at a time.</em></>}>
      Your child stays with their madrassa. We give them a little extra help with the same syllabus, online, in Malayalam or English.
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
      <p>This website has no enquiry forms, student accounts, bookings or payments. There is no server that receives anything you choose on these pages.</p>
      <h3>Your plan stays on your own device.</h3>
      <p>The plan you build — board, class, language, days and timing — is kept in your browser’s local storage so you can come back to it. It never leaves your device, we cannot read it, and clearing your browser data removes it. Nothing about your child is stored anywhere else by this site.</p>
      <h3>Conversations happen on WhatsApp.</h3>
      <p>Once the academy’s business number is confirmed, WhatsApp buttons will open a conversation with your message ready to send, which you can edit first. WhatsApp handles those messages under its own terms and privacy policy. Avoid sharing sensitive information about children.</p>
      <h3>No analytics service, no cookies.</h3>
      <p>This version sets no cookies and loads no analytics provider. When you tap a WhatsApp button the page notes the event in the browser itself — the page you were on and whether you are on a phone or a computer — so that a counting tool can be added later if the academy wants one. Nothing is sent anywhere, and nothing identifies you. Hosting providers may process technical request logs under their own policies.</p>
      <h3>Before launch</h3>
      <p>Contact details, reply hours and any future analytics provider must be confirmed and reflected in this notice.</p>
    </section>
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
