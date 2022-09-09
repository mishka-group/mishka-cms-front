// import { useSession, signIn, signOut, getSession } from 'next-auth/react';
// const { data: session } = useSession();
import type { NextPage } from 'next';
import LoginTemplate from '../../apps/mishka_html/templates/client/auth/login';
import type { FormEvent, RefObject } from 'react';
import { signIn } from 'next-auth/react';

// TODO: {:USER_INPUT} => we have 2 input box here, and so we need to sanitize them and prevent from XSS
const LoginPage: NextPage = () => {
  const loginHandler = async (event: FormEvent<HTMLFormElement>, email: RefObject<HTMLInputElement>, password: RefObject<HTMLInputElement>) => {
    event.preventDefault();
    if (email.current?.value && password.current?.value) {
      const login = await signIn('credentials', {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });

      console.log(login);
    }
  };

  return (
    <>
      <LoginTemplate login={loginHandler} />
    </>
  );
};

export default LoginPage;
