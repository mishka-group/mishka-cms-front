type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
type Header = { [key: string]: string };

export const contentApiRequestSender = async <T>(router: string, body: object, header: Header, method: Method): Promise<T> => {
  try {
    const request = await fetch(process.env.api_url + router, {
      method: method,
      mode: 'cors',
      headers: { ...header, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      return getcontentError<T>(request);
    } else {
      return getConentSuccessResponse<T>(request);
    }
  } catch (error) {
    return createConentUnhandledErrorObject<T>(router) as Promise<T>;
  }
};

const getcontentError = async <T>(response: Awaited<any>): Promise<T> => {
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


const getConentSuccessResponse = async <T>(response: any): Promise<T> => {
  const successResponse = await response;
  const data = await successResponse.json();
  const mergedStatusData = { ...data, status: 200 };
  return mergedStatusData;
};


const createConentUnhandledErrorObject = async <T>(router: string) => {
  // TODO: can be error sender to log server
  const data = {
    status: 500,
    statusText: 'Unhandled Error',
    url: router,
    action: 'system',
    message: 'Unhandled Error',
    system: 'content',
    errors: [],
  };

  return data;
};
