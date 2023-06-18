import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { Component } from '../../types.ts';
import template from './login-form.html?raw';

export class LoginForm extends Component {
  form!: Form;
  selector = 'login-form';
  content = template;

  constructor() {
    super();
  }

  init() {}

  componentDidMount() {
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
