type Method = 'POST' | 'GET' | 'DELETE' | 'PUT';
type Header = { [key: string]: string };

export const apiRequestSender = async (
  router: string,
  body: object,
  header: Header[],
  method: Method
) => {
  // TODO: get ApiURL from ENV, it is work here or just inside nextPages?
  // TODO: it should be await or promis to get error and status
  // TODO: what it should return and retun type
  // TODO: error handling based on HTTP status code and getting it's message
  await fetch(process.env.api_url + router, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
