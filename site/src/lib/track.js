// ---------------------------------------------------------------------------
// The site stores nothing, so the outbound tap is the only conversion event
// there is. This records it in the two places that cost nothing and need no
// consent banner: a DOM event anything can listen to, and window.dataLayer if
// a tag manager is ever added. No cookies, no storage, no network calls.
// ---------------------------------------------------------------------------

function device() {
  if (typeof window === 'undefined') return 'unknown';
  const w = window.innerWidth;
  if (w < 640) return 'phone';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

export function track(name, detail = {}) {
  if (typeof window === 'undefined') return;
  const payload = {
    event: name,
    page: window.location.pathname,
    device: device(),
    at: new Date().toISOString(),
    ...detail,
  };
  try {
    window.dispatchEvent(new CustomEvent('zaaf:event', { detail: payload }));
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    if (import.meta.env.DEV) console.info('[zaaf]', payload);
  } catch {
    /* tracking must never break the page */
  }
}
