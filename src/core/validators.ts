import { IForm, IFormControl, IValidatorValue } from './form';

export function isNotEmptyValidator(value: string): IValidatorValue {
  return value.length > 0
    ? { isValid: true, error: '' }
    : { isValid: false, error: 'строка не должна быть пустой' };
}

export function isMinimalLength(
  value: string,
  minLength: number
): IValidatorValue {
  return value.length > minLength
    ? { isValid: true, error: '' }
    : { isValid: false, error: `строка должна быть не менее ${minLength}` };
}

export function isEmail(value: string): IValidatorValue {
  /** @description html 5 spec regExp for email */
  const reg =
    /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

  return reg.test(value)
    ? { isValid: true, error: '' }
    : { isValid: false, error: 'строка должна быть почтой' };
}

export function isPhoneNumber(value: string): IValidatorValue {
  const reg = /\d{7,15}/;

  return reg.test(value)
    ? { isValid: true, error: '' }
    : { isValid: false, error: 'строка должна быть номером телефона' };
}

export function isFormValid(form: IForm): boolean {
  let isValid = true;

  for (const value of form.controls.values()) {
    if (!value.valid) {
      isValid = false;
    }
  }

  return isValid;
}

export function isControlValid(control: IFormControl): IValidatorValue {
  const { value, minLength, validators } = control;
  const result: IValidatorValue = { isValid: true, error: '' };

  if (validators.includes(isNotEmptyValidator)) {
    const { isValid, error } = isNotEmptyValidator(value);
    result.isValid = result.isValid && isValid;
    result.error = error;
  }

  if (validators.includes(isMinimalLength)) {
    const { isValid, error } = isMinimalLength(value, minLength ?? 0);
    result.isValid = result.isValid && isValid;
    result.error = error;
  }

  if (validators.includes(isEmail)) {
    const { isValid, error } = isEmail(value);
    result.isValid = result.isValid && isValid;
    result.error = error;
  }

  if (validators.includes(isPhoneNumber)) {
    const { isValid, error } = isPhoneNumber(value);
    result.isValid = result.isValid && isValid;
    result.error = error;
  }

  return result;
}
