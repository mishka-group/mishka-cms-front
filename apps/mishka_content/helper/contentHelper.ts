type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
type Header = { [key: string]: string };

/**
 * It takes a router, body, header, and method and returns a promise of type T
 * @param {string} router - The route to the API endpoint.
 * @param {object} body - The body of the request.
 * @param {Header} header - Header - this is a type that is defined in the types.ts file. It's a simple
 * object that contains the authorization token.
 * @param {Method} method - The HTTP method to use.
 * @returns A promise of type T
 */
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


/**
 * It takes an error response object, and returns an object with the response's status, statusText, url,
 * action, message, system, and errors
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


/**
 * It takes a success response object, checks if the response is successful, and if it is, it returns the
 * response data
 * @param {any} response - any - this is the response from the fetch call
 * @returns a promise that resolves to an object with a status property and a data property.
 */
const getConentSuccessResponse = async <T>(response: any): Promise<T> => {
  const successResponse = await response;
  const data = await successResponse.json();
  const mergedStatusData = { ...data, status: 200 };
  return mergedStatusData;
};


/**
 * It creates an object that represents an unhandled error
 * @param {string} router - The URL of the request.
 * @returns An object with the following properties:
 * status: 500
 * statusText: 'Unhandled Error'
 * url: router
 * action: 'system'
 * message: 'Unhandled Error'
 * system: 'content'
 * errors: []
 */
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
