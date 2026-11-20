import React from 'react';
import { Accordion, ChatButton } from './ui';
import { Reveal } from '../lib/motion';

export const faqs = [
  ['Is Zaaf a madrassa?', 'No. Zaaf is a supporting tuition service for students already studying in a madrassa. We help your child keep pace with their existing syllabus — we do not replace their madrassa.'],
  ['Which syllabi do you teach?', 'We support both the SKIMVB and SKSVB syllabi, from Class 1 to Class 12. Choose your board and class, then ask us about the support your child needs.'],
  ['Who can join the classes?', 'We teach girls and women at every class, and boys up to Class 4. Zaaf is women-led and classes are taught by women.'],
  ['Can we choose the days and timings?', 'Yes. Tell us your preferred days, number of classes each week and local timezone. We agree a timetable with you, subject to teacher availability.'],
  ['How much do the classes cost?', 'The fee depends on the teaching language, session length and number of days per week. Build your plan on this site and send it to us for a confirmed quote. No fee rates have been published yet.'],
  ['Are you affiliated with SKIMVB or SKSVB?', 'The syllabus names describe the books your child already studies, not an endorsement of Zaaf. Zaaf’s exact relationship to the boards will be stated here once the academy confirms it.'],
  ['What if WhatsApp doesn’t open on my computer?', 'Every button also lets you copy the message, and the academy’s number will be printed as selectable text once confirmed, so you can dial or message it from a phone instead.'],
  ['What does my child need for a class?', 'A phone, tablet or laptop with a steady connection, her own madrassa textbook, and a quiet corner. Nothing is installed by this website and no account is created.'],
];

export function FAQ() {
  return <section className="section faq-section">
    <div className="container faq-layout">
      <Reveal>
        <span className="eyebrow">A FEW THINGS YOU MAY BE WONDERING</span>
        <h2>Good questions.<br />Simple answers.</h2>
        <p>Still have something on your mind?<br />We’re happy to talk it through.</p>
        <ChatButton className="faq-chat" context="faq" message="Hi Zaaf, I read your FAQ and have a question about one-to-one tuition.">Ask us on WhatsApp</ChatButton>
      </Reveal>
      <Reveal className="faq-list" delay={100}>
        <Accordion items={faqs} />
      </Reveal>
    </div>
  </section>;
}
