import { Block, EventBus, PropertiesT } from '../core';
import { IChatData, IFullUserData } from '../api';

// Вебинар 48 минута https://www.youtube.com/watch?v=9SLOq6zrEpo

export enum MessageTypesEnum {
  MESSAGE = 'message',
  FILE = 'file',
  USER_CONNECTED = 'user connected',
}

export interface IFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface IMessage {
  content: string;
  type: MessageTypesEnum;
  time: string;
  user_id: number;
  id: number;
  file?: IFile;
}

export interface IState {
  user?: IFullUserData;
  chatMessages?: Record<string, IMessage[]>;
  chats?: IChatData[];
}

enum StorageEvent {
  UpdateState = 'update',
}

class StoreService extends EventBus {
  private _state: IState = {};

  getState(): IState {
    return this._state;
  }

  set(path: keyof IState, value: any): void {
    this._state = { ...this._state, [path]: value };

    this.emit(StorageEvent.UpdateState, this._state);
  }
}

export const storeService = new StoreService();

export function withStore<Properties extends PropertiesT = any>(
  mapStateToProperties: (state: IState) => any
) {
  return (Component: typeof Block<Properties>) => {
    return class extends Component {
      constructor(properties: any) {
        super({
          ...properties,
          ...mapStateToProperties(storeService.getState()),
        });

        storeService.on(StorageEvent.UpdateState, () => {
          const propertiesFromState = mapStateToProperties(
            storeService.getState()
          );

          this.setProps(propertiesFromState);
        });
      }
    };
  };
}
