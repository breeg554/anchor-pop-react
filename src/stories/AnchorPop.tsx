import React from "react";
import { useAnchorPop } from "../hooks/use-anchor-pop";
import { Side, Trigger } from "../types";

export interface AnchorPopProps {
  /** Position of the popover relative to the anchor */
  side?: Side;
  /** Distance between the anchor and the popover in pixels */
  offset?: number;
  /** Events that trigger the popover */
  trigger?: Trigger | Trigger[];
  /** Custom ID for the popover */
  id?: string;
  /** Whether the popover functionality is disabled */
  disabled?: boolean;
  /** Text content for the anchor element */
  anchorText?: string;
  /** Text content for the popover */
  popoverText?: string;
}

/** Component to demonstrate the useAnchorPop hook */
export const AnchorPop = ({
  side = "top",
  offset = 8,
  trigger = "hover",
  id,
  disabled = false,
  anchorText = "Hover me",
  popoverText = "I'm a popover!",
}: AnchorPopProps) => {
  const { anchorProps, popoverProps, isOpen } = useAnchorPop<HTMLButtonElement, HTMLDivElement>({
    side,
    offset,
    trigger,
    id,
    disabled,
  });

  return (
    <div style={{ padding: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button
        {...anchorProps}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {anchorText}
      </button>

      <div
        {...popoverProps}
        style={{
          padding: "8px 12px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "200px",
        }}
      >
        {popoverText}
        {isOpen && <div style={{ fontSize: "12px", marginTop: "4px", color: "#666" }}>(Popover is open)</div>}
      </div>
    </div>
  );
};
