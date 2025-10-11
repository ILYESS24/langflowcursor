declare module 'react-markdown' {
  import { ComponentType } from 'react';

  export interface ReactMarkdownProps {
    children: string;
    components?: {
      [key: string]: ComponentType<any>;
    };
    remarkPlugins?: any[];
    rehypePlugins?: any[];
    className?: string;
  }

  export const ReactMarkdown: ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}