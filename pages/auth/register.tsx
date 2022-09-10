import type { NextPage } from 'next';
import type { FormEvent, RefObject } from 'react';
import RegisterTemplate from '../../apps/mishka_html/templates/client/auth/register';

const RegisterPage: NextPage = () => {
  const RegisterHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };


  return (
    <>
      <RegisterTemplate register={RegisterHandler} />
    </>
  );
}

export default RegisterPage;