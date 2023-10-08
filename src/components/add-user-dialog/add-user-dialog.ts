import { isFormValid, isMinimalLength, isNotEmptyValidator } from '../../core';
import { blurHandler, IForm, IFormControl, inputHandler } from '../../core';
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
        onInput: (event: InputEvent) => {
          inputHandler(event, this.form.controls);
        },
        onBlur: (event: FocusEvent) => {
          blurHandler(event, this.form, this.props, this.element);
        },
        onDialogClose: () => {
          this.element?.classList.remove('overlay_opened');
        },
        onDialogNotClose: (event) => {
          event.stopPropagation();
        },
      }
    );
  }
}
