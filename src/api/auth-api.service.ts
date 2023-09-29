import { HTTPTransport } from '../core/http.ts';
import { BASE_HREF } from './constants.ts';
import { isEmpty } from '../utils/is-empty.ts';

export interface IAuthUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IAuthUserWithId extends IAuthUser {
  id: number;
}

export interface IAuthCredentials {
  login: string;
  password: string;
}

export class AuthApiService {
  private readonly _http: HTTPTransport;
  private readonly _baseUrl = `${BASE_HREF}/auth`;

  constructor() {
    this._http = new HTTPTransport();
  }

  signUp(user: IAuthUser): Promise<{ id: number }> {
    return this._http.post<{ id: number }>(`${this._baseUrl}/signup`, {
      data: user,
    });
  }

  signIn(credentials: IAuthCredentials): Promise<void> {
    return this._http.post<void>(`${this._baseUrl}/signin`, {
      data: credentials,
    });
  }

  user(): Promise<IAuthUserWithId | void> {
    return this._http
      .get<IAuthUserWithId>(`${this._baseUrl}/user`)
      .then((user) => {
        localStorage.setItem('authUser', JSON.stringify(user));

        return user;
      })
      .catch((err) => {
        console.log('add redirect to login', err);
      });
  }

  logout(): Promise<void> {
    return this._http.post<void>(`${this._baseUrl}/logout`).then(() => {
      localStorage.clear();
    });
  }
}
