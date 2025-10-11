declare module "dompurify" {
  interface DOMPurify {
    sanitize(dirty: string, config?: any): string;
    addHook(
      hook: string,
      cb: (currentNode: Element, data: any, config: any) => void,
    ): void;
    removeHook(hook: string): void;
    removeAllHooks(): void;
  }

  const DOMPurify: DOMPurify;
  export default DOMPurify;
}
