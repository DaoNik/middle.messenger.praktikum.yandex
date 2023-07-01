import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { Component } from '../../types.ts';
import template from './add-user-dialog.html?raw';

export class AddUserDialog extends Component {
  form!: Form;
  selector = 'add-user-dialog';

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

    this.form.init('add-user', this.formSubmit);

    super.componentDidMount();
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
