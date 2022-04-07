import { LoggedWorkout } from './workout.model';
import { PersonalBestLift } from './personalBestLift.model';
import { PersonalBestWorkout } from './PersonalBestWorkout.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  history: LoggedWorkout[];
  personalBests: {
    workouts: PersonalBestWorkout[];
    lifts: PersonalBestLift[];
  };
}
