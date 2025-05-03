import type { Meta, StoryObj } from "@storybook/react";
import { AnchorPopAccessible } from "./AnchorPopAccessible";

const meta = {
  title: "Hooks/useAnchorPop/Accessible",
  component: AnchorPopAccessible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initialMessage: {
      control: "text",
    },
  },
} satisfies Meta<typeof AnchorPopAccessible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialMessage: "This is an accessible tooltip",
  },
};
