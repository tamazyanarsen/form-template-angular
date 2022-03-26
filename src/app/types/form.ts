export interface FormFieldInfo {
  value: unknown
  type: FormFieldType
  label?: string
  options?: SelectFieldOption[]
  validate?: Array<(value: unknown) => boolean>,
  isValid?: boolean
}

export interface FormFields {
  [fieldName: string]: FormFieldInfo
}

export enum FormFieldType {
  text = 'text',
  number = 'number',
  select = 'select',
  switch = 'switch'
}

export interface SelectFieldOption {
  value: string | number,
  label: string
}

export type FormFieldName = 'value' | 'type' | 'label' | 'options' | 'validate';

export type FieldValidClb<T> = (valid: boolean) => T;

export interface FormFieldChange {
  fieldName: string,
  form: FormFields
}
