import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormContainerModule } from '../form-container/form-container.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormContainerModule
  ]
})
export class MainModule { }
