declare module 'vanilla-jsoneditor' {
  export interface JSONEditorProps {
    content?: any;
    readOnly?: boolean;
    onChange?: (content: any) => void;
  }

  export default class JSONEditor {
    constructor(container: HTMLElement, options?: JSONEditorProps);
    set(content: any): void;
    get(): any;
    updateProps(props: JSONEditorProps): void;
    destroy(): void;
  }
}
