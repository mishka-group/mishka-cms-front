import type { NextPage } from 'next';
import LoginTemplate from '../../apps/mishka_html/templates/client/auth/login';
import type { FormEvent, RefObject } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import Link from 'next/link';
import { useContext } from 'react';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  // Force the use not see this page because it is just for new users without session
  clientSideSessionAction(session, router).then();

  // If a user wants to login in website, can use this Handler, but before logining in the site he/her is checked for having session or not?
  const loginHandler = async (event: FormEvent<HTMLFormElement>, email: RefObject<HTMLInputElement>, password: RefObject<HTMLInputElement>) => {
    event.preventDefault();
    const btn = document.getElementById('loginButton') as HTMLElement;
    (btn as HTMLButtonElement).disabled = true;
    // It is an extra preventer and refresh token for unhandled situation
    await clientSideSessionAction(session, router);

    // TODO: in this place we need to sanitize user email and password and prevent from XSS
    if (email.current?.value && password.current?.value) {
      const login = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/auth/login',
        email: email.current.value,
        password: password.current.value,
      });
      // This is the place we should redirect to main page link if login?.ok
      if (login?.ok) {
        router.replace({ pathname: '/' });
        return null;
      }
      if (login && login.error) {
        // it takes the login error message from API
        setAlertState(true, JSON.parse(login.error).message as string, 'warning');
      }
    }

    (btn as HTMLButtonElement).disabled = false;
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return (
      <h1 className="text-center">
        You are already logged in ... <Link href="/">Click hear to back Home</Link>
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
