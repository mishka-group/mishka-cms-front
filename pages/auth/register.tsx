import type { NextPage } from 'next';
import { FormEvent, RefObject, useContext, useState } from 'react';
import RegisterTemplate from '../../apps/mishka_html/templates/client/auth/register';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { register } from '../../apps/mishka_user/userAuthentication';
import Link from 'next/link';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';

type RH = RefObject<HTMLInputElement>;

const RegisterPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const [formError, setFormError] = useState();

  const router = useRouter();

  // Force the use not see this page because it is just for new users without session
  clientSideSessionAction(session, router).then();

  // If a user wants to register in website, can use this Handler, but before Registering in the site he/her is checked for having session or not?
  const RegisterHandler = async (event: FormEvent<HTMLFormElement>, fullName: RH, username: RH, email: RH, password: RH) => {
    event.preventDefault();
    // It is an extra preventer and refresh token for unhandled situation
    await clientSideSessionAction(session, router);

    // Review essential data
    if (fullName.current?.value && username.current?.value && email.current?.value) {
      const registerData = {
        full_name: fullName.current?.value.trim(),
        username: username.current?.value.trim(),
        email: email.current?.value.trim(),
      };
      const registerOutput = await register(password.current?.value ? { ...registerData, password: password.current?.value } : registerData);

      // After getting 200 status we can redirect the user to login page and show a success alert
      if ((registerOutput.status === 200 || registerOutput.status === '200') && 'user_info' in registerOutput) {
        // reset form for unhandle situation
        fullName.current.value = '';
        fullName.current.value = '';
        username.current.value = '';
        email.current.value = '';

        setAlertState(
          true,
          "Your registration was accepted. To confirm the user account, please go to your email and send the email activation code. It's worth noting that the activation code is only good for 5 minutes.",
          'info'
        );
      } else {
        // TODO: return an error and let user all the fild essential except password
        // TODO: Template side should have validation ui to let user Which field should be filled
        // Show the error system got to user and show a warning alert to fix the problems
        // We need to pass errors for validation forms in template part
        setFormError(registerOutput.errors);

        // It is a global error to show user and let him/her focus on the error they get
        setAlertState(true, 'Unfortunately, there is an error in sending the data. Please try again after solving the problem.', 'warning');

        // Make a setTimeout to scroll, because before that we have no `.alert` class to scroll, it can be an animation
        setTimeout(() => {
          document.querySelector('.alert')?.scrollIntoView();
        }, 300);
      }
    } else {
      // It is an extra error showing, because in template part user should skip the validation and this file condition for essential parameters
      // It can't be shown in normal data sending
      setAlertState(true, 'All required fields must be submitted.', 'warning');
    }
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return (
      <h1 className="text-center">
        You are already logged in ... <Link href="/">Click hear to back Home</Link>
      </h1>
    );
  }

  return (
    <>
      <RegisterTemplate register={RegisterHandler} formError={formError} />
    </>
  );
};

export default RegisterPage;
