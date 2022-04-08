// write a function that takes seconds and converts to minutes and seconds as string

import { Exercise } from '../models/exercise.model';

export const convertToMinutesString = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds =
    seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  return `${minutes}:${remainingSeconds} mins`;
};

export const convertToLastSuccessfullStrengthSet = (
  sets: Exercise[]
): string[] => {
  const distinctExercises = new Set(sets.map((set) => set.exerciseName));
  const resultString = [];
  distinctExercises.forEach((exercise) => {
    const sucessfulSets = sets.filter(
      (set) => set.exerciseName === exercise && set.success
    );
    let highestWeight = 0;
    sucessfulSets.forEach((set) => {
      if (set.weight > highestWeight) {
        highestWeight = set.weight;
      }
    });
    resultString.push(`${exercise}: ${highestWeight}kg`);
  });
  return resultString;
};

export const formatDateLikeDatePipe = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleDateString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export const displayAmrapResult = (result: string) => {
  const [rounds, reps] = result.split('+');
  return `${rounds} rounds + ${reps} reps`;
};
