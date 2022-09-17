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

export const loginByUsername = async (username: string, password: string): Promise<LoginOutPut> => {
  const response = await authApiRequestSender<LoginOutPut>('/auth/v1/login', { username: username, password: password }, {}, 'POST');
  return response;
};

export const loginByEmail = async (email: string, password: string): Promise<LoginOutPut> => {
  const response = await authApiRequestSender<LoginOutPut>('/auth/v1/login', { email: email, password: password }, {}, 'POST');
  return response;
};

export const register = async (params: RegisterInput): Promise<AuthNormalOutPut> => {
  const response = await authApiRequestSender<AuthNormalOutPut>('/auth/v1/register', params, {}, 'POST');
  return response;
};

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

export const refreshToken = async (userRefreshToken: string): Promise<LoginOutPut> => {
  const response = await authApiRequestSender<LoginOutPut>(
    '/auth/v1/refresh-token',
    {},
    {
      Authorization: `Bearer ${userRefreshToken}`,
    },
    'POST'
  );
  return response;
};

export const resetPassword = async (email: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>('/auth/v1/reset-password', { email: email }, {}, 'POST');
  return response;
};

export const confirmResetPassword = async (email: string, newPassword: string, code: string): Promise<PublicAuthResponse> => {
  const response = await authApiRequestSender<PublicAuthResponse>(
    '/auth/v1/reset-password',
    { email: email, new_password: newPassword, code: code },
    {},
    'POST'
  );
  return response;
};

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
