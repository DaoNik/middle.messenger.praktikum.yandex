import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import template from './remove-user-dialog.html?raw';
import { Component } from '../../types.ts';

export class RemoveUserDialog extends Component {
  form!: Form;
  selector = 'remove-user-dialog';

  constructor() {
    super(template, [], {
      login_error: '',
    });
  }

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
        ]),
        valid: false,
      },
      this.props
    );

    this.form.init('remove-user', this.formSubmit);

    super.componentDidMount();
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
