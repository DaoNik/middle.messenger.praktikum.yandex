import {
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
  IFormControl,
  IForm,
  inputHandler,
  blurHandler,
} from '../../core';
import { Component } from '../../types.ts';
import template from './change-password-dialog.html?raw';
import { UserApiService } from '../../api';

export class ChangePasswordDialog extends Component {
  private readonly _userApiService = new UserApiService();
  private readonly _form: IForm = {
    controls: new Map<string, IFormControl>([
      [
        'oldPassword',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 6,
          valid: false,
          error: '',
        },
      ],
      [
        'newPassword',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 6,
          valid: false,
          error: '',
        },
      ],
      [
        'password_repeat',
        {
          value: '',
          validators: [isNotEmptyValidator, isMinimalLength],
          minLength: 6,
          valid: false,
          error: '',
        },
      ],
    ]),
    valid: false,
  };
  readonly selector = 'change-password-dialog';

  constructor() {
    super(template, [], {
      oldPassword_error: '',
      newPassword_error: '',
      password_repeat_error: '',
    });
  }

  override componentDidMount() {
    super.componentDidMount();
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const form = this._form;

    if (!isFormValid(form)) return;

    const formValue: any = {};

    for (const [key, value] of form.controls) {
      formValue[key] = value.value;
    }

    this._userApiService.updatePassword(formValue).then(() => {
      this.onDialogClose();
    });
  }

  onInput(event: InputEvent) {
    inputHandler(event, this._form.controls);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this._form, this.props, this.element);
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
