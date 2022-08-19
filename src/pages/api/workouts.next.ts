import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'utils/auth';
import { db } from 'utils/db';
import { authOptions, UserWithId } from './auth/[...nextauth].next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  switch (req.method) {
    case 'DELETE': {
      const id = req.query.id as string;
      const userId = (session?.user as UserWithId).id;

      await db.workout.delete({
        where: {
          id,
        },
      });

      const workouts = await db.workout.findMany({ where: { userId } });

      res.status(200).json(workouts);
    }
      break;
    default:
      break;
  }
};
