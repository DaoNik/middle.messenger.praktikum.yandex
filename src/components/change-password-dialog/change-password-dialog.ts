import {
  isMinimalLength,
  isNotEmptyValidator,
  FormGroup,
  FormControl,
  blurHandler,
  Block,
} from '../../core';
import { IComponent } from '../../types.ts';
import template from './change-password-dialog.html?raw';
import { IUpdateUserPasswordData, UserApiService } from '../../api';

interface IUpdateUserPasswordFormData extends IUpdateUserPasswordData {
  password_repeat: string;
}

export class ChangePasswordDialog extends Block implements IComponent {
  private readonly _userApiService = new UserApiService();

  readonly form = new FormGroup<IUpdateUserPasswordFormData>({
    oldPassword: new FormControl('', [isNotEmptyValidator, isMinimalLength], 6),
    newPassword: new FormControl('', [isNotEmptyValidator, isMinimalLength], 6),
    password_repeat: new FormControl(
      '',
      [isNotEmptyValidator, isMinimalLength],
      6
    ),
  });
  readonly selector = 'change-password-dialog';

  constructor() {
    super(template, [], {
      oldPassword_error: '',
      newPassword_error: '',
      password_repeat_error: '',
    });
  }

  override componentDidMount() {
    super.componentDidMount();
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!this.form.valid) return;

    this._userApiService
      .updatePassword(this.form.getRawValue())
      .then(() => {
        this.onDialogClose();
      })
      .catch(console.error);
  }

  onInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    this.form.getControl(target.name)?.setValue(event);
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
