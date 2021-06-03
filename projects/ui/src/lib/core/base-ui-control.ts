import { Directive, forwardRef, Provider } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

export function createControlProvider(component: any): Provider {
  return {
    provide: forwardRef(() => BaseFormControl),
    useExisting: component,
    multi: true,
  };
}

@Directive()
export abstract class BaseFormControl<T> implements ControlValueAccessor {
  protected onChange = (v: T) => {};
  protected onTouched = () => {};
  protected ngControl!: NgControl;

  constructor(public control: NgControl) {
    this.ngControl = control;
  }

  abstract writeValue(obj: T): void;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.ngControl.control?.disable();
    } else {
      this.ngControl.control?.enable();
    }
  }

  get value(): T {
    return this.ngControl.value;
  }
}
