import {
  isNotEmptyValidator,
  isMinimalLength,
  isEmail,
  isPhoneNumber,
  isFormValid,
} from '../../core/validators';
import {
  blurHandler,
  IForm,
  IFormControl,
  inputHandler,
} from '../../core/form';
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
        onInput: (event: InputEvent) => {
          inputHandler(event, this.form.controls);
        },
        onBlur: (event: FocusEvent) => {
          blurHandler(event, this.form, this.props, this.element);
        },
      }
    );
  }
}
