import type { NextPage } from 'next';
import type { FormEvent, RefObject } from 'react';
import RegisterTemplate from '../../apps/mishka_html/templates/client/auth/register';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { register } from '../../apps/mishka_user/userAuthentication';
import Link from 'next/link';

type RH = RefObject<HTMLInputElement>;

const RegisterPage: NextPage = () => {
  const { data: session, status } = useSession();
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
        fullName.current.value = '';
        fullName.current.value = '';
        username.current.value = '';
        email.current.value = '';

        // TODO: should save the message on error state
        router.push({ pathname: '/auth/login' });
      } else {
        // Show the error system got to user and show a warning alert to fix the problems
      }
    } else {
      // TODO: return an error and let user all the fild essential except password
      // TODO: Template side should have validation ui to let user Which field should be filled
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
      <RegisterTemplate register={RegisterHandler} />
    </>
  );
};

export default RegisterPage;
