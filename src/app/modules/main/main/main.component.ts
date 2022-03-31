import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Validators } from '@angular/forms';

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
      value: 'test name',
      type: FormFieldType.text,
      validate: [
        control => {
          console.log('value from validate function', control.value);
          return (<string>control.value).length < 10 ? null : { error: 'описание текстовой ошибки' };
        },
        Validators.required
      ]
    },
    size: {
      value: 12,
      type: FormFieldType.number,
      validate: [control => +control.value < 100 ? null : { error: 'описание ошибки, проверка числа' }]
    },
    choose: {
      value: 1,
      type: FormFieldType.select,
      label: 'Выбор из списка',
      options: [
        { label: 'Первое значение', value: 1 },
        { label: 'Второе значение', value: 2 },
        { label: 'Третье значение', value: 3 },
        { label: 'Четвертое значение', value: 4 },
      ]
    },
    isMain: {
      value: true,
      type: FormFieldType.switch,
      label: 'Тестовое поле для checkbox'
    }
  }

  constructor() {}

  test(...args: unknown[]): void {
    console.log('args: ', args);
  }

}
