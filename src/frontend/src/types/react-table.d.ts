declare module "react-table" {
  import { ComponentType } from "react";

  export interface Column {
    Header: string;
    accessor: string;
    Cell?: ComponentType<any>;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
  }

  export interface TableProps {
    columns: Column[];
    data: any[];
    getRowProps?: (row: any) => any;
    getCellProps?: (cell: any) => any;
  }

  export function useTable(props: TableProps): any;
  export const useSortBy: any;
  export const useFilters: any;
  export const usePagination: any;
}
