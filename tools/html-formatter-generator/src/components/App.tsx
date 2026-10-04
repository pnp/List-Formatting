import * as React from "react";
import { CodeEditor } from "./editor/CodeEditor";
import { Header } from "./Header";
import { DragResizeEdge } from "./resizable/ResizeEdge";
import "./AppStyles.css";

import HTMLToFormatter from "../utilities/HTMLToFormatter";

const SECTION_KEYS = ["code", "json", "preview"] as const;
const MIN_FLEX = 0.15;

const DEFAULT_HTML = `<div class="card">
  <div class="header">
    <svg class="avatar" viewBox="0 0 36 36">
      <rect width="36" height="36" rx="18" fill="#0d9488"/>
      <text x="18" y="22" text-anchor="middle" fill="#fff"
        font-size="14" font-family="Segoe UI, sans-serif">CP</text>
    </svg>
    <div class="info">
      <span class="name">Contoso Project</span>
      <span class="date">Due: March 15, 2026</span>
    </div>
    <span class="badge">Active</span>
  </div>
  <div class="body">
    <p class="description">
      Quarterly review of project milestones and deliverables
      across all departments.
    </p>
    <div class="progress-bar">
      <div class="progress-fill"></div>
    </div>
    <span class="progress-label">72% Complete</span>
  </div>
  <div class="footer">
    <a href="#" class="action">View Details</a>
    <a href="#" class="action secondary">Edit</a>
  </div>
</div>`;

const DEFAULT_CSS = `.card {
  font-family: "Segoe UI", sans-serif;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  max-width: 360px;
}
.header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.name {
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
}
.date {
  font-size: 11px;
  color: #94a3b8;
}
.badge {
  background: #0d9488;
  color: #fff;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}
.body {
  padding: 12px;
}
.description {
  margin: 0 0 10px;
  font-size: 13px;
  color: #475569;
  line-height: 1.5;
}
.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  width: 72%;
  height: 100%;
  background: #0d9488;
  border-radius: 3px;
}
.progress-label {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  color: #64748b;
  text-align: right;
}
.footer {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}
.action {
  font-size: 12px;
  font-weight: 600;
  color: #0d9488;
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background 0.15s;
}
.action:hover {
  background: #f0fdfa;
}
.action.secondary {
  color: #64748b;
}
.action.secondary:hover {
  background: #f1f5f9;
}`;

