import { isMinimalLength, isNotEmptyValidator } from '../../core/validators';
import { Form, IFormControl } from '../../core/form';
import { Component } from '../../types.ts';
import template from './add-user-dialog.html?raw';

export class AddUserDialog extends Component {
  form!: Form;
  content = template;
  selector = 'add-user-dialog';

  constructor() {
    super();
  }

  init(): void {}

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

    this.form.init('add-user', this.formSubmit);
  }

  formSubmit(formValue: Record<string, string>): void {
    console.log(formValue);
  }
}
