import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseFormControl, createControlProvider } from '../core';

type ToggleButtonModel = {
  value: string;
  checked: boolean;
};

@Component({
  selector: 'ui-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createControlProvider(ToggleButtonComponent)],
})
export class ToggleButtonComponent extends BaseFormControl<ToggleButtonModel> {
  constructor(control: NgControl, private cdr: ChangeDetectorRef) {
    super(control);
    this.ngControl.valueAccessor = this;
  }
  // Implemented from `BaseFormControl`
  writeValue(obj: ToggleButtonModel): void {}

  onClickButton(): void {
    this.onChange({
      ...this.value,
      checked: !this.value.checked,
    });
    this.cdr.markForCheck();
  }
}
