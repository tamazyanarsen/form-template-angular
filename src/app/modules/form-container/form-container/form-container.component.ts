import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';

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

  formGroup = new Subject<FormGroup>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if ('formFields' in changes) this.formFieldsKeys.next(Object.keys(this.formFields));
  }

  ngOnInit(): void {
    this.formGroup.next(this.createFormGroup());
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
