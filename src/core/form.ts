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
