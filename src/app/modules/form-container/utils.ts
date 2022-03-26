import { FormFieldInfo, FormFields } from 'src/app/types/form';

import { FieldValidClb, FormFieldName } from '../../types/form';

export function getFormHandler(): ProxyHandler<FormFields> {
  return {
    get(target, p) {
      // console.log('getter target, p: ', target, p);
      return target[p as string];
    },
    set(target, p, value) {
      // console.log('setter target, p, value: ', target, p, value);
      try {
        target[p as string] = value;
        return true
      } catch (error) {
        console.log('error while set value: ', error);
        return false;
      }
    }
  };
}

export function getFormFieldHandler(fieldValidClb?: FieldValidClb<unknown>): ProxyHandler<FormFieldInfo> {
  return {
    get(target, p: FormFieldName) {
      // console.log('getter target, p: ', target, p);
      if (p in target) return target[p];
    },
    set(target, p: FormFieldName, value) {
      console.log('setter target, p, value: ', target, p, value);
      try {
        target[p] = value;
        if (target.validate) {
          const isValid = target.validate?.every(e => e(value));
          target.isValid = isValid;
          console.log('VALIDATE', target, isValid);
          fieldValidClb && fieldValidClb(p, isValid);
        }
        return true;
      } catch (error) {
        console.log('error while set value: ', error);
        return false;
      }
    }
  };
}

export function copyObject(obj: Record<string, unknown>) {
  return JSON.parse(JSON.stringify(obj))
};
