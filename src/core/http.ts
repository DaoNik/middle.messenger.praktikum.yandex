const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

type HttpDataT = Record<string, any>;

interface IHttpOptions {
  data?: HttpDataT;
  headers?: Record<string, string>;
  timeout?: number;
  method?: string;
}

function queryStringify(data: HttpDataT) {
  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.keys(data).reduce((result, key, index, keys) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  get<T>(
    url: string,
    options: IHttpOptions = {},
    withCredentials?: boolean
  ): Promise<T> {
    if (options.data && Object.keys(options.data).length > 0) {
      url += queryStringify(options.data);
    }

    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.GET,
        headers: { Accept: 'application/json', ...options.headers },
      },
      options.timeout,
      withCredentials
    );
  }

  post<T>(
    url: string,
    options: IHttpOptions = {},
    withCredentials?: boolean
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.POST,
        headers: { 'Content-Type': 'application/json', ...options.headers },
      },
      options.timeout,
      withCredentials
    );
  }

  put<T>(
    url: string,
    options: IHttpOptions = {},
    withCredentials?: boolean
  ): Promise<T> {
    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.PUT,
        headers: { 'Content-Type': 'application/json', ...options.headers },
      },
      options.timeout,
      withCredentials
    );
  }

  patch<T>(
    url: string,
    options: IHttpOptions = {},
    withCredentials?: boolean
  ): Promise<T> {
    return this.request<T>(
      url,
      { ...options, method: METHODS.PATCH },
      options.timeout,
      withCredentials
    );
  }

  delete<T>(
    url: string,
    options: IHttpOptions = {},
    withCredentials?: boolean
  ): Promise<T> {
    return this.request<T>(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout,
      withCredentials
    );
  }

  request<T>(
    url: string,
    options: IHttpOptions,
    timeout = 5000,
    withCredentials: boolean = true
  ): Promise<T> {
    const { method = '', data, headers = {} } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = withCredentials;

      xhr.open(method, url);

      for (const key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.addEventListener('load', function () {
        resolve(xhr);
      });

      xhr.addEventListener('abort', reject);
      // eslint-disable-next-line unicorn/prefer-add-event-listener
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    })
      .then((data) => {
        if (data.status >= 400) {
          return Promise.reject(data);
        }

        return data;
      })
      .then((data) => {
        if (
          typeof data.response !== 'string' ||
          !data.response.startsWith('{')
        ) {
          return undefined;
        }

        return JSON.parse(data.response);
      });
  }
}
