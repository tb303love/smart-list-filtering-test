import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimplePaginationComponent } from './simple-pagination.component';

@NgModule({
  declarations: [SimplePaginationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SimplePaginationComponent],
})
export class SimplePaginationModule {}
