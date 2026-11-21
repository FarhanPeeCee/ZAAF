import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Sprout } from 'lucide-react';
import { useReducedMotion, Reveal } from '../lib/motion';

// Written for the design preview. Replace with consented reviews before launch.
const sampleFeedback = [
  {
    country: 'UAE', code: 'AE', className: 'Class 3 · SKIMVB',
    theme: 'A little more confidence',
    quote: 'She used to keep her questions to herself. Having someone explain the lesson again, only for her, has made the whole thing feel less frightening.',
  },
  {
    country: 'Qatar', code: 'QA', className: 'Class 5 · SKSVB',
    theme: 'Room to take it slowly',
    quote: 'We only wanted help with the lessons she already had. Going back over the hard parts, one at a time, has made revision feel possible again.',
  },
  {
    country: 'Saudi Arabia', code: 'SA', className: 'Class 2 · SKIMVB',
    theme: 'A rhythm that fits us',
    quote: 'Between school and family time, another fixed timetable was impossible. Choosing the days ourselves, with the lessons in Malayalam, feels much more like ours.',
  },
  {
    country: 'Kerala, India', code: 'IN', className: 'Class 10 · SKSVB',
    theme: 'Steadier before the exam',
    quote: 'With the board exam coming she needed someone to go back through the older chapters with her. That one hour set aside each week settled all of us.',
  },
  {
    country: 'UAE', code: 'AE', className: 'Personalised course · Qur’an & Tajweed',
    theme: 'Finally, a course of my own',
    quote: 'I left madrassa as a girl and always told myself I would go back. Starting with only the reading, one evening a week once the children are asleep, has been enough to feel like a student again.',
  },
  {
    country: 'Kuwait', code: 'KW', className: 'Personalised course · Fiqh & Hadith',
    theme: 'Questions I never got to ask',
    quote: 'We decided the order of the topics together, which I had not expected. Being able to say “can we stay here a little longer” changed how much I actually understood.',
  },
];

function Card({ item }) {
  return <figure className="feedback-card">
    <div className="feedback-card-top">
      <Quote size={26} strokeWidth={1.2} aria-hidden="true" />
      <span className="draft-label">WRITTEN FOR THIS PREVIEW</span>
    </div>
    <h3>{item.theme}</h3>
    <blockquote>“{item.quote}”</blockquote>
    <figcaption>
      <span className="feedback-avatar" aria-hidden="true">{item.code}</span>
      <span><strong>Sample learner · {item.country}</strong><small>{item.className}</small></span>
    </figcaption>
  </figure>;
}

function useCarousel(length, perView) {
  const pages = Math.max(1, length - perView + 1);
  const [index, setIndex] = useState(0);
  const go = useCallback(next => setIndex(((next % pages) + pages) % pages), [pages]);
  useEffect(() => { if (index > pages - 1) setIndex(0); }, [pages, index]);
  return { index, pages, go };
}

export function ParentFeedback({ fullPage = false }) {
  const [perView, setPerView] = useState(3);
  const reduced = useReducedMotion();
  const track = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => setPerView(window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { index, pages, go } = useCarousel(sampleFeedback.length, perView);

  useEffect(() => {
    if (reduced || paused || pages < 2) return;
    const timer = setInterval(() => go(index + 1), 6500);
    return () => clearInterval(timer);
  }, [reduced, paused, pages, index, go]);

  // Pointer drag, so the same gesture works on a phone and with a mouse.
  const drag = useRef(null);
  function onPointerDown(e) { drag.current = { x: e.clientX, moved: false }; }
  function onPointerMove(e) {
    if (!drag.current || drag.current.moved) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 45) {
      drag.current.moved = true;
      go(index + (dx < 0 ? 1 : -1));
    }
  }
  function onPointerUp() { drag.current = null; }

  return <section className="section parent-feedback" aria-labelledby="parent-feedback-title">
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">LITTLE MOMENTS. MEANINGFUL DIFFERENCES.</span>
          <h2 id="parent-feedback-title">A little reassurance,<br /><em>from women like you.</em></h2>
          <p className="sample-explainer">Written for this design preview. These are not real testimonials yet.</p>
        </div>
        <div className="carousel-controls">
          {!fullPage && <Link className="text-link" to="/reviews">More learner stories <ArrowUpRight size={17} /></Link>}
          <div className="carousel-arrows">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous stories" disabled={pages < 2}><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next stories" disabled={pages < 2}><ArrowRight size={17} /></button>
          </div>
        </div>
      </div>

      <div
        className="carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label="Sample learner and parent feedback"
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={track}
          className="carousel-track"
          style={{
            width: `${(sampleFeedback.length / perView) * 100}%`,
            transform: `translate3d(-${index * (100 / sampleFeedback.length)}%, 0, 0)`,
          }}
        >
          {sampleFeedback.map(item => <Card key={item.country} item={item} />)}
        </div>
      </div>

      <div className="carousel-dots" role="tablist" aria-label="Choose a group of stories">
        {Array.from({ length: pages }, (_, i) => <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Stories ${i + 1} of ${pages}`}
          className={i === index ? 'is-on' : ''}
          onClick={() => go(i)}
        />)}
      </div>
    </div>
  </section>;
}

export function FounderVoice() {
  return <section className="section founder-section" aria-labelledby="founder-title">
    <div className="container founder-layout">
      <Reveal className="founder-intro">
        <span className="founder-symbol" aria-hidden="true"><Sprout size={34} strokeWidth={1.1} /></span>
        <span className="eyebrow">A NOTE FROM THE FOUNDER</span>
        <h2 id="founder-title">Everyone deserves<br /><em>time to understand.</em></h2>
        <span className="draft-label">DRAFT · FOR FOUNDER REVIEW</span>
      </Reveal>
      <Reveal className="founder-letter" delay={120}>
        <p className="founder-salaam">Assalamu alaikum,</p>
        <p>“My hope for Zaaf is a small one. That no woman, and no child, has to sit quietly with something she hasn’t understood.</p>
        <p>So many of us left our learning somewhere behind us. A madrassa we stopped attending, a page we never finished, a question we were too shy to ask twice. I wanted a place where picking it up again is the most ordinary thing in the world.</p>
        <p>So Zaaf works two ways. You can build a course of your own, with a mentor who asks what you actually want to learn. Or you can bring us a child who needs a hand keeping up at madrassa. Neither one replaces anything. Both make room to ask again.</p>
        <p>Kerala or the Gulf, after work or once the children are asleep. I want this to feel like somewhere you can turn. A familiar language, a steady rhythm, and someone on your side.”</p>
        <div className="founder-signoff">
          <span className="founder-signature">With care,</span>
          <strong>The Founder, Zaaf Academy</strong>
          <small>Suggested wording. The founder has not approved this yet.</small>
        </div>
      </Reveal>
    </div>
  </section>;
}
