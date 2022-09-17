import type { NextPage } from 'next';
import { FormEvent, RefObject, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ForgetPasswordTemplate from '../../../apps/mishka_html/templates/client/auth/forgetPassword';
import LoginLoading from '../../../apps/mishka_html/UIs/LoginLoading';
import { clientSideSessionAction } from '../../../apps/mishka_user/helper/authHelper';
import { ClientAlertState } from '../../../apps/mishka_html/components/state/ClientAlertState';
import { resetPassword, confirmResetPassword } from '../../../apps/mishka_user/userAuthentication';
import { elementDisability } from '../../../apps/extra/helper';

type RH = RefObject<HTMLInputElement>;
type FH = FormEvent<HTMLFormElement>;

const ForgetPasswordPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const [confirmCodeStatus, setConfirmCodeStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const router = useRouter();

  const ForgetPasswordHandler = async (event: FH, email: RH) => {
    event.preventDefault();

    elementDisability('resetButton', true)

    // It is an extra preventer and refresh token for unhandled situation
    clientSideSessionAction(session, router, setAlertState);

    // TODO: should be santize email input
    if (email.current?.value) {
      const userEmail = email.current.value.trim();
      const resetOutput = await resetPassword(userEmail);
      if (resetOutput.status === 200) {
        setAlertState(true, resetOutput.message, 'info');
        setConfirmCodeStatus(true);
        setUserEmail(userEmail);
      }
    }

    elementDisability('resetButton', false)
  };

  const confirmForgetPasswordHandler = async (event: FH, newPassword: RH, code: RH) => {
    event.preventDefault();

    elementDisability('resetButton', true)

    // TODO: should be santize email input
    // TODO: This place need captcha code
    if (userEmail && newPassword.current?.value && code.current?.value) {
      const confirmResetOutput = await confirmResetPassword(userEmail, newPassword.current?.value.trim(), code.current?.value.trim());

      if (confirmResetOutput.status === 200) {
        setAlertState(true, confirmResetOutput.message, 'success');
        setConfirmCodeStatus(false);
        setUserEmail('userEmail');
        return router.replace({
          pathname: '/auth/login',
        });
      }

      if (confirmResetOutput && confirmResetOutput.errors) {
        setAlertState(true, confirmResetOutput.message as string, 'danger');
      }
    }

    elementDisability('resetButton', false)
  };

  const backToResetPassword = () => {
    setConfirmCodeStatus(false);
  };

  // It is an extra check to prevent user not to see this page
  if (session) {
    return <LoginLoading />;
  }

  return (
    <>
      <ForgetPasswordTemplate
        reset={ForgetPasswordHandler}
        confirmReset={confirmForgetPasswordHandler}
        whichForm={confirmCodeStatus}
        back={backToResetPassword}
      />
    </>
  );
};

export default ForgetPasswordPage;
