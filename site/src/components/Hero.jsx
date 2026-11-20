import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Heart } from 'lucide-react';
import { StudyScene } from './art';
import { ChatButton } from './ui';
import { Reveal } from '../lib/motion';

export function Hero() {
  return <section className="hero">
    <div className="container hero-inner">
      <div className="hero-copy">
        <Reveal as="span" className="eyebrow"><span className="small-rule" /> ONE-TO-ONE MADRASSA TUITION</Reveal>
        <Reveal as="h1" delay={60}>
          A little support.<br />A lot more<br /><em>confidence.</em>
          <span className="heading-star" aria-hidden="true">✳</span>
        </Reveal>
        <Reveal as="p" delay={120}>
          We support your child’s madrassa journey, not replace it. Personal attention,
          a familiar syllabus, and a timetable that fits your family.
        </Reveal>
        <Reveal className="hero-actions" delay={180}>
          <ChatButton />
          <Link className="hero-secondary" to="/plan#plan">Build your child’s plan <ArrowRight size={17} /></Link>
        </Reveal>
        <Reveal className="hero-reassurance" delay={240}>
          <span><Check size={14} /> SKIMVB &amp; SKSVB</span>
          <span><Check size={14} /> Malayalam &amp; English</span>
          <span><Check size={14} /> Classes 1–12</span>
        </Reveal>
      </div>
      <div className="hero-visual">
        <div className="scene-frame">
          <StudyScene />
          <div className="photo-caption"><span className="live-dot" /> Learning that feels a little more like home.</div>
        </div>
        <div className="hero-note">
          <span className="note-icon"><Heart size={20} strokeWidth={1.4} /></span>
          <div>One teacher. One child.<small>Space to ask. Time to understand.</small></div>
        </div>
        <div className="handwritten">Their pace. Your peace of mind.<span aria-hidden="true">⤴</span></div>
        <span className="image-index">01 / A SPACE TO GROW</span>
      </div>
    </div>
  </section>;
}
