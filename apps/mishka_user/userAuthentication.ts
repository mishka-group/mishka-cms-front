import { authApiRequestSender } from './helper/authHelper';

export interface AuthError {
  status: number | string;
  statusText: string;
  url: string;
  action: string;
  message: string;
  system: string;
  errors: Array<any> | [];
}

export interface LogoutOutPut {
  action: 'logout';
  message: string;
  system: 'user';
  status?: number | string;
}

export interface ResetPasswordOutPut {
  action: 'reset_password';
  message: string;
  system: 'user';
  status?: number | string;
  errors?: any;
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
  action: 'login' | 'register' | 'edit_profile';
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
  errors?: any;
}

type RegisterOutPut = Omit<LoginOutPut, 'auth'>;

type EditProfileOutPut = Omit<LoginOutPut, 'auth'>;

export const loginByUsername = async (username: string, password: string): Promise<AuthError | LoginOutPut> => {
  const data = { username: username, password: password };
  return await authApiRequestSender<LoginOutPut | AuthError>('/auth/v1/login', data, {}, 'POST');
};

export const loginByEmail = async (email: string, password: string): Promise<AuthError | LoginOutPut> => {
  const data = { email: email, password: password };
  const response = await authApiRequestSender<LoginOutPut | AuthError>('/auth/v1/login', data, {}, 'POST');
  return response;
};

export const register = async (params: RegisterInput): Promise<AuthError | RegisterOutPut> => {
  const response = await authApiRequestSender<RegisterOutPut | AuthError>('/auth/v1/register', params, {}, 'POST');
  return response;
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

export const refreshToken = async (userRefreshToken: string): Promise<AuthError | LoginOutPut> => {
  const response = await authApiRequestSender<AuthError | LoginOutPut>(
    '/auth/v1/refresh-token',
    {},
    {
      Authorization: `Bearer ${userRefreshToken}`,
    },
    'POST'
  );
  return response;
};

export const resetPassword = async (email: string): Promise<AuthError | ResetPasswordOutPut> => {
  const response = await authApiRequestSender<ResetPasswordOutPut | AuthError>('/auth/v1/reset-password', { email: email }, {}, 'POST');
  return response;
};

export const confirmResetPassword = async (email: string, newPassword: string, code: string): Promise<AuthError | ResetPasswordOutPut> => {
  const response = await authApiRequestSender<ResetPasswordOutPut | AuthError>(
    '/auth/v1/reset-password',
    { email: email, new_password: newPassword, code: code },
    {},
    'POST'
  );
  return response;
};

export const sendVerifyEmail = (accessToken: string): void => {
  // TODO:
};

export const confirmVerifyEmail = (accessToken: string, code: string): void => {
  // TODO:
};

export const editProfile = async (accessToken: string, params: object): Promise<AuthError | EditProfileOutPut> => {
  const response = await authApiRequestSender<AuthError | EditProfileOutPut>(
    '/auth/v1/edit-profile',
    params,
    {
      Authorization: `Bearer ${accessToken}`,
    },
    'POST'
  );
  return response;
};
