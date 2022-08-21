import { WorkoutExercise } from '@prisma/client';
import { WorkoutWithExercises } from 'types';

export interface Action {
  type: string;
  payload?: string | WorkoutExercise[] | WorkoutWithExercises;
}

export const formDataTemplate: WorkoutWithExercises = {
  id: '',
  name: '',
  userId: '',
  exercises: [] as WorkoutExercise[],
};

export function reducer(state: WorkoutWithExercises, action: Action) {
  switch (action.type) {
    case 'clear':
      return formDataTemplate;
    case 'set':
      if (typeof action.payload === 'object') {
        return { ...action.payload } as WorkoutWithExercises;
      }

      return state;
    default: {
      const value = action.payload;

      return { ...state, [action.type]: value };
    }
  }
}

export function getTemplate() {
  const exerciseTemplate = {
    id: Math.random().toString(),
    name: '',
    sets: 0,
    reps: 0,
    rest: 0,
    weight: 0,
    workoutId: null,
    exerciseId: '',
  };

  return exerciseTemplate;
}
