export interface Exercise {
  exerciseName: string;
  repetitions: number;
  weight: number;
  success?: boolean;
  focusArea: 'core' | 'legs' | 'upperBody';
}
