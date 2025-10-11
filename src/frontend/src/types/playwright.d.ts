declare module "@playwright/test" {
  export interface Page {
    goto(url: string): Promise<void>;
    click(selector: string): Promise<void>;
    fill(selector: string, value: string): Promise<void>;
    waitForSelector(selector: string): Promise<void>;
    evaluate(fn: () => any): Promise<any>;
    screenshot(options?: any): Promise<Buffer>;
  }

  export interface BrowserContext {
    newPage(): Promise<Page>;
    close(): Promise<void>;
  }

  export interface Browser {
    newContext(): Promise<BrowserContext>;
    close(): Promise<void>;
  }

  export function test(
    name: string,
    fn: (args: { page: Page }) => Promise<void>,
  ): void;
  export function expect(value: any): any;
}

declare module "playwright/test" {
  export * from "@playwright/test";
}
