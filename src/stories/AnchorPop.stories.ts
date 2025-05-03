import type { Meta, StoryObj } from "@storybook/react";
import { AnchorPop } from "./AnchorPop";

const meta = {
  title: "Hooks/useAnchorPop",
  component: AnchorPop,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "auto",
      ],
    },
    offset: {
      control: { type: "range", min: 0, max: 50, step: 2 },
    },
    trigger: {
      control: "select",
      options: ["hover", "click", "focus", ["hover", "focus"], ["click", "focus"], ["hover", "click"]],
    },
    delay: {
      control: { type: "range", min: 0, max: 1000, step: 50 },
    },
    disabled: {
      control: "boolean",
    },
    anchorText: {
      control: "text",
    },
    popoverText: {
      control: "text",
    },
  },
} satisfies Meta<typeof AnchorPop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    side: "top",
    offset: 8,
    trigger: "hover",
    delay: 300,
    disabled: false,
    anchorText: "Hover me",
    popoverText: "Default popover on top with hover trigger",
  },
};
