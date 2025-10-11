declare module "react-router-dom" {
  import { ComponentType } from "react";

  export interface BrowserRouterProps {
    basename?: string;
    children?: React.ReactNode;
  }

  export interface RouteProps {
    path?: string;
    exact?: boolean;
    component?: ComponentType<any>;
    render?: (props: any) => React.ReactNode;
    children?: React.ReactNode;
  }

  export interface LinkProps {
    to: string;
    children?: React.ReactNode;
    className?: string;
    style?: any;
    replace?: boolean;
  }

  export interface NavLinkProps extends LinkProps {
    activeClassName?: string;
    activeStyle?: any;
    exact?: boolean;
    isActive?: (match: any, location: any) => boolean;
  }

  export const BrowserRouter: ComponentType<BrowserRouterProps>;
  export const Route: ComponentType<RouteProps>;
  export const Link: ComponentType<LinkProps>;
  export const NavLink: ComponentType<NavLinkProps>;
  export const Switch: ComponentType<{ children: React.ReactNode }>;
  export const Redirect: ComponentType<{
    to: string;
    from?: string;
    exact?: boolean;
  }>;
  export const useNavigate: () => (to: string | number, options?: any) => void;
  export const useLocation: () => any;
  export const useParams: () => Record<string, string>;
}
