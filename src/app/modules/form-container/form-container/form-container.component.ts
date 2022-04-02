import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

import { FormFields, FormFieldType, FormStatus } from '../../../types/form';

@Component({
  selector: 'tsc-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnChanges {
  @Input() formFields: FormFields = {};

  @Output() formGroupChange = new EventEmitter<unknown>();

  @Output() submitForm = new EventEmitter<unknown>();

  formFieldsKeys = new ReplaySubject<string[]>(1);

  FormFieldType = FormFieldType;

  formGroup?: FormGroup;

  FormStatus = FormStatus;

  private initFormValue: Record<string, unknown> = {};

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if ('formFields' in changes) this.formFieldsKeys.next(Object.keys(this.formFields));
    const newFormGroup = this.createFormGroup();
    this.initFormValue = Object.assign({}, newFormGroup.value);
    console.log('this.initFormValue: ', this.initFormValue);
    this.formGroup = newFormGroup;
    this.sendFormChangeEvent();
  }

  private sendFormChangeEvent(): void {
    this.formGroup?.valueChanges.subscribe(formValue => this.formGroupChange.emit(formValue));
  }

  test(...args: unknown[]): void {
    console.log(args);
  }

  resetForm(): void {
    this.formGroup?.patchValue(Object.assign({}, this.initFormValue));
  }

  getFormControlValidClass(formGroupValue: FormGroup, fieldName: string): Record<string, boolean> {
    return {
      valid: formGroupValue.get(fieldName)?.status === FormStatus.VALID,
      invalid: formGroupValue.get(fieldName)?.status === FormStatus.INVALID
    }
  }

  private createFormGroup(): FormGroup {
    const newFormGroup = this.fb.group({});
    this.formFieldsKeys.subscribe(keys => keys.forEach(fieldName => {
      newFormGroup.addControl(
        fieldName,
        this.fb.control(
          this.formFields[fieldName].value,
          [...(this.formFields[fieldName].validate || [])]
        )
      );
    }));
    console.log('newFormGroup: ', newFormGroup);
    return newFormGroup;
  }

}
