import {
  isNotEmptyValidator,
  isMinimalLength,
  isEmail,
  isPhoneNumber,
  blurHandler,
  inputHandler,
  Router,
  FormGroup,
  FormControl,
  Block,
} from '../../core';
import { IComponent } from '../../types.ts';
import template from './register-form.html?raw';
import { AuthApiService, IAuthUser } from '../../api';

interface IAuthUserFormData extends IAuthUser {
  password_repeat: string;
}

interface IRegisterFormProperties {
  email_error: string;
  login_error: string;
  first_name_error: string;
  second_name_error: string;
  phone_error: string;
  password_error: string;
  password_repeat_error: string;
}

export class RegisterForm
  extends Block<IRegisterFormProperties>
  implements IComponent
{
  private readonly _authApiService = new AuthApiService();
  private readonly _router = Router.__instance;

  readonly form = new FormGroup<IAuthUserFormData>({
    email: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength, isEmail],
      4
    ),
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    first_name: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    second_name: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    phone: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength, isPhoneNumber],
      8
    ),
    password: new FormControl('', [isNotEmptyValidator, isMinimalLength], 6),
    password_repeat: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength],
      6
    ),
  });

  selector = 'register-form';

  constructor() {
    super(template, [], {
      email_error: '',
      login_error: '',
      first_name_error: '',
      second_name_error: '',
      phone_error: '',
      password_error: '',
      password_repeat_error: '',
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    this._authApiService
      .signUp(this.form.getRawValue())
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
