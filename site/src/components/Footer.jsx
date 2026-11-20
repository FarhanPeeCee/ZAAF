import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { EMAIL, PHONE_DISPLAY, REPLY_HOURS, REPLY_PROMISE_HOURS } from '../lib/config';
import { Logo } from './Header';

// Flow 3, the returning parent: she should be able to read a basic fact
// without starting a conversation. Everything here is readable without a tap.
export function ContactLines({ compact = false }) {
  return <div className={`contact-lines ${compact ? 'is-compact' : ''}`}>
    <div>
      <span className="field-label">WhatsApp &amp; phone</span>
      {PHONE_DISPLAY
        ? <a className="selectable" href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`}>{PHONE_DISPLAY}</a>
        : <em>Awaiting the academy’s business number. It will be printed here in full international form, as selectable text.</em>}
    </div>
    <div>
      <span className="field-label">Email</span>
      {EMAIL ? <a className="selectable" href={`mailto:${EMAIL}`}>{EMAIL}</a> : <em>To be confirmed.</em>}
    </div>
    <div>
      <span className="field-label"><Clock3 size={13} /> Reply hours</span>
      {REPLY_HOURS
        ? <span>{REPLY_HOURS.start}–{REPLY_HOURS.end} India time{REPLY_PROMISE_HOURS ? ` · usually within ${REPLY_PROMISE_HOURS} hours` : ''}</span>
        : <em>Reply hours will be stated here in both India and Gulf time once agreed, rather than promised and missed.</em>}
    </div>
  </div>;
}

export function Footer() {
  return <footer>
    <div className="container">
      <div className="footer-main">
        <div>
          <Logo />
          <p>Familiar lessons. Fresh confidence.<br />One-to-one madrassa tuition, from Kerala.</p>
          <ContactLines compact />
        </div>
        <div className="footer-column">
          <h4>Learning at Zaaf</h4>
          <Link to="/plan">Build your plan</Link>
          <Link to="/classes">Our classes</Link>
          <Link to="/exams">Exam support</Link>
          <Link to="/teachers">Our teachers</Link>
          <Link to="/fees">Fees</Link>
        </div>
        <div className="footer-column">
          <h4>A little about us</h4>
          <Link to="/about">The Zaaf story</Link>
          <Link to="/features">How it works</Link>
          <Link to="/reviews">Parent stories</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div className="footer-column">
          <h4>Grow with us</h4>
          <Link to="/teach">Become a teacher <ArrowUpRight size={13} /></Link>
          <Link to="/syllabus/skimvb">SKIMVB syllabus</Link>
          <Link to="/syllabus/sksvb">SKSVB syllabus</Link>
          <span>Kerala, India · Teaching online</span>
        </div>
      </div>
      <div className="footer-disclaimer">Zaaf provides supporting tuition, not madrassa enrolment. Board names identify the syllabi taught and do not imply affiliation or endorsement.</div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Zaaf Academy. With care, from Kerala.</span>
        <Link to="/privacy">Privacy, in plain words <ArrowUpRight size={13} /></Link>
      </div>
    </div>
  </footer>;
}
