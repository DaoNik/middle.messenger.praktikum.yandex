import { FormControl } from './form-control.ts';

type Controls<T> = {
  [P in keyof T]: FormControl;
};

export class FormGroup<T = any> {
  valid: boolean = false;

  constructor(public readonly controls: Controls<T>) {}

  getRawValue(): T {
    const rawValue: Record<string, string> = {};

    for (const [key, control] of Object.entries<FormControl>(this.controls)) {
      rawValue[key] = control.value;
    }

    return rawValue as T;
  }

  getControl(key: string): FormControl | null {
    if (Object.getOwnPropertyNames(this.controls).includes(key)) {
      return this.controls[key as keyof T];
    }

    return null;
  }
}
