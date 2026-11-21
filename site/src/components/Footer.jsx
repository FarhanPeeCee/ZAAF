import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, MessageCircle } from 'lucide-react';
import { EMAIL, PHONE_DISPLAY, REPLY_HOURS, REPLY_PROMISE_HOURS, WHATSAPP_NUMBER } from '../lib/config';
import { Logo } from './Header';

// The returning visitor should be able to read a basic fact without starting a
// conversation. Everything here is readable without a tap.
export function ContactLines({ compact = false }) {
  return <div className={`contact-lines ${compact ? 'is-compact' : ''}`}>
    <div>
      <span className="field-label"><MessageCircle size={13} /> WhatsApp &amp; phone</span>
      {PHONE_DISPLAY
        ? <a className="selectable" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{PHONE_DISPLAY}</a>
        : <em>We’re waiting on the academy’s number. It will be printed here in full, as text you can select and copy.</em>}
    </div>
    <div>
      <span className="field-label">Email</span>
      {EMAIL ? <a className="selectable" href={`mailto:${EMAIL}`}>{EMAIL}</a> : <em>Still to come.</em>}
    </div>
    <div>
      <span className="field-label"><Clock3 size={13} /> Reply hours</span>
      {REPLY_HOURS
        ? <span>{REPLY_HOURS.start}–{REPLY_HOURS.end} India time{REPLY_PROMISE_HOURS ? ` · usually within ${REPLY_PROMISE_HOURS} hours` : ''}</span>
        : <em>Reply hours will be written here in both India and Gulf time once they’re agreed. We would rather say nothing than promise an hour and miss it.</em>}
    </div>
  </div>;
}

export function Footer() {
  return <footer>
    <div className="container">
      <div className="footer-main">
        <div>
          <Logo />
          <p>Your syllabus. Your pace.<br />One-to-one Islamic learning for women, from Kerala.</p>
          <ContactLines compact />
        </div>
        <div className="footer-column">
          <h4>Learning at Zaaf</h4>
          <Link to="/learn">Personalised courses</Link>
          <Link to="/plan">Build your plan</Link>
          <Link to="/classes">Madrassa tuition</Link>
          <Link to="/exams">Exam support</Link>
          <Link to="/fees">Fees</Link>
        </div>
        <div className="footer-column">
          <h4>A little about us</h4>
          <Link to="/about">The Zaaf story</Link>
          <Link to="/features">How it works</Link>
          <Link to="/teachers">Our mentors</Link>
          <Link to="/reviews">Learner stories</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div className="footer-column">
          <h4>Grow with us</h4>
          <Link to="/teach">Become a mentor <ArrowUpRight size={13} /></Link>
          <Link to="/syllabus/skimvb">SKIMVB syllabus</Link>
          <Link to="/syllabus/sksvb">SKSVB syllabus</Link>
          <span>Kerala, India · Teaching online</span>
        </div>
      </div>
      <div className="footer-disclaimer">Zaaf gives personalised courses and supporting tuition. It is not madrassa enrolment, and it carries no certification. Board names describe the syllabi taught, and do not imply affiliation or endorsement.</div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Zaaf Academy. With care, from Kerala.</span>
        <Link to="/privacy">Privacy, in plain words <ArrowUpRight size={13} /></Link>
      </div>
    </div>
  </footer>;
}
