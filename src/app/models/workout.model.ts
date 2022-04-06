import { Exercise } from './exercise.model';

export interface LoggedWorkout {
  id: string;
  date: Date;
  name: string;
  type: 'amrap' | 'emom' | 'ft' | 'fq' | 'strength';
  duration?: number;
  timecap?: number;
  rounds?: number;
  exercises: Exercise[];
  result?: number;
  comment: string;
}
