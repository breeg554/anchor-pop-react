type Base = "top" | "bottom" | "left" | "right";
type Align = "start" | "center" | "end";
export type Side = Base | `${Base}-${Align}` | "auto";

const flipMap: Record<Base, Base[]> = {
  top: ["bottom", "right", "left"],
  bottom: ["top", "right", "left"],
  left: ["right", "top", "bottom"],
  right: ["left", "top", "bottom"],
} as const;

const parse = (placement: Side): [Base, Align] => {
  if (placement === "auto") return ["top", "center"];
  const [b, a] = placement.split("-") as [Base, Align?];
  return [b, a ?? "center"];
};

function coords(a: DOMRect, p: DOMRect, base: Base, align: Align, gap: number): [number, number] {
  const midX = a.left + a.width / 2 - p.width / 2;
  const midY = a.top + a.height / 2 - p.height / 2;

  switch (base) {
    case "top":
      return [align === "start" ? a.left : align === "end" ? a.right - p.width : midX, a.top - p.height - gap];

    case "bottom":
      return [align === "start" ? a.left : align === "end" ? a.right - p.width : midX, a.bottom + gap];

    case "left":
      return [a.left - p.width - gap, align === "start" ? a.top : align === "end" ? a.bottom - p.height : midY];

    case "right":
      return [a.right + gap, align === "start" ? a.top : align === "end" ? a.bottom - p.height : midY];
  }
}

export function polyfill(anchor: HTMLElement, pop: HTMLElement, o: { side: Side; offset: number }) {
  const GAP = o.offset ?? 8;

  const place = (preferred: Side) => {
    const tried = new Set<Side>();

    const tryPlace = (placement: Side): void => {
      if (tried.has(placement)) return;
      tried.add(placement);

      const [base, align] = parse(placement);
      const a = anchor.getBoundingClientRect();
      const p = pop.getBoundingClientRect();
      let [x, y] = coords(a, p, base, align, GAP);

      const overflowX = x < 0 ? x : Math.max(0, x + p.width - innerWidth);
      const overflowY = y < 0 ? y : Math.max(0, y + p.height - innerHeight);

      if (overflowX === 0 && overflowY === 0) {
        pop.style.cssText += `position:fixed;left:${x}px;top:${y}px;margin:0;`;
        return;
      }

      const flipCandidates = placement === "auto" ? (["top", "bottom", "right", "left"] as Base[]) : flipMap[base];

      for (const altBase of flipCandidates) {
        const altPlacement: Side = align === "center" ? altBase : `${altBase}-${align}`;
        if (!tried.has(altPlacement)) {
          return tryPlace(altPlacement);
        }
      }

      x = Math.min(Math.max(0, x), innerWidth - p.width);
      y = Math.min(Math.max(0, y), innerHeight - p.height);
      pop.style.cssText += `position:fixed;left:${x}px;top:${y}px;margin:0;`;
    };

    tryPlace(preferred);
  };

  const rerender = () => place(o.side);
  rerender();

  const ro = new ResizeObserver(rerender);
  ro.observe(anchor);
  ro.observe(pop);

  const scroll = () => rerender();
  addEventListener("scroll", scroll, { passive: true });
  addEventListener("resize", scroll);

  return () => {
    ro.disconnect();
    removeEventListener("scroll", scroll);
    removeEventListener("resize", scroll);
  };
}
