import * as React from "react";
import { Chevron } from "../icons/Chevron";
import "./CollapsibleSection.css";

export interface ICollapsibleSectionProps {
  children?: JSX.Element;
  title: string;
}
export function CollapsibleSection(props: ICollapsibleSectionProps) {
  const { title, children } = props;
  const [showContent, toggleContent] = React.useState<boolean>(true);
  const onToggleClick = () => {
    toggleContent(!showContent);
  };
  const contentClass =
    "collapsibleContent" + (showContent ? "" : " hideContent");
  const chevronClass = "chevronIcon" + (showContent ? "" : " collapsed");
  return (
    <div className="collapsibleContainer">
      <div className="collapsibleHeader" onClick={onToggleClick}>
        <Chevron className={chevronClass} />
        <div className="collapsibleTitle">{title}</div>
      </div>
      <div className={contentClass}>{children}</div>
    </div>
  );
}
