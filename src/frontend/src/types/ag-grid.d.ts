declare module "ag-grid-community" {
  export interface ColDef {
    field?: string;
    headerName?: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    resizable?: boolean;
    sortable?: boolean;
    filter?: boolean | string;
    cellRenderer?: any;
    cellEditor?: any;
    editable?: boolean | ((params: any) => boolean);
    valueGetter?: (params: any) => any;
    valueSetter?: (params: any) => boolean;
  }

  export interface ColGroupDef {
    headerName?: string;
    children: ColDef[];
  }

  export interface ValueParserParams {
    data: any;
    node: any;
    newValue: any;
    oldValue: any;
    colDef: ColDef;
  }

  export interface RowClickedEvent {
    data: any;
    node: any;
    event: Event;
  }

  export interface SelectionChangedEvent {
    api: any;
    columnApi: any;
  }
}

declare module "ag-grid-react" {
  import { Component } from "react";
  import { ColDef, ColGroupDef } from "ag-grid-community";

  export interface AgGridReactProps {
    columnDefs: (ColDef | ColGroupDef)[];
    rowData: any[];
    onRowClicked?: (event: any) => void;
    onSelectionChanged?: (event: any) => void;
    rowSelection?: string;
    suppressRowClickSelection?: boolean;
    cellSelection?: boolean;
    rowHeight?: number;
    headerHeight?: number;
    gridOptions?: any;
    tableOptions?: any;
    editable?: any[];
  }

  export default class AgGridReact extends Component<AgGridReactProps> {}
}
