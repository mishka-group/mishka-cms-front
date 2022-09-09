import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginByEmail, AuthError } from '../../../apps/mishka_user/userAuthentication';

export const getTokenFromLoginRouter = async (login) => {
  const loginRes = await login;
  let newuser;
  if ((login.status === 200 || login.status === '200') && 'user_info' in login) {
    newuser = {
      id: user_info.id,
      email: user_info.email,
      name: user_info.full_name,
      token: {
        access_token: login.auth.access_token,
        refresh_token: login.auth.refresh_token,
        refresh_expires_in: login.auth.refresh_expires_in,
        access_expires_in: login.auth.access_expires_in,
      },
    };
    return newuser;
  }

  throw new Error(JSON.stringify(login));
};

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60, // 14 days for refresh token
  },
  secret: 'your_secret',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        if (credentials.token) {
          // If token is expire refresh it if not just retrun it
          // if we have an error what should we do?
        } else if (credentials.email && credentials.password) {
          // If we want to get Token from user and password for user
          const login = await loginByEmail(credentials.email.trim(), credentials.password.trim());
          await getTokenFromLoginRouter(login);
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
});
