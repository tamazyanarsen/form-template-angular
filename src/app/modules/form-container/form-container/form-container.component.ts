import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { FormFields, FormFieldType } from '../../../types/form';

@Component({
  selector: 'tsc-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit, OnChanges {
  @Input() formFields: FormFields = {};

  formFieldsKeys = new ReplaySubject<string[]>(1);

  FormFieldType = FormFieldType;

  private initFieldsValue = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if ('formFields' in changes) this.formFieldsKeys.next(Object.keys(this.formFields));
  }

  ngOnInit(): void {
    const copyObject = (obj: Record<string, unknown>) => JSON.parse(JSON.stringify(obj));
    this.initFieldsValue = copyObject(this.formFields);
    console.log('this.initFieldsValue: ', this.initFieldsValue);
  }

  validateValueAfterChange(event, formFieldName: string): boolean {
    // return this.formFields[formFieldName].validate
  }

}
