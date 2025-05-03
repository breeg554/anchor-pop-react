export type Trigger = "hover" | "click" | "focus";

export type UseAnchorPopOptions = {
  side?: "top" | "right" | "bottom" | "left" | "auto";
  offset?: number;
  trigger?: Trigger | Trigger[];
  delay?: number;
  id?: string;
  disabled?: boolean;
};
