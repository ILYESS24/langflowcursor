declare module "web-vitals" {
  export interface Metric {
    name: string;
    value: number;
    delta: number;
    id: string;
    navigationType: string;
  }

  export function getCLS(onPerfEntry?: (metric: Metric) => void): void;
  export function getFID(onPerfEntry?: (metric: Metric) => void): void;
  export function getFCP(onPerfEntry?: (metric: Metric) => void): void;
  export function getLCP(onPerfEntry?: (metric: Metric) => void): void;
  export function getTTFB(onPerfEntry?: (metric: Metric) => void): void;
}
