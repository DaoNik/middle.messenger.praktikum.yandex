import { ChatsApiService } from './chats-api.service.ts';
import { AUTH_USER } from '../constants.ts';

export class WebSocketApiService {
  private readonly _chatsApi = new ChatsApiService();

  connect(chatId: string) {
    const user = localStorage.getItem(AUTH_USER);

    if (!user) return;

    const authUser = JSON.parse(user);

    this._chatsApi
      .getTokenForConnectMessagesServer(Number(chatId))
      .then((token) => {
        const socket = new WebSocket(
          `wss://ya-praktikum.tech/ws/chats/${authUser.id}/${chatId}/${token.token}`
        );

        console.log(socket);
      });
  }
}
