import {
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
  blurHandler,
  IForm,
  IFormControl,
  inputHandler,
  Router,
} from '../../core';
import { Component } from '../../types.ts';
import template from './login-form.html?raw';
import { AuthApiService } from '../../api';

export class LoginForm extends Component {
  form: IForm = {
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
  };
  selector = 'login-form';
  private readonly _authApiService = new AuthApiService();
  private readonly _router = Router.__instance;

  constructor() {
    super(template, [], {
      login_error: '',
      password_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = this.form;

    if (!isFormValid(form)) return;

    const credentials = {} as any;

    for (const [key, value] of form.controls) {
      credentials[key] = value.value;
    }

    this._authApiService
      .signIn(credentials)
      .then(() => {
        return this._authApiService.user();
      })
      .then((value) => {
        if (value) {
          this._router.go('/messenger');
        }
      });
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form.controls);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this.form, this.props, this.element);
  }
}
