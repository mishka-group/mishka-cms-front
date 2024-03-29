import type { NextPage } from 'next';
import LoginTemplate from '../../apps/mishka_html/templates/client/auth/login';
import { FormEvent, RefObject } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';
import { elementDisability } from '../../apps/extra/helper';

type RH = RefObject<HTMLInputElement>;

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setAlertState } = useContext(ClientAlertState);

  // If a user wants to login in website, can use this Handler, but before logining in the site he/her is checked for having session or not?
  /**
   * It takes an event, email and password as arguments, and then it calls the signIn function from the
   * API
   * @param event - FormEvent<HTMLFormElement> - this is the event that is triggered when the form is
   * submitted.
   * @param {RH} email - RH, password: RH
   * @param {RH} password - RH - this is the password input reference
   * @returns It is a function that returns a JSX element.
   */
  const loginHandler = async (event: FormEvent<HTMLFormElement>, email: RH, password: RH) => {
    event.preventDefault();

    elementDisability('loginButton', true);

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

    elementDisability('loginButton', false);
  };

  // This function can help us to keep the button disabled until when our user sends all the required fields
  /**
   * It takes two React Hooks as arguments, and if both of them have a value, it will disable the login
   * button
   * @param {RH} email - RH, password: RH
   * @param {RH} password - RH - this is the password input field
   */
  const formHandler = (email: RH, password: RH): void => {
    // TODO: this is the place we should check form validation
    if (email.current?.value && password.current?.value) {
      elementDisability('loginButton', false);
    }
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return <LoginLoading />;
  }

  // TODO: we need the error component to show an error to user from our state and after showing it should be deleted
  return <LoginTemplate login={loginHandler} formChenge={formHandler} />;
};

export default LoginPage;
