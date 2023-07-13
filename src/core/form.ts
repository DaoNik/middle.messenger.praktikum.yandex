import { isControlValid, isFormValid } from './validators.ts';
import { PropertiesT } from './block.ts';

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

export function inputHandler(
  event: InputEvent,
  controls: Map<string, IFormControl>
) {
  const target = event.target as HTMLInputElement;

  if (controls.has(target.name)) {
    controls.get(target.name)!.value = target.value;
  }
}

export function blurHandler(
  event: FocusEvent,
  form: IForm,
  properties: PropertiesT,
  element: HTMLElement | null
) {
  const target = event.target as HTMLInputElement;
  const control = form.controls.get(target.name)!;
  const { isValid, error } = isControlValid(control);

  control.valid = isValid;
  control.error = error;
  if (properties[`${target.name}_error`] !== control.error) {
    properties[`${target.name}_error`] = control.error;
  }
  form.valid = isFormValid(form);

  const submitButtonElement = element?.querySelector(
    'button[type="submit"]'
  ) as HTMLButtonElement;
  submitButtonElement!.disabled = !form.valid;
}
