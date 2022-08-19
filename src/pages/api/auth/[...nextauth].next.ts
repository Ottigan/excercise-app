import { prisma } from '@db/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { db } from 'utils/db';

export interface UserWithId extends User {
  id: string;
}

interface ExtendedSession extends Session {
  user: UserWithId;
  error?: boolean;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: 'user:email' } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }): Promise<ExtendedSession> {
      const extendedSession: ExtendedSession = {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };

      const account = await db.account.findFirst({ where: { userId: user.id } });

      const accessToken = account?.access_token;

      const { GITHUB_ID, GITHUB_SECRET } = process.env;
      const url = `https://${GITHUB_ID}:${GITHUB_SECRET}@api.github.com/applications/${GITHUB_ID}/token`;

      const res = await fetch(url, {
        headers: { Accept: 'application/vnd.github+json' },
        method: 'POST',
        body: JSON.stringify({ access_token: accessToken }),
      });

      const { status } = res;

      if (status !== 200) {
        await db.session.deleteMany({ where: { userId: user.id } });

        await db.account.deleteMany({
          where: {
            userId: user.id,
            provider: 'github',
          },
        });

        extendedSession.error = true;
      }

      return extendedSession;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
