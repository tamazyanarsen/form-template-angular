import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { copyObject } from 'src/app/config/utils';

import { asBoolean } from '../../../config/utils';
import { FormFieldChange, FormFields, FormFieldType } from '../../../types/form';

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

  asBoolean = asBoolean;

  @Output() formFieldChange = new EventEmitter<FormFieldChange>();

  @Output() formChange = new EventEmitter<FormFields>();

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
  }

  formChangeEmit(): void {
    this.formChange.emit(this.formFields);
  }

  fieldChanged(fieldName: string, value: unknown): void {
    const validateList = this.formFields[fieldName].validate;
    if (validateList) {
      this.formFields[fieldName].isValid = validateList.every(e => e(value));
    }
    this.formFieldChange.emit({ fieldName, form: this.formFields });
  }

}
