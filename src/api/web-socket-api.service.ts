import { ChatsApiService } from './chats-api.service.ts';
import { AUTH_USER } from '../constants.ts';
import { IMessage, StorageService, storeService } from '../services';
import { BASE_WS_HREF } from './constants.ts';

export interface IWsMessage {
  content: string;
  type: 'file' | 'get old' | 'message';
}

export class WebSocketApiService {
  private readonly _chatsApi = new ChatsApiService();
  private readonly _storageService = new StorageService();
  private readonly _socketsMap = new Map<string, WebSocket>();

  connect(chatId: string): void {
    const socketForChat = this._socketsMap.get(chatId);

    if (socketForChat && (socketForChat.CONNECTING || socketForChat.OPEN))
      return;

    const user = this._storageService.getItem(AUTH_USER);

    if (!user) return;

    const authUser = JSON.parse(user);

    this._chatsApi
      .getTokenForConnectMessagesServer(Number(chatId))
      .then((token) => {
        const socket = new WebSocket(
          `${BASE_WS_HREF}/ws/chats/${authUser.id}/${chatId}/${token.token}`
        );

        this._socketsMap.set(chatId, socket);

        this._initListeners(chatId, socket);
        console.log(socket);
      });
  }

  sendMessage(chatId: string, message: IWsMessage) {
    const socket = this._socketsMap.get(chatId);

    if (!socket) return;

    socket.send(JSON.stringify(message));
  }

  private _initListeners(chatId: string, socket: WebSocket): void {
    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.sendMessage(chatId, {
        content: '0',
        type: 'get old',
      });
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
      const serverData = JSON.parse(event.data) as IMessage | IMessage[];
      const newMessages = Array.isArray(serverData) ? serverData : [serverData];
      const chats = storeService.getState().chatMessages ?? {};
      const messages = chats[chatId] ?? [];

      chats[chatId] = [...messages, ...newMessages].sort((a, b) =>
        a.time > b.time ? 1 : -1
      );

      storeService.set('chatMessages', chats);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as any).message);
    });
  }
}
