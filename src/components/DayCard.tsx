import React, { useState } from 'react';
import { DayLog, WorkoutDay } from '../types';
import { DAY_COLORS } from '../data/program';
import { ExerciseRow } from './ExerciseRow';

interface Props {
  day: WorkoutDay;
  dayLog: DayLog;
  date: Date;
  isToday: boolean;
  weekKey: string;
  onToggleDone: (exId: string, done: boolean) => void;
  onUpdateSet: (exId: string, setIdx: number, field: 'reps' | 'weight' | 'duration', value: number) => void;
  onSetWarmup: (done: boolean) => void;
  onSetCooldown: (done: boolean) => void;
  onSetCardio: (minutes: number) => void;
  onSetNotes: (notes: string) => void;
}

function completionPct(day: WorkoutDay, log: DayLog): number {
  const total = day.exercises.length;
  if (total === 0) return 0;
  const done = day.exercises.filter(ex => log.exercises[ex.id]?.done).length;
  return Math.round((done / total) * 100);
}

const TYPE_LABELS: Record<string, string> = {
  gym: 'GYM',
  bodyweight: 'BODYWEIGHT',
  outdoor: 'OUTDOOR',
  recovery: 'RECOVERY',
};

export function DayCard(props: Props) {
  const { day, dayLog, date, isToday } = props;
  const colors = DAY_COLORS[day.dayType];
  const pct = completionPct(day, dayLog);
  const [open, setOpen] = useState(isToday);

  const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const hasCardio = day.exercises.some(e => e.type === 'cardio');

  return (
    <div
      className={`day-card ${isToday ? 'today' : ''}`}
      style={{ borderColor: colors.border, background: colors.bg }}
    >
      <div className="day-header" onClick={() => setOpen(o => !o)}>
        <div className="day-title-row">
          <div className="day-left">
            <span className="day-label">{day.label}</span>
            <span className="day-date">{dateLabel}</span>
            {isToday && <span className="today-badge">TODAY</span>}
          </div>
          <div className="day-right">
            <span
              className="type-badge"
              style={{ background: colors.badge, color: '#fff' }}
            >
              {TYPE_LABELS[day.dayType]}
            </span>
            <span className="day-chevron" style={{ color: colors.text }}>{open ? '▲' : '▼'}</span>
          </div>
        </div>
        <div className="day-focus" style={{ color: colors.text }}>{day.focus}</div>
        <div className="day-progress-bar">
          <div
            className="day-progress-fill"
            style={{ width: `${pct}%`, background: colors.border }}
          />
        </div>
        <div className="day-pct" style={{ color: colors.text }}>{pct}% complete</div>
      </div>

      {open && (
        <div className="day-body">
          {/* Warm-up */}
          <section className="day-section">
            <div className="section-header">
              <label className="section-check">
                <input
                  type="checkbox"
                  checked={dayLog.warmupDone}
                  onChange={e => props.onSetWarmup(e.target.checked)}
                  style={{ accentColor: colors.border }}
                />
                <span style={{ color: colors.text }}>Warm-up</span>
              </label>
            </div>
            <ul className="checklist">
              {day.warmup.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Cardio minutes (if day has cardio) */}
          {hasCardio && (
            <div className="cardio-row">
              <label style={{ color: colors.text }}>Cardio duration (min):</label>
              <input
                type="number"
                min="0"
                max="300"
                value={dayLog.cardioMinutes || ''}
                placeholder="0"
                onChange={e => props.onSetCardio(Number(e.target.value))}
                className="cardio-input"
                style={{ borderColor: colors.border }}
              />
            </div>
          )}

          {/* Exercises */}
          <section className="day-section">
            <div className="section-label" style={{ color: colors.text }}>Exercises</div>
            <div className="exercise-list">
              {day.exercises.map(ex => (
                <ExerciseRow
                  key={ex.id}
                  exercise={ex}
                  log={dayLog.exercises[ex.id] ?? { done: false, sets: [] }}
                  onToggleDone={done => props.onToggleDone(ex.id, done)}
                  onUpdateSet={(setIdx, field, val) => props.onUpdateSet(ex.id, setIdx, field, val)}
                  accentColor={colors.border}
                />
              ))}
            </div>
          </section>

          {/* Cool-down */}
          <section className="day-section">
            <div className="section-header">
              <label className="section-check">
                <input
                  type="checkbox"
                  checked={dayLog.cooldownDone}
                  onChange={e => props.onSetCooldown(e.target.checked)}
                  style={{ accentColor: colors.border }}
                />
                <span style={{ color: colors.text }}>Cool-down & Stretch</span>
              </label>
            </div>
            <ul className="checklist">
              {day.cooldown.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Notes */}
          <section className="day-section">
            <div className="section-label" style={{ color: colors.text }}>Notes</div>
            <textarea
              className="notes-input"
              placeholder="How did it go? Any PRs, how you felt, weight changes..."
              value={dayLog.notes}
              onChange={e => props.onSetNotes(e.target.value)}
              style={{ borderColor: colors.border }}
            />
          </section>
        </div>
      )}
    </div>
  );
}
