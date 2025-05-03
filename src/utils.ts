import { Side, UseAnchorPopOptions } from "./types";

export const toArr = (val: UseAnchorPopOptions["trigger"]) => (Array.isArray(val) ? val : [val]);

export const evMap = (kind: "hover" | "focus" | "click") =>
  kind === "hover"
    ? (["mouseenter", "mouseleave"] as const)
    : kind === "focus"
    ? (["focusin", "focusout"] as const)
    : (["click", "click"] as const);

const positions = {
  top: `position-area: top;`,
  "top-start": `position-area: top left;`,
  "top-end": `position-area: top right;`,
  right: `position-area: right;`,
  "right-start": `position-area: right top;`,
  "right-end": `position-area: right bottom;`,
  bottom: `position-area: bottom;`,
  "bottom-start": `position-area: bottom left;`,
  "bottom-end": `position-area: bottom right;`,
  left: `position-area: left;`,
  "left-start": `position-area: left top;`,
  "left-end": `position-area: left bottom;`,
} as const;

export const anchorCss = (id: string, side: Side = "auto", gap: number = 8): string => {
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
    if (first === "top" || first === "top-start" || first === "top-end") {
      css += `
                  inset-block-end: calc(anchor(top) + ${gap}px);
              `;
    } else if (first === "bottom" || first === "bottom-start" || first === "bottom-end") {
      css += `
                  inset-block-start: calc(anchor(bottom) + ${gap}px);
              `;
    } else if (first === "left" || first === "left-start" || first === "left-end") {
      css += `
                  inset-inline-end: calc(anchor(left) + ${gap}px);
              `;
    } else if (first === "right" || first === "right-start" || first === "right-end") {
      css += `
                  inset-inline-start: calc(anchor(right) + ${gap}px);
              `;
    }
  }

  return css.replace(/\s+/g, " ").trim();
};
