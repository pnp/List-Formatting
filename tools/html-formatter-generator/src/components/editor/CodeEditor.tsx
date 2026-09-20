import * as React from "react";
import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";
import {
  DragResizeEdge,
  createAfterEdgeCallback,
} from "../resizable/ResizeEdge";

const monacoEditorProps: MonacoEditorProps = {
  options: {
    automaticLayout: true,
    wordWrap: "on",
    wordWrapMinified: true,
    wrappingIndent: "indent",
    tabSize: 2,
    minimap: { enabled: false },
  },
};

export interface ICodeEditorProps {
  htmlEditorRef: React.MutableRefObject<any>;
  cssEditorRef: React.MutableRefObject<any>;
  onChange: () => void;
  defaultHtml?: string;
  defaultCss?: string;
}

export const CodeEditor: React.FC<ICodeEditorProps> = (props) => {
  const { htmlEditorRef, cssEditorRef, onChange, defaultHtml, defaultCss } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [topHeight, setTopHeight] = React.useState(0);
  const [currentTopHeight, setCurrentTopHeight] = React.useState(0);

  // Initialize heights based on container size
  React.useEffect(() => {
    if (containerRef.current) {
      const half = Math.floor(containerRef.current.clientHeight * 0.75) - 12;
      setTopHeight(half);
      setCurrentTopHeight(half);
    }
  }, []);

  const onDragCallback = (newHeight: number) => {
    newHeight = Math.max(newHeight, 60);
    if (topHeight !== newHeight) {
      setTopHeight(newHeight);
    }
  };

  const onDragEndCallback = (newHeight: number) => {
    newHeight = Math.max(newHeight, 60);
    if (currentTopHeight !== newHeight) {
      setCurrentTopHeight(newHeight);
    }
  };

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div style={{ height: topHeight > 0 ? `${topHeight}px` : "50%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <span className="paneTitle">HTML</span>
        <MonacoEditor
          {...monacoEditorProps}
          language="html"
          value={defaultHtml}
          editorDidMount={(editor) => { htmlEditorRef.current = editor; }}
          onChange={onChange}
        />
      </div>
      <DragResizeEdge
        orientation="vertical"
        onDrag={createAfterEdgeCallback(currentTopHeight, onDragCallback)}
        onDragEnd={createAfterEdgeCallback(currentTopHeight, onDragEndCallback)}
      />
      <div style={{ flex: 1, minHeight: 60, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <span className="paneTitle">CSS</span>
        <MonacoEditor
          {...monacoEditorProps}
          language="css"
          value={defaultCss}
          editorDidMount={(editor) => { cssEditorRef.current = editor; }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
