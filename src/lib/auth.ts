import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { db } from './db';
import { fetchRedis } from '@/helpers/redis';

function getCredentials(provider: 'google' | 'github') {
  let clientId, clientSecret;

  if (provider === 'google') {
    clientId = process.env.GOOGLE_CLIENT_ID as string;
    clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
  } else if (provider === 'github') {
    clientId = process.env.GITHUB_CLIENT_ID as string;
    clientSecret = process.env.GITHUB_CLIENT_SECRET as string;
  }

  if (!clientId || clientId.length === 0) {
    throw new Error(`Missing ${provider.toUpperCase()}_CLIENT_ID`);
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error(`Missing ${provider.toUpperCase()}_CLIENT_SECRET`);
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: { signIn: '/login' },
  providers: [
    GoogleProvider({
      clientId: getCredentials('google').clientId,
      clientSecret: getCredentials('google').clientSecret,
    }),
    GithubProvider({
      clientId: getCredentials('github').clientId,
      clientSecret: getCredentials('github').clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const userData = (await fetchRedis('get', `user:${token.id}`)) as
        | string
        | null;

      if (!userData) {
        token.id = user.id;
        return token;
      }

      const dbUser = JSON.parse(userData);

      const { id, email, image, name } = dbUser;

      return {
        id,
        name,
        email,
        picture: image,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    redirect() {
      return '/dashboard';
    },
  },
};
