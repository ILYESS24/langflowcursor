declare module '@testing-library/react' {
  import { ReactElement } from 'react';

  export interface RenderResult {
    container: HTMLElement;
    getByText: (text: string) => HTMLElement;
    getByTestId: (testId: string) => HTMLElement;
    queryByTestId: (testId: string) => HTMLElement | null;
    getByRole: (role: string) => HTMLElement;
    getAllByRole: (role: string) => HTMLElement[];
    rerender: (ui: ReactElement) => void;
    unmount: () => void;
  }

  export function render(ui: ReactElement): RenderResult;
  export function fireEvent: {
    click: (element: HTMLElement) => void;
    change: (element: HTMLElement, value: string) => void;
    keyDown: (element: HTMLElement, options: any) => void;
  };
  export function screen: {
    getByText: (text: string) => HTMLElement;
    getByTestId: (testId: string) => HTMLElement;
    queryByTestId: (testId: string) => HTMLElement | null;
    getByRole: (role: string) => HTMLElement;
    getAllByRole: (role: string) => HTMLElement[];
  };
  export function waitFor(fn: () => void): Promise<void>;
}

declare module '@testing-library/jest-dom' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    toHaveClass(className: string): R;
    toHaveTextContent(text: string): R;
    toBeDisabled(): R;
  }
}
