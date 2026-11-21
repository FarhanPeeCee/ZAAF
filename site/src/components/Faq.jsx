import React, { useState } from 'react';
import { Accordion, ChatButton } from './ui';
import { Reveal } from '../lib/motion';

const learnerFaqs = [
  ['Do I need to have studied before?', 'No. Women come to us having never studied formally, having stopped as girls, or having studied a great deal already. There is no test to pass. The first conversation is only so your mentor knows where to begin.'],
  ['I feel shy about how little I know.', 'You would not be the first to say so, and you will not be the last. Nobody is listening but your mentor, there is no class to keep up with, and the whole point of one to one is that you can say “again, please” as often as you need.'],
  ['Can I really choose my own syllabus?', 'Yes, and that is the heart of it. You say what you want to learn and why. Your mentor suggests an order, a pace and a first milestone, and you change whatever does not fit. You can change it again later, when life does.'],
  ['What can I study?', 'Qur’an reading and Tajweed, Hifz, Tafsir, Hadith, Fiqh, Aqeedah, Arabic, Seerah and Islamic history, and duas for daily life. One subject is a fine beginning, and several can be woven into a single course.'],
  ['Who can join?', 'Any woman, at any age. Girls who never attended a madrassa, women who never had the chance to study, and women coming back to it after many years are all equally welcome. Zaaf is led by women and taught by women.'],
  ['I am not sure what I need. Can you help me decide?', 'Yes. Tell us what made you think about learning again, and your mentor will suggest somewhere to start. Working it out together is part of that first conversation, not something to settle before it.'],
  ['How often are the sessions?', 'As often as you choose. One steady session a week is a real beginning, and some women take three or four. You pick the days, the timings and the language, and we work around the hours between Kerala and the Gulf.'],
  ['Can I pause if life gets busy?', 'Tell your mentor and the plan slows down, or waits for you. The terms for pausing and for missed sessions are still being agreed by the academy, and they will be written here before we open.'],
];

const parentFaqs = [
  ['Is Zaaf a madrassa?', 'No. Our tuition sits beside the madrassa your child already attends, helping her keep up with the lessons she is given there. It does not replace it.'],
  ['Which syllabi do you teach?', 'Both SKIMVB and SKSVB, from Class 1 to Class 12. Choose her board and her class, then tell us where she is finding it hard.'],
  ['Who can join the tuition classes?', 'Girls and women at every class, and boys up to Class 4. The classes are taught by women.'],
  ['Can we choose the days and timings?', 'Yes. Tell us the days you would like, how many classes a week, and your local time. We agree a timetable with you, depending on who is free to teach.'],
  ['My child doesn’t attend a madrassa. Can she still learn?', 'Yes, and that is what the personalised course is for. She can learn to read the Qur’an, the shape of her prayers, Arabic, or whatever else you have in mind, on a plan built for her rather than for a class.'],
];

const sharedFaqs = [
  ['How much does it cost?', 'It depends on the language, the length of each session and how many you take in a week. Build your plan on this site and send it to us, and you will get a proper quote. No rates have been set yet, and we will not invent them.'],
  ['Are you connected to SKIMVB or SKSVB?', 'The syllabus names simply describe the books a madrassa student already studies. They are not an endorsement of Zaaf. Where Zaaf stands in relation to the boards will be written here once the academy confirms it.'],
  ['What if WhatsApp doesn’t open on my computer?', 'Every button also lets you copy the message, and the number will be printed here as plain text you can select, once it is confirmed. Then you can message or call it from your phone instead.'],
  ['What do I need for a session?', 'A phone, tablet or laptop with a steady connection, something to write with, and a quiet corner. This website installs nothing and creates no account.'],
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
        <p>Still something on your mind?<br />We would rather you asked.</p>
        <ChatButton className="faq-chat" context="faq" message="Assalamu alaikum Zaaf, I have a question about learning with you.">Ask us on WhatsApp</ChatButton>
      </Reveal>
      <Reveal className="faq-list" delay={100}>
        <Accordion key={active.id} items={active.items} />
      </Reveal>
    </div>
  </section>;
}
