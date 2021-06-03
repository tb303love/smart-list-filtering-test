import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonComponent } from './toggle-button.component';

@NgModule({
  declarations: [ToggleButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ToggleButtonComponent],
})
export class ToggleButtonModule {}
