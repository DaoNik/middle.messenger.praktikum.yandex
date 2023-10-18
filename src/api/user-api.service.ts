import { BASE_HREF } from './constants.ts';
import { HTTPTransport } from '../core';
import { IAuthUser, IFullUserData } from './auth-api.service.ts';
import { joinUrlParts } from '../utils/joinUrlParts.ts';

export interface IUpdateUserPasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateUserData extends Omit<IAuthUser, 'password'> {
  display_name: string;
}

export class UserApiService {
  static __instance: UserApiService;

  private readonly _baseUrl = joinUrlParts(BASE_HREF, 'user');
  private readonly _http = new HTTPTransport();

  constructor() {
    if (UserApiService.__instance) {
      return UserApiService.__instance;
    }

    UserApiService.__instance = this;
  }

  updateUserData(userData: IUpdateUserData): Promise<IFullUserData> {
    return this._http.put<IFullUserData>(
      joinUrlParts(this._baseUrl, 'profile'),
      {
        data: userData,
      }
    );
  }

  updateAvatar(avatar: FormData): Promise<IUpdateUserData> {
    return this._http.put<IUpdateUserData>(
      joinUrlParts(this._baseUrl, 'profile/avatar'),
      {
        data: avatar,
      }
    );
  }

  updatePassword(data: IUpdateUserPasswordData): Promise<void> {
    return this._http.put<void>(joinUrlParts(this._baseUrl, 'password'), {
      data,
    });
  }

  getUserById(id: number): Promise<IFullUserData> {
    return this._http.get<IFullUserData>(joinUrlParts(this._baseUrl, id));
  }

  searchUserByLogin(login: string): Promise<IFullUserData[]> {
    return this._http.post<IFullUserData[]>(
      joinUrlParts(this._baseUrl, 'search'),
      {
        data: { login },
      }
    );
  }
}
