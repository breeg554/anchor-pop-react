import { UseAnchorPopOptions } from "./types";

export const toArr = (val: UseAnchorPopOptions["trigger"]) => (Array.isArray(val) ? val : [val]);

export const evMap = (kind: "hover" | "focus" | "click") =>
  kind === "hover"
    ? (["mouseenter", "mouseleave"] as const)
    : kind === "focus"
    ? (["focusin", "focusout"] as const)
    : (["click", "click"] as const);

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

  const primary = {
    top: `top center`,
    right: `center right`,
    bottom: `bottom center`,
    left: `center left`,
  } as const;

  const first = side === "auto" ? "top" : side;

  css += `
            position-area: ${primary[first]};
          `;

  css += `
            position-try-fallbacks: flip-block, flip-inline;
            position-try: flip-block, flip-inline;
          `;

  css += `
            animation: var(--ap-show, none) .15s ease-out both;
          `;

  return css.replace(/\s+/g, " ").trim();
};
