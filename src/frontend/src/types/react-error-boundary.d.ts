declare module 'react-error-boundary' {
  import { ComponentType, ReactNode } from 'react';

  export interface ErrorBoundaryProps {
    children: ReactNode;
    FallbackComponent?: ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
    onError?: (error: Error, errorInfo: any) => void;
    onReset?: () => void;
    resetKeys?: any[];
    fallbackRender?: (props: { error: Error; resetErrorBoundary: () => void }) => ReactNode;
  }

  export const ErrorBoundary: ComponentType<ErrorBoundaryProps>;
  export const withErrorBoundary: <P extends object>(
    Component: ComponentType<P>,
    errorBoundaryProps?: ErrorBoundaryProps
  ) => ComponentType<P>;
}