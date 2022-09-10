import type { NextPage } from 'next';
import type { FormEvent, RefObject } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ForgetPasswordTemplate from '../../../apps/mishka_html/templates/client/auth/forgetPassword';

const ForgetPasswordPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const ForgetPasswordHandler = async (event: FormEvent<HTMLFormElement>, email: RefObject<HTMLInputElement>) => {
    event.preventDefault(); 
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return (
      <h1 className="text-center">
        You are already logged in ... <Link href="/">Click hear to go to Home</Link>
      </h1>
    );
  }

  return (
    <>
      <ForgetPasswordTemplate reset={ForgetPasswordHandler} />
    </>
  );
};

export default ForgetPasswordPage;
