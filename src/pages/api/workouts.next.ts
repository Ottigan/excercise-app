import type { NextApiRequest, NextApiResponse } from 'next';
import { WorkoutWithExercises } from 'types';
import { getServerSession } from 'utils/auth';
import { db } from 'utils/db';
import { authOptions, UserWithId } from './auth/[...nextauth].next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'POST': {
      const { name, exercises } = JSON.parse(req.body) as WorkoutWithExercises;
      const userId = (session?.user as UserWithId).id;

      await db.workout.create({
        data: {
          name,
          userId,
          exercises: {
            create: exercises.map((e) => ({
              name: e.name,
              sets: e.sets,
              reps: e.reps,
              rest: e.rest,
              weight: e.weight,
              exerciseId: e.exerciseId,
            })),
          },
        },
      });

      const workouts = await db.workout.findMany({
        where: { userId },
        include: { exercises: true },
      });

      res.status(200).json(workouts);
    }
      break;
    case 'PATCH': {
      const { id, name, exercises } = JSON.parse(req.body) as WorkoutWithExercises;
      const userId = (session?.user as UserWithId).id;

      await db.workout.update({
        where: { id },
        data: {
          name,
          userId,
        },
      });

      console.log(exercises);

      await Promise.all(exercises.map((e) => {
        if (e.workoutId) {
          return db.workoutExercise.update({
            where: { id: e.id },
            data: e,
          });
        }

        return db.workoutExercise.create({
          data: {
            name: e.name,
            sets: e.sets,
            reps: e.reps,
            rest: e.rest,
            weight: e.weight,
            exerciseId: e.exerciseId,
            workoutId: id,
          },
        });
      }));

      const workouts = await db.workout.findMany({
        where: { userId },
        include: { exercises: true },
      });

      res.status(200).json(workouts);
    }
      break;
    case 'DELETE': {
      const id = req.query.id as string;
      const userId = (session?.user as UserWithId).id;

      await db.workout.delete({
        where: {
          id,
        },
      });

      const workouts = await db.workout.findMany({
        where: { userId },
        include: { exercises: true },
      });

      res.status(200).json(workouts);
    }
      break;
    default:
      break;
  }
};
