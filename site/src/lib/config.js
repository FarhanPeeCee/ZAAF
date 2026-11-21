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

// ---------------------------------------------------------------------------
// Two ways to learn at Zaaf. The personalised course is the main category:
// any woman, at any age, building her own syllabus with a mentor. Madrassa
// tuition is the second track, for a child keeping pace with her classes.
// ---------------------------------------------------------------------------

export const TRACKS = [
  {
    id: 'self',
    label: 'For myself',
    short: 'Personalised course',
    title: 'Design my own course',
    blurb: 'Choose what you want to learn — Qur’an, Hifz, Hadith, Fiqh, Arabic and more — and build the syllabus and the timetable together with your mentor.',
    who: 'Any woman, at any age. No madrassa, no previous study and no entrance test needed.',
    path: '/learn',
  },
  {
    id: 'child',
    label: 'For my child',
    short: 'Madrassa tuition',
    title: 'Support my child’s madrassa',
    blurb: 'One-to-one help alongside the madrassa she already attends — the same SKIMVB or SKSVB syllabus, Classes 1 to 12, at timings you choose.',
    who: 'Girls and women at every class, and boys up to Class 4.',
    path: '/classes',
  },
];

// What a personalised course can be built from. Subjects are chosen by the
// learner and shaped into a syllabus by her mentor; nothing here is a fixed
// package or a graded programme.
export const SUBJECTS = [
  { id: 'quran', label: 'Qur’an reading & Tajweed', note: 'From the letters themselves to careful, confident recitation.' },
  { id: 'hifz', label: 'Hifz — memorisation', note: 'A memorisation plan at a pace you can actually keep, with regular revision.' },
  { id: 'tafsir', label: 'Tafsir', note: 'Meaning and context, passage by passage, as slowly as you like.' },
  { id: 'hadith', label: 'Hadith', note: 'Selected narrations read together, with explanation and discussion.' },
  { id: 'fiqh', label: 'Fiqh', note: 'Prayer, purity, fasting, zakat and the rulings of an ordinary day.' },
  { id: 'aqeedah', label: 'Aqeedah', note: 'The foundations of belief, explained in plain words.' },
  { id: 'arabic', label: 'Arabic', note: 'Reading and understanding the language of the text itself.' },
  { id: 'seerah', label: 'Seerah & Islamic history', note: 'The life of the Prophet ﷺ and the generations that followed.' },
  { id: 'adkar', label: 'Duas & daily practice', note: 'What to say and do, from waking to sleeping.' },
];

export const STARTING_POINTS = [
  { value: 'new', label: 'Starting from the beginning', note: 'Never studied this formally, or starting again after a long gap.' },
  { value: 'some', label: 'I know a little', note: 'Can manage some of it, but slowly and with gaps.' },
  { value: 'steady', label: 'Comfortable — I want depth', note: 'Studied before and looking to go further.' },
];

// Why she is learning. It changes the syllabus more than the subject does, so
// the mentor is told before the first session rather than after it.
export const INTENTIONS = [
  { value: 'understand', label: 'To understand my prayers and reading' },
  { value: 'memorise', label: 'To memorise, steadily' },
  { value: 'teach', label: 'To teach my children at home' },
  { value: 'depth', label: 'To study a subject properly, in depth' },
  { value: 'habit', label: 'To build a steady habit of learning' },
];

export function subjectById(id) {
  return SUBJECTS.find(s => s.id === id);
}
