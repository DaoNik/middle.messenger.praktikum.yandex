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
import { StorageService } from '../../services';

export class ChangeUserDataDialog extends Component {
  private readonly _userApiService = new UserApiService();
  private readonly _router = Router.__instance;
  private readonly _storageService = new StorageService();

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
        return this._storageService.setItem(AUTH_USER, user);
      })
      .then(() => {
        // TODO: change to normal update
        this._router.refresh();
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
