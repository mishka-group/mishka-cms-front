// import { useSession, signIn, signOut, getSession } from 'next-auth/react';
// const { data: session } = useSession();
import type { NextPage } from 'next';
import LoginTemplates from '../../apps/mishka_html/templates/client/auth/login';

const LoginPage: NextPage = () => {
  return (
    <>
      <LoginTemplates />
    </>
  );
};

export default LoginPage;
