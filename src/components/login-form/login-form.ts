import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { Block } from '../../core/block';

export class LoginForm extends Block {
  form!: Form;

  constructor() {
    super();
  }

  init() {
    this.form = new Form({
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
      ]),
      valid: false,
    });

    this.form.init('login', this.formSubmit);
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
