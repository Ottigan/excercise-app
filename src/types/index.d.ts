import { Workout, WorkoutExercise } from '@prisma/client';

interface Option {
  id: string,
  name: string,
}

interface WorkoutWithExercises extends Workout {
  id: string;
  exercises: WorkoutExercise[];
}
