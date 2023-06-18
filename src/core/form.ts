import { isControlValid, isFormValid } from './validators';

export interface IValidatorValue {
  isValid: boolean;
  error: string;
}

export interface IFormControl {
  value: string;
  validators: Array<(...parameters: never[]) => IValidatorValue>;
  minLength?: number;
  valid: boolean;
  error: string;
}

export interface IForm {
  controls: Map<string, IFormControl>;
  valid: boolean;
}

export class Form {
  form: IForm;

  constructor(form: IForm) {
    this.form = form;
  }

  init(
    formName: string,
    submitCallback: (formValue: Record<string, string>) => void
  ): void {
    const formElement = document.querySelector<HTMLFormElement>(
      `form[name=${formName}]`
    );

    if (!formElement) return;

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (isFormValid(this.form)) {
        const formValue: Record<string, string> = {};
        for (const [key, value] of this.form.controls) {
          formValue[key] = value.value;
        }
        submitCallback(formValue);
      }
    });
    const submitButtonElement = formElement.querySelector('button')!;
    submitButtonElement.disabled = !this.form.valid;

    // eslint-disable-next-line unicorn/prefer-spread
    for (const input of Array.from(formElement.querySelectorAll('input'))) {
      input.addEventListener('input', () => {
        if (this.form.controls.has(input.name)) {
          this.form.controls.get(input.name)!.value = input.value;
        }
      });
      input.addEventListener('blur', () => {
        const control = this.form.controls.get(input.name)!;
        const { isValid, error } = isControlValid(control);

        control.valid = isValid;
        control.error = error;
        console.log(control);
        this.form.valid = isFormValid(this.form);
        submitButtonElement!.disabled = !this.form.valid;
      });
    }
  }
}
