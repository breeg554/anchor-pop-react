import React, { useState } from "react";
import { useAnchorPop } from "../hooks/use-anchor-pop";
import { Side } from "../types";

export interface AnchorPopAdvancedProps {
  /** Enable or disable popovers */
  disabled?: boolean;
  /** Initial visibility of the info popover */
  initialInfoVisible?: boolean;
}

/** Advanced demonstration of useAnchorPop with multiple popovers */
export const AnchorPopAdvanced = ({ disabled = false, initialInfoVisible = false }: AnchorPopAdvancedProps) => {
  const [count, setCount] = useState(0);
  const [infoVisible, setInfoVisible] = useState(initialInfoVisible);

  // Tooltip for increment button
  const { anchorProps: incrementAnchorProps, popoverProps: incrementPopoverProps } = useAnchorPop<
    HTMLButtonElement,
    HTMLDivElement
  >({
    side: "top",
    offset: 8,
    trigger: "hover",
    disabled,
  });

  // Tooltip for decrement button
  const { anchorProps: decrementAnchorProps, popoverProps: decrementPopoverProps } = useAnchorPop<
    HTMLButtonElement,
    HTMLDivElement
  >({
    side: "bottom",
    offset: 8,
    trigger: "hover",
    disabled,
  });

  // Help info popover with programmatic control
  const {
    anchorProps: infoAnchorProps,
    popoverProps: infoPopoverProps,
    open: openInfoPopover,
    close: closeInfoPopover,
  } = useAnchorPop<HTMLButtonElement, HTMLDivElement>({
    side: "right",
    offset: 12,
    trigger: "click",
    disabled,
  });

  // Display additional details based on counter value
  const { anchorProps: displayAnchorProps, popoverProps: displayPopoverProps } = useAnchorPop<
    HTMLDivElement,
    HTMLDivElement
  >({
    side: "left",
    offset: 16,
    trigger: ["hover", "focus"],
    disabled,
  });

  // Handle showing/hiding info popover programmatically
  React.useEffect(() => {
    if (initialInfoVisible) {
      openInfoPopover();
    }
  }, [initialInfoVisible, openInfoPopover]);

  return (
    <div style={{ padding: "50px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h3>Counter Example with Multiple Popovers</h3>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Decrement button with tooltip */}
        <button
          {...decrementAnchorProps}
          onClick={() => setCount((prev) => prev - 1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <div {...decrementPopoverProps} style={popoverStyle}>
          Decrease counter
        </div>

        {/* Counter display with popover */}
        <div
          {...displayAnchorProps}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minWidth: "50px",
            textAlign: "center",
          }}
          tabIndex={0}
        >
          {count}
        </div>
        <div {...displayPopoverProps} style={popoverStyle}>
          <div>Current count: {count}</div>
          <div>{count % 2 === 0 ? "This is an even number" : "This is an odd number"}</div>
          {count < 0 && <div style={{ color: "red" }}>Counter is negative!</div>}
          {count > 10 && <div style={{ color: "green" }}>Counter is getting high!</div>}
        </div>

        {/* Increment button with tooltip */}
        <button
          {...incrementAnchorProps}
          onClick={() => setCount((prev) => prev + 1)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +
        </button>
        <div {...incrementPopoverProps} style={popoverStyle}>
          Increase counter
        </div>
      </div>

      {/* Help button with programmatically controlled popover */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
        <button
          {...infoAnchorProps}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => setInfoVisible(!infoVisible)}
        >
          Help
        </button>

        <div {...infoPopoverProps} style={{ ...popoverStyle, maxWidth: "300px" }}>
          <h4 style={{ margin: "0 0 8px 0" }}>Instructions</h4>
          <ul style={{ margin: "0", paddingLeft: "20px" }}>
            <li>Use the + button to increment the counter</li>
            <li>Use the - button to decrement the counter</li>
            <li>Hover over the counter to see details</li>
          </ul>
          <button
            onClick={() => {
              closeInfoPopover();
              setInfoVisible(false);
            }}
            style={{
              marginTop: "10px",
              padding: "4px 8px",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Common styles for popovers
const popoverStyle: React.CSSProperties = {
  padding: "8px 12px",
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};
