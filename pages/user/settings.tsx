import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import SettingsTemplate from '../../apps/mishka_html/templates/client/user/settings';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';
import { useContext, RefObject, FormEvent, useState, Dispatch, SetStateAction, useReducer } from 'react';
import { clientSideSessionAction } from '../../apps/mishka_user/helper/authHelper';
import { ClientAlertState } from '../../apps/mishka_html/components/state/ClientAlertState';
import {
  userTokens,
  deleteTokens,
  sendVerifyEmail,
  confirmVerifyEmail,
  changePassword,
  editProfile,
  sendDeactiveAccount,
  deactiveAccountByCode,
} from '../../apps/mishka_user/userAuthentication';
import { elementDisability } from '../../apps/extra/helper';
import { INITIAL_STATE, userSettingReducer } from '../../apps/mishka_html/components/state/userSettingsReducer';
import { useRouter } from 'next/router';

type RH = RefObject<HTMLInputElement>;

const SettingsPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const [state, dispatch] = useReducer(userSettingReducer, INITIAL_STATE);

  const router = useRouter();

  // TODO: fullname should be sanetize
  const editProfileNameHandler = async (fullname: RH) => {
    elementDisability('changeNameButton', true);
    const editedProfile = await editProfile(session?.access_token as string, { full_name: fullname.current?.value.trim() });

    if (editedProfile.status === 200) {
      setAlertState(true, 'Edit Profile: The Full Name change was done successfully. The page will be refreshed soon...', 'success');
      // We decrease access_expires_in time to let clientSideSessionAction function refresh token and get new user info
      // and token to set on server side session
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else if (editedProfile.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
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

      if (changededPassword.status === 200) {
        setAlertState(true, 'Change Password: Your password change was done successfully. The page will be refreshed soon...', 'success');
        // We decrease access_expires_in time to let clientSideSessionAction function refresh token and
        // get new user info and token to set on server side session
        setTimeout(async () => {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }, 2000);
      } else if (changededPassword.status === 401) {
        setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
        setTimeout(async () => {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }, 2000);
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
    dispatch({ type: 'SET_DEACTIVE_TOGGLE', payload: false });
    dispatch({ type: 'SET_ACTIVE_TOGGLE', payload: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', payload: !state.tokenToggle });
    if (!state.tokenToggle) {
      const tokens = await userTokens(session?.access_token as string);
      if (tokens.status === 200) {
        dispatch({ type: 'SET_USER_TOKENS', payload: tokens.user_tokens_info });
      } else if (tokens.status === 401) {
        setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
        setTimeout(async () => {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }, 2000);
      }
    }
  };

  const deleteTokensHandler = async () => {
    const deletedTokens = await deleteTokens(session?.access_token as string);

    if (deletedTokens.status === 200) {
      setAlertState(true, deletedTokens.message, 'success');
      setTimeout(() => {
        document.querySelector('.alert')?.scrollIntoView();
      }, 300);
    }

    // We decrease access_expires_in time to let clientSideSessionAction function refresh token and get new user info
    // and token to be set on server side session
    setTimeout(async () => {
      await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
    }, 2000);
  };

  const activeAccountHandler = async () => {
    dispatch({ type: 'SET_DEACTIVE_TOGGLE', payload: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', payload: false });
    const activeAccount = await sendVerifyEmail(session?.access_token as string);
    if (activeAccount.status === 200) {
      dispatch({ type: 'SET_TOKEN_TOGGLE', payload: false });
      setAlertState(true, activeAccount.message, 'success');
      dispatch({ type: 'SET_ACTIVE_TOGGLE', payload: !state.activeToggle });
    } else if (activeAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else {
      setAlertState(true, activeAccount.message, 'danger');
    }
    console.log(activeAccount)
  };

  // TODO: it should be validate like code is 6 number length
  const confirmActiveAccountHandler = async (code: RH) => {
    const activeAccount = await confirmVerifyEmail(session?.access_token as string, code.current?.value || '');
    if (activeAccount.status === 200) {
      setAlertState(true, activeAccount.message, 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else if (activeAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else {
      setAlertState(true, activeAccount.message, 'danger');
    }

    dispatch({ type: 'SET_ACTIVE_TOGGLE', payload: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', payload: false });
  };

  const deactiveAccountHandler = async () => {
    dispatch({ type: 'SET_ACTIVE_TOGGLE', payload: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', payload: false });
    const deactiveAccount = await sendDeactiveAccount(session?.access_token as string);
    if (deactiveAccount.status === 200) {
      dispatch({ type: 'SET_TOKEN_TOGGLE', payload: false });
      dispatch({ type: 'SET_ACTIVE_TOGGLE', payload: false });
      dispatch({ type: 'SET_DEACTIVE_TOGGLE', payload: !state.deactiveToggle });
      setAlertState(true, deactiveAccount.message, 'success');
    } else if (deactiveAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else {
      setAlertState(true, deactiveAccount.message, 'danger');
    }
  };

  const confirmDeactiveAccountHandler = async (code: RH) => {
    const deactiveAccount = await deactiveAccountByCode(session?.access_token as string, code.current?.value || '');
    if (deactiveAccount.status === 200) {
      setAlertState(true, deactiveAccount.message, 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else if (deactiveAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, 2000);
    } else {
      setAlertState(true, deactiveAccount.message, 'danger');
    }

    dispatch({ type: 'SET_ACTIVE_TOGGLE', payload: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', payload: false });
  };

  if (!session) {
    return <LoginLoading msg="You must be logged in to see this page." />;
  }

  return (
    <SettingsTemplate
      editProfile={editProfileNameHandler}
      changePassword={changePasswordHandler}
      showTokens={showTokensHandler}
      deleteTokens={deleteTokensHandler}
      deactive={deactiveAccountHandler}
      activeAccount={activeAccountHandler}
      confirmActiveAccount={confirmActiveAccountHandler}
      confirmDeactiveAccount={confirmDeactiveAccountHandler}
      tokenToggle={state.tokenToggle}
      activeToggle={state.activeToggle}
      userTokes={state.userTokensState}
      deactiveToggle={state.deactiveToggle}
    />
  );
};

export default SettingsPage;
