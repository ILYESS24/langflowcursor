declare module "react-window-infinite-loader" {
  import { ComponentType } from "react";

  export interface InfiniteLoaderProps {
    isItemLoaded: (index: number) => boolean;
    itemCount: number;
    loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
    children: ComponentType<any>;
  }

  export const InfiniteLoader: ComponentType<InfiniteLoaderProps>;
}
