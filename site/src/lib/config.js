// ---------------------------------------------------------------------------
// Everything the academy still has to confirm lives here, in one place.
// Nothing in this file may be invented: an empty value makes the interface
// show an honest "awaiting confirmation" state instead of a made-up fact.
// ---------------------------------------------------------------------------

// Full international form, digits only, e.g. '919876543210'. Empty until the
// academy confirms its public WhatsApp Business number.
export const WHATSAPP_NUMBER = '';

// Shown as selectable text beside every button once set (a tap can fail
// silently on a laptop with no WhatsApp installed).
export const PHONE_DISPLAY = '';
export const EMAIL = '';

// Reply window, to be stated in both Indian and Gulf time once agreed.
// { start: '09:00', end: '21:00' } in India time, plus the promise in hours.
export const REPLY_HOURS = null;
export const REPLY_PROMISE_HOURS = null;

export const BOARDS = ['SKIMVB', 'SKSVB'];
export const LANGUAGES = ['Malayalam', 'English'];
export const EXAM_CLASSES = [5, 7, 10, 12];
export const CLASS_NUMBERS = Array.from({ length: 12 }, (_, i) => i + 1);
export const BOYS_UP_TO = 4;

// Typical age for each class, supplied by the teaching lead. Marked as
// indicative in the interface — a child may sit a class above or below.
export const TYPICAL_AGE = {
  1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10,
  7: 11, 8: 12, 9: 13, 10: 14, 11: 15, 12: 16,
};

// Fixed offsets from UTC. None of these places observe daylight saving, so a
// plain number is accurate and needs no timezone database.
export const ZONES = [
  { id: 'IN', label: 'Kerala, India', short: 'IST', offset: 5.5 },
  { id: 'AE', label: 'UAE', short: 'GST', offset: 4 },
  { id: 'OM', label: 'Oman', short: 'GST', offset: 4 },
  { id: 'SA', label: 'Saudi Arabia', short: 'AST', offset: 3 },
  { id: 'QA', label: 'Qatar', short: 'AST', offset: 3 },
  { id: 'KW', label: 'Kuwait', short: 'AST', offset: 3 },
  { id: 'BH', label: 'Bahrain', short: 'AST', offset: 3 },
  { id: 'GB', label: 'United Kingdom', short: 'GMT', offset: 0 },
];

export const KERALA = ZONES[0];

// The evening slots a parent actually chooses between, in her own local time.
export const SLOTS = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

export const WEEKDAYS = [
  { id: 'mon', short: 'Mon', label: 'Monday' },
  { id: 'tue', short: 'Tue', label: 'Tuesday' },
  { id: 'wed', short: 'Wed', label: 'Wednesday' },
  { id: 'thu', short: 'Thu', label: 'Thursday' },
  { id: 'fri', short: 'Fri', label: 'Friday' },
  { id: 'sat', short: 'Sat', label: 'Saturday' },
  { id: 'sun', short: 'Sun', label: 'Sunday' },
];
