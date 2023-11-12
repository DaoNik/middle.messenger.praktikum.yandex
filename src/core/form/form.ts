import { PropertiesT } from '../block.ts';
import { FormGroup } from './form-group.ts';

export interface IValidatorValue {
  isValid: boolean;
  error: string;
}

export function inputHandler(event: InputEvent, form: FormGroup) {
  const target = event.target as HTMLInputElement;

  form.getControl(target.name)?.setValue(event);
}

export function blurHandler(
  event: FocusEvent,
  form: FormGroup,
  properties: PropertiesT,
  element: HTMLElement | null
) {
  const target = event.target as HTMLInputElement;

  form.getControl(target.name)?.blur(event, form, properties, element);
}
