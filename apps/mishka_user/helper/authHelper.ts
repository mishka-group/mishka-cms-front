import { signIn, signOut } from 'next-auth/react';
import type { NextRouter } from 'next/router';
import { AuthError, LoginOutPut, LogoutOutPut, refreshToken, logout } from '../userAuthentication';
type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
type Header = { [key: string]: string };

export const authApiRequestSender = <T>(router: string, body: object, header: Header, method: Method) => {
  const request = fetch(process.env.api_url + router, {
    method: method,
    mode: 'cors',
    headers: { ...header, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (!response.ok) {
        return getAuthError<T>(response);
      } else {
        return getAuthSuccessResponse<T>(response);
      }
    })
    .catch((error) => {
      return createAuthUnhandledErrorObject(router);
    });

  return request;
};

const getAuthError = async <T>(response: Awaited<any>): Promise<T> => {
  let error: any = {};
  const errorResponse = await response;
  error = {
    ...error,
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    url: errorResponse.url,
  };
  const data = await errorResponse.json();
  error = {
    ...error,
    action: data.action,
    message: data.message,
    system: data.system,
    errors: data.errors ? data.errors : [],
  };

  return error;
};

const getAuthSuccessResponse = async <T>(response: any) => {
  const successResponse = await response;
  const data: T = await successResponse.json();
  const mergedStatusData = { ...data, status: 200 };
  return mergedStatusData;
};

const createAuthUnhandledErrorObject = (router: string) => {
  // TODO: can be error sender to log server
  return {
    status: 500,
    statusText: 'Unhandled Error',
    url: router,
    action: 'system',
    message: 'Unhandled Error',
    system: 'user',
    errors: [],
  };
};

export const clientSideSessionAction = async (session: any, router: NextRouter, setAlertState: any) => {
  let nowUnixDate = Math.floor(Date.now() / 1000);
  if (session && session.access_expires_in <= nowUnixDate && session.refresh_expires_in >= nowUnixDate) {
    const login = await signIn('credentials', {
      ...session,
      redirect: false,
      email: session.user?.email,
      user: JSON.stringify({
        email: session.user?.email,
        name: session.user?.name,
      }),
    });

    if (login && login.ok) {
      return router.reload();
    }

    if (login && !login.ok) {
      setAlertState(true, JSON.parse(login.error as string).message, 'danger');
      await signOut({ redirect: false });
      return router.replace({
        pathname: '/auth/login',
      });
    }
  }

  if (session && session.refresh_expires_in <= nowUnixDate) {
    setAlertState(true, 'Please log in again!', 'danger');
    await signOut({ redirect: false });
    return router.replace({
      pathname: '/auth/login',
    });
  }
};

export const getUserBasicInformationAndTokens = (login: AuthError | LoginOutPut | LogoutOutPut) => {
  let newuser;
  if ((login.status === 200 || login.status === '200') && 'user_info' in login) {
    newuser = {
      email: login.user_info.email,
      name: login.user_info.full_name,
      token: {
        access_token: login.auth.access_token,
        refresh_token: login.auth.refresh_token,
        refresh_expires_in: login.auth.refresh_expires_in,
        access_expires_in: login.auth.access_expires_in,
      },
      user: {
        email: login.user_info.email,
        name: login.user_info.full_name,
      },
    };

    return newuser;
  }

  throw new Error(JSON.stringify(login));
};

export const checkTokenToRefresh = async (credentials: any) => {
  let nowUnixDate = Math.floor(Date.now() / 1000);
  if (credentials.access_expires_in <= nowUnixDate && credentials.refresh_expires_in >= nowUnixDate) {
    const refresh = await refreshToken(credentials.refresh_token);
    if (refresh.status !== 200) {
      throw new Error(JSON.stringify(refresh));
    } else {
      return getUserBasicInformationAndTokens(refresh);
    }
  } else if (credentials.refresh_expires_in <= nowUnixDate) {
    await logout(credentials.refresh_token);
    throw new Error(JSON.stringify({ status: 'signOut' }));
  } else {
    const user = JSON.parse(credentials.user);
    return {
      email: user.email,
      name: user.name,
      token: {
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
        refresh_expires_in: credentials.refresh_expires_in,
        access_expires_in: credentials.access_expires_in,
      },
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
};
