import {
  isNotEmptyValidator,
  isMinimalLength,
  isEmail,
  isPhoneNumber,
  isFormValid,
  isControlValid,
} from '../../core/validators';
import { IForm, IFormControl } from '../../core/form';
import { Component } from '../../types.ts';
import template from './register-form.html?raw';

export class RegisterForm extends Component {
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
      [
        'password',
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
  selector = 'register-form';

  constructor() {
    super(
      template,
      [],
      {
        email_error: '',
        login_error: '',
        first_name_error: '',
        second_name_error: '',
        phone_error: '',
        password_error: '',
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
        onInput: (event) => {
          const controls = this.form.controls;
          const target = event.target as HTMLInputElement;

          if (controls.has(target.name)) {
            controls.get(target.name)!.value = target.value;
          }
        },
        onBlur: (event) => {
          const form = this.form;
          const target = event.target as HTMLInputElement;
          const control = form.controls.get(target.name)!;
          const { isValid, error } = isControlValid(control);

          control.valid = isValid;
          control.error = error;
          if (this.props[`${target.name}_error`] !== control.error) {
            this.props[`${target.name}_error`] = control.error;
          }
          form.valid = isFormValid(form);

          const formElement = document.getElementById(this.blockId)!;
          const submitButtonElement = formElement.querySelector(
            'button[type="submit"]'
          ) as HTMLButtonElement;
          submitButtonElement!.disabled = !form.valid;
        },
      }
    );
  }
}
