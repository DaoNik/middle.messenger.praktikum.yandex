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

export class RemoveUserDialog extends Component {
  private readonly _userApi = new UserApiService();
  private readonly _chatsApi = new ChatsApiService();

  readonly form = new FormGroup<{ login: string }>({
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
  });

  selector = 'remove-user-dialog';

  constructor() {
    super(template, [], {
      login_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    const { login } = this.form.getRawValue();

    const urls = document.location.pathname.split('/');

    if (urls.length !== 2) return;

    this._userApi
      .searchUserByLogin(login)
      .then((user) => {
        return user[0].id;
      })
      .then((id) => {
        return this._chatsApi.deleteUsersFromChat([id], Number(urls[1]));
      })
      .then(() => {
        document.location.reload();
      });
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
