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
  };
};
