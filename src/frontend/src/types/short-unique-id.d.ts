declare module 'short-unique-id' {
  export default class ShortUniqueId {
    constructor(options?: {
      length?: number;
      dictionary?: string;
    });
    randomUUID(): string;
    sequentialUUID(): string;
    uuid(): string;
  }
}
