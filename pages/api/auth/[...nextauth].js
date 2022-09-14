import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginByEmail } from '../../../apps/mishka_user/userAuthentication';
import { checkTokenToRefresh, getUserBasicInformationAndTokens } from '../../../apps/mishka_user/helper/authHelper';
import { unstable_getServerSession } from "next-auth/next"

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60, // 14 days for refresh token
  },
  secret: 'your_secret',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        if (credentials.access_token) {
          return await checkTokenToRefresh(credentials);
        } else if (credentials.email && credentials.password) {
          // If we want to get Token from user and password for user
          const login = await loginByEmail(credentials.email.trim(), credentials.password.trim());
          return getUserBasicInformationAndTokens(login);
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.token.access_token;
        token.access_expires_in = user.token.access_expires_in;
        token.refresh_token = user.token.refresh_token;
        token.refresh_expires_in = user.token.refresh_expires_in;
      }

      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.refresh_expires_in = token.refresh_expires_in;
      session.access_expires_in = token.access_expires_in;

      return Promise.resolve(session);
    },
  },
}

// export default NextAuth(authOptions);

export default async function auth(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions)  
  return await NextAuth(req, res, authOptions);
}
