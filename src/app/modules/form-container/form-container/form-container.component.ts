import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FormFields } from '../../../types/form';

@Component({
  selector: 'tsc-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements OnInit {
  @Input() formFields: FormFields = {};

  private initFieldsValue = {};

  constructor() {}

  ngOnInit(): void {
    const copyObject = (obj: Record<string, unknown>) => JSON.parse(JSON.stringify(obj));
    this.initFieldsValue = copyObject(this.formFields);
  }

}
