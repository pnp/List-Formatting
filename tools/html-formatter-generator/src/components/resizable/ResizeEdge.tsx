import * as React from "react";

export interface IDragResizeEdgeProps {
  onDrag?: (pixelsTowardNextElementDragged: number) => void;
  onDragEnd?: (pixelsTowardNextElementDragged: number) => void;
  orientation?: "horizontal" | "vertical";
}

/**
 * DragResizeEdge is used for resizing component immediately BEFORE or AFTER
 */
export function DragResizeEdge(props: IDragResizeEdgeProps) {
  const _start = React.useRef(0);
  const { onDrag, onDragEnd, orientation = "horizontal" } = props;
  const isVertical = orientation === "vertical";

  const _onMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    _start.current = isVertical ? event.clientY : event.clientX;
    window.addEventListener("mousemove", _onMouseMove, true);
    window.addEventListener("mouseup", _onMouseUp, true);
  };

  const _onMouseUp = (event: MouseEvent) => {
    window.removeEventListener("mousemove", _onMouseMove, true);
    window.removeEventListener("mouseup", _onMouseUp, true);
    const endPos = isVertical ? event.clientY : event.clientX;
    _reportDelta(_start.current, endPos, onDragEnd);
  };

  const _onMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const endPos = isVertical ? event.clientY : event.clientX;
    _reportDelta(_start.current, endPos, onDrag);
  };

  const _reportDelta = (
    start: number,
    end: number,
    reportFunc?: (delta: number) => void
  ) => {
    const delta = end - start;
    if (delta && reportFunc) {
      reportFunc(delta);
    }
  };

  const style: React.CSSProperties = isVertical
    ? {
        height: "4px",
        width: "100%",
        cursor: "ns-resize",
        background: "#cbd5e1",
        borderRadius: "2px",
        transition: "background 0.15s ease",
        flexShrink: 0,
      }
    : {
        width: "4px",
        cursor: "ew-resize",
        background: "#cbd5e1",
        borderRadius: "2px",
        transition: "background 0.15s ease",
        flexShrink: 0,
      };

  return (
    <div
      style={style}
      onMouseDown={_onMouseDown}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#94a3b8"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#cbd5e1"; }}
    />
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
