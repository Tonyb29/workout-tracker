import { useCallback, useEffect, useState } from 'react';
import { AllData, DayLog, ExerciseLog, SetLog } from '../types';
import { PROGRAM } from '../data/program';

const STORAGE_KEY = 'workout_tracker_v1';

function getWeekMonday(offset: number): Date {
  const today = new Date();
  const dow = today.getDay();
  const daysToMon = dow === 0 ? -6 : 1 - dow;
  const mon = new Date(today);
  mon.setDate(today.getDate() + daysToMon + offset * 7);
  mon.setHours(0, 0, 0, 0);
  return mon;
}

export function getWeekKey(monday: Date): string {
  return monday.toISOString().split('T')[0];
}

function emptySet(): SetLog {
  return { reps: 0, weight: 0, duration: 0 };
}

function emptyExerciseLog(numSets: number): ExerciseLog {
  return {
    done: false,
    sets: Array.from({ length: numSets }, emptySet),
  };
}

function emptyDayLog(dayKey: string): DayLog {
  const day = PROGRAM.find(d => d.key === dayKey);
  const exercises: Record<string, ExerciseLog> = {};
  day?.exercises.forEach(ex => {
    exercises[ex.id] = emptyExerciseLog(ex.sets);
  });
  return { warmupDone: false, cooldownDone: false, exercises, cardioMinutes: 0, notes: '' };
}

function loadAll(): AllData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: AllData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full
  }
}

export function useWorkoutData() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [allData, setAllData] = useState<AllData>(loadAll);

  const monday = getWeekMonday(weekOffset);
  const weekKey = getWeekKey(monday);

  useEffect(() => {
    saveAll(allData);
  }, [allData]);

  const getWeekData = useCallback(
    (wk: string) => allData[wk] ?? {},
    [allData]
  );

  const getDayLog = useCallback(
    (wk: string, dayKey: string): DayLog =>
      allData[wk]?.[dayKey] ?? emptyDayLog(dayKey),
    [allData]
  );

  const updateDayLog = useCallback(
    (wk: string, dayKey: string, updater: (prev: DayLog) => DayLog) => {
      setAllData(prev => {
        const weekData = prev[wk] ?? {};
        const current = weekData[dayKey] ?? emptyDayLog(dayKey);
        return {
          ...prev,
          [wk]: { ...weekData, [dayKey]: updater(current) },
        };
      });
    },
    []
  );

  const setExerciseDone = useCallback(
    (wk: string, dayKey: string, exId: string, done: boolean) => {
      updateDayLog(wk, dayKey, prev => ({
        ...prev,
        exercises: {
          ...prev.exercises,
          [exId]: { ...(prev.exercises[exId] ?? emptyExerciseLog(1)), done },
        },
      }));
    },
    [updateDayLog]
  );

  const updateSet = useCallback(
    (wk: string, dayKey: string, exId: string, setIdx: number, field: keyof SetLog, value: number) => {
      updateDayLog(wk, dayKey, prev => {
        const exLog = prev.exercises[exId] ?? emptyExerciseLog(1);
        const sets = [...exLog.sets];
        sets[setIdx] = { ...sets[setIdx], [field]: value };
        return {
          ...prev,
          exercises: { ...prev.exercises, [exId]: { ...exLog, sets } },
        };
      });
    },
    [updateDayLog]
  );

  const setWarmupDone = useCallback(
    (wk: string, dayKey: string, done: boolean) =>
      updateDayLog(wk, dayKey, prev => ({ ...prev, warmupDone: done })),
    [updateDayLog]
  );

  const setCooldownDone = useCallback(
    (wk: string, dayKey: string, done: boolean) =>
      updateDayLog(wk, dayKey, prev => ({ ...prev, cooldownDone: done })),
    [updateDayLog]
  );

  const setCardioMinutes = useCallback(
    (wk: string, dayKey: string, minutes: number) =>
      updateDayLog(wk, dayKey, prev => ({ ...prev, cardioMinutes: minutes })),
    [updateDayLog]
  );

  const setNotes = useCallback(
    (wk: string, dayKey: string, notes: string) =>
      updateDayLog(wk, dayKey, prev => ({ ...prev, notes })),
    [updateDayLog]
  );

  return {
    weekOffset,
    setWeekOffset,
    monday,
    weekKey,
    getWeekData,
    getDayLog,
    setExerciseDone,
    updateSet,
    setWarmupDone,
    setCooldownDone,
    setCardioMinutes,
    setNotes,
  };
}
