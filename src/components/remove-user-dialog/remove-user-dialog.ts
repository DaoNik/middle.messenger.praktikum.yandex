import {
  isFormValid,
  isMinimalLength,
  isNotEmptyValidator,
} from '../../core/validators';
import {
  blurHandler,
  IForm,
  IFormControl,
  inputHandler,
} from '../../core/form';
import template from './remove-user-dialog.html?raw';
import { Component } from '../../types.ts';

export class RemoveUserDialog extends Component {
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
  selector = 'remove-user-dialog';

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
