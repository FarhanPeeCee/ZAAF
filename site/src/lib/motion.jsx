import React, { useEffect, useRef, useState } from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

// Reveals its children once, the first time they scroll into view. Falls back
// to "already visible" when IntersectionObserver or motion is unavailable, so
// content is never hidden by a feature the browser does not support.
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { setShown(true); io.disconnect(); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return <Tag
    ref={ref}
    className={`reveal ${shown ? 'is-in' : ''} ${className}`.trim()}
    style={delay && !reduced ? { transitionDelay: `${delay}ms` } : undefined}
    {...rest}
  >{children}</Tag>;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return progress;
}

export function useScrolledPast(offset = 40) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return past;
}

// Keeps keyboard focus inside an open overlay and restores it on close.
export function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    const previous = document.activeElement;
    const selector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const first = node?.querySelector(selector);
    first?.focus();

    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); onClose?.(); return; }
      if (e.key !== 'Tab' || !node) return;
      const items = Array.from(node.querySelectorAll(selector)).filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const edge = e.shiftKey ? items[0] : items[items.length - 1];
      if (document.activeElement === edge) {
        e.preventDefault();
        (e.shiftKey ? items[items.length - 1] : items[0]).focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [ref, active, onClose]);
}
