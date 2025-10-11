declare module 'react-hot-toast' {
  export interface ToastOptions {
    duration?: number;
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    style?: any;
    className?: string;
    icon?: string | React.ReactNode;
    iconTheme?: {
      primary?: string;
      secondary?: string;
    };
    ariaProps?: {
      role?: string;
      'aria-live'?: string;
    };
  }

  export function toast(message: string, options?: ToastOptions): string;
  export function toast.success(message: string, options?: ToastOptions): string;
  export function toast.error(message: string, options?: ToastOptions): string;
  export function toast.loading(message: string, options?: ToastOptions): string;
  export function toast.promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: ToastOptions
  ): Promise<T>;
  export function toast.dismiss(id?: string): void;
  export function toast.remove(id?: string): void;

  export const Toaster: React.ComponentType<{
    position?: ToastOptions['position'];
    reverseOrder?: boolean;
    gutter?: number;
    containerClassName?: string;
    containerStyle?: any;
    toastOptions?: ToastOptions;
  }>;
}