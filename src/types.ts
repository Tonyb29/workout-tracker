export type ExerciseType = 'weighted' | 'bodyweight' | 'timed' | 'cardio';
export type DayType = 'gym' | 'bodyweight' | 'outdoor' | 'recovery';

export interface SetLog {
  reps: number;
  weight: number;
  duration: number;
}

export interface ExerciseLog {
  done: boolean;
  sets: SetLog[];
}

export interface DayLog {
  warmupDone: boolean;
  cooldownDone: boolean;
  exercises: Record<string, ExerciseLog>;
  cardioMinutes: number;
  notes: string;
}

export interface WeekData {
  [dayKey: string]: DayLog;
}

export interface AllData {
  [weekKey: string]: WeekData;
}

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  sets: number;
  reps?: string;
  duration?: number;
  note?: string;
  youtubeQuery?: string;
}

export interface WorkoutDay {
  key: string;
  label: string;
  shortLabel: string;
  dayType: DayType;
  location: string;
  focus: string;
  warmup: string[];
  exercises: Exercise[];
  cooldown: string[];
}
