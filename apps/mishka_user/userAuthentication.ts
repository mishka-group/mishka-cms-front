import { authApiRequestSender } from '../extra/helper';

interface AuthError {
  status: number | string;
  statusText: string;
  url: string;
  action: string;
  message: string;
  system: string;
}

type RegisterInput = {
  full_name: string;
  username: string;
  email: string;
  password?: string;
};

export const loginByUsername = async (
  username: string,
  password: string
): Promise<AuthError | any> => {
  const data = { username: username, password: password };
  const response = await authApiRequestSender(
    '/auth/v1/login',
    data,
    {},
    'POST'
  );
  return response;
};

export const loginByEmail = async (email: string, password: string) => {
  const data = { email: email, password: password };
  const response = await authApiRequestSender(
    '/auth/v1/login',
    data,
    {},
    'POST'
  );
  return response;
};

export const register = (params: RegisterInput): void => {
  // TODO:
};

export const changePassword = (
  curentPassword: string,
  newPassword: string
): void => {
  // TODO:
};

export const sendDeactiveAccount = (userToken: string): void => {
  // TODO:
};

export const deactiveAccountByCode = (
  userToken: string,
  code: string
): void => {
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

export const getTokenExpireTime = (
  accessToken: string,
  token: string
): void => {
  // TODO:
};

export const logout = (token: string): void => {
  // TODO:
};

export const refreshToken = (refreshToken: string): void => {
  // TODO:
};

export const resetPassword = (email: string, new_password: string): void => {
  // TODO:
};

export const confirmResetPassword = (
  email: string,
  new_password: string,
  code: string
): void => {
  // TODO:
};

export const sendVerifyEmail = (accessToken: string): void => {
  // TODO:
};

export const confirmVerifyEmail = (accessToken: string, code: string): void => {
  // TODO:
};
