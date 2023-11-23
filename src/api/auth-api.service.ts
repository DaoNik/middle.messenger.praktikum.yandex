import { HTTPTransport, Router } from '../core';
import { BASE_HREF } from './constants.ts';
import { joinUrlParts } from '../utils';
import { AUTH_USER } from '../constants.ts';
import { StorageService } from '../services';

export interface IAuthUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IFullUserData extends Omit<IAuthUser, 'password'> {
  id: number;
  avatar: string;
}

export interface IAuthCredentials {
  login: string;
  password: string;
}

export class AuthApiService {
  static __instance: AuthApiService;

  private readonly _http = new HTTPTransport();
  private readonly _baseUrl = joinUrlParts(BASE_HREF, 'auth');
  private readonly _router = Router.__instance;
  private readonly _storageService = new StorageService();

  constructor() {
    if (AuthApiService.__instance) {
      return AuthApiService.__instance;
    }

    AuthApiService.__instance = this;
  }

  signUp(user: IAuthUser): Promise<{ id: number }> {
    return this._http.post<{ id: number }>(
      joinUrlParts(this._baseUrl, 'signup'),
      {
        data: user,
      }
    );
  }

  signIn(credentials: IAuthCredentials): Promise<void> {
    return this._http.post<void>(joinUrlParts(this._baseUrl, 'signin'), {
      data: credentials,
    });
  }

  async user(): Promise<IFullUserData | void> {
    try {
      const user = await this._http.get<IFullUserData>(
        joinUrlParts(this._baseUrl, 'user')
      );

      await this._storageService.setItem(AUTH_USER, user);

      return user;
    } catch (error) {
      console.error(error);
      await this._storageService.clear();

      this._router.go('/');
    }
  }

  async logout(): Promise<void> {
    await this._http.post<void>(joinUrlParts(this._baseUrl, 'logout'));

    await this._storageService.clear();

    this._router.go('/');
  }
}
