declare module "react-syntax-highlighter" {
  import { ComponentType } from "react";

  export interface SyntaxHighlighterProps {
    language?: string;
    style?: any;
    children?: string;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: any;
    wrapLines?: boolean;
    wrapLongLines?: boolean;
    codeTagProps?: any;
    useInlineStyles?: boolean;
    customStyle?: any;
    className?: string;
  }

  export const Light: ComponentType<SyntaxHighlighterProps>;
  export const Prism: ComponentType<SyntaxHighlighterProps>;
  export const PrismLight: ComponentType<SyntaxHighlighterProps>;
}
