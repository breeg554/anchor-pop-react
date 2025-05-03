import type { Meta, StoryObj } from "@storybook/react";
import { AnchorPopAdvanced } from "./AnchorPopAdvanced";

const meta = {
  title: "Hooks/useAnchorPop/Advanced",
  component: AnchorPopAdvanced,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    initialInfoVisible: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof AnchorPopAdvanced>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    initialInfoVisible: false,
  },
};
