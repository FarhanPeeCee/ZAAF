// ---------------------------------------------------------------------------
// Everything the academy still has to confirm lives here, in one place.
// Nothing in this file may be invented: an empty value makes the interface
// show an honest "awaiting confirmation" state instead of a made-up fact.
// ---------------------------------------------------------------------------

// The WhatsApp Business number, in full international form, digits only.
// This is what every button on the site opens a chat with.
export const WHATSAPP_NUMBER = '919895307718';

// The same number written for a human to read, and to copy by hand when a tap
// fails silently on a laptop with no WhatsApp installed.
export const WHATSAPP_DISPLAY = '+91 98953 07718';

// The number to call. Keep it separate: the academy answers WhatsApp on one
// number and the phone on another.
export const PHONE_DISPLAY = '+91 9656107718';
export const EMAIL = 'zaafacademy@gmail.com';

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
// a rough guide in the interface: a child may sit a class above or below.
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
    title: 'Start a course of my own',
    blurb: 'You choose what you want to learn. Qur\u2019an, Hifz, Hadith, Fiqh, Arabic. Then you and your mentor shape the lessons, the pace and the timings around the life you already have.',
    who: 'Any woman, at any age. You need no madrassa behind you, and nobody will test you.',
    path: '/learn',
  },
  {
    id: 'child',
    label: 'For my child',
    short: 'Madrassa tuition',
    title: 'Help my child keep up',
    blurb: 'Quiet, one-to-one help beside the madrassa she already attends. The same SKIMVB or SKSVB lessons, Classes 1 to 12, at the hours that suit your family.',
    who: 'Girls and women at every class, and boys up to Class 4.',
    path: '/classes',
  },
];

// What a personalised course can be built from. The learner chooses, and her
// mentor shapes the choices into one syllabus. Nothing here is a fixed package
// or a graded programme.
export const SUBJECTS = [
  { id: 'quran', label: 'Qur\u2019an reading & Tajweed', note: 'From the first letters to a recitation you feel calm about.' },
  { id: 'hifz', label: 'Hifz (memorisation)', note: 'A plan you can actually keep, with revision built in so nothing slips away.' },
  { id: 'tafsir', label: 'Tafsir', note: 'What the words mean, and what they ask of you. As slowly as you like.' },
  { id: 'hadith', label: 'Hadith', note: 'Narrations read together, with the story and the sense behind them.' },
  { id: 'fiqh', label: 'Fiqh', note: 'Prayer, purity, fasting, zakat. The questions of an ordinary day, answered plainly.' },
  { id: 'aqeedah', label: 'Aqeedah', note: 'What you were taught as a child, explained again in words that settle it.' },
  { id: 'arabic', label: 'Arabic', note: 'Enough of the language to meet the text yourself.' },
  { id: 'seerah', label: 'Seerah & Islamic history', note: 'The life of the Prophet \ufdfa, and the people who carried it after him.' },
  { id: 'adkar', label: 'Duas & daily practice', note: 'What to say and do, from waking until you sleep.' },
];

export const STARTING_POINTS = [
  { value: 'new', label: 'I am starting from the beginning', note: 'You have never studied this properly, or it has been a very long time. That is a fine place to begin.' },
  { value: 'some', label: 'I know a little', note: 'You can manage some of it, slowly, with gaps you would like to close.' },
  { value: 'steady', label: 'I am comfortable, and want more', note: 'You have studied before and you are ready to go deeper.' },
];

// Why she is learning. It shapes the syllabus more than the subject does, so her
// mentor hears it before the first session rather than after it.
export const INTENTIONS = [
  { value: 'understand', label: 'To understand what I say in my prayers' },
  { value: 'memorise', label: 'To memorise, a little at a time' },
  { value: 'teach', label: 'To teach my own children at home' },
  { value: 'depth', label: 'To study one subject properly' },
  { value: 'habit', label: 'To keep a steady habit of learning' },
];

export function subjectById(id) {
  return SUBJECTS.find(s => s.id === id);
}
