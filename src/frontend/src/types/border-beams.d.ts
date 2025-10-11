declare module '../../../components/ui/border-beams' {
  import { ComponentType } from 'react';

  export interface BorderBeamProps {
    className?: string;
    size?: number;
    duration?: number;
    borderWidth?: number;
    colorFrom?: string;
    colorTo?: string;
    delay?: number;
  }

  export const BorderBeam: ComponentType<BorderBeamProps>;
}
