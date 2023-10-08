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

export class ChangePasswordDialog extends Component {
  form: IForm = {
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
  selector = 'change-password-dialog';

  constructor() {
    super(
      template,
      [],
      {
        oldPassword_error: '',
        newPassword_error: '',
        password_repeat_error: '',
      },
      {
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = this.form;
          if (isFormValid(form)) {
            const formValue: Record<string, string> = {};
            for (const [key, value] of form.controls) {
              formValue[key] = value.value;
            }
            console.log(formValue);
          }
        },
        onInput: (event: InputEvent) => {
          inputHandler(event, this.form.controls);
        },
        onBlur: (event: FocusEvent) => {
          blurHandler(event, this.form, this.props, this.element);
        },
        onDialogClose: () => {
          this.element?.classList.remove('overlay_opened');
        },
        onDialogNotClose: (event) => {
          event.stopPropagation();
        },
      }
    );
  }

  override componentDidMount() {
    super.componentDidMount();
  }
}
