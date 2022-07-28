import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { db } from 'utils/db';
import { authOptions, UserWithId } from './auth/[...nextauth].next';

interface ExercisePostData {
  name: string;
  description: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'POST') {
    const data = JSON.parse(req.body) as ExercisePostData;
    const userId = (session?.user as UserWithId).id;

    const exercise = {
      name: data.name,
      description: data.description,
      userId,
    };

    await db.exercise.create({ data: exercise });

    const exercises = await db.exercise.findMany({ where: { userId } });

    res.status(200).json(exercises);
  }
};
