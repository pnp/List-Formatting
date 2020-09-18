import * as React from "react";
import {
  DragResizeEdge,
  IDragResizeEdgeProps,
  createAfterEdgeCallback,
  createBeforeEdgeCallback,
} from "./ResizeEdge";

export interface IResizableContainerProps {
  /**
   * Specifies if the BEFORE edge of the component is draggable
   */
  isBeforeEdgeDraggable?: boolean;
  /**
   * Specify if the AFTER edge of the component is draggable
   */
  isAfterEdgeDraggable?: boolean;
  /**
   * The initial width of the container
   */
  initialWidth: number;
  /**
   * minimum width of the container
   */
  minWidth?: number;
  /**
   * Standard react component className
   */
  className?: string;
  /**
   * The child `renderProp` you would like to wrap
   */
  children?: (width: number) => JSX.Element;
  /**
   * `setContainerStyle` allows you to set the style of the ResizableContainer based on the current width
   */
  setContainerStyle?: (width: number) => React.CSSProperties;
  /**
   * Callback when either edge of the container is being dragged
   */
  onDrag?: (width: number) => void;
  /**
   * Callback when either edge was dragged. This is a good place to save the latest width
   */
  onDragEnd?: (width: number) => void;
}

/**
 * Container that you can wrap your component in to resize its width.
 * This component can resize both the BEFORE and AFTER border (edge).
 * The BEFORE edge refers to the edge between your component and the previous element.
 * The AFTER edge refers to the edge between your component and the element after.
 * @param props IResizableContainerProps
 */
export function ResizableContainer(props: IResizableContainerProps) {
  const {
    isBeforeEdgeDraggable = false,
    isAfterEdgeDraggable = false,
    children,
    initialWidth,
    minWidth = 0,
    onDrag,
    onDragEnd,
    className,
    setContainerStyle,
  } = props;

  const [width, setWidth] = React.useState(initialWidth);
  // currentWidth will track the persisted width after each resize ends.
  // updating currentWidth onDragEnd will help for next resize.
  const [currentWidth, setCurrentWidth] = React.useState(initialWidth);

  const onDragCallback = (newWidth: number) => {
    // setWidth to cause re-render of the container
    // and get the correct container style applied
    newWidth = Math.max(newWidth, minWidth);
    if (width !== newWidth) {
      setWidth(newWidth);
    }
    // invoke callback if onDrag present
    if (onDrag) {
      onDrag(newWidth);
    }
  };

  const onDragEndCallback = (newWidth: number) => {
    // setCurrentWidth to store the most
    newWidth = Math.max(newWidth, minWidth);
    if (currentWidth !== newWidth) {
      setCurrentWidth(newWidth);
    }
    // invoke callback if onDragEnd present
    if (onDragEnd) {
      onDragEnd(newWidth);
    }
  };

  // create IDragResizeEdgeProps for the BEFORE/AFTER drag edges
  const beforeEdgeProps: IDragResizeEdgeProps = {
    onDrag: createBeforeEdgeCallback(currentWidth, onDragCallback),
    onDragEnd: createBeforeEdgeCallback(currentWidth, onDragEndCallback),
  };
  const afterEdgeProps: IDragResizeEdgeProps = {
    onDrag: createAfterEdgeCallback(currentWidth, onDragCallback),
    onDragEnd: createAfterEdgeCallback(currentWidth, onDragEndCallback),
  };
  // create container style using custom function if any; if not, just set width
  const containerStyle = setContainerStyle
    ? setContainerStyle(width)
    : { width: `${width}px` };

  // render
  return (
    <>
      {isBeforeEdgeDraggable ? <DragResizeEdge {...beforeEdgeProps} /> : null}
      <div className={className} style={containerStyle}>
        {children && children(width)}
      </div>
      {isAfterEdgeDraggable ? <DragResizeEdge {...afterEdgeProps} /> : null}
    </>
  );
}
