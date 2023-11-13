import { ChatsApiService } from './chats-api.service.ts';
import { AUTH_USER } from '../constants.ts';
import { StorageService } from '../services';
import { BASE_WS_HREF } from './constants.ts';

export class WebSocketApiService {
  private readonly _chatsApi = new ChatsApiService();
  private readonly _storageService = new StorageService();

  socket?: WebSocket;

  connect(chatId: string): void {
    if (this.socket && (this.socket.CONNECTING || this.socket.OPEN)) return;

    const user = this._storageService.getItem(AUTH_USER);

    if (!user) return;

    const authUser = JSON.parse(user);

    this._chatsApi
      .getTokenForConnectMessagesServer(Number(chatId))
      .then((token) => {
        this.socket = new WebSocket(
          `${BASE_WS_HREF}/ws/chats/${authUser.id}/${chatId}/${token.token}`
        );

        this._initListeners(this.socket);
        console.log(this.socket);
      });
  }

  private _initListeners(socket: WebSocket): void {
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      socket.send(
        JSON.stringify({
          content: 'Моё первое сообщение миру!',
          type: 'message',
        })
      );
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as any).message);
    });
  }
}
