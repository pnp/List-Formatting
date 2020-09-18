import * as React from "react";
import { CodeEditor } from "./editor/CodeEditor";
import { Header } from "./Header";
import { CollapsibleSection } from "./collapsible/CollapsibleSection";
import "./AppStyles.css";

import {
  createFormatter,
  htmlToElement,
} from "../utilities/HtmlToJsonConverter";

export const App: React.FC<any> = (props: any) => {
  const [paneState, setPaneState] = React.useState<any>({
    html: true,
    css: false,
  });

  const htmlEditorRef = React.useRef(null);
  const cssEditorRef = React.useRef(null);
  const jsonRef = React.useRef(null);

  const [json, setJSON] = React.useState(JSON.stringify({}, null, 2));

  const onButtonClick = (buttonId: string) => () => {
    setPaneState({
      ...paneState,
      [buttonId]: !paneState[buttonId],
    });
  };

  const onRunClick = () => {
    const htmleditor = htmlEditorRef.current as any;
    const csseditor = cssEditorRef.current as any;
    let html = "",
      css = "";
    if (htmleditor) {
      html = htmleditor.getValue();
    }
    if (csseditor) {
      css = csseditor.getValue();
    }
    const json = createFormatter(htmlToElement(html), 0, css);
    setJSON(JSON.stringify(json, null, 2));
  };

  const copyToClipboard = () => {
    const textarea = jsonRef ? (jsonRef.current as any) : null;
    if (textarea) {
      const copyText = textarea.textContent;
      const textArea = document.createElement("textarea");
      textArea.textContent = copyText;
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
  };

  const codeEditorsPaneProps = {
    editors: [
      {
        selected: paneState.html,
        language: "html",
        title: "HTML",
        setEditorOnMount: (editor: any) => (htmlEditorRef.current = editor),
      },
      {
        selected: paneState.css,
        language: "css",
        title: "CSS",
        setEditorOnMount: (editor: any) => (cssEditorRef.current = editor),
      },
    ],
  };

  return (
    <>
      <Header
        onButtonClick={onButtonClick}
        onRunClick={onRunClick}
        paneState={paneState}
      />
      <div id="editorsRootContainer">
        <CodeEditor {...codeEditorsPaneProps} />
        <div className="paneContainer" style={{ width: "320px" }}>
          <span className="paneTitle">{"Output"}</span>
          <CollapsibleSection title="JSON">
            <div style={{ position: "relative" }}>
              <pre>
                <code contentEditable={false} ref={jsonRef}>
                  {json}
                </code>
              </pre>
              <button className={"copyBtn"} onClick={copyToClipboard}>
                copy
              </button>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </>
  );
};
