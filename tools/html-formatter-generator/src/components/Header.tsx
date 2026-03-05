import * as React from "react";

export interface IAppHeaderProps {
  onButtonClick: (id: string) => () => void;
  paneState: any;
}

const labelMap: { [key: string]: string } = {
  code: "Code",
  json: "JSON",
  preview: "HTML Preview",
};

export const Header: React.FC<IAppHeaderProps> = (props: IAppHeaderProps) => {
  const paneKeys = Object.keys(props.paneState);

  const toggleGroup = paneKeys.map((paneKey: any) => {
    return (
      <label className="panelToggleButton" key={`check-${paneKey}`}>
        <input
          type="checkbox"
          id={`check-${paneKey}`}
          value={paneKey}
          onChange={props.onButtonClick(paneKey)}
          checked={props.paneState[paneKey]}
        />
        {labelMap[paneKey] || paneKey}
      </label>
    );
  });

  return (
    <header className="header">
      <div className="title">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="28" height="28" rx="6" fill="#0d9488" />
          <text x="2" y="11" fontFamily="monospace" fontSize="7.5" fontWeight="bold" fill="#fff">&lt;/&gt;</text>
          <path d="M10 14 L18 14" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M15.5 11.5 L18 14 L15.5 16.5" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="5.5" y="24" fontFamily="monospace" fontSize="8.5" fontWeight="bold" fill="#fff">&#123;&#125;</text>
        </svg>
        <span id="titleText">HTML to Formatter</span>
      </div>

      <div id="panelToggleGroup">{toggleGroup}</div>
    </header>
  );
};
