import {
  isMinimalLength,
  isNotEmptyValidator,
  blurHandler,
  inputHandler,
  FormGroup,
  FormControl,
} from '../../core';
import template from './remove-user-dialog.html?raw';
import { Component } from '../../types.ts';
import { ChatsApiService, IFullUserData, UserApiService } from '../../api';
import { StorageService, storeService } from '../../services';
import { AUTH_USER, CURRENT_CHAT_ID } from '../../constants.ts';

export class RemoveUserDialog extends Component<{ login_error: string }> {
  private readonly _userApi = new UserApiService();
  private readonly _chatsApi = new ChatsApiService();
  private readonly _storageService = new StorageService();

  readonly form = new FormGroup<{ login: string }>({
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
  });

  selector = 'remove-user-dialog';

  constructor() {
    super(template, [], {
      login_error: '',
    });
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (!this.form.valid) return;

    const { login } = this.form.getRawValue();

    const chatId = await this._storageService.getItem<number>(CURRENT_CHAT_ID);
    const authUser = await this._storageService.getItem<IFullUserData>(
      AUTH_USER
    );

    if (!chatId || !authUser) return;

    this._userApi
      .searchUserByLogin(login)
      .then((users) => {
        if (users.length === 0) {
          throw new Error('user not found');
        }

        return users[0].id;
      })
      .then((id) => {
        return this._chatsApi.deleteUsersFromChat([id], chatId);
      })
      .then(() => {
        if (authUser.login === login) {
          const { chats = [] } = storeService.getState();
          const updatedChats = chats.filter((chat) => chat.id !== chatId);

          storeService.set('chats', updatedChats);
        }
      })
      .then(() => this.onDialogClose())
      .catch(console.error);
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this.form, this.props, this.element);
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
