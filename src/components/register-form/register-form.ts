import {
  isNotEmptyValidator,
  isMinimalLength,
  isEmail,
  isPhoneNumber,
} from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { Block } from '../../core/block';

export class RegisterForm extends Block {
  form!: Form;

  constructor() {
    super();
  }

  init() {
    this.form = new Form({
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
    });

    this.form.init('register', this.formSubmit);
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
