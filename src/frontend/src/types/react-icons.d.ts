declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  export const FaDiscord: IconType;
  export const FaGithub: IconType;
  export const FaApple: IconType;
}

declare module 'react-icons' {
  import { ComponentType, SVGProps } from 'react';
  export type IconType = ComponentType<SVGProps<SVGSVGElement>>;
}
