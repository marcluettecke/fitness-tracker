import { Exercise } from './exercise.model';

export interface Records {
  groupName: string;
  records: {
    recordName: string;
    type?: string;
    timecap?: number;
    exercises?: Exercise[];
  }[];
}