export const App: React.FC<any> = () => {
  const [paneState, setPaneState] = React.useState<any>({
    code: true,
    json: true,
    preview: true,
  });

  const htmlEditorRef = React.useRef<any>(null);
  const cssEditorRef = React.useRef<any>(null);
  const jsonRef = React.useRef<HTMLElement>(null);
  const previewRef = React.useRef<HTMLIFrameElement>(null);
  const timerRef = React.useRef<any>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [json, setJSON] = React.useState(JSON.stringify({}, null, 2));

  // Flex ratios for each section — controls how space is distributed
  const [flexes, setFlexes] = React.useState([1, 1, 1]);
  const settledFlexes = React.useRef([1, 1, 1]);

  // Run initial conversion on mount with default values
  React.useEffect(() => {
    try {
      const result = HTMLToFormatter.generateFormatter(DEFAULT_HTML, DEFAULT_CSS);
      if (previewRef.current) {
        previewRef.current.srcdoc = `<style>${DEFAULT_CSS}</style>${DEFAULT_HTML}`;
      }
      setJSON(JSON.stringify(result.json, null, 2));
    } catch (e) { /* ignore */ }
  }, []);

  // Reset to equal distribution when sections are toggled
  React.useEffect(() => {
    setFlexes([1, 1, 1]);
    settledFlexes.current = [1, 1, 1];
  }, [paneState.code, paneState.json, paneState.preview]);

  const onButtonClick = (buttonId: string) => () => {
    setPaneState({
      ...paneState,
      [buttonId]: !paneState[buttonId],
    });
  };

  const autoConvert = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      let html = "", css = "";
      if (htmlEditorRef.current) {
        html = htmlEditorRef.current.getValue();
      }
      if (cssEditorRef.current) {
        css = cssEditorRef.current.getValue();
      }
      try {
        const result = HTMLToFormatter.generateFormatter(html, css);
        if (previewRef.current) {
          previewRef.current.srcdoc = css ? `<style>${css}</style>${html}` : html;
        }
        setJSON(JSON.stringify(result.json, null, 2));
      } catch (e) {
        // ignore conversion errors during typing
      }
    }, 300);
  };

  const copyToClipboard = () => {
    const codeEl = jsonRef.current;
    if (codeEl) {
      const textArea = document.createElement("textarea");
      textArea.textContent = codeEl.textContent || "";
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
  };

  // Convert pixel drag delta to flex delta, then adjust the two adjacent sections
  const makeDragHandler = (leftIdx: number, rightIdx: number, isEnd: boolean) => (delta: number) => {
    if (!containerRef.current) return;
    const s = [...settledFlexes.current];
    const containerWidth = containerRef.current.clientWidth;
    const totalFlex = SECTION_KEYS.reduce((sum, k, i) => paneState[k] ? sum + s[i] : sum, 0);
    const flexPerPixel = totalFlex / containerWidth;
    const flexDelta = delta * flexPerPixel;

    let newLeft = s[leftIdx] + flexDelta;
    let newRight = s[rightIdx] - flexDelta;
    // Clamp both sides
    const pool = s[leftIdx] + s[rightIdx];
    if (newLeft < MIN_FLEX) { newLeft = MIN_FLEX; newRight = pool - MIN_FLEX; }
    if (newRight < MIN_FLEX) { newRight = MIN_FLEX; newLeft = pool - MIN_FLEX; }

    s[leftIdx] = newLeft;
    s[rightIdx] = newRight;
    setFlexes(s);
    if (isEnd) settledFlexes.current = [...s];
  };

  // Determine which index the second edge's left section is
  const secondEdgeLeftIdx = paneState.json ? 1 : 0;

  return (
    <>
      <Header onButtonClick={onButtonClick} paneState={paneState} />
      <div id="editorsRootContainer" ref={containerRef}>
        {paneState.code && (
          <div className="paneContainer section" style={{ flex: flexes[0] }}>
            <CodeEditor
              htmlEditorRef={htmlEditorRef}
              cssEditorRef={cssEditorRef}
              onChange={autoConvert}
              defaultHtml={DEFAULT_HTML}
              defaultCss={DEFAULT_CSS}
            />
          </div>
        )}
        {paneState.code && paneState.json && (
          <DragResizeEdge
            onDrag={makeDragHandler(0, 1, false)}
            onDragEnd={makeDragHandler(0, 1, true)}
          />
        )}
        {paneState.json && (
          <div className="paneContainer section" style={{ flex: flexes[1] }}>
            <span className="paneTitle">Generated CF JSON</span>
            <div style={{ position: "relative", flex: 1, overflow: "auto" }}>
              <pre>
                <code contentEditable={false} ref={jsonRef}>
                  {json}
                </code>
              </pre>
              <button className="copyBtn" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          </div>
        )}
        {((paneState.json && paneState.preview) || (!paneState.json && paneState.code && paneState.preview)) && (
          <DragResizeEdge
            onDrag={makeDragHandler(secondEdgeLeftIdx, 2, false)}
            onDragEnd={makeDragHandler(secondEdgeLeftIdx, 2, true)}
          />
        )}
        {paneState.preview && (
          <div className="paneContainer section" style={{ flex: flexes[2] }}>
            <span className="paneTitle">HTML Preview</span>
            <iframe
              ref={previewRef}
              title="HTML Preview"
              sandbox="allow-same-origin"
              style={{ flex: 1, border: "none", background: "#fff" }}
            />
          </div>
        )}
      </div>
    </>
  );
};
