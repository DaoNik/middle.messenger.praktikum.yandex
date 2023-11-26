import {
  blurHandler,
  FormControl,
  FormGroup,
  inputHandler,
  isMinimalLength,
  isNotEmptyValidator,
} from '../../core';
import { Component } from '../../types.ts';
import template from './add-user-dialog.html?raw';
import { ChatsApiService, UserApiService } from '../../api';
import { StorageService } from '../../services';
import { CURRENT_CHAT_ID } from '../../constants.ts';

export class AddUserDialog extends Component {
  private readonly _chatsApi = new ChatsApiService();
  private readonly _userApi = new UserApiService();
  private readonly _storageService = new StorageService();

  readonly form = new FormGroup<{ login: string }>({
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
  });

  selector = 'add-user-dialog';

  constructor() {
    super(template, [], {
      login_error: '',
    });
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const form = this.form;

    if (!form.valid) return;

    const login = form.controls['login'];
    const chatId = await this._storageService.getItem<number>(CURRENT_CHAT_ID);

    if (!chatId) return;

    this._userApi
      .searchUserByLogin(login.value)
      .then((users) => {
        if (users.length === 0) {
          throw new Error('user not found');
        }

        return users[0].id;
      })
      .then((id) => {
        return this._chatsApi.addUsersToChat([id], chatId);
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
