import * as React from "react";

export interface IAppHeaderProps {
  onButtonClick: (id: string) => () => void;
  onRunClick: () => void;
  paneState: any;
}

export const Header: React.FC<IAppHeaderProps> = (props: IAppHeaderProps) => {
  const paneKeys = Object.keys(props.paneState);

  const toggleGroup = paneKeys.map((paneKey: any) => {
    return (
      <label className={"panelToggleButton"} key={`check-${paneKey}`}>
        <input
          type="checkbox"
          id={`check-${paneKey}`}
          value={paneKey}
          onChange={props.onButtonClick(paneKey)}
          checked={props.paneState[paneKey]}
        />
        {paneKey}
      </label>
    );
  });

  return (
    <header className="header">
      <div className="title">
        <img
          src={require("../../assets/logo192.png").default}
          width={24}
          height={24}
        />
        <span id="titleText">HTML To Formatter</span>
      </div>

      <div id="panelToggleGroup">{toggleGroup}</div>

      <div className="runButton">
        <button id="runButton" onClick={props.onRunClick}>
          Run
        </button>
      </div>
    </header>
  );
};
