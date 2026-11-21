# Zaaf Academy — website

A React + Vite single-page site for Zaaf Academy: one-to-one Islamic learning for
women, from Kerala. It stores nothing on a server, has no forms or accounts, and
hands every enquiry to WhatsApp with the conversation already written.

## Two tracks

| Track | Who | What the site asks her |
| --- | --- | --- |
| **Personalised course** (the main category, `/learn`) | Any woman, at any age — no madrassa and no previous study needed | Subjects, where she is starting from, what she is hoping for, language, days, timing |
| **Madrassa tuition** (`/classes`) | A child already studying in a Samastha madrassa, SKIMVB or SKSVB, Classes 1–12 | Board, class, language, days, timing |

The personalised course is the one Zaaf leads with: the learner chooses her
subjects and agrees a syllabus, a pace and a timetable with a mentor. Nothing on
the site is a fixed package, so there is no catalogue of courses to maintain —
`SUBJECTS` in `src/lib/config.js` is the whole list, and the mentor does the rest.

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # static output in dist/
```

## The one thing to fill in

`src/lib/config.js` holds every fact the academy has not confirmed yet. Nothing
there is invented: while a value is empty the interface shows an honest
"awaiting confirmation" state instead of a plausible-looking lie.

| Value | What happens until it is set |
| --- | --- |
| `WHATSAPP_NUMBER` | Buttons open a copy-the-message dialog instead of a chat |
| `PHONE_DISPLAY`, `EMAIL` | The contact block says the number is still to come |
| `REPLY_HOURS`, `REPLY_PROMISE_HOURS` | Reply hours are described as not yet agreed |

`TYPICAL_AGE` (indicative ages per class) should be checked by the teaching lead.

## How it is put together

```
src/
  lib/config.js     unconfirmed facts, tracks, subjects, boards, classes, zones
  lib/time.js       fixed-offset time maths: a parent's hour → Kerala's hour
  lib/plan.js(x)    the saved plan, and the WhatsApp message built from it
  lib/track.js      outbound-tap events (DOM event + dataLayer, no cookies)
  lib/motion.jsx    scroll reveal, scroll progress, focus trap
  components/       header, hero, planner, subjects, classes, timetable, stories
  pages.jsx         every route
```

### The plan builder

`/plan` (and a compact copy on the home page) starts with one question — who the
learning is for — and then asks six in total on either track, composing the
WhatsApp message live as she answers. The plan is kept in `localStorage` only
(`zaaf.plan.v2`), so a returning visitor finds it waiting and every CTA on the
site can send it. Clearing browser data removes it; it never reaches a server.

Subject cards on the home page and on `/learn` write into the same plan, so
someone who starts by tapping "Hifz" finds it already chosen in the builder.

### Time, said out loud

Kerala is 1½–2½ hours ahead of the Gulf, which is the single hardest thing about
booking these lessons. Every time the parent picks is shown in her own clock and
in Kerala's, with a note on whether it falls inside normal teaching hours there.

### Measurement

The site can only observe one thing: the outbound tap. `track()` fires a
`zaaf:event` DOM event and pushes to `window.dataLayer` if a tag manager is ever
added, labelled with the page and device. It sets no cookies and sends nothing.

### Imagery

The hero is a drawn SVG scene, not a photograph: no stock imagery of people, no
consent to collect, and a few kilobytes rather than a hero-blocking JPEG on a
mid-range phone. See `docs/website-plan.md` §7 for the photography plan that
replaces it.

## Accessibility

Radio-group semantics on every choice, keyboard arrow navigation in segmented
controls, a focus trap and Escape in the menu drawer and dialog, live regions on
the message preview, a text-table equivalent of the class progression diagram,
and `prefers-reduced-motion` honoured throughout.
