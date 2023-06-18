import {
  isEmail,
  isMinimalLength,
  isNotEmptyValidator,
  isPhoneNumber,
} from '../../core/validators';
import { IFormControl, Form } from '../../core/form';
import { Component } from '../../types.ts';
import template from './change-user-data-dialog.html?raw';

export class ChangeUserDataDialog extends Component {
  form!: Form;
  selector = 'change-user-data-dialog';

  constructor() {
    super(template, [], {
      email_error: '',
      login_error: '',
      first_name_error: '',
      second_name_error: '',
      phone_error: '',
    });
  }

  componentDidMount() {
    this.form = new Form(
      {
        controls: new Map<string, IFormControl>([
          [
            'email',
            {
              value: '',
              validators: [isNotEmptyValidator, isMinimalLength, isEmail],
              minLength: 4,
              valid: false,
              error: '',
            },
          ],
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
            'first_name',
            {
              value: '',
              validators: [isNotEmptyValidator, isMinimalLength],
              minLength: 4,
              valid: false,
              error: '',
            },
          ],
          [
            'second_name',
            {
              value: '',
              validators: [isNotEmptyValidator, isMinimalLength],
              minLength: 4,
              valid: false,
              error: '',
            },
          ],
          [
            'phone',
            {
              value: '',
              validators: [isNotEmptyValidator, isMinimalLength, isPhoneNumber],
              minLength: 8,
              valid: false,
              error: '',
            },
          ],
        ]),
        valid: false,
      },
      this.props
    );

    this.form.init('change-data', this.formSubmit);
    super.componentDidMount();
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
