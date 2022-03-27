import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiSwitchComponent } from './ui-switch/ui-switch.component';



@NgModule({
  declarations: [
    UiSwitchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [UiSwitchComponent]
})
export class UiSwitchModule {}
