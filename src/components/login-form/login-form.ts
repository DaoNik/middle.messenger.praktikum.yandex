import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { Component } from '../../types.ts';
import template from './login-form.html?raw';

export class LoginForm extends Component {
  form!: Form;
  selector = 'login-form';

  constructor() {
    super(template);
  }

  init() {}

  componentDidMount() {
    this.form = new Form(
      {
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
      },
      this.props
    );
    this.form.init('login', this.formSubmit);

    super.componentDidMount();
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
