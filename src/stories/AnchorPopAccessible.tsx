import React, { useState } from "react";
import { useAnchorPop } from "../hooks/use-anchor-pop";

export interface AnchorPopAccessibleProps {
  /** Initial message in the tooltip */
  initialMessage?: string;
}

/** Accessible demonstration of useAnchorPop with keyboard navigation and ARIA attributes */
export const AnchorPopAccessible = ({ initialMessage = "This is an accessible tooltip" }: AnchorPopAccessibleProps) => {
  const [message, setMessage] = useState(initialMessage);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Form tooltip example with focus and hover
  const { anchorProps: formAnchorProps, popoverProps: formPopoverProps } = useAnchorPop<
    HTMLLabelElement,
    HTMLDivElement
  >({
    side: "right",
    offset: 8,
    trigger: ["hover", "focus"],
  });

  // Help button with keyboard accessible popover
  const {
    anchorProps: helpAnchorProps,
    popoverProps: helpPopoverProps,
    isOpen: helpIsOpen,
    toggle: toggleHelp,
  } = useAnchorPop<HTMLButtonElement, HTMLDivElement>({
    side: "top",
    offset: 12,
    trigger: "click",
  });

  // Live updating content
  const { anchorProps: updateAnchorProps, popoverProps: updatePopoverProps } = useAnchorPop<
    HTMLButtonElement,
    HTMLDivElement
  >({
    side: "bottom",
    offset: 10,
    trigger: "hover",
  });

  const updateMessage = () => {
    const now = new Date();
    setMessage(`Updated tooltip message (${now.toLocaleTimeString()})`);
    setLastUpdated(now.toLocaleTimeString());
  };

  return (
    <div style={{ padding: "50px", display: "flex", flexDirection: "column", gap: "30px" }}>
      <h3>Accessible Popover Examples</h3>

      {/* Form field with tooltip */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label
          {...formAnchorProps}
          htmlFor="example-input"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          Email Address
          <span
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#2196f3",
              color: "white",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            ?
          </span>
        </label>
        <div {...formPopoverProps} style={popoverStyle} role="tooltip">
          We'll never share your email with anyone else.
        </div>
        <input
          id="example-input"
          type="email"
          placeholder="Enter email"
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {/* Help button with expanded ARIA state */}
      <div>
        <button
          {...helpAnchorProps}
          aria-expanded={helpIsOpen}
          onClick={toggleHelp}
          style={{
            padding: "8px 16px",
            backgroundColor: "#6200ee",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Need Help?
        </button>
        <div
          {...helpPopoverProps}
          role="dialog"
          aria-label="Help information"
          style={{
            ...popoverStyle,
            padding: "16px",
            maxWidth: "300px",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0" }}>Keyboard Navigation</h4>
          <ul style={{ margin: "0 0 12px 0", paddingLeft: "20px" }}>
            <li>
              Press <kbd>Tab</kbd> to navigate between interactive elements
            </li>
            <li>
              Press <kbd>Space</kbd> or <kbd>Enter</kbd> to activate buttons
            </li>
            <li>
              Press <kbd>Escape</kbd> to close popovers
            </li>
          </ul>
          <p style={{ margin: "0" }}>This popover is accessible via keyboard navigation and screen readers.</p>
        </div>
      </div>

      {/* Live updating tooltip */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={updateMessage}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Update Tooltip
        </button>

        <button
          {...updateAnchorProps}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Hover for Message
        </button>

        <div {...updatePopoverProps} style={popoverStyle} role="tooltip" aria-live="polite">
          <div>{message}</div>
          <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>Last updated: {lastUpdated}</div>
        </div>
      </div>

      {/* Accessibility information */}
      <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" }}>
        <h4 style={{ margin: "0 0 8px 0" }}>Accessibility Features Demonstrated:</h4>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          <li>Proper ARIA roles and attributes</li>
          <li>Keyboard navigation</li>
          <li>Focus management</li>
          <li>Live updates with aria-live</li>
          <li>Clear visual indicators</li>
        </ul>
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
