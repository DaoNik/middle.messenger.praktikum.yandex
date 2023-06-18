import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import value from './remove-user-dialog.html?raw';
import { Component } from '../../types.ts';

export class RemoveUserDialog extends Component {
  form!: Form;
  content = value;
  selector = 'remove-user-dialog';

  constructor() {
    super();
  }

  init() {}

  componentDidMount() {
    this.form = new Form({
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
    });

    this.form.init('remove-user', this.formSubmit);
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
