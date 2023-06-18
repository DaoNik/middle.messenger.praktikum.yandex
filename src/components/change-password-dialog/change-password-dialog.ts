import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { IFormControl, Form } from '../../core/form';
import { Block } from '../../core/block';

export class ChangePasswordDialog extends Block {
  form!: Form;

  constructor() {
    super();
  }

  init() {
    this.form = new Form({
      controls: new Map<string, IFormControl>([
        [
          'oldPassword',
          {
            value: '',
            validators: [isNotEmptyValidator, isMinimalLength],
            minLength: 6,
            valid: false,
            error: '',
          },
        ],
        [
          'newPassword',
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

    this.form.init('change-password', this.formSubmit);
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
