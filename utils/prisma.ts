import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/prefer-default-export
export const prisma = global.prisma
  || new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
