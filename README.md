# anchor-pop-react 📌

A simple React hook for creating [anchor-positioned](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor) popovers and tooltips.

## What is it?

`anchor-pop-react` is a lightweight headless React hook that makes it easy to position elements (like popovers, tooltips, and dropdowns) relative to other elements on your page.

> ⚠️ **Work in Progress:** This project is currently in early development and the API may change without notice.

## Key Features

- 🔮 Uses the CSS Anchor Positioning API for precise positioning
- 🎯 Pure CSS positioning without JavaScript calculations for layout
- 🪝 Provides a simple, intuitive React hook API
- 🎨 Zero styling opinions - fully customizable appearance
- 🖱️ Supports click, hover, and manual triggers

## Demo

Check out the [interactive Storybook demo](https://breeg554.github.io/anchor-pop-react/) to see the hook in action with various configurations.

Try it yourself:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/use-abchor-pop-jq7yndh9?file=src%2FApp.tsx)

## Note!

⚡ This package uses the CSS [Anchor Positioning API](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor), which is currently in the experimental stage in most browsers. A fallback positioning system is included in the package.

## Installation

### npm

```bash
npm install anchor-pop-react
```

### pnpm

```bash
pnpm add anchor-pop-react
```

### yarn

```bash
yarn add anchor-pop-react
```

### bun

```bash
bun add anchor-pop-react
```

## Basic Usage

```tsx
import { useAnchorPop } from "anchor-pop-react";

function Tooltip() {
  const { anchorProps, popoverProps } = useAnchorPop();

  return (
    <>
      <button {...anchorProps}>Hover me</button>
      <div {...popoverProps}>I'm a tooltip!</div>
    </>
  );
}
```

## Hook API

The `useAnchorPop` hook accepts the following options:

```tsx
useAnchorPop({
  side: "bottom",
  offset: 8,
  trigger: "hover",
  id: "my-tooltip",
  disabled: false,
  delay: 300,
});
```

### Options

| Option     | Type                 | Default          | Description                                                                                                                                                                                                                          |
| ---------- | -------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `side`     | `string`             | `"top"`          | Positioning side of the popover. Options include: `"top"`, `"top-start"`, `"top-end"`, `"right"`, `"right-start"`, `"right-end"`, `"bottom"`, `"bottom-start"`, `"bottom-end"`, `"left"`, `"left-start"`, `"left-end"`, or `"auto"`. |
| `offset`   | `number`             | `8`              | Distance in pixels between the anchor and popover.                                                                                                                                                                                   |
| `trigger`  | `string \| string[]` | `[hover, focus]` | How the popover is triggered. Can be `"hover"`, `"click"`, `"focus"`, or an array combining these.                                                                                                                                   |
| `id`       | `string`             | auto-generated   | Custom ID for the popover element.                                                                                                                                                                                                   |
| `disabled` | `boolean`            | `false`          | Whether the popover functionality is disabled.                                                                                                                                                                                       |
| `delay`    | `number`             | `300`            | Delay in milliseconds before showing the popover.                                                                                                                                                                                    |

## License

MIT
