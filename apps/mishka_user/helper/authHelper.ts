import { signIn, signOut } from 'next-auth/react';
import type { NextRouter } from 'next/router';
import { PublicAuthResponse, LoginOutPut, refreshToken, logout } from '../userAuthentication';
type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
type Header = { [key: string]: string };

/**
 * It sends a request to the API, and returns a promise that resolves to either an error object or a
 * success object
 * @param {string} router - string - the router of the API endpoint
 * @param {object} body - The body of the request.
 * @param {Header} header - Header - This is the header object that contains the authorization token.
 * @param {Method} method - The HTTP method to use.
 * @returns A promise that resolves to an object of type T.
 */
export const authApiRequestSender = async <T>(router: string, body: object, header: Header, method: Method): Promise<T> => {
  try {
    const request = await fetch(process.env.api_url + router, {
      method: method,
      mode: 'cors',
      headers: { ...header, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      return getAuthError<T>(request);
    } else {
      return getAuthSuccessResponse<T>(request);
    }
  } catch (error) {
    return createAuthUnhandledErrorObject<T>(router) as Promise<T>;
  }
};

/**
 * It takes a response object, and returns an error object
 * @param response - Awaited<any>
 * @returns An object with the following properties:
 *   status: number
 *   statusText: string
 *   url: string
 *   action: string
 *   message: string
 *   system: string
 *   errors: string[]
 */
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

/**
 * It takes a response object, and returns a promise that resolves to an object with a status property
 * @param {any} response - The response object from the fetch call.
 * @returns a promise that resolves to an object with a status property.
 */
const getAuthSuccessResponse = async <T>(response: any): Promise<T> => {
  const successResponse = await response;
  const data = await successResponse.json();
  const mergedStatusData = { ...data, status: 200 };
  return mergedStatusData;
};

/**
 * It creates an object that contains the error information for Unhandled error.
 * @param {string} router - string - the router that the error occurred on
 */
const createAuthUnhandledErrorObject = async <T>(router: string) => {
  // TODO: can be error sender to log server
  const data = {
    status: 500,
    statusText: 'Unhandled Error',
    url: router,
    action: 'system',
    message: 'Unhandled Error',
    system: 'user',
    errors: [],
  };

  return data;
};

/**
 * If the user's access token is expired, but the refresh token is still valid, then refresh the access
 * token. If the refresh token is expired, then log the user out
 * @param {any} session - The session object returned by NextAuth.js
 * @param {NextRouter} router - NextRouter - This is the router object from Next.js.
 * @param {any} setAlertState - This is a function that sets the alert state.
 * @returns The return value is a function that takes in a session, router, and setAlertState.
 */
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

    // TODO: We should fix this part after merging this PR: https://github.com/nextauthjs/next-auth/pull/4744
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

/**
 * It takes a login object and returns a new user basic object which includes user information and token.
 * @param {PublicAuthResponse | LoginOutPut} login - PublicAuthResponse | LoginOutPut
 */
export const getUserBasicInformationAndTokens = (login: PublicAuthResponse | LoginOutPut) => {
  let newuser;
  if (login.status === 200 && 'user_info' in login) {
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

/**
 * If the access token is expired, refresh it. If the refresh token is expired, logout
 * @param {any} credentials - The credentials object that is returned from the login function.
 * @returns an object with the following properties:
 */
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
