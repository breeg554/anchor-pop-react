# anchor-pop-react 📌

A simple React hook for creating anchor-positioned popovers and tooltips.

## What is it?

`anchor-pop-react` is a lightweight headless React hook that makes it easy to position elements (like popovers, tooltips, and dropdowns) relative to other elements on your page.

> ⚠️ **Work in Progress:** This project is currently in early development and the API may change without notice.

## Key Features

- 🔮 Uses the CSS Anchor Positioning API for precise positioning
- 🚫 Works without JavaScript for basic positioning (progressively enhanced)
- 🪝 Provides a simple, intuitive React hook API
- 🎨 Zero styling opinions - fully customizable appearance
- 🖱️ Supports click, hover, and manual triggers

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

## Note!

⚡ This package uses the CSS Anchor Positioning API, which is currently in the experimental stage in most browsers. A fallback positioning system is currenlty NOT included.

## License

MIT
