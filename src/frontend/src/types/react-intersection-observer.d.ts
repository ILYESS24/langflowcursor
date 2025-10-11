declare module 'react-intersection-observer' {
  import { RefObject } from 'react';

  export interface UseInViewOptions {
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
    skip?: boolean;
  }

  export function useInView(options?: UseInViewOptions): [RefObject<any>, boolean, any];
}