import { BASE_HREF } from './constants.ts';
import { HTTPTransport } from '../core';
import { IFullUserData } from './auth-api.service.ts';

export interface IMessage {
  user: Omit<IFullUserData, 'id'>;
  time: string;
  content: string;
}

export interface IChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: IMessage;
}

export interface IChat {
  userId: number;
  result: Omit<IChatData, 'unread_count' | 'last_message'>;
}

export interface IChatFile {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string;
  content: number;
  file: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

export interface IGetChatParams {
  offset?: number;
  limit?: number;
  title?: string;
}

export interface IGetChatUsersParams {
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
}

export interface IChatUser extends Omit<IFullUserData, 'phone'> {
  role: string;
}

export class ChatsApiService {
  private readonly _baseUrl = `${BASE_HREF}/chats`;
  private readonly _http = new HTTPTransport();

  getChats(params?: IGetChatParams): Promise<IChatData[]> {
    let url = this._baseUrl;

    if (params) {
      const length = Object.keys(params).length;

      if (length > 0) {
        url += `?${queryStringify(params)}`;
      }
    }

    return this._http.get<IChatData[]>(url);
  }

  createChat(title: string): Promise<void> {
    return this._http.post<void>(this._baseUrl, {
      data: { title },
    });
  }

  deleteChat(chatId: number): Promise<IChat> {
    return this._http.delete<IChat>(this._baseUrl, {
      data: { chatId },
    });
  }

  getChatFiles(chatId: number): Promise<IChatFile> {
    return this._http.get<IChatFile>(`${this._baseUrl}/${chatId}/files`);
  }

  getArchiveChats(params?: IGetChatParams): Promise<IChatData[]> {
    let url = `${this._baseUrl}/archive`;

    if (params) {
      const length = Object.keys(params).length;

      if (length > 0) {
        url += `?${queryStringify(params)}`;
      }
    }

    return this._http.get<IChatData[]>(url);
  }

  archiveChat(chatId: number): Promise<IChatData> {
    return this._http.post(`${this._baseUrl}/archive`, {
      data: { chatId },
    });
  }

  unarchiveChat(chatId: number): Promise<IChatData> {
    return this._http.post(`${this._baseUrl}/unarchive`, {
      data: { chatId },
    });
  }

  getCommonChatWithUser(chatId: number): Promise<IChatData[]> {
    return this._http.get(`${this._baseUrl}/${chatId}/common`);
  }

  getChatUsers(
    chatId: number,
    params?: IGetChatUsersParams
  ): Promise<IChatUser[]> {
    let url = `${this._baseUrl}/${chatId}/users`;

    if (params) {
      const length = Object.keys(params).length;

      if (length > 0) {
        url += `?${queryStringify(params)}`;
      }
    }

    return this._http.get<IChatUser[]>(url);
  }

  getNewChatMessages(chatId: number): Promise<{ unread_count: number }> {
    return this._http.get<{ unread_count: number }>(
      `${this._baseUrl}/new/${chatId}`
    );
  }

  /**
   *
   * @param formData chatId and avatar file
   */
  changeChatAvatar(formData: FormData): Promise<IChatData> {
    return this._http.put<IChatData>(`${this._baseUrl}/avatar`, {
      data: formData,
    });
  }

  addUsersToChat(users: number[], chatId: number): Promise<void> {
    return this._http.put<void>(`${this._baseUrl}/users`, {
      data: {
        users,
        chatId,
      },
    });
  }

  deleteUsersFromChat(users: number[], chatId: number): Promise<void> {
    return this._http.delete<void>(`${this._baseUrl}/users`, {
      data: {
        users,
        chatId,
      },
    });
  }

  getTokenForConnectMessagesServer(
    chatId: number
  ): Promise<{ token: string }[]> {
    return this._http.post<{ token: string }[]>(
      `${this._baseUrl}/token/${chatId}`
    );
  }
}
