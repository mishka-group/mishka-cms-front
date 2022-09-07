// import { useSession, signIn, signOut, getSession } from 'next-auth/react';
// const { data: session } = useSession();
import type { NextPage } from 'next';
import LoginTemplate from '../../apps/mishka_html/templates/client/auth/login';
import type { FormEvent, RefObject } from 'react';

const LoginPage: NextPage = () => {
  const loginHandler = (
    event: FormEvent<HTMLFormElement>,
    email: RefObject<HTMLInputElement>,
    password: RefObject<HTMLInputElement>
  ) => {
    event.preventDefault();
    console.log(email.current?.value);
    console.log(password.current?.value);
  };

  return (
    <>
      <LoginTemplate login={loginHandler} />
    </>
  );
};

export default LoginPage;
