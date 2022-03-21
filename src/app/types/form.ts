export type FormFields = {
  [fieldName: string]: { value: unknown, type: FormFieldType, label?: string, options?: SelectFieldOption[] }
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
