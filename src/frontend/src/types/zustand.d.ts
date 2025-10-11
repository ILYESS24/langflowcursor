declare module "zustand" {
  export interface StoreApi<T> {
    getState: () => T;
    setState: (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
  }

  export type StateCreator<T, U = T> = (
    set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
    get: () => T,
    api: StoreApi<T>,
  ) => U;

  export function create<T, U = T>(
    stateCreator: StateCreator<T, U>,
  ): StoreApi<T> & U;

  export function subscribeWithSelector<T>(
    stateCreator: StateCreator<T>,
  ): StateCreator<T>;
}
