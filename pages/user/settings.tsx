import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
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

  // fullname should be sanetize
  const editProfileNameHandler = async (fullname: RH) => {
    await clientSideSessionAction(session, router, setAlertState);
    const editedProfile = await editProfile(session?.access_token as string, { fullname: fullname.current?.value.trim() });
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
      showTokens={showTokensHandler}
      deleteToken={deleteTokenHandler}
      editProfile={editProfileNameHandler}
      changePassword={changePasswordHandler}
      deactive={deactiveAccountHandler}
    />
  );
};

export default SettingsPage;
