declare module "swagger-ui-react" {
  import { ComponentType } from "react";

  export interface SwaggerUIProps {
    url?: string;
    spec?: any;
    docExpansion?: "list" | "full" | "none";
    defaultModelsExpandDepth?: number;
    defaultModelExpandDepth?: number;
    defaultModelRendering?: "example" | "model";
    displayOperationId?: boolean;
    displayRequestDuration?: boolean;
    filter?: boolean | string;
    layout?: string;
    maxDisplayedTags?: number;
    showExtensions?: boolean;
    showCommonExtensions?: boolean;
    tryItOutEnabled?: boolean;
    requestInterceptor?: (request: any) => any;
    responseInterceptor?: (response: any) => any;
    onComplete?: (system: any) => void;
    onFailure?: (error: any) => void;
    plugins?: any[];
    presets?: any[];
    deepLinking?: boolean;
    showMutatedRequest?: boolean;
    supportedSubmitMethods?: string[];
    validatorUrl?: string | null;
    withCredentials?: boolean;
    requestSnippetsEnabled?: boolean;
    requestSnippets?: any;
    syntaxHighlight?: {
      activate?: boolean;
      theme?: string;
    };
  }

  export const SwaggerUI: ComponentType<SwaggerUIProps>;
  export default SwaggerUI;
}
