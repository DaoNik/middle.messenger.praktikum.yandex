import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { IFormControl, Form } from '../../core/form';
import { Component } from '../../types.ts';
import template from './change-password-dialog.html?raw';

export class ChangePasswordDialog extends Component {
  form!: Form;
  selector = 'change-password-dialog';

  constructor() {
    super(template, [], {
      oldPassword_error: '',
      newPassword_error: '',
      password_repeat_error: '',
    });
  }

  componentDidMount() {
    this.form = new Form(
      {
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
      },
      this.props
    );

    this.form.init('change-password', this.formSubmit);
    super.componentDidMount();
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
