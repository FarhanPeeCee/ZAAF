import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Clock3, Copy, MessageCircle, X } from 'lucide-react';
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from '../lib/config';
import { track } from '../lib/track';

export function EnquiryDialog({ message, context, close, onCopied }) {
  const ref = useRef(null);
  const [text, setText] = useState(message);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setText(message); }, [message]);
  useEffect(() => {
    const node = ref.current;
    if (node && !node.open) node.showModal();
    track('enquiry_opened', { context });
  }, [context]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopied?.('Copied. Paste it into WhatsApp.');
      track('enquiry_copied', { context });
    } catch {
      setCopied(false);
    }
  }

  return <dialog
    ref={ref}
    className="enquiry-dialog"
    onCancel={e => { e.preventDefault(); close(); }}
    onClick={e => { if (e.target === ref.current) close(); }}
  >
    <button className="dialog-close" onClick={close} aria-label="Close enquiry"><X size={22} /></button>
    <span className="choice-icon"><MessageCircle size={25} /></span>
    <span className="eyebrow">YOUR CONVERSATION STARTS HERE</span>
    <h2>A little hello,<br />ready to go.</h2>
    <p>Your message already carries everything you chose. Add anything you like before you send it. These are your words, not ours.</p>

    <label className="field-label" htmlFor="enquiry-text">Your message</label>
    <textarea
      id="enquiry-text"
      className="message-draft is-editable"
      rows={Math.min(12, text.split('\n').length + 2)}
      value={text}
      onChange={e => setText(e.target.value)}
    />

    {WHATSAPP_NUMBER ? <>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noreferrer"
        className="button button-green"
        onClick={() => track('whatsapp_open', { context })}
      >Continue to WhatsApp <ArrowUpRight size={17} /></a>
      <button className="button button-plain" onClick={copy}>
        {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy the message instead'}
      </button>
      {PHONE_DISPLAY && <p className="dialog-fallback">If WhatsApp doesn’t open, message or call <span className="selectable">{PHONE_DISPLAY}</span> from your phone instead.</p>}
    </> : <>
      <div className="contact-pending">
        <Clock3 size={18} />
        <span>The academy hasn’t given us its WhatsApp number yet, so this preview can’t open a chat. Copy your message and keep it. Nothing is lost.</span>
      </div>
      <button className="button button-green" onClick={copy}>
        {copied ? <Check size={17} /> : <Copy size={17} />}{copied ? 'Message copied' : 'Copy my message'}
      </button>
    </>}
    <small className="dialog-note">Nothing you type here is stored by this website, and nothing reaches us until you send it yourself.</small>
  </dialog>;
}
