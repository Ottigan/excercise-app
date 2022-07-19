/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-var
// eslint-disable-next-line vars-on-top
import { PrismaClient } from '@prisma/client';

export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
          NODE_ENV: 'development' | 'production' | 'test';
          GITHUB_ID: string;
          GITHUB_SECRET: string
        }
    }

     var prisma: PrismaClient | undefined;
}
