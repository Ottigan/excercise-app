import { Exercise } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'utils/auth';
import { db } from 'utils/db';
import { authOptions, UserWithId } from './auth/[...nextauth].next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'POST': {
      const data = JSON.parse(req.body) as Exercise;
      const userId = (session?.user as UserWithId).id;

      const exercise = {
        ...data,
        userId,
      };

      await db.exercise.create({ data: exercise });
      const exercises = await db.exercise.findMany({ where: { userId } });

      res.status(200).json(exercises);
    }
      break;
    case 'PATCH': {
      const data = JSON.parse(req.body) as Exercise;
      const userId = (session?.user as UserWithId).id;

      const exercise = {
        ...data,
        userId,
      };

      await db.exercise.update({
        where: { id: exercise.id },
        data: exercise,
      });

      const exercises = await db.exercise.findMany({ where: { userId } });

      res.status(200).json(exercises);
    }
      break;
    case 'DELETE': {
      const id = req.query.id as string;
      const userId = (session?.user as UserWithId).id;

      await db.exercise.delete({
        where: {
          id,
        },
      });

      const exercises = await db.exercise.findMany({ where: { userId } });

      res.status(200).json(exercises);
    }
      break;
    default:
      break;
  }
};
