import {
  isControlValid,
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
} from '../../core/validators';
import { IForm, IFormControl } from '../../core/form';
import { Component } from '../../types.ts';
import template from './add-user-dialog.html?raw';

export class AddUserDialog extends Component {
  form: IForm = {
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
  };
  selector = 'add-user-dialog';

  constructor() {
    super(
      template,
      [],
      {
        login_error: '',
      },
      {
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = this.form;
          if (isFormValid(form)) {
            const formValue: Record<string, string> = {};
            for (const [key, value] of form.controls) {
              formValue[key] = value.value;
            }
            console.log(formValue);
          }
        },
        onInput: (event) => {
          const controls = this.form.controls;
          const target = event.target as HTMLInputElement;

          if (controls.has(target.name)) {
            controls.get(target.name)!.value = target.value;
          }
        },
        onBlur: (event) => {
          const form = this.form;
          const target = event.target as HTMLInputElement;
          const control = form.controls.get(target.name)!;
          const { isValid, error } = isControlValid(control);

          control.valid = isValid;
          control.error = error;
          if (this.props[`${target.name}_error`] !== control.error) {
            this.props[`${target.name}_error`] = control.error;
          }
          form.valid = isFormValid(form);

          const formElement = document.getElementById(this.blockId)!;
          const submitButtonElement = formElement.querySelector(
            'button[type="submit"]'
          ) as HTMLButtonElement;
          submitButtonElement!.disabled = !form.valid;
        },
      }
    );
  }
}
