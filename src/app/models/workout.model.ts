import { Exercise } from './exercise.model';

export interface LoggedWorkout {
  id: string;
  date: Date;
  name: string;
  type: 'amrap' | 'emom' | 'ft' | 'fq' | 'strength';
  timecap?: number;
  rounds?: number;
  frequency?: number;
  exercises: Exercise[];
  result?: number | string;
  comment: string;
}
