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
import { ChatsApiService, UserApiService } from '../../api';
import { StorageService } from '../../services';
import { CURRENT_CHAT_ID } from '../../constants.ts';

export class RemoveUserDialog extends Component {
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

    if (!chatId) return;

    this._userApi
      .searchUserByLogin(login)
      .then((user) => {
        return user[0].id;
      })
      .then((id) => {
        return this._chatsApi.deleteUsersFromChat([id], chatId);
      })
      .then(() => {
        // TODO: change to normal update
        document.location.reload();
      })
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
