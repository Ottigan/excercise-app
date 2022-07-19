import NextAuth, { Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@db/client';

interface SessionWithError extends Session {
  error?: boolean
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }): Promise<SessionWithError> {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
        },
      });

      const accessToken = account?.access_token;

      const { GITHUB_ID, GITHUB_SECRET } = process.env;
      const url = `https://${GITHUB_ID}:${GITHUB_SECRET}@api.github.com/applications/${GITHUB_ID}/token`;

      const res = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
        },
        method: 'POST',
        body: JSON.stringify({ access_token: accessToken }),
      });

      const { status } = res;

      if (status !== 200) {
        await prisma.session.deleteMany({
          where: { userId: user.id },
        });

        await prisma.account.deleteMany({
          where: {
            userId: user.id,
            provider: 'github',
          },
        });

        return { ...session, error: true };
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
