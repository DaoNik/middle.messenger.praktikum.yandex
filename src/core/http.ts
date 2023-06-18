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
  get(url: string, options: IHttpOptions = {}) {
    if (options.data && Object.keys(options.data).length > 0) {
      url += queryStringify(options.data);
    }

    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  post(url: string, options: IHttpOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  put(url: string, options: IHttpOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  patch(url: string, options: IHttpOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.PATCH },
      options.timeout
    );
  }

  delete(url: string, options: IHttpOptions = {}) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  request(url: string, options: IHttpOptions, timeout = 5000) {
    const { method = '', data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

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
    });
  }
}
