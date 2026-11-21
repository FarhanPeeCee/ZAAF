import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, MessageCircle, Plus } from 'lucide-react';
import { useEnquiry } from '../lib/plan';

export function ChatButton({
  children = 'Let’s talk on WhatsApp',
  message,
  context = 'general',
  className = '',
  light = false,
  plain = false,
}) {
  const enquire = useEnquiry();
  return <button
    type="button"
    className={`button ${light ? 'button-light' : plain ? 'button-plain' : 'button-green'} ${className}`.trim()}
    onClick={() => enquire(message, context)}
  >
    <MessageCircle size={18} strokeWidth={1.7} />{children}<ArrowUpRight size={17} />
  </button>;
}

// A proper radio group: arrow keys move between options, one tab stop, and the
// pressed state is announced rather than only coloured.
export function Segmented({ label, options, value, onChange, name, size = 'md' }) {
  const ref = useRef(null);
  function onKeyDown(e) {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const values = options.map(o => (typeof o === 'string' ? o : o.value));
    const current = values.indexOf(value);
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    const next = values[(current + step + values.length) % values.length];
    onChange(next);
    requestAnimationFrame(() => {
      ref.current?.querySelector(`[data-value="${next}"]`)?.focus();
    });
  }
  return <div
    ref={ref}
    className={`segmented segmented-${size}`}
    role="radiogroup"
    aria-label={label}
    onKeyDown={onKeyDown}
  >
    {options.map(option => {
      const val = typeof option === 'string' ? option : option.value;
      const text = typeof option === 'string' ? option : option.label;
      const selected = val === value;
      return <button
        key={val}
        type="button"
        role="radio"
        name={name}
        data-value={val}
        aria-checked={selected}
        tabIndex={selected || (!value && val === (typeof options[0] === 'string' ? options[0] : options[0].value)) ? 0 : -1}
        className={selected ? 'is-selected' : ''}
        onClick={() => onChange(val)}
      >{selected && <Check size={14} />}{text}</button>;
    })}
  </div>;
}

// Height-animated accordion. <details> cannot animate its own open height, so
// the panel is measured and transitioned instead.
export function Accordion({ items, singleOpen = true }) {
  const [open, setOpen] = useState([]);
  function toggle(id) {
    setOpen(current => current.includes(id)
      ? current.filter(x => x !== id)
      : singleOpen ? [id] : [...current, id]);
  }
  return <div className="accordion">
    {items.map(([question, answer]) => {
      const isOpen = open.includes(question);
      return <div className={`accordion-item ${isOpen ? 'is-open' : ''}`} key={question}>
        <button type="button" aria-expanded={isOpen} onClick={() => toggle(question)}>
          <span>{question}</span><Plus size={18} />
        </button>
        <AccordionPanel open={isOpen}><p>{answer}</p></AccordionPanel>
      </div>;
    })}
  </div>;
}

function AccordionPanel({ open, children }) {
  const inner = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!inner.current) return;
    const measure = () => setHeight(inner.current ? inner.current.scrollHeight : 0);
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && inner.current) ro.observe(inner.current);
    return () => ro?.disconnect();
  }, [children]);
  return <div className="accordion-panel" style={{ height: open ? height : 0 }} aria-hidden={!open}>
    <div ref={inner} className="accordion-panel-inner">{children}</div>
  </div>;
}

export function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [message, onDone]);
  return <div className="toast-area" role="status" aria-live="polite">
    {message && <div className="toast"><Check size={15} />{message}</div>}
  </div>;
}

export function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}
