import {
  isEmail,
  isMinimalLength,
  isNotEmptyValidator,
  isPhoneNumber,
  inputHandler,
  blurHandler,
  Router,
  FormGroup,
  FormControl,
} from '../../core';
import { Component } from '../../types.ts';
import template from './change-user-data-dialog.html?raw';
import { IUpdateUserData, UserApiService } from '../../api';
import { AUTH_USER } from '../../constants.ts';

export class ChangeUserDataDialog extends Component {
  private readonly _userApiService = new UserApiService();
  private readonly _router = Router.__instance;

  readonly form = new FormGroup<IUpdateUserData>({
    email: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength, isEmail],
      4
    ),
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    display_name: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength],
      4
    ),
    first_name: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    second_name: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    phone: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength, isPhoneNumber],
      8
    ),
  });

  selector = 'change-user-data-dialog';

  constructor() {
    super(template, [], {
      email_error: '',
      login_error: '',
      first_name_error: '',
      second_name_error: '',
      phone_error: '',
      display_name_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    this._userApiService
      .updateUserData(this.form.getRawValue())
      .then((user) => {
        localStorage.setItem(AUTH_USER, JSON.stringify(user));

        this._router.refresh();
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
