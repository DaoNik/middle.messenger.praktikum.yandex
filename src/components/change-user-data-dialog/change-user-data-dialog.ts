import {
  isEmail,
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
  isPhoneNumber,
  IFormControl,
  IForm,
  inputHandler,
  blurHandler,
  Router,
} from '../../core';
import { Component } from '../../types.ts';
import template from './change-user-data-dialog.html?raw';
import { UserApiService } from '../../api';
import { AUTH_USER } from '../../constants.ts';

export class ChangeUserDataDialog extends Component {
  private readonly _userApiService = new UserApiService();
  private readonly _router = Router.__instance;

  form: IForm = {
    controls: new Map<string, IFormControl>([
      [
        'email',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength, isEmail],
          minLength: 4,
          valid: false,
          error: '',
        },
      ],
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
      [
        'display_name',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 4,
          valid: false,
          error: '',
        },
      ],
      [
        'first_name',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 4,
          valid: false,
          error: '',
        },
      ],
      [
        'second_name',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 4,
          valid: false,
          error: '',
        },
      ],
      [
        'phone',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength, isPhoneNumber],
          minLength: 8,
          valid: false,
          error: '',
        },
      ],
    ]),
    valid: false,
  };
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

    const form = this.form;

    if (!isFormValid(form)) return;

    const formValue: any = {};

    for (const [key, value] of form.controls) {
      formValue[key] = value.value;
    }

    this._userApiService.updateUserData(formValue).then((user) => {
      localStorage.setItem(AUTH_USER, JSON.stringify(user));

      this._router.refresh();
    });
  }

  onInput(event: InputEvent) {
    console.log(this.form.controls);
    inputHandler(event, this.form.controls);
  }

  onBlur(event: FocusEvent) {
    console.log(this, this.form, this.props, this.element);
    blurHandler(event, this.form, this.props, this.element);
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
