import { authApiRequestSender } from './helper/authHelper';

type Token = string;

export interface PublicAuthResponse {
  status?: number | string;
  statusText?: string;
  url?: string;
  action: string;
  message: string;
  system: string;
  errors?: { [key: string]: any };
}

export interface LoginOutPut extends PublicAuthResponse {
  auth: {
    access_expires_in: number;
    access_token: Token;
    access_token_type: 'access';
    refresh_expires_in: number;
    refresh_token: Token;
    refresh_token_type: 'refresh';
  };
  user_info: {
    email: string;
    full_name: string;
    id: string;
    status: string;
    username: string;
  };
}

type RegisterInput = {
  full_name: string;
  username: string;
  email: string;
  password?: string;
};

type AuthNormalOutPut = Omit<LoginOutPut, 'auth'>;

export interface UserTokens extends AuthNormalOutPut {
  user_tokens_info:
    | Array<{
        access_expires_in: number;
        create_time: number;
        last_used: number;
        os: string;
        type: 'refresh' | 'access';
      }>
    | never[];
}

/**
 * It sends a POST request to the `/auth/v1/user-tokens` endpoint with the given access token, and
 * returns the response
 * @param {string} accessToken - The access token you received from the login call.
 * @returns UserTokens
 */
export const userTokens = async (accessToken: string): Promise<UserTokens> => {
  const response = await authApiRequestSender<UserTokens>(
    '/auth/v1/user-tokens',
    {},
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/login` endpoint with the username and password as the body,
 * and returns the response
 * @param {string} username - string, password: string
 * @param {string} password - string
 * @returns LoginOutPut
 */
export const loginByUsername = async (username: string, password: string): Promise<LoginOutPut> => {
  const response = await authApiRequestSender<LoginOutPut>('/auth/v1/login', { username: username, password: password }, {}, 'POST');
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/login` endpoint with the email and password as the body,
 * and returns the response
 * @param {string} email - string, password: string
 * @param {string} password - string
 * @returns LoginOutPut
 */
export const loginByEmail = async (email: string, password: string): Promise<LoginOutPut> => {
  const response = await authApiRequestSender<LoginOutPut>('/auth/v1/login', { email: email, password: password }, {}, 'POST');
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/register` endpoint with the params as the body and returns
 * the response
 * @param {RegisterInput} params - RegisterInput
 * @returns AuthNormalOutPut
 */
export const register = async (params: RegisterInput): Promise<AuthNormalOutPut> => {
  const response = await authApiRequestSender<AuthNormalOutPut>('/auth/v1/register', params, {}, 'POST');
  return response;
};

/**
 * It sends a request to the `/auth/v1/change-password` endpoint to change the password of the user
 * @param {string} accessToken - The access token that you get from the login API.
 * @param {string} curentPassword - The current password of the user.
 * @param {string} newPassword - string
 * @returns AuthNormalOutPut
 */
export const changePassword = async (accessToken: string, curentPassword: string, newPassword: string): Promise<AuthNormalOutPut> => {
  const response = await authApiRequestSender<AuthNormalOutPut>(
    '/auth/v1/change-password',
    { curent_password: curentPassword, new_password: newPassword },
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a request to the server to deactivate the user's account
 * @param {string} userToken - The user's token.
 * @returns PublicAuthResponse
 */
export const sendDeactiveAccount = async (userToken: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/deactive-account',
    {},
    {
      Authorization: `Bearer ${userToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/deactive-account` endpoint with the user's token and the code
 * they entered form their email.
 * @param {string} userToken - The user's token.
 * @param {string} code - The code that was sent to the user's email address.
 * @returns PublicAuthResponse
 */
export const deactiveAccountByCode = async (userToken: string, code: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/deactive-account',
    { code: code },
    {
      Authorization: `Bearer ${userToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a request to the `/auth/v1/delete-tokens` endpoint with the user's token to delete the user's tokens
 * @param {string} userToken - The user's token.
 * @returns PublicAuthResponse
 */
export const deleteTokens = async (userToken: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/delete-tokens',
    {},
    {
      Authorization: `Bearer ${userToken}`,
    },
    'POST'
  );
  return response;
};

export const getTokenExpireTime = (accessToken: string, token: string): void => {
  // TODO:
};

/**
 * It sends a POST request to the `/auth/v1/logout` endpoint with the refresh token in the
 * Authorization header
 * @param {string} refreshToken - The refresh token that was returned from the login request.
 * @returns PublicAuthResponse
 */
export const logout = async (refreshToken: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/logout',
    {},
    {
      Authorization: `Bearer ${refreshToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/refresh-token` endpoint with the refresh token as the
 * Authorization header
 * @param {string} refreshToken - The refresh token that was returned from the login request.
 * @returns LoginOutPut
 */
export const refreshToken = async (refreshToken: string): Promise<LoginOutPut> => {
  const response = await authApiRequestSender<LoginOutPut>(
    '/auth/v1/refresh-token',
    {},
    {
      Authorization: `Bearer ${refreshToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/reset-password` endpoint with the email address provided as
 * the body of the request
 * @param {string} email - string - The email address of the user who wants to reset their password.
 * @returns PublicAuthResponse
 */
export const resetPassword = async (email: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>('/auth/v1/reset-password', { email: email }, {}, 'POST');
  return response;
};

/**
 * It sends a request to the `/auth/v1/reset-password` endpoint with (email, newPassword, code) to confirm a password reset
 * @param {string} email - The email address of the user who is resetting their password.
 * @param {string} newPassword - The new password that the user wants to set.
 * @param {string} code - The code that was sent to the user's email address.
 * @returns PublicAuthResponse
 */
export const confirmResetPassword = async (email: string, newPassword: string, code: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/reset-password',
    { email: email, new_password: newPassword, code: code },
    {},
    'POST'
  );
  return response;
};

/**
 * It sends a request to the `/auth/v1/rverify-email` endpoint to send a verification email to the user
 * @param {string} accessToken - The access token that was returned from the login request.
 * @returns PublicAuthResponse
 */
export const sendVerifyEmail = async (accessToken: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/verify-email',
    {},
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/verify-email` endpoint with the `code` and `Authorization`
 * header to confirm user's email.
 * @param {string} accessToken - The access token you received from the previous step.
 * @param {string} code - The code you received in the email
 * @returns PublicAuthResponse
 */
export const confirmVerifyEmail = async (accessToken: string, code: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/verify-email',
    { code: code },
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};

/**
 * It sends a POST request to the `/auth/v1/edit-profile` endpoint with the given `params` and
 * `accessToken` as the `Authorization` header. It edites user profile like full name.
 * @param {string} accessToken - The access token that you get from the login API.
 * @param {object} params - object
 * @returns AuthNormalOutPut
 */
export const editProfile = async (accessToken: string, params: object): Promise<AuthNormalOutPut> => {
  const response = await authApiRequestSender<AuthNormalOutPut>(
    '/auth/v1/edit-profile',
    params,
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};
