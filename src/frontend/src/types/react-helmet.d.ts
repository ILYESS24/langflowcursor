declare module "react-helmet" {
  import { ComponentType } from "react";

  export interface HelmetProps {
    title?: string;
    meta?: Array<{
      name?: string;
      property?: string;
      content?: string;
    }>;
    link?: Array<{
      rel?: string;
      href?: string;
    }>;
    script?: Array<{
      type?: string;
      src?: string;
      innerHTML?: string;
    }>;
  }

  export const Helmet: ComponentType<HelmetProps>;
}
