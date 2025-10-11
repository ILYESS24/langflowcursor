declare module 'react-dnd' {
  import { ComponentType } from 'react';

  export interface DndProviderProps {
    backend: any;
    children: React.ReactNode;
  }

  export interface DragSourceProps {
    connectDragSource: (element: React.ReactElement) => React.ReactElement;
    isDragging: boolean;
  }

  export interface DropTargetProps {
    connectDropTarget: (element: React.ReactElement) => React.ReactElement;
    isOver: boolean;
    canDrop: boolean;
  }

  export const DndProvider: ComponentType<DndProviderProps>;
  export function useDrag(spec: any): [any, any];
  export function useDrop(spec: any): [any, any];
}

declare module 'react-dnd-html5-backend' {
  export const HTML5Backend: any;
}