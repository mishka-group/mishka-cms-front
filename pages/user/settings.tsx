import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import SettingsTemplate from '../../apps/mishka_html/templates/client/user/settings';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';
import { useContext, RefObject } from 'react';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
import {
  userTokens,
  deleteToken,
  deleteTokens,
  sendVerifyEmail,
  confirmVerifyEmail,
  sendDeactiveAccount,
  deactiveAccountByCode,
  changePassword,
  editProfile,
} from '../../apps/mishka_user/userAuthentication';
import { useRouter } from 'next/router';

type RH = RefObject<HTMLInputElement>;

const SettingsPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const router = useRouter();

  console.log(session)
  // TODO: fullname should be sanetize
  const editProfileNameHandler = async (fullname: RH) => {
    const btn = document.getElementById('changeNameButton') as HTMLElement;
    (btn as HTMLButtonElement).disabled = true;

    await clientSideSessionAction(session, router, setAlertState);
    const editedProfile = await editProfile(session?.access_token as string, { full_name: fullname.current?.value.trim() });

    if (editedProfile.status === 200 || editedProfile.status === '200') {
      setAlertState(true, 'Edit Profile: The Full Name change was done successfully. The page will be refreshed soon...', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 4000);

    } else {
      setAlertState(true, 'Edit Profile: ' + (editedProfile.errors['full_name'] || editedProfile.message), 'danger');
    }

    (btn as HTMLButtonElement).disabled = false;
  };

  const changePasswordHandler = async () => {
    await clientSideSessionAction(session, router, setAlertState);
  };

  const showTokensHandler = async () => {
    await clientSideSessionAction(session, router, setAlertState);
  };

  const deleteTokenHandler = async () => {
    await clientSideSessionAction(session, router, setAlertState);
  };

  const deactiveAccountHandler = async () => {
    await clientSideSessionAction(session, router, setAlertState);
  };

  const confirmDeactiveAccountHandler = async () => {
    await clientSideSessionAction(session, router, setAlertState);
  };

  if (!session) {
    return <LoginLoading msg="You must be logged in to see this page." />;
  }

  return (
    <SettingsTemplate
      editProfile={editProfileNameHandler}
      showTokens={showTokensHandler}
      deleteToken={deleteTokenHandler}
      changePassword={changePasswordHandler}
      deactive={deactiveAccountHandler}
    />
  );
};

export default SettingsPage;
