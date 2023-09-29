import {
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
} from '../../core/validators';
import {
  blurHandler,
  IForm,
  IFormControl,
  inputHandler,
} from '../../core/form';
import { Component } from '../../types.ts';
import template from './login-form.html?raw';
import { AuthApiService, IAuthCredentials, IAuthUser } from "../../api/auth-api.service.ts";

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
  private readonly _authApiService: AuthApiService;

  constructor() {
    super(
      template,
      [],
      {
        login_error: '',
        password_error: '',
      },
      {
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = this.form;
          if (isFormValid(form)) {
            const formValue = {} as any;
            for (const [key, value] of form.controls) {
              formValue[key] = value.value;
            }
            this.submitHandler(formValue);
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

    this._authApiService = new AuthApiService();
  }

  submitHandler(credentials: IAuthCredentials) {
    this._authApiService.signIn(credentials).then(() => {
      return this._authApiService.user();
    }).then(value => console.log(value));
  }
}
