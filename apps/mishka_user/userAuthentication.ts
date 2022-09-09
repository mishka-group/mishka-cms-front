import { authApiRequestSender } from './helper/authHelper';

export interface AuthError {
  status: number | string;
  statusText: string;
  url: string;
  action: string;
  message: string;
  system: string;
}

export interface LogoutOutPut {
  action: 'logout';
  message: string;
  system: 'user';
  status?: number | string;
}

type RegisterInput = {
  full_name: string;
  username: string;
  email: string;
  password?: string;
};

type Token = string;

export interface LoginOutPut {
  status: string | number;
  action: 'login';
  auth: {
    access_expires_in: number;
    access_token: Token;
    access_token_type: 'access';
    refresh_expires_in: number;
    refresh_token: Token;
    refresh_token_type: 'refresh';
  };
  message: string;
  system: 'user';
  user_info: {
    email: string;
    full_name: string;
    id: string;
    status: string;
    username: string;
  };
};

export const loginByUsername = async (username: string, password: string): Promise<AuthError | LoginOutPut> => {
  const data = { username: username, password: password };
  return await authApiRequestSender<LoginOutPut | AuthError>('/auth/v1/login', data, {}, 'POST');
};

export const loginByEmail = async (email: string, password: string): Promise<AuthError | LoginOutPut> => {
  const data = { email: email, password: password };
  const response = await authApiRequestSender<LoginOutPut | AuthError>('/auth/v1/login', data, {}, 'POST');
  return response;
};

export const register = (params: RegisterInput): void => {
  // TODO:
};

export const changePassword = (curentPassword: string, newPassword: string): void => {
  // TODO:
};

export const sendDeactiveAccount = (userToken: string): void => {
  // TODO:
};

export const deactiveAccountByCode = (userToken: string, code: string): void => {
  // TODO:
};

export const userTokens = (accessToken: string): void => {
  // TODO:
};

export const deleteToken = (userToken: string, token: string): void => {
  // TODO:
};

export const deleteTokens = (userRefreshToken: string): void => {
  // TODO:
};

export const getTokenExpireTime = (accessToken: string, token: string): void => {
  // TODO:
};

export const logout = async (refreshToken: string): Promise<AuthError | LogoutOutPut> => {
  const data = {};
  const response = await authApiRequestSender<LogoutOutPut>(
    '/auth/v1/logout',
    data,
    {
      Authorization: `Bearer ${refreshToken}`,
    },
    'POST'
  );
  return response;
};

export const refreshToken = async (refreshToken: string): Promise<AuthError | LoginOutPut> => {
  const data = {};
  const response = await authApiRequestSender<AuthError | LoginOutPut>(
    '/auth/v1/refresh-token',
    data,
    {
      Authorization: `Bearer ${refreshToken}`,
    },
    'POST'
  );
  return response;
};

export const resetPassword = (email: string, new_password: string): void => {
  // TODO:
};

export const confirmResetPassword = (email: string, new_password: string, code: string): void => {
  // TODO:
};

export const sendVerifyEmail = (accessToken: string): void => {
  // TODO:
};

export const confirmVerifyEmail = (accessToken: string, code: string): void => {
  // TODO:
};
