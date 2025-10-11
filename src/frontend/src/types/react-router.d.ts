declare module 'react-router' {
  export interface Location {
    pathname: string;
    search: string;
    hash: string;
    state: any;
    key: string;
  }

  export interface History {
    push: (path: string | { pathname: string; search?: string; hash?: string; state?: any }) => void;
    replace: (path: string | { pathname: string; search?: string; hash?: string; state?: any }) => void;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
    location: Location;
  }

  export function useLocation(): Location;
  export function useHistory(): History;
  export function useParams(): Record<string, string>;
  export function useRouteMatch(): any;
}