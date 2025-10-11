declare module "styled-components" {
  import { ComponentType } from "react";

  export interface StyledComponentProps {
    className?: string;
    children?: React.ReactNode;
  }

  export function styled<T extends keyof JSX.IntrinsicElements>(
    tag: T,
  ): (
    strings: TemplateStringsArray,
    ...interpolations: any[]
  ) => ComponentType<JSX.IntrinsicElements[T] & StyledComponentProps>;

  export function styled<T extends ComponentType<any>>(
    component: T,
  ): (
    strings: TemplateStringsArray,
    ...interpolations: any[]
  ) => ComponentType<React.ComponentProps<T> & StyledComponentProps>;

  export const css: (
    strings: TemplateStringsArray,
    ...interpolations: any[]
  ) => any;
  export const keyframes: (
    strings: TemplateStringsArray,
    ...interpolations: any[]
  ) => any;
  export const ThemeProvider: ComponentType<{
    theme: any;
    children: React.ReactNode;
  }>;
}
