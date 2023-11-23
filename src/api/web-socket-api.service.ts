import { ChatsApiService } from './chats-api.service.ts';
import { AUTH_USER } from '../constants.ts';
import { IMessage, StorageService, storeService } from '../services';
import { BASE_WS_HREF } from './constants.ts';

export interface IWsMessage {
  content?: string;
  type: 'file' | 'get old' | 'message' | 'ping';
}

const DEFAULT_SOCKET_UPDATE_INTERVAL = 10_000;

export class WebSocketApiService {
  private readonly _chatsApi = new ChatsApiService();
  private readonly _storageService = new StorageService();
  private readonly _socketsMap = new Map<string, WebSocket>();
  private readonly _intervalIdMap = new Map<string, NodeJS.Timeout>();

  async connect(chatId: string): Promise<void> {
    if (this.isConnected(chatId)) return;

    const user = await this._storageService.getItem(AUTH_USER);

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
      });
  }

  async sendMessage(chatId: string, message: IWsMessage) {
    const socket = this._socketsMap.get(chatId);

    if (!socket) return;

    try {
      socket.send(JSON.stringify(message));
    } catch {
      await this.connect(chatId);
    }
  }

  private _initListeners(chatId: string, socket: WebSocket): void {
    if (!this._intervalIdMap.get(chatId)) {
      const interval = setInterval(async () => {
        await this.sendMessage(chatId, {
          type: 'ping',
        });
      }, DEFAULT_SOCKET_UPDATE_INTERVAL);

      this._intervalIdMap.set(chatId, interval);
    }

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.sendMessage(chatId, {
        content: '0',
        type: 'get old',
      }).then(() => {});
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
      if (JSON.parse(event.data).type === 'pong') return;

      const serverData = JSON.parse(event.data) as IMessage | IMessage[];
      const newMessages = Array.isArray(serverData) ? serverData : [serverData];
      const chats = storeService.getState().chatMessages ?? {};
      const messages = chats[chatId] ?? [];

      chats[chatId] = [...newMessages, ...messages].sort((a, b) =>
        a.time > b.time ? 1 : -1
      );

      storeService.set('chatMessages', chats);
    });

    socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as any).message);
    });
  }

  isConnected(chatId: string): boolean {
    const socketForChat = this._socketsMap.get(chatId);

    return Boolean(
      socketForChat && (socketForChat.CONNECTING || socketForChat.OPEN)
    );
  }
}
