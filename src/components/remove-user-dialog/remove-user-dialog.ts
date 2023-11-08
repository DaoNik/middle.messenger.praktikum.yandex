import {
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
  blurHandler,
  IForm,
  IFormControl,
  inputHandler,
} from '../../core';
import template from './remove-user-dialog.html?raw';
import { Component } from '../../types.ts';
import { ChatsApiService, UserApiService } from '../../api';

export class RemoveUserDialog extends Component {
  private readonly _userApi = new UserApiService();
  private readonly _chatsApi = new ChatsApiService();

  form: IForm = {
    controls: new Map<string, IFormControl>([
      [
        'login',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 4,
          valid: false,
          error: '',
        },
      ],
    ]),
    valid: false,
  };
  selector = 'remove-user-dialog';

  constructor() {
    super(template, [], {
      login_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = this.form;

    if (!isFormValid(form)) return;

    const login = form.controls.get('login')!;

    const urls = document.location.pathname.split('/');

    if (urls.length !== 2) return;

    this._userApi
      .searchUserByLogin(login.value)
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
    inputHandler(event, this.form.controls);
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
