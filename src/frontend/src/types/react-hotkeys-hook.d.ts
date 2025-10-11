declare module 'react-hotkeys-hook' {
  import { RefObject } from 'react';

  export interface UseHotkeysOptions {
    enableOnFormTags?: boolean | string[];
    enableOnContentEditable?: boolean;
    preventDefault?: boolean | ((event: KeyboardEvent) => boolean);
    enableOnTags?: boolean | string[];
    splitKey?: string;
    scopes?: string | string[];
    keyup?: boolean;
    keydown?: boolean;
  }

  export function useHotkeys(
    keys: string,
    callback: (event: KeyboardEvent, handler: { keys: string; splitKey: string }) => void,
    options?: UseHotkeysOptions,
    deps?: any[]
  ): void;

  export function useHotkeys(
    keys: string,
    callback: (event: KeyboardEvent, handler: { keys: string; splitKey: string }) => void,
    deps?: any[]
  ): void;
}
