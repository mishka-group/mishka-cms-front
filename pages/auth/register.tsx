import type { NextPage } from 'next';
import type { FormEvent, RefObject } from 'react';
import RegisterTemplate from '../../apps/mishka_html/templates/client/auth/register';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { register } from '../../apps/mishka_user/userAuthentication';

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
      const registerData = {full_name: fullName.current?.value, username: username.current?.value, email: email.current?.value}
      const registerOutput = await register(password.current?.value ? {...registerData, password: email.current?.value} : registerData)

      if ((registerOutput.status === 200 || registerOutput.status === '200') && 'user_info' in registerOutput) {

      } else {

      }
    } else {
      // TODO: return an error and let user all the fild essential except password
      // TODO: Template side should have validation ui to let user Which field should be filled
    }
  };

  return (
    <>
      <RegisterTemplate register={RegisterHandler} />
    </>
  );
};

export default RegisterPage;
