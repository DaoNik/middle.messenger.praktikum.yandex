import { Block, EventBus } from '../core';
import { IFullUserData } from '../api';

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

export function withStore(mapStateToProps: (state: IState) => any) {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: any) {
        super({ ...props, ...mapStateToProps(storeService.getState()) });

        storeService.on(StorageEvent.UpdateState, () => {
          const propsFromState = mapStateToProps(storeService.getState());

          console.log(propsFromState);

          this.setProps(propsFromState);
        });
      }
    };
  };
}
