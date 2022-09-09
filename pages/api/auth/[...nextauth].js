import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginByEmail, logout, refreshToken, AuthError } from '../../../apps/mishka_user/userAuthentication';

export const getUserBasicInformationAndTokens = async (login) => {
  const loginRes = await login;
  let newuser;
  if ((login.status === 200 || login.status === '200') && 'user_info' in login) {
    newuser = {
      email: loginRes.user_info.email,
      name: loginRes.user_info.full_name,
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

export const checkTokenToRefresh = async (credentials) => {
  let nowUnixDate = Math.floor(Date.now() / 1000);
  if (credentials.access_expires_in <= nowUnixDate && credentials.refresh_expires_in >= nowUnixDate) {
    const refresh = await refreshToken(credentials.refresh_token);
    if (refresh.status !== 200) {
      throw new Error(JSON.stringify(refresh));
    } else {
      return await getUserBasicInformationAndTokens(refresh)
    }
  } else if (credentials.refresh_expires_in <= nowUnixDate) {
    await logout(credentials.refresh_token);
    throw new Error(JSON.stringify({ status: "signOut" }));
  } else {
    console.log("hey")
    return Promise.resolve({
      email: credentials.user.email,
      name: credentials.user.full_name,
      token: {
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
        refresh_expires_in: credentials.refresh_expires_in,
        access_expires_in: credentials.access_expires_in,
      },
    });
  }
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
        if (credentials.access_token) {
          return await checkTokenToRefresh(credentials);
        } else if (credentials.email && credentials.password) {
          // If we want to get Token from user and password for user
          const login = await loginByEmail(credentials.email.trim(), credentials.password.trim());
          return await getUserBasicInformationAndTokens(login);
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
