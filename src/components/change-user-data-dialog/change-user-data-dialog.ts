import {
  isEmail,
  isMinimalLength,
  isNotEmptyValidator,
  isPhoneNumber,
  inputHandler,
  blurHandler,
  FormGroup,
  FormControl,
  Block,
} from '../../core';
import { IComponent } from '../../types.ts';
import template from './change-user-data-dialog.html?raw';
import { IFullUserData, IUpdateUserData, UserApiService } from '../../api';
import { AUTH_USER } from '../../constants.ts';
import {
  IState,
  StorageService,
  storeService,
  withStore,
} from '../../services';
import { isEqual } from '../../utils';

interface IChangeUserDataDialogProperties {
  user?: IFullUserData;
  email_error: string;
  login_error: string;
  first_name_error: string;
  second_name_error: string;
  phone_error: string;
  display_name_error: string;
}

class BaseChangeUserDataDialog
  extends Block<IChangeUserDataDialogProperties>
  implements IComponent
{
  private readonly _userApiService = new UserApiService();
  private readonly _storageService = new StorageService();

  readonly form = new FormGroup<IUpdateUserData>({
    email: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength, isEmail],
      4
    ),
    login: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    display_name: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength],
      4
    ),
    first_name: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    second_name: new FormControl('', [isNotEmptyValidator, isMinimalLength], 4),
    phone: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength, isPhoneNumber],
      8
    ),
  });

  selector = 'change-user-data-dialog';

  constructor() {
    super(template, [], {
      email_error: '',
      login_error: '',
      first_name_error: '',
      second_name_error: '',
      phone_error: '',
      display_name_error: '',
    });
  }

  override render(
    oldProperties?: IChangeUserDataDialogProperties,
    newProperties?: IChangeUserDataDialogProperties
  ) {
    if (!isEqual(oldProperties?.user ?? {}, newProperties?.user ?? {})) {
      const { user } = newProperties ?? {};

      // TODO: remake templater that delete it
      if (user) {
        const inputs = document.querySelectorAll<HTMLInputElement>(
          'form[name="change-data"] input'
        );

        for (const input of inputs) {
          input.value = String(user[input.name as keyof IFullUserData]);
        }

        for (const [key, control] of Object.entries(this.form.controls)) {
          control.setValue({
            target: { value: String(user[key as keyof IFullUserData]) },
          } as unknown as InputEvent);
        }
      }
    }

    super.render(oldProperties, newProperties);
  }

  override componentDidMount() {
    super.componentDidMount();
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    this._userApiService
      .updateUserData(this.form.getRawValue())
      .then((user) => {
        storeService.set('user', user);

        return this._storageService.setItem(AUTH_USER, user);
      })
      .then(() => this.onDialogClose())
      .catch(console.error);
  }

  onInput(event: InputEvent) {
    inputHandler(event, this.form);
  }

  onBlur(event: FocusEvent) {
    blurHandler(event, this.form, this.props, this.element);
  }

  onDialogClose() {
    this.element?.classList.remove('overlay_opened');
  }

  onDialogNotClose(event: MouseEvent) {
    event.stopPropagation();
  }
}

function mapStateToProperties(state: IState) {
  return { user: { ...state.user } };
}

export const ChangeUserDataDialog = withStore<IChangeUserDataDialogProperties>(
  mapStateToProperties
)(BaseChangeUserDataDialog);
