import * as React from "react";

export interface IDragResizeEdgeProps {
  onDrag?: (pixelsTowardNextElementDragged: number) => void;
  onDragEnd?: (pixelsTowardNextElementDragged: number) => void;
}

/**
 * DragResizeEdge is used for resizing component immediately BEFORE or AFTER
 */
export function DragResizeEdge(props: IDragResizeEdgeProps) {
  const _start = React.useRef(0);
  const { onDrag, onDragEnd } = props;

  const _onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    _start.current = event.clientX;
    // only register the MouseUp and MouseMove event if the drag target is MouseDown-ed
    window.addEventListener("mousemove", _onMouseMove, true);
    window.addEventListener("mouseup", _onMouseUp, true);
  };

  const _onMouseUp = (event: MouseEvent) => {
    // remove MOVE and UP listeners when mouse UP to stop
    window.removeEventListener("mousemove", _onMouseMove, true);
    window.removeEventListener("mouseup", _onMouseUp, true);
    _reportNewWidth(_start.current, event.clientX, onDragEnd);
  };

  const _onMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    _reportNewWidth(_start.current, event.clientX, onDrag);
  };

  const _reportNewWidth = (
    start: number,
    end: number,
    reportFunc?: (width: number) => void
  ) => {
    const pixelsTowardNextElementDragged = end - start;
    if (pixelsTowardNextElementDragged && reportFunc) {
      reportFunc(pixelsTowardNextElementDragged);
    }
  };

  return (
    <div
      style={{
        border: "0.5px solid black",
        width: "2px",
        margin: "10px 0",
        cursor: "ew-resize",
      }}
      onMouseDown={_onMouseDown}
    >
      <div
        style={{
          zIndex: 286,
          position: "relative",
          width: "2px",
          cursor: "ew-resize",
          height: "100%",
        }}
      ></div>
    </div>
  );
}

/**
 * Helper function to create callbacks for the BEFORE edge.
 * This heper function applies the correct negative sign to minus from the currentWidth.
 * The sign applied assumes that the callbacks accept `pixelsTowardNextElementDragged`
 * @param currentWidth
 * @param callback
 */
export function createBeforeEdgeCallback(
  currentWidth: number,
  callback: (newWidth: number) => void
) {
  return (pixelsTowardNextElementDragged: number) =>
    callback(currentWidth - pixelsTowardNextElementDragged);
}
/**
 * Helper function to create callbacks for the AFTER edge.
 * This heper function applies the correct positive sign to add to the currentWidth.
 * The sign applied assumes that the callbacks accept `pixelsTowardNextElementDragged`
 * @param currentWidth
 * @param callback
 */
export function createAfterEdgeCallback(
  currentWidth: number,
  callback: (newWidth: number) => void
) {
  return (pixelsTowardNextElementDragged: number) =>
    callback(currentWidth + pixelsTowardNextElementDragged);
}
