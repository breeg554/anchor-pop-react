import { useId, useLayoutEffect, useRef, useState } from "react";
import { UseAnchorPopOptions } from "../types";
import { anchorCss, evMap, toArr } from "../utils";

export function useAnchorPop<A extends HTMLElement, P extends HTMLElement>(opts: UseAnchorPopOptions = {}) {
  const {
    side = "top",
    offset = 8,
    trigger = ["hover", "focus"],
    id = `--ap-${useId().slice(2)}`,
    disabled = false,
  } = opts;

  const anchorRef = useRef<A>(null);
  const popRef = useRef<P>(null);
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    if (disabled) return;
    popRef.current?.showPopover();
  };

  const onClose = () => {
    if (disabled) return;
    popRef.current?.hidePopover();
  };

  const onToggle = () => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  };

  useLayoutEffect(() => {
    if (!anchorRef.current || !popRef.current) {
      console.warn("anchorRef or popRef is not found");
      return;
    }

    if (disabled) return;

    const anchor = anchorRef.current;
    const pop = popRef.current;

    anchor.setAttribute("anchor-name", id);
    anchor.setAttribute("aria-describedby", `pop-${id}`);
    anchor.style.cssText += `anchor-name:${id};`;

    pop.popover = "manual";
    pop.id = `pop-${id}`;
    pop.style.cssText += anchorCss(id, side, offset);

    const show = () => {
      pop.showPopover();
      setOpen(true);
    };
    const hide = () => {
      pop.hidePopover();
      setOpen(false);
    };

    if (!CSS.supports("top: anchor(--dummy center)")) {
      // @ts-ignore
      import("../fallback").then((m) => m.polyfill(anchor, pop, { side, offset }));
    }

    const toggle = () => {
      setOpen((prev) => {
        if (prev) {
          hide();
        } else {
          show();
        }
        return !prev;
      });
    };

    toArr(trigger).forEach((kind) => {
      if (!kind) return;
      const [enter, leave] = evMap(kind);
      if (kind === "click") {
        anchor.addEventListener(enter, toggle);
      } else {
        anchor.addEventListener(enter, show);
        anchor.addEventListener(leave, hide);
      }
    });

    return () => {
      toArr(trigger).forEach((kind) => {
        if (!kind) return;
        const [enter, leave] = evMap(kind);
        if (kind === "click") anchor.removeEventListener(enter, toggle);
        else {
          anchor.removeEventListener(enter, show);
          anchor.removeEventListener(leave, hide);
        }
      });
    };
  }, [side, offset, trigger, id, disabled]);

  return {
    anchorProps: { ref: anchorRef },
    popoverProps: { ref: popRef, role: "tooltip" },
    open: onOpen,
    close: onClose,
    toggle: onToggle,
    isOpen: open,
  };
}
