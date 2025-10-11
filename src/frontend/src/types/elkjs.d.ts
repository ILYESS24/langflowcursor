declare module "elkjs/lib/elk.bundled.js" {
  export interface ElkNode {
    id: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    children?: ElkNode[];
    edges?: any[];
    layoutOptions?: Record<string, string>;
  }

  export default class ELK {
    constructor();
    layout(graph: ElkNode): Promise<ElkNode>;
  }
}
