import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { FieldValidClb, FormFields, FormFieldType } from '../../../types/form';
import { copyObject, getFormFieldHandler, getFormHandler } from '../utils';

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

  formProxy = new ReplaySubject<FormFields>(1);

  private initFieldsValue = {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if ('formFields' in changes) this.formFieldsKeys.next(Object.keys(this.formFields));
  }

  ngOnInit(): void {
    Object.keys(this.formFields).forEach(key => {
      if (this.formFields[key].isValid === undefined) this.formFields[key].isValid = true;
    });
    this.initFieldsValue = copyObject(this.formFields);
    console.log('this.initFieldsValue: ', this.initFieldsValue);

    this.formProxy.next(this.createFormProxy());
  }

  private createFormProxy(): FormFields {
    const resultProxy: FormFields = new Proxy(this.formFields, getFormHandler());
    Object.keys(resultProxy).forEach(key => {
      resultProxy[key] = new Proxy(resultProxy[key], getFormFieldHandler(this.getFieldValidClb()));
    });

    return resultProxy;
  }

  private getFieldValidClb(): FieldValidClb<void> {
    return (fieldName: string, valid: boolean) => {
      console.log('fieldName, valid:', fieldName, valid);
    }
  }

}
