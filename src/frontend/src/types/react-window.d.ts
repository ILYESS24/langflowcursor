declare module "react-window" {
  import { ComponentType } from "react";

  export interface FixedSizeListProps {
    height: number;
    itemCount: number;
    itemSize: number;
    children: ComponentType<any>;
    width?: number;
    className?: string;
  }

  export interface FixedSizeGridProps {
    height: number;
    width: number;
    columnCount: number;
    rowCount: number;
    columnWidth: number | ((index: number) => number);
    rowHeight: number | ((index: number) => number);
    children: ComponentType<any>;
    className?: string;
  }

  export const FixedSizeList: ComponentType<FixedSizeListProps>;
  export const FixedSizeGrid: ComponentType<FixedSizeGridProps>;
}
