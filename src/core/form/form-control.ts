import { IValidatorValue } from './form.ts';
import { PropertiesT } from '../block.ts';
import { isControlValid, isFormValid } from '../validators.ts';
import { FormGroup } from './form-group.ts';

export class FormControl {
  valid = false;
  error = '';

  constructor(
    public value: string = '',
    public validators: Array<(...parameters: never[]) => IValidatorValue> = [],
    public minLength?: number
  ) {}

  setValue(event: InputEvent): void {
    const { value } = event.target as HTMLInputElement;

    if (this.value === value) return;

    this.value = value;

    const { isValid, error } = isControlValid(
      value,
      this.validators,
      this.minLength
    );

    this.error = error;
    this.valid = isValid;
  }

  blur(
    event: FocusEvent,
    form: FormGroup,
    properties: PropertiesT,
    element: HTMLElement | null
  ): void {
    const target = event.target as HTMLInputElement;

    if (properties[`${target.name}_error`] !== this.error) {
      properties[`${target.name}_error`] = this.error;
    }

    form.valid = isFormValid(form);

    const submitButtonElement = element?.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    submitButtonElement!.disabled = !form.valid;
  }
}
