import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sprout } from 'lucide-react';
import { planMessage, planProgress, usePlan } from '../lib/plan';
import { ChatButton } from './ui';

export function Closing() {
  const { plan } = usePlan();
  const { done } = planProgress(plan);
  return <section className="closing">
    <div className="container closing-inner">
      <div className="closing-decoration" aria-hidden="true"><Sprout size={94} strokeWidth={.7} /></div>
      <div>
        <span className="eyebrow">A LITTLE HELP CAN MAKE A BIG DIFFERENCE</span>
        <h2>Let’s find what works<br />for you.</h2>
        <p>{done ? 'Your plan is saved on this device. Send it whenever you’re ready.' : 'Tell us what you’d like to learn. We’ll take it from there.'}</p>
      </div>
      <div className="closing-action">
        <ChatButton light context={done ? 'closing-plan' : 'closing'} message={done ? planMessage(plan) : undefined}>
          {done ? 'Send my plan' : 'Let’s talk on WhatsApp'}
        </ChatButton>
        {!done && <Link className="closing-link" to="/plan#plan">or build your course first <ArrowUpRight size={14} /></Link>}
        <span>No forms. No pressure. Just a conversation.</span>
      </div>
    </div>
  </section>;
}
