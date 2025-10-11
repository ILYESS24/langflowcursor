declare module 'yup' {
  export interface StringSchema {
    required(message?: string): StringSchema;
    email(message?: string): StringSchema;
    min(length: number, message?: string): StringSchema;
    max(length: number, message?: string): StringSchema;
    matches(regex: RegExp, message?: string): StringSchema;
    url(message?: string): StringSchema;
    uuid(message?: string): StringSchema;
  }

  export interface NumberSchema {
    required(message?: string): NumberSchema;
    min(min: number, message?: string): NumberSchema;
    max(max: number, message?: string): NumberSchema;
    positive(message?: string): NumberSchema;
    negative(message?: string): NumberSchema;
    integer(message?: string): NumberSchema;
  }

  export interface BooleanSchema {
    required(message?: string): BooleanSchema;
    oneOf(values: boolean[], message?: string): BooleanSchema;
  }

  export interface ObjectSchema {
    shape(fields: any): ObjectSchema;
    required(message?: string): ObjectSchema;
    optional(): ObjectSchema;
  }

  export interface ArraySchema {
    of(schema: any): ArraySchema;
    min(length: number, message?: string): ArraySchema;
    max(length: number, message?: string): ArraySchema;
    required(message?: string): ArraySchema;
  }

  export const string: () => StringSchema;
  export const number: () => NumberSchema;
  export const boolean: () => BooleanSchema;
  export const object: () => ObjectSchema;
  export const array: () => ArraySchema;
  export const date: () => any;
  export const mixed: () => any;

  export function validate(value: any, schema: any): Promise<any>;
  export function validateSync(value: any, schema: any): any;
}