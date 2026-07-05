import { memo } from "react";

export enum LineState {
  DEFAULT = "default",
  COMPARING = "comparing",
  SWAPPING = "swapping",
  SORTED = "sorted",
}

export interface VisualizedItemProps {
  // Value from 1 to 100
  value: number;
  state: LineState;
}

export function getVisualizedItemColor(state: LineState) {
  switch (state) {
    case "default":
      return "#475569";
    case "comparing":
      return "#FBBF24";
    case "swapping":
      return "#F87171";
    case "sorted":
      return "#4ADE80";
  }
}

// Expected to be rendered in a flex container
function VisualizedItem({ value, state }: Readonly<VisualizedItemProps>) {
  return (
    <div
      style={{ height: value + "%" }}
      className={`bg-[${getVisualizedItemColor(state)}] flex-1 rounded-t-lg transition-[height] duration-300 ease-in-out`}
    ></div>
  );
}

// Memo to only re-render this component when the props changes.
// Without this, all of the visualized items would re-render every time the state changes.
export default memo(VisualizedItem);
