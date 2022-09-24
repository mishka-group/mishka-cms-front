import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import SettingsTemplate from '../../apps/mishka_html/templates/client/user/settings';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';
import { useContext, RefObject, FormEvent, Dispatch, useReducer } from 'react';
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
import { INITIAL_STATE, userSettingReducer, UserSettingTypes } from '../../apps/mishka_html/components/state/userSettingsReducer';
import { useRouter } from 'next/router';

type RH = RefObject<HTMLInputElement>;

const TIMEOUTTIME = 2000;

const SettingsPage: NextPage = () => {
  const { data: session, status } = useSession();
  const { setAlertState } = useContext(ClientAlertState);
  const [state, dispatch]: [UserSettingTypes, Dispatch<any>] = useReducer(userSettingReducer, INITIAL_STATE);

  const router = useRouter();

  // TODO: fullname should be sanetize
  /**
   * It's a function that takes a React Hook as an argument and returns a function that takes a string
   * as an argument. It allows you to change your profile
   * @param {RH} fullname - RH - This is the React Hook that holds the user full name value of the input field.
   */
  const editProfileNameHandler = async (fullname: RH) => {
    elementDisability('changeNameButton', true);
    const editedProfile = await editProfile(session?.access_token as string, { full_name: fullname.current?.value.trim() });

    if (editedProfile.status === 200) {
      setAlertState(true, 'Edit Profile: The Full Name change was done successfully. The page will be refreshed soon...', 'success');
      // We decrease access_expires_in time to let clientSideSessionAction function refresh token and get new user info
      // and token to set on server side session
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else if (editedProfile.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else {
      setAlertState(true, 'Edit Profile: ' + (editedProfile.errors!.full_name || editedProfile.message), 'danger');
    }

    elementDisability('changeNameButton', false);
  };

  // TODO: oldPassword newPassword and should be sanetize
  /**
   * It changes the user's password
   * @param event - FormEvent<HTMLFormElement>
   * @param {RH} oldPassword - The current password of the user.
   * @param {RH} newPassword - RH - This is the new password that the user wants to change to.
   */
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
        }, TIMEOUTTIME);
      } else if (changededPassword.status === 401) {
        setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
        setTimeout(async () => {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }, TIMEOUTTIME);
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

  /**
   * It sets the state of the tokenToggle to the opposite of what it currently is, and if the tokenToggle
   * is false, it fetches the user's tokens and sets the state of the userTokens to the response
   */
  const showTokensHandler = async () => {
    dispatch({ type: 'SET_DEACTIVE_TOGGLE', status: false });
    dispatch({ type: 'SET_ACTIVE_TOGGLE', status: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', status: !state.tokenToggle });
    if (!state.tokenToggle) {
      const tokens = await userTokens(session?.access_token as string);
      if (tokens.status === 200) {
        dispatch({ type: 'SET_USER_TOKENS', payload: tokens.user_tokens_info });
      } else if (tokens.status === 401) {
        setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
        setTimeout(async () => {
          await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
        }, TIMEOUTTIME);
      }
    }
  };

  /**
   * We delete the tokens from the server, then we decrease the access_expires_in time to let
   * clientSideSessionAction function refresh token and get new user info and token to be set on server
   * side session
   */
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
    }, TIMEOUTTIME);
  };

  /**
   * A function that is used to activate a user account.
   */
  const activeAccountHandler = async () => {
    dispatch({ type: 'SET_DEACTIVE_TOGGLE', status: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', status: false });
    const activeAccount = await sendVerifyEmail(session?.access_token as string);
    if (activeAccount.status === 200) {
      dispatch({ type: 'SET_TOKEN_TOGGLE', status: false });
      setAlertState(true, activeAccount.message, 'success');
      dispatch({ type: 'SET_ACTIVE_TOGGLE', status: !state.activeToggle });
    } else if (activeAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else {
      setAlertState(true, activeAccount.message, 'danger');
    }
  };

  // TODO: it should be validate like code is 6 number length
  /**
   * It takes a code from the user, sends it to the server, and if the server returns a 200 status, it
   * sets the alert state to success, and if the server returns a 401 status, it sets the alert state to
   * success, and if the server returns any other status, it sets the alert state to danger
   * @param {RH} code - The code that was sent to the user's email address
   */
  const confirmActiveAccountHandler = async (code: RH) => {
    const activeAccount = await confirmVerifyEmail(session?.access_token as string, code.current?.value || '');
    if (activeAccount.status === 200) {
      setAlertState(true, activeAccount.message, 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else if (activeAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else {
      setAlertState(true, activeAccount.message, 'danger');
    }

    dispatch({ type: 'SET_ACTIVE_TOGGLE', status: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', status: false });
  };

  /**
   * It deactivates the user's account
   */
  const deactiveAccountHandler = async () => {
    dispatch({ type: 'SET_ACTIVE_TOGGLE', status: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', status: false });
    const deactiveAccount = await sendDeactiveAccount(session?.access_token as string);
    if (deactiveAccount.status === 200) {
      dispatch({ type: 'SET_TOKEN_TOGGLE', status: false });
      dispatch({ type: 'SET_ACTIVE_TOGGLE', status: false });
      dispatch({ type: 'SET_DEACTIVE_TOGGLE', status: !state.deactiveToggle });
      setAlertState(true, deactiveAccount.message, 'success');
    } else if (deactiveAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else {
      setAlertState(true, deactiveAccount.message, 'danger');
    }
  };

  /**
   * It confirms the deactivation of the user account
   * @param {RH} code - RH - This is the code that is sent to the user's email address.
   */
  const confirmDeactiveAccountHandler = async (code: RH) => {
    const deactiveAccount = await deactiveAccountByCode(session?.access_token as string, code.current?.value || '');
    if (deactiveAccount.status === 200) {
      setAlertState(true, deactiveAccount.message, 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else if (deactiveAccount.status === 401) {
      setAlertState(true, 'Your user session has expired. This page will be refreshed soon. Please redo your request if not done', 'success');
      setTimeout(async () => {
        await clientSideSessionAction({ ...session, access_expires_in: Math.floor(Date.now() / 1000) - 10 }, router, setAlertState);
      }, TIMEOUTTIME);
    } else {
      setAlertState(true, deactiveAccount.message, 'danger');
    }

    dispatch({ type: 'SET_ACTIVE_TOGGLE', status: false });
    dispatch({ type: 'SET_TOKEN_TOGGLE', status: false });
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
