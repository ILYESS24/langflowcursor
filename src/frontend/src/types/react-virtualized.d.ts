declare module "react-virtualized" {
  import { ComponentType } from "react";

  export interface AutoSizerProps {
    children: (props: { height: number; width: number }) => React.ReactNode;
    className?: string;
  }

  export interface ListProps {
    height: number;
    width: number;
    rowCount: number;
    rowHeight: number | ((params: { index: number }) => number);
    rowRenderer: (params: {
      index: number;
      key: string;
      style: any;
    }) => React.ReactNode;
    className?: string;
  }

  export const AutoSizer: ComponentType<AutoSizerProps>;
  export const List: ComponentType<ListProps>;
}
