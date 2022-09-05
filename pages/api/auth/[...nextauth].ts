import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      // TODO: Select a page or call it directly and delete these forms
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // TODO: User login with Email
        // TODO: User login with Username
        console.log(credentials);
        const user = {
          id: 1,
          name: 'Shahryar',
          email: 'jsmith@example.com',
        };

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      // TODO: how to get Login output like tokens and theire information from api and do not try duplicatly
      token.accessToken = 1;
      token.refreshToken = 1;

      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});
