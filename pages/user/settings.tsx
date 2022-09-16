import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import SettingsTemplate from '../../apps/mishka_html/templates/client/user/settings';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';
import { useContext, RefObject, FormEvent, useState, Dispatch, SetStateAction } from 'react';
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
  UserTokens
} from '../../apps/mishka_user/userAuthentication';
import { elementDisability } from '../../apps/extra/helper';
import { useRouter } from 'next/router';

type RH = RefObject<HTMLInputElement>;

const SettingsPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const [userTokensState, setUserTokensState]: [UserTokens[], Dispatch<SetStateAction<any>>]  = useState([]);
  const router = useRouter();

  // TODO: fullname should be sanetize
  const editProfileNameHandler = async (fullname: RH) => {
    elementDisability('changeNameButton', true);

    await clientSideSessionAction(session, router, setAlertState);
    const editedProfile = await editProfile(session?.access_token as string, { full_name: fullname.current?.value.trim() });

    if (editedProfile.status === 200 || editedProfile.status === '200') {
      setAlertState(true, 'Edit Profile: The Full Name change was done successfully. The page will be refreshed soon...', 'success');
      // We decrease access_expires_in time to let clientSideSessionAction function refresh token and get new user info
      // and token to set on server side session
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 3000);
    } else {
      setAlertState(true, 'Edit Profile: ' + (editedProfile.errors!.full_name || editedProfile.message), 'danger');
    }

    elementDisability('changeNameButton', false);
  };

  // TODO: oldPassword newPassword and should be sanetize
  const changePasswordHandler = async (event: FormEvent<HTMLFormElement>, oldPassword: RH, newPassword: RH) => {
    event.preventDefault();

    elementDisability('changeNameButton', true);
    if (oldPassword.current?.value && newPassword.current?.value) {
      await clientSideSessionAction(session, router, setAlertState);
      const changededPassword = await changePassword(
        session?.access_token as string,
        oldPassword.current.value.trim(),
        newPassword.current.value.trim()
      );

      if (changededPassword.status === 200 || changededPassword.status === '200') {
        setAlertState(true, 'Change Password: Your password change was done successfully. The page will be refreshed soon...', 'success');
        // We decrease access_expires_in time to let clientSideSessionAction function refresh token and
        // get new user info and token to set on server side session
        setTimeout(async () => {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }, 3000);
      } else {
        setAlertState(true, 'Change Password: ' + (Object.values(changededPassword.errors!)[0] || changededPassword.message), 'danger');
      }
    } else {
      setAlertState(
        true,
        'Change Password: Both fields of passwords, including the current password and the requested password, must be sent.',
        'danger'
      );
    }
  };

  const showTokensHandler = async () => {
    await clientSideSessionAction(session, router, setAlertState);
    const tokens = await userTokens(session?.access_token as string);
    if (tokens.status === 200 || tokens.status === '200') {
      console.log(tokens.user_tokens_info)
      setUserTokensState(tokens.user_tokens_info)
    }
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
      changePassword={changePasswordHandler}
      showTokens={showTokensHandler}
      deleteToken={deleteTokenHandler}
      deactive={deactiveAccountHandler}
    />
  );
};

export default SettingsPage;
