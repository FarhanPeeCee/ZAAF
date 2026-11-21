import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, GraduationCap, LayoutGrid, Rows3, Table2 } from 'lucide-react';
import { BOARDS, BOYS_UP_TO, CLASS_NUMBERS, EXAM_CLASSES, TYPICAL_AGE } from '../lib/config';
import { usePlan } from '../lib/plan';
import { Segmented } from './ui';
import { Reveal } from '../lib/motion';

const FILTERS = [
  { value: 'all', label: 'All classes' },
  { value: 'exam', label: 'Exam years' },
  { value: 'boys', label: 'Boys welcome' },
];

const VIEWS = [
  { value: 'grid', label: 'Cards', icon: LayoutGrid },
  { value: 'ladder', label: 'By age', icon: Rows3 },
  { value: 'table', label: 'Table', icon: Table2 },
];

function matches(n, filter) {
  if (filter === 'exam') return EXAM_CLASSES.includes(n);
  if (filter === 'boys') return n <= BOYS_UP_TO;
  return true;
}

function ClassCards({ board, filter, onChoose, selected }) {
  return <div className="class-grid">
    {CLASS_NUMBERS.map(n => {
      const dim = !matches(n, filter);
      return <Link
        key={n}
        className={`class-card ${EXAM_CLASSES.includes(n) ? 'exam-class' : ''} ${dim ? 'is-dim' : ''} ${selected === n ? 'is-selected' : ''}`}
        to={`/classes/class-${n}?board=${board}`}
        onClick={() => onChoose(n)}
        aria-hidden={dim ? 'true' : undefined}
        tabIndex={dim ? -1 : undefined}
      >
        <div>
          <span className="class-label">CLASS</span>
          {EXAM_CLASSES.includes(n) && <span className="exam-dot" title="Board exam year" />}
        </div>
        <div className="class-number">{String(n).padStart(2, '0')}<ArrowUpRight size={20} /></div>
        <span className="class-caption">
          {n <= BOYS_UP_TO ? 'Girls & boys' : 'Girls & women'}
          {EXAM_CLASSES.includes(n) ? <span className="exam-label">Exam year</span> : <span className="age-label">~{TYPICAL_AGE[n]} yrs</span>}
        </span>
      </Link>;
    })}
  </div>;
}

// DIA-01: the twelve classes as a progression, with usual ages and the board
// exam years marked. The table view below is its text equivalent.
function ClassLadder({ board, filter, onChoose }) {
  return <div className="ladder" role="list">
    {CLASS_NUMBERS.map(n => {
      const dim = !matches(n, filter);
      const exam = EXAM_CLASSES.includes(n);
      return <Link
        role="listitem"
        key={n}
        to={`/classes/class-${n}?board=${board}`}
        onClick={() => onChoose(n)}
        className={`ladder-step ${exam ? 'is-exam' : ''} ${dim ? 'is-dim' : ''}`}
        style={{ '--rung': (n - 1) / 11 }}
      >
        <span className="ladder-age">{TYPICAL_AGE[n]} yrs</span>
        <span className="ladder-bar"><i /></span>
        <span className="ladder-class">Class {n}</span>
        <span className="ladder-meta">
          {exam && <strong><GraduationCap size={13} /> Board exam</strong>}
          {n <= BOYS_UP_TO && <em>Girls & boys</em>}
        </span>
      </Link>;
    })}
  </div>;
}

function ClassTable({ board }) {
  return <div className="table-wrap">
    <table className="class-table">
      <caption>Classes 1 to 12 on the {board} syllabus, with the usual age and who may join. Ages are a rough guide. Her madrassa decides the class.</caption>
      <thead>
        <tr><th scope="col">Class</th><th scope="col">Typical age</th><th scope="col">Who may join</th><th scope="col">Board exam year</th></tr>
      </thead>
      <tbody>
        {CLASS_NUMBERS.map(n => <tr key={n}>
          <th scope="row">Class {n}</th>
          <td>{TYPICAL_AGE[n]}</td>
          <td>{n <= BOYS_UP_TO ? 'Girls and boys' : 'Girls and women'}</td>
          <td>{EXAM_CLASSES.includes(n) ? 'Yes' : 'No'}</td>
        </tr>)}
      </tbody>
    </table>
  </div>;
}

export function ClassesSection({ standalone = false, initialBoard }) {
  const { plan, set } = usePlan();
  const board = plan.board || initialBoard || BOARDS[0];
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  return <section id="classes" className={`classes-section section ${standalone ? 'standalone' : ''}`}>
    <div className="container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE SAME LESSONS. A LITTLE EXTRA HELP.</span>
          <h2>Find your child’s class.</h2>
          <p>Two familiar syllabi. Twelve classes. Someone beside her at every one.</p>
        </div>
        <div className="board-control">
          <span>Choose your board</span>
          <Segmented label="Choose your syllabus" name="board-section" options={BOARDS} value={board} onChange={v => set({ board: v })} />
        </div>
      </div>

      <div className="class-controls">
        <div className="filter-chips" role="radiogroup" aria-label="Filter the classes">
          {FILTERS.map(f => <button
            key={f.value}
            type="button"
            role="radio"
            aria-checked={filter === f.value}
            className={filter === f.value ? 'is-selected' : ''}
            onClick={() => setFilter(f.value)}
          >{f.label}</button>)}
        </div>
        <div className="view-switch" role="radiogroup" aria-label="How to show the classes">
          {VIEWS.map(v => <button
            key={v.value}
            type="button"
            role="radio"
            aria-checked={view === v.value}
            aria-label={v.label}
            title={v.label}
            className={view === v.value ? 'is-selected' : ''}
            onClick={() => setView(v.value)}
          ><v.icon size={15} /><span>{v.label}</span></button>)}
        </div>
      </div>

      <Reveal>
        {view === 'grid' && <ClassCards board={board} filter={filter} selected={plan.classNo} onChoose={n => set({ classNo: n, board })} />}
        {view === 'ladder' && <ClassLadder board={board} filter={filter} onChoose={n => set({ classNo: n, board })} />}
        {view === 'table' && <ClassTable board={board} />}
      </Reveal>

      <div className="class-footnote">
        <span><span className="exam-dot" /> Board exam years: Classes 5, 7, 10 &amp; 12</span>
        <Link to={`/syllabus/${board.toLowerCase()}`}>About the {board} syllabus <ArrowUpRight size={15} /></Link>
      </div>

      <div className="exam-banner">
        <div className="exam-icon"><GraduationCap size={29} strokeWidth={1.3} /></div>
        <div>
          <h3>An exam coming? Let’s take it one lesson at a time.</h3>
          <p>Focused, one-to-one preparation for Classes 5, 7, 10 and 12.</p>
        </div>
        <Link className="text-link" to="/exams">Explore exam support <ArrowUpRight size={18} /></Link>
      </div>
    </div>
  </section>;
}
