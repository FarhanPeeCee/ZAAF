import React, { useState } from 'react';
import { Accordion, ChatButton } from './ui';
import { Reveal } from '../lib/motion';

const learnerFaqs = [
  ['Do I need to have studied before?', 'No. Women join us having never studied formally, having stopped years ago, or having studied a great deal. There is no entrance test. Your first conversation with your mentor is simply to find out where to begin.'],
  ['Can I really choose my own syllabus?', 'Yes — that is the whole idea. You say what you want to learn and why; your mentor proposes an order, a pace and a first milestone; you change what does not fit. It stays yours, and it can change later.'],
  ['What can I study?', 'Qur’an reading and Tajweed, Hifz, Tafsir, Hadith, Fiqh, Aqeedah, Arabic, Seerah and Islamic history, and duas and daily practice. One subject is a perfectly good start, and subjects can be combined into a single course.'],
  ['Who can join?', 'Any woman, at any age. Girls who do not attend a madrassa, women who never had the chance to study, and women returning to it after many years are all equally welcome. Zaaf is women-led and taught by women.'],
  ['I am not sure what I need. Can you help me decide?', 'Yes. Say what made you think about learning again and your mentor will suggest a starting point. Deciding together is part of the first conversation, not something to settle before it.'],
  ['How often are the sessions?', 'As often as you choose — one steady session a week is a real start, and some learners take three or four. You agree the days, timings and language, and we work around the time difference between Kerala and the Gulf.'],
  ['Can I pause if life gets busy?', 'Tell your mentor and the plan slows down or pauses. The terms for pausing and for missed sessions are being confirmed by the academy and will be published here before launch.'],
];

const parentFaqs = [
  ['Is Zaaf a madrassa?', 'No. Our tuition track supports students already studying in a madrassa, helping your child keep pace with the syllabus she is given. We do not replace her madrassa.'],
  ['Which syllabi do you teach?', 'We support both the SKIMVB and SKSVB syllabi, from Class 1 to Class 12. Choose your board and class, then ask us about the support your child needs.'],
  ['Who can join the tuition classes?', 'Girls and women at every class, and boys up to Class 4. Classes are taught by women.'],
  ['Can we choose the days and timings?', 'Yes. Tell us your preferred days, number of classes each week and local timezone. We agree a timetable with you, subject to teacher availability.'],
  ['My child doesn’t attend a madrassa. Can she still learn?', 'Yes — that is what the personalised course is for. She can study the Qur’an, the basics of prayer, Arabic or anything else, on a syllabus built for her rather than for a class.'],
];

const sharedFaqs = [
  ['How much does it cost?', 'The fee depends on the language, session length and how many sessions a week you choose. Build your plan on this site and send it to us for a confirmed quote. No rates have been published yet, and we will not show invented prices.'],
  ['Are you affiliated with SKIMVB or SKSVB?', 'The syllabus names describe the books a madrassa student already studies, not an endorsement of Zaaf. Zaaf’s exact relationship to the boards will be stated here once the academy confirms it.'],
  ['What if WhatsApp doesn’t open on my computer?', 'Every button also lets you copy the message, and the academy’s number will be printed as selectable text once confirmed, so you can dial or message it from a phone instead.'],
  ['What do I need for a session?', 'A phone, tablet or laptop with a steady connection, something to write with, and a quiet corner. Nothing is installed by this website and no account is created.'],
];

const groups = [
  { id: 'self', label: 'Learning for myself', items: [...learnerFaqs, ...sharedFaqs] },
  { id: 'child', label: 'Tuition for my child', items: [...parentFaqs, ...sharedFaqs] },
];

export function FAQ({ initial = 'self' }) {
  const [group, setGroup] = useState(initial);
  const active = groups.find(g => g.id === group) || groups[0];
  return <section className="section faq-section">
    <div className="container faq-layout">
      <Reveal>
        <span className="eyebrow">A FEW THINGS YOU MAY BE WONDERING</span>
        <h2>Good questions.<br />Simple answers.</h2>
        <div className="faq-switch" role="radiogroup" aria-label="Which answers would you like?">
          {groups.map(g => <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={group === g.id}
            className={group === g.id ? 'is-selected' : ''}
            onClick={() => setGroup(g.id)}
          >{g.label}</button>)}
        </div>
        <p>Still have something on your mind?<br />We’re happy to talk it through.</p>
        <ChatButton className="faq-chat" context="faq" message="Assalamu alaikum Zaaf, I read your FAQ and have a question about learning with you.">Ask us on WhatsApp</ChatButton>
      </Reveal>
      <Reveal className="faq-list" delay={100}>
        <Accordion key={active.id} items={active.items} />
      </Reveal>
    </div>
  </section>;
}
