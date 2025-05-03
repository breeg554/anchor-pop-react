import { UseAnchorPopOptions } from "./types";

export const toArr = (val: UseAnchorPopOptions["trigger"]) => (Array.isArray(val) ? val : [val]);

export const evMap = (kind: "hover" | "focus" | "click") =>
  kind === "hover"
    ? (["mouseenter", "mouseleave"] as const)
    : kind === "focus"
    ? (["focusin", "focusout"] as const)
    : (["click", "click"] as const);

const positions = {
  top: `position-area: top;`,
  right: `position-area: right;`,
  bottom: `position-area: bottom;`,
  left: `position-area: left;`,
} as const;

export const anchorCss = (
  id: string,
  side: "top" | "right" | "bottom" | "left" | "auto" = "top",
  gap: number = 8
): string => {
  let css = `
            position: fixed;
            position-anchor: ${id};
            margin: 0;
          `;

  const first = side === "auto" ? "top" : side;

  css += `
   ${positions[first]}
   position-try-fallbacks: flip-block, flip-inline;
        `;

  if (gap) {
    if (first === "top") {
      css += `
                  inset-block-end: calc(anchor(top) + ${gap}px);
              `;
    } else if (first === "bottom") {
      css += `
                  inset-block-start: calc(anchor(bottom) + ${gap}px);
              `;
    } else if (first === "left") {
      css += `
                  inset-inline-end: calc(anchor(left) + ${gap}px);
              `;
    } else if (first === "right") {
      css += `
                  inset-inline-start: calc(anchor(right) + ${gap}px);
              `;
    }
  }

  return css.replace(/\s+/g, " ").trim();
};
