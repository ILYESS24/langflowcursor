declare module 'react-hook-form' {
  import { ComponentType } from 'react';

  export interface UseFormReturn<T> {
    register: (name: keyof T, options?: any) => any;
    handleSubmit: (onSubmit: (data: T) => void) => (e?: any) => void;
    watch: (name?: keyof T) => any;
    setValue: (name: keyof T, value: any) => void;
    getValues: (name?: keyof T) => any;
    formState: {
      errors: Partial<Record<keyof T, any>>;
      isSubmitting: boolean;
      isValid: boolean;
      isDirty: boolean;
      touchedFields: Partial<Record<keyof T, boolean>>;
      dirtyFields: Partial<Record<keyof T, boolean>>;
    };
    reset: (values?: Partial<T>) => void;
    clearErrors: (name?: keyof T) => void;
    setError: (name: keyof T, error: any) => void;
  }

  export function useForm<T = any>(options?: any): UseFormReturn<T>;
  export function useController<T = any>(props: any): any;
  export function useWatch<T = any>(props: any): T;
  export function useFormContext<T = any>(): UseFormReturn<T>;

  export const Controller: ComponentType<any>;
  export const FormProvider: ComponentType<any>;
}