import * as React from "react";
import {
  DragResizeEdge,
  IDragResizeEdgeProps,
  createAfterEdgeCallback,
} from "./ResizeEdge";

export interface IResizableSplitContainerProps {
  /**
   * initial container width
   */
  containerWidth?: number;
  /**
   * initial container height
   */
  containerHeight?: number;
  /**
   * minimum width of the container
   */
  minWidth?: number;
  /**
   * Standard react component className
   */
  className?: string;
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
  /**
   * embedded content on left
   */
  leftContent?: (width: number) => JSX.Element | null;
  /**
   * embedded content on right
   */
  rightContent?: (width: number) => JSX.Element | null;
}

export function ResizableSplitContainer(props: IResizableSplitContainerProps) {
  const {
    leftContent,
    rightContent,
    containerWidth = 600,
    containerHeight = 400,
    minWidth = 0,
    onDrag,
    onDragEnd,
    className,
    setContainerStyle,
  } = props;

  const [width, setWidth] = React.useState(containerWidth / 2);
  // currentWidth will track the persisted width after each resize ends.
  // updating currentWidth onDragEnd will help for next resize.
  const [currentWidth, setCurrentWidth] = React.useState(containerWidth / 2);

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
  const splitterEdgeProps: IDragResizeEdgeProps = {
    onDrag: createAfterEdgeCallback(currentWidth, onDragCallback),
    onDragEnd: createAfterEdgeCallback(currentWidth, onDragEndCallback),
  };

  const leftWidth = width;
  const rightWidth = containerWidth - width;
  // create container styles using custom function if any; if not, just set width
  const leftContainerStyle = setContainerStyle
    ? setContainerStyle(leftWidth)
    : { width: `${leftWidth}px` };
  const rightContainerStyle = setContainerStyle
    ? setContainerStyle(rightWidth)
    : { width: `${rightWidth}px` };

  // render
  const leftRenderer = leftContent ? leftContent : rightContent;
  const leftChild = leftRenderer && (
    <div className={className} style={leftContainerStyle}>
      {leftRenderer(leftWidth)}
    </div>
  );
  const rightRenderer = leftContent ? rightContent : null;
  const rightChild = rightRenderer && (
    <div className={className} style={rightContainerStyle}>
      {rightRenderer(rightWidth)}
    </div>
  );
  return (
    <div
      style={{
        width: containerWidth,
        height: containerHeight,
        display: "flex",
      }}
    >
      {leftChild}
      {<DragResizeEdge {...splitterEdgeProps} />}
      {rightChild}
    </div>
  );
}
