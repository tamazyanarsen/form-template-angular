import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiSwitchModule } from '../ui-switch/ui-switch.module';
import { FormContainerComponent } from './form-container/form-container.component';


@NgModule({
  declarations: [
    FormContainerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiSwitchModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [FormContainerComponent]
})
export class FormContainerModule {}
