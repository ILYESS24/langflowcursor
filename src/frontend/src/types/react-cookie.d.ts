declare module 'react-cookie' {
  export interface Cookies {
    get: (name: string) => string | undefined;
    set: (name: string, value: string, options?: any) => void;
    remove: (name: string, options?: any) => void;
    getAll: () => Record<string, string>;
  }

  export function useCookies(): [Cookies, (name: string, value: string, options?: any) => void, (name: string, options?: any) => void];
}
