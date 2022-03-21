import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormFields } from '../../../types/form';
import { FormFieldType } from './../../../types/form';

@Component({
  selector: 'tsc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  formFields: FormFields = {
    name: { value: 'test name', type: FormFieldType.text },
    size: { value: 12, type: FormFieldType.number }
  }

  constructor() {}

}
