import type { NextPage } from 'next';
import LoginTemplate from '../../apps/mishka_html/templates/client/auth/login';
import { FormEvent, RefObject, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { clientSideSessionAction, testAction } from '../../apps/mishka_user/helper/authHelper';
import { useContext } from 'react';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';

type RH = RefObject<HTMLInputElement>;

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  useEffect(() => {
    // Force the use not see this page because it is just for new users without session
    return () => {
      clientSideSessionAction(session, router, setAlertState);
    }
  }, [session, router])


  // If a user wants to login in website, can use this Handler, but before logining in the site he/her is checked for having session or not?
  const loginHandler = async (event: FormEvent<HTMLFormElement>, email: RH, password: RH) => {
    event.preventDefault();
    const btn = document.getElementById('loginButton') as HTMLElement;
    (btn as HTMLButtonElement).disabled = true;
    // It is an extra preventer and refresh token for unhandled situation
    // testAction(router, setAlertState)
    clientSideSessionAction(session, router, setAlertState);

    // TODO: in this place we need to sanitize user email and password and prevent from XSS
    if (email.current?.value && password.current?.value) {
      const login = await signIn('credentials', {
        redirect: false,
        email: email.current.value,
        password: password.current.value,
      });
      // This is the place we should redirect to main page link if login?.ok
      if (login?.ok) {
        // it can help us to skip initial props error for session
        setAlertState(true, 'You have successfully entered the website', 'success');
        return router.replace({
          pathname: '/',
        });
      }
      if (login && login.error) {
        // it takes the login error message from API
        setAlertState(true, JSON.parse(login.error).message as string, 'warning');
      }
    }

    (btn as HTMLButtonElement).disabled = false;
  };

  // This function can help us to keep the button disabled until when our user sends all the required fields
  const formHandler = (email: RH, password: RH): void => {
    // TODO: this is the place we should check form validation
    const btn = document.getElementById('loginButton') as HTMLElement;
    if (email.current?.value && password.current?.value) {
      (btn as HTMLButtonElement).disabled = false;
    }
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return <LoginLoading />;
  }

  // TODO: we need the error component to show an error to user from our state and after showing it should be deleted
  return (
    <>
      <LoginTemplate login={loginHandler} formChenge={formHandler} />
    </>
  );
};

export default LoginPage;
