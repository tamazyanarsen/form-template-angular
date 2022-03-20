export type FormFields = {
  [fieldName: string]: { value: unknown, type: FormFieldType }
}

export enum FormFieldType {
  text = 'text',
  number = 'number',
  select = 'select',
  switch = 'switch'
}
