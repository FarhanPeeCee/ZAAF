import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { KERALA } from '../lib/config';
import { clockIn } from '../lib/time';
import { planProgress, usePlan } from '../lib/plan';
import { useFocusTrap, useScrolledPast, useScrollProgress } from '../lib/motion';
import { ChatButton } from './ui';

const LINKS = [
  ['Personalised courses', '/learn'],
  ['Madrassa tuition', '/classes'],
  ['Exam support', '/exams'],
  ['Our mentors', '/teachers'],
  ['Fees', '/fees'],
  ['About us', '/about'],
];

function KeralaClock() {
  const [now, setNow] = useState(() => clockIn(KERALA));
  useEffect(() => {
    const timer = setInterval(() => setNow(clockIn(KERALA)), 30000);
    return () => clearInterval(timer);
  }, []);
  return <span className="kerala-clock"><span className="live-dot" /> It’s {now} in Kerala right now</span>;
}

export function Logo() {
  return <Link className="logo" to="/" aria-label="Zaaf Academy home">
    <img className="brand-logo" src="/brand/zaaf-logo-light-trimmed.png" alt="Zaaf Academy" width="661" height="618" />
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { plan } = usePlan();
  const { done, total } = planProgress(plan);
  const condensed = useScrolledPast(90);
  const progress = useScrollProgress();
  const drawer = useRef(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);
  useFocusTrap(drawer, open, () => setOpen(false));

  return <>
    <div className="announcement">
      <span>Rooted in Kerala. One-to-one learning for women and girls, wherever they are.</span>
      <KeralaClock />
    </div>
    <header className={`header ${condensed ? 'is-condensed' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav aria-label="Main navigation" className="navigation">
          {LINKS.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        </nav>
        {done > 0 && <Link className="plan-pill" to="/plan#plan">
          My plan<span>{done}/{total}</span>
        </Link>}
        <ChatButton className="header-chat">Chat with us</ChatButton>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="menu-button"
          onClick={() => setOpen(!open)}
        >{open ? <X /> : <Menu />}</button>
      </div>
      <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>

    <div className={`drawer-scrim ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
    <div
      ref={drawer}
      className={`drawer ${open ? 'is-open' : ''}`}
      role="dialog"
      aria-modal={open ? 'true' : undefined}
      aria-label="Menu"
      aria-hidden={!open}
    >
      <div className="drawer-head">
        <span className="eyebrow">ZAAF ACADEMY</span>
        <button onClick={() => setOpen(false)} aria-label="Close menu"><X size={21} /></button>
      </div>
      <nav aria-label="Menu">
        <NavLink to="/plan">Build your plan{done > 0 ? ` · ${done}/${total}` : ''}</NavLink>
        {LINKS.map(([label, path]) => <NavLink key={path} to={path}>{label}</NavLink>)}
        <NavLink to="/features">How it works</NavLink>
        <NavLink to="/reviews">Learner stories</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
        <NavLink to="/teach">Become a mentor</NavLink>
      </nav>
      <ChatButton>Let’s talk on WhatsApp</ChatButton>
    </div>
  </>;
}
