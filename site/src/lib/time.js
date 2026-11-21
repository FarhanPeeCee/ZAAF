import { KERALA, ZONES } from './config';

export function zoneById(id) {
  return ZONES.find(z => z.id === id) || ZONES[1];
}

export function parse(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function format(minutes) {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mins = m % 60;
  const suffix = h24 < 12 ? 'am' : 'pm';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}${mins ? ':' + String(mins).padStart(2, '0') : ''} ${suffix}`;
}

// A slot chosen in the visitor's local time, expressed in Kerala time.
export function toKerala(hhmm, zone) {
  return parse(hhmm) + (KERALA.offset - zone.offset) * 60;
}

// And the other way: an hour in Kerala, on the visitor's own clock.
export function fromKerala(hhmm, zone) {
  return parse(hhmm) - (KERALA.offset - zone.offset) * 60;
}

export function dayShift(hhmm, zone) {
  const minutes = toKerala(hhmm, zone);
  if (minutes >= 1440) return 'next day';
  if (minutes < 0) return 'previous day';
  return '';
}

// A teacher in Kerala can reasonably teach between these hours.
const TEACHING_START = 6 * 60;
const TEACHING_END = 23 * 60;

export function slotComfort(hhmm, zone) {
  const k = ((toKerala(hhmm, zone) % 1440) + 1440) % 1440;
  if (k < TEACHING_START || k >= TEACHING_END) return 'late';
  if (k >= 21 * 60) return 'stretch';
  return 'easy';
}

export function localNow(zone) {
  const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
  return new Date(utc + zone.offset * 3600000);
}

export function clockIn(zone) {
  const d = localNow(zone);
  return format(d.getHours() * 60 + d.getMinutes());
}
