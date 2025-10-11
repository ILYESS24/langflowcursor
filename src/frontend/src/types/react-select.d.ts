declare module "react-select" {
  import { ComponentType } from "react";

  export interface SelectOption {
    value: string | number;
    label: string;
  }

  export interface SelectProps {
    options: SelectOption[];
    value?: SelectOption | SelectOption[];
    onChange?: (option: SelectOption | SelectOption[]) => void;
    isMulti?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    placeholder?: string;
    className?: string;
    styles?: any;
  }

  export const Select: ComponentType<SelectProps>;
  export default Select;
}
