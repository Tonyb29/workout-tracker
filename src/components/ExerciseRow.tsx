import React, { useState } from 'react';
import { Exercise, ExerciseLog } from '../types';
import { ExerciseDemo } from './ExerciseDemo';

interface Props {
  exercise: Exercise;
  log: ExerciseLog;
  onToggleDone: (done: boolean) => void;
  onUpdateSet: (setIdx: number, field: 'reps' | 'weight' | 'duration', value: number) => void;
  accentColor: string;
}

export function ExerciseRow({ exercise, log, onToggleDone, onUpdateSet, accentColor }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isCardio = exercise.type === 'cardio';
  const isTimed = exercise.type === 'timed';
  const isWeighted = exercise.type === 'weighted';

  const targetLabel = isCardio
    ? exercise.reps ?? ''
    : isTimed
    ? `${exercise.sets} × ${exercise.duration}s`
    : `${exercise.sets} × ${exercise.reps ?? ''} reps`;

  return (
    <div className={`ex-row ${log.done ? 'done' : ''}`}>
      <div className="ex-header" onClick={() => !isCardio && setExpanded(e => !e)}>
        <label className="ex-check" onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={log.done}
            onChange={e => onToggleDone(e.target.checked)}
            style={{ accentColor }}
          />
        </label>
        <div className="ex-info">
          <span className="ex-name">{exercise.name}</span>
          <span className="ex-target">{targetLabel}</span>
        </div>
        {exercise.note && <span className="ex-note-icon" title={exercise.note}>ℹ</span>}
        {!isCardio && (
          <span className="ex-expand" style={{ color: accentColor }}>
            {expanded ? '▲' : '▼'}
          </span>
        )}
      </div>

      {exercise.note && <div className="ex-note">{exercise.note}</div>}

      {exercise.youtubeQuery && (
        <ExerciseDemo youtubeQuery={exercise.youtubeQuery} accentColor={accentColor} />
      )}

      {expanded && !isCardio && (
        <div className="ex-sets">
          {Array.from({ length: exercise.sets }, (_, i) => (
            <div key={i} className="set-row">
              <span className="set-label">Set {i + 1}</span>
              {isTimed ? (
                <>
                  <label className="set-field">
                    <span>Seconds</span>
                    <input
                      type="number"
                      min="0"
                      placeholder={String(exercise.duration ?? 0)}
                      value={log.sets[i]?.duration || ''}
                      onChange={e => onUpdateSet(i, 'duration', Number(e.target.value))}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="set-field">
                    <span>Reps</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={log.sets[i]?.reps || ''}
                      onChange={e => onUpdateSet(i, 'reps', Number(e.target.value))}
                    />
                  </label>
                  {isWeighted && (
                    <label className="set-field">
                      <span>lbs</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={log.sets[i]?.weight || ''}
                        onChange={e => onUpdateSet(i, 'weight', Number(e.target.value))}
                      />
                    </label>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
