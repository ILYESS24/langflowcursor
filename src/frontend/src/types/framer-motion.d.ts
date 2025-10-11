declare module "framer-motion" {
  import { ComponentType, ReactNode } from "react";

  export interface MotionProps {
    children?: ReactNode;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    drag?: boolean | string;
    dragConstraints?: any;
    dragElastic?: number;
    dragMomentum?: boolean;
    onDrag?: (event: any, info: any) => void;
    onDragStart?: (event: any, info: any) => void;
    onDragEnd?: (event: any, info: any) => void;
    className?: string;
    style?: any;
  }

  export const motion: {
    div: ComponentType<MotionProps>;
    span: ComponentType<MotionProps>;
    button: ComponentType<MotionProps>;
    [key: string]: ComponentType<MotionProps>;
  };

  export const AnimatePresence: ComponentType<{
    children?: ReactNode;
    mode?: "wait" | "sync" | "popLayout";
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
}
