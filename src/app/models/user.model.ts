import { LoggedWorkout } from './workout.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  history: LoggedWorkout[];
  personalBests: {
    workouts: {
      workoutName: string;
      result: number;
    }[];
    lifts: {
      liftName: string;
      result: number;
    }[];
  };
}
