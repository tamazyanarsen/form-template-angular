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
    name: {
      value: 'test name', type: FormFieldType.text, validate: [
        value => {
          console.log('value from validate function', value);
          return (<string>value).length < 10;
        }
      ]
    },
    size: {
      value: 12, type: FormFieldType.number,
      validate: [value => <number>value < 100]
    },
    choose: {
      value: 1, type: FormFieldType.select, label: 'Выбор из списка', options: [
        { label: 'Первое значение', value: 1 },
        { label: 'Второе значение', value: 2 },
        { label: 'Третье значение', value: 3 },
        { label: 'Четвертое значение', value: 4 },
      ]
    }
  }

  constructor() {}

  test(...args: unknown[]): void {
    console.log('args: ', args);
  }

}
