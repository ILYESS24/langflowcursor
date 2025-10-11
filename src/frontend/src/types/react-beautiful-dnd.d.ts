declare module "react-beautiful-dnd" {
  import { ComponentType } from "react";

  export interface DroppableProps {
    droppableId: string;
    children: (provided: any, snapshot: any) => React.ReactNode;
    direction?: "horizontal" | "vertical";
    type?: string;
    isDropDisabled?: boolean;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: any, snapshot: any) => React.ReactNode;
    isDragDisabled?: boolean;
  }

  export interface DragDropContextProps {
    onDragEnd: (result: any) => void;
    children: React.ReactNode;
  }

  export const DragDropContext: ComponentType<DragDropContextProps>;
  export const Droppable: ComponentType<DroppableProps>;
  export const Draggable: ComponentType<DraggableProps>;
}
