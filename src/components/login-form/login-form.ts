import {
  isMinimalLength,
  isNotEmptyValidator,
  Router,
  inputHandler,
  blurHandler,
  FormGroup,
  FormControl,
} from '../../core';
import { Component } from '../../types.ts';
import template from './login-form.html?raw';
import { AuthApiService, IAuthCredentials } from '../../api';

export class LoginForm extends Component {
  private readonly _authApiService = new AuthApiService();
  private readonly _router = Router.__instance;

  readonly form = new FormGroup<IAuthCredentials>({
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    password: new FormControl('', [isNotEmptyValidator, isMinimalLength], 6),
  });

  selector = 'login-form';

  constructor() {
    super(template, [], {
      login_error: '',
      password_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    this._authApiService
      .signIn(this.form.getRawValue())
      .then(() => {
        return this._authApiService.user();
      })
      .then((value) => {
        if (!value) {
          throw new Error('Get user error');
        }

        return value;
      })
      .then(() => this._router.go('/messenger'))
      .catch(console.error);
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this.form, this.props, this.element);
  }
}
