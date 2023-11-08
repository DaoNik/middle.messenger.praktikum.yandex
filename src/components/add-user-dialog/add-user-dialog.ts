import { isFormValid, isMinimalLength, isNotEmptyValidator } from '../../core';
import { blurHandler, IForm, IFormControl, inputHandler } from '../../core';
import { Component } from '../../types.ts';
import template from './add-user-dialog.html?raw';
import { ChatsApiService, UserApiService } from '../../api';

export class AddUserDialog extends Component {
  private readonly _chatsApi = new ChatsApiService();
  private readonly _userApi = new UserApiService();

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
  selector = 'add-user-dialog';

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
        return this._chatsApi.addUsersToChat([id], Number(urls[1]));
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
