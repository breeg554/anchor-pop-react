export type Trigger = "hover" | "click" | "focus";
export type Side =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "auto";

export type UseAnchorPopOptions = {
  side?: Side;
  offset?: number;
  trigger?: Trigger | Trigger[];
  delay?: number;
  id?: string;
  disabled?: boolean;
};
