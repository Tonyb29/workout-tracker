import React, { useMemo } from 'react';
import { PROGRAM } from './data/program';
import { DayCard } from './components/DayCard';
import { useWorkoutData } from './hooks/useWorkoutData';

function getDateForDay(monday: Date, dayIndex: number): Date {
  const d = new Date(monday);
  d.setDate(monday.getDate() + dayIndex);
  return d;
}

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function todayDayKey(): string {
  const dow = new Date().getDay();
  // JS: 0=Sun,1=Mon,...,6=Sat → map to our keys
  const map = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return map[dow];
}

export default function App() {
  const {
    weekOffset,
    setWeekOffset,
    monday,
    weekKey,
    getDayLog,
    setExerciseDone,
    updateSet,
    setWarmupDone,
    setCooldownDone,
    setCardioMinutes,
    setNotes,
  } = useWorkoutData();

  const isCurrentWeek = weekOffset === 0;
  const todayKey = todayDayKey();

  const weekLabel = useMemo(() => {
    const end = new Date(monday);
    end.setDate(monday.getDate() + 6);
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(monday)} – ${fmt(end)}, ${end.getFullYear()}`;
  }, [monday]);

  const overallPct = useMemo(() => {
    let total = 0;
    let done = 0;
    PROGRAM.forEach(day => {
      day.exercises.forEach(ex => {
        total++;
        if (getDayLog(weekKey, day.key).exercises[ex.id]?.done) done++;
      });
    });
    return total === 0 ? 0 : Math.round((done / total) * 100);
  }, [weekKey, getDayLog]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <span className="header-icon">💪</span>
          <h1>Workout Tracker</h1>
        </div>

        <div className="week-nav">
          <button className="week-btn" onClick={() => setWeekOffset(w => w - 1)}>‹ Prev</button>
          <div className="week-info">
            <div className="week-label">{weekLabel}</div>
            {isCurrentWeek && <div className="week-sub">Current Week</div>}
          </div>
          <button
            className="week-btn"
            onClick={() => setWeekOffset(w => w + 1)}
            disabled={weekOffset >= 0}
          >
            Next ›
          </button>
        </div>

        <div className="overall-progress">
          <div className="overall-bar">
            <div className="overall-fill" style={{ width: `${overallPct}%` }} />
          </div>
          <span className="overall-pct">{overallPct}% this week</span>
        </div>
      </header>

      <main className="day-list">
        {PROGRAM.map((day, idx) => {
          const date = getDateForDay(monday, DAY_ORDER.indexOf(day.key));
          const isToday = isCurrentWeek && day.key === todayKey;
          const dayLog = getDayLog(weekKey, day.key);

          return (
            <DayCard
              key={day.key}
              day={day}
              dayLog={dayLog}
              date={date}
              isToday={isToday}
              weekKey={weekKey}
              onToggleDone={(exId, done) => setExerciseDone(weekKey, day.key, exId, done)}
              onUpdateSet={(exId, setIdx, field, val) => updateSet(weekKey, day.key, exId, setIdx, field, val)}
              onSetWarmup={done => setWarmupDone(weekKey, day.key, done)}
              onSetCooldown={done => setCooldownDone(weekKey, day.key, done)}
              onSetCardio={min => setCardioMinutes(weekKey, day.key, min)}
              onSetNotes={notes => setNotes(weekKey, day.key, notes)}
            />
          );
        })}
      </main>

      <footer className="app-footer">
        <p>Data saved locally in your browser · Works offline</p>
      </footer>
    </div>
  );
}
