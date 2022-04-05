export interface LoggedWorkout {
  id: string;
  date: string;
  name: string;
  type: 'amrap' | 'emom' | 'ft' | 'fq' | 'strength';
  duration?: number;
  timecap?: number;
  rounds?: number;
  exercises: [
    {
      exerciseName: string;
      repetitions: number;
      weight: number;
      success?: boolean;
      focusArea: 'core' | 'legs' | 'upperBody';
    }
  ];
  result?: number;
  comment: string;
}
