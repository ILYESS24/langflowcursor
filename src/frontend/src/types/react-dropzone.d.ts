declare module 'react-dropzone' {
  import { ComponentType } from 'react';

  export interface DropzoneProps {
    onDrop: (acceptedFiles: File[], rejectedFiles: any[]) => void;
    accept?: string | string[];
    multiple?: boolean;
    maxSize?: number;
    minSize?: number;
    disabled?: boolean;
    children: (props: any) => React.ReactNode;
    className?: string;
    activeClassName?: string;
    acceptClassName?: string;
    rejectClassName?: string;
    disabledClassName?: string;
  }

  export const useDropzone: (options?: any) => any;
  export const Dropzone: ComponentType<DropzoneProps>;
}