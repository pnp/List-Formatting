import * as React from "react";
import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";
import {
  ResizableSplitContainer,
  IResizableSplitContainerProps,
} from "../resizable/ResizableSplitContainer";

const monacoEditorProps: MonacoEditorProps = {
  options: {
    automaticLayout: true,
    wordWrap: "on",
    wordWrapMinified: true,
    wrappingIndent: "indent",
    tabSize: 2,
  },
};

export interface ICodeEditorProps {
  selected: boolean;
  language: string;
  title: string;
  setEditorOnMount: (editor: any) => void;
}

const codeEditor = ({
  title,
  language,
  setEditorOnMount,
}: ICodeEditorProps) => (width: number) => {
  const currentEditorMount = (editor: any, monaco: any) => {
    setEditorOnMount(editor);
  };

  return (
    <>
      <span className={"paneTitle"}>{title}</span>
      <MonacoEditor
        {...{
          ...monacoEditorProps,
          language: language,
          width: `${width - 16}px`,
          editorDidMount: currentEditorMount,
        }}
      />
    </>
  );
};

export interface IEditorsHostProps {
  editors: ICodeEditorProps[];
}
export const CodeEditor: React.FC<IEditorsHostProps> = (
  props: IEditorsHostProps
) => {
  const {
    editors: [htmlEditor, cssEditor],
  } = props;

  const containerProps: IResizableSplitContainerProps = {
    className: "paneContainer",
    containerWidth: window.innerWidth - 400,
    containerHeight: window.innerHeight - 60,
    ...(htmlEditor.selected ? { leftContent: codeEditor(htmlEditor) } : {}),
    ...(cssEditor.selected ? { rightContent: codeEditor(cssEditor) } : {}),
  };

  return <ResizableSplitContainer {...containerProps} />;
};
