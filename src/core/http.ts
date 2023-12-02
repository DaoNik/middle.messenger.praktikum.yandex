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

type HTTPMethod = <R = unknown>(
  url: string,
  options?: IHttpOptions,
  withCredentials?: boolean
) => Promise<R>;

const CONTENT_TYPE = 'Content-Type';

export function queryStringify(data: HttpDataT) {
  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.keys(data).reduce((result, key, index, keys) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}, withCredentials) => {
    if (options.data && Object.keys(options.data).length > 0) {
      url += queryStringify(options.data);
    }

    return this._request(
      url,
      {
        ...options,
        method: METHODS.GET,
        headers: { Accept: 'application/json', ...options.headers },
      },
      options.timeout,
      withCredentials
    );
  };

  post: HTTPMethod = (url, options = {}, withCredentials) => {
    const headers = { ...options.headers };

    if (!(options.data instanceof FormData)) {
      headers[CONTENT_TYPE] = 'application/json';
    }

    return this._request(
      url,
      {
        ...options,
        method: METHODS.POST,
        headers: headers,
      },
      options.timeout,
      withCredentials
    );
  };

  put: HTTPMethod = (url, options = {}, withCredentials) => {
    const headers = { ...options.headers };

    if (!(options.data instanceof FormData)) {
      headers[CONTENT_TYPE] = 'application/json';
    }

    return this._request(
      url,
      {
        ...options,
        method: METHODS.PUT,
        headers,
      },
      options.timeout,
      withCredentials
    );
  };

  patch: HTTPMethod = (url, options = {}, withCredentials) => {
    const headers = { ...options.headers };

    if (!(options.data instanceof FormData)) {
      headers[CONTENT_TYPE] = 'application/json';
    }

    return this._request(
      url,
      {
        ...options,
        method: METHODS.PATCH,
        headers,
      },
      options.timeout,
      withCredentials
    );
  };

  delete: HTTPMethod = (url, options = {}, withCredentials) => {
    const headers = { ...options.headers };

    if (!(options.data instanceof FormData)) {
      headers[CONTENT_TYPE] = 'application/json';
    }

    return this._request(
      url,
      { ...options, method: METHODS.DELETE, headers },
      options.timeout,
      withCredentials
    );
  };

  private _request<T>(
    url: string,
    options: IHttpOptions,
    timeout = 5000,
    withCredentials = true
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
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    })
      .then((data) => {
        if (data.status >= 400) {
          throw data;
        }

        return data;
      })
      .then((data) => {
        // NOTE: this code only handles a possible error when parsing data, because the server can return a response - "OK"
        try {
          return JSON.parse(data.response);
        } catch {
          return data.response;
        }
      });
  }
}
