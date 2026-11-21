import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Compass, GraduationCap, Heart } from 'lucide-react';
import { TRACKS } from '../lib/config';
import { StudyScene } from './art';
import { ChatButton } from './ui';
import { Reveal } from '../lib/motion';

const icons = { self: Compass, child: GraduationCap };

export function PathChooser({ heading = true }) {
  return <div className="container path-chooser-wrap">
    {heading && <Reveal className="path-heading">
      <span className="eyebrow">TWO WAYS TO LEARN WITH ZAAF</span>
      <h2>Where would you like to begin?</h2>
    </Reveal>}
    <div className="path-chooser">
      {TRACKS.map((track, i) => {
        const Icon = icons[track.id];
        return <Reveal key={track.id} delay={i * 90}>
          <Link className={`path-card path-${track.id}`} to={track.path}>
            <span className="path-icon"><Icon size={23} strokeWidth={1.4} /></span>
            <span className="path-label">{track.label}</span>
            <h3>{track.title}</h3>
            <p>{track.blurb}</p>
            <span className="path-who">{track.who}</span>
            <span className="text-link">{track.id === 'self' ? 'See how it works' : 'Find her class'} <ArrowUpRight size={17} /></span>
          </Link>
        </Reveal>;
      })}
    </div>
  </div>;
}

export function Hero() {
  return <section className="hero">
    <div className="container hero-inner">
      <div className="hero-copy">
        <Reveal as="span" className="eyebrow">ONE-TO-ONE ISLAMIC LEARNING, FOR WOMEN</Reveal>
        <Reveal as="h1" delay={60}>
          Your syllabus.<br />Your pace.<br /><em>Your mentor.</em>
          <span className="heading-star" aria-hidden="true">✳</span>
        </Reveal>
        <Reveal as="p" delay={120}>
          Pick up the learning you have been meaning to come back to. You choose the subjects,
          your mentor plans the lessons around your week, and nobody hurries you. We also sit
          with children who need a little help keeping up at madrassa.
        </Reveal>
        <Reveal className="hero-actions" delay={180}>
          <ChatButton context="hero">Let’s talk on WhatsApp</ChatButton>
          <Link className="hero-secondary" to="/plan#plan">Build your own course <ArrowRight size={17} /></Link>
        </Reveal>
        <Reveal className="hero-reassurance" delay={240}>
          <span><Check size={14} /> Any woman, any age</span>
          <span><Check size={14} /> Women-led, taught by women</span>
          <span><Check size={14} /> Malayalam &amp; English</span>
        </Reveal>
      </div>
      <div className="hero-visual">
        <div className="scene-frame">
          <StudyScene />
          <div className="photo-caption"><span className="live-dot" /> Learning that feels a little more like home.</div>
        </div>
        <div className="hero-note">
          <span className="note-icon"><Heart size={20} strokeWidth={1.4} /></span>
          <div>One mentor. One learner.<small>Room to ask. Time to understand.</small></div>
        </div>
        <div className="handwritten">Start where you are.<span aria-hidden="true">⤴</span></div>
        <span className="image-index">01 / A SPACE TO GROW</span>
      </div>
    </div>
  </section>;
}
