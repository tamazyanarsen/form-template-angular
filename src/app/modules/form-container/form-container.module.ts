import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormContainerComponent } from './form-container/form-container.component';



@NgModule({
  declarations: [
    FormContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FormContainerComponent]
})
export class FormContainerModule { }
