export type FormFieldInfo = {
  value: unknown
  type: FormFieldType
  label?: string
  options?: SelectFieldOption[]
  validate?: Array<(value: unknown) => boolean>
}

export type FormFields = {
  [fieldName: string]: FormFieldInfo
}

export enum FormFieldType {
  text = 'text',
  number = 'number',
  select = 'select',
  switch = 'switch'
}

export type SelectFieldOption = {
  value: string | number,
  label: string
}

export type FormFieldName = 'value' | 'type' | 'label' | 'options' | 'validate';
