import type { NextPage } from 'next';
import LoginTemplate from '../../apps/mishka_html/templates/client/auth/login';
import type { FormEvent, RefObject } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import Link from 'next/link';

// TODO: {:USER_INPUT} => we have 2 input box here, and so we need to sanitize them and prevent from XSS
const LoginPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  // Force the use not see this page because it is just for new users without session
  clientSideSessionAction(session, router).then();

  // If a user wants to login in website can use this Handler, but before logining in the site he/her is checked for having session
  const loginHandler = async (event: FormEvent<HTMLFormElement>, email: RefObject<HTMLInputElement>, password: RefObject<HTMLInputElement>) => {
    event.preventDefault();

    await clientSideSessionAction(session, router);

    if (email.current?.value && password.current?.value) {
      const login = await signIn('credentials', {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });
      console.log(login);
    }
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return (
      <h1 className="text-center">
        You are already logged in ... <Link href="/">Click hear to go to Home</Link>
      </h1>
    );
  }

  // TODO: we need the error component to show an error to user from our state and after showing it should be deleted
  return (
    <>
      <LoginTemplate login={loginHandler} />
    </>
  );
};

export default LoginPage;
