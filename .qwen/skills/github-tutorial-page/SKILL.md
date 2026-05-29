---
name: github-tutorial-page
description: Build a GitHub light-themed tutorial page with timeline, inline SVGs, code copy buttons, and progress tracking in Next.js + Tailwind v4
source: auto-skill
extracted_at: '2026-05-28T10:26:31.569Z'
---

# GitHub Light-Themed Tutorial Page Pattern

## Design System

Use these CSS custom properties in `globals.css` for a GitHub light theme:

```css
:root {
  --background: #ffffff;
  --foreground: #1f2328;
  --border-color: #d1d5db;
  --code-bg: #f6f8fa;
  --accent-green: #1a7f37;
  --accent-blue: #0969da;
  --accent-yellow: #9a6700;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
}
```

Map to Tailwind v4 theme via `@theme inline`:

```css
@theme inline {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'SF Mono', 'SFMono-Regular', 'Consolas', monospace;
  --color-github-green: var(--accent-green);
  --color-github-blue: var(--accent-blue);
  --color-github-yellow: var(--accent-yellow);
  --color-code-bg: var(--code-bg);
  --color-border-github: var(--border-color);
}
```

## Tailwind v4 Gotcha

**`@import` rules MUST precede all other CSS rules** (except `@charset` and `@layer`):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

:root { ... }
```

Placing `@import "tailwindcss"` first and a Google Fonts `@import` after it causes a CSS build warning.

## Page Structure

### 1. Sticky Header with Progress

```tsx
<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-github">
```

Include a progress bar that updates from a `Set<number>` of completed step IDs.

### 2. Hero Section

- Title + subtitle with GitHub green/blue color coding
- **Inline SVG illustration** (not `<Image>`) for instant render, no asset files needed
- **Can also include real images** from `/public/images/` using `next/image` alongside the SVG for GLB preview screenshots. Stack SVG on top, images below in a responsive grid:

```tsx
{/* SVG illustration */}
<div className="mt-8 max-w-lg mx-auto">
  <HeroIllustration />
</div>

{/* Real reference images */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
  <div className="relative rounded-xl border border-border-github overflow-hidden">
    <Image src="/images/3d-village-one.png" alt="..." width={480} height={360} priority />
    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
      view 1 — village.glb
    </div>
  </div>
</div>
```

### 3. Timeline Steps

Use an alternating left/right layout on desktop with a center connector line:

```tsx
// Even index → left side, odd index → right side (on md+ screens)
<div className={`w-full md:w-[calc(50%-2rem)] ${
  isEven ? "md:pr-8 md:text-right" : "md:ml-auto md:pl-8"
} pl-14 md:pl-0`}>
```

Each step card includes:
- Checkbox (animated pop on check via `@keyframes checkPop`)
- Time badge (green pill: `bg-github-green/10 text-github-green`)
- Step icon from `lucide-react`
- SVG illustration in a bordered container
- "What:" and "Why:" descriptions
- Optional code blocks with copy button

### 4. Code Blocks with Copy

```tsx
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 800);
    });
  };
  // Header bar with label + copy button
  // <pre><code> with font-mono, bg-code-bg
}
```

Copy flash animation: `@keyframes copyFlash` transitions to green background then fades.

### 5. Embed Preview Area

Use CSS3D perspective for decorative rings:

```tsx
<div style={{ perspective: "600px" }}>
  <div style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg)" }}>
    {/* concentric circles with translateZ offsets */}
  </div>
</div>
```

### 6. Bonus Section

Yellow-accented card (`border-github-yellow/30`, `bg-gradient-to-br from-yellow-50/50`) for advanced/integration content with its own code blocks.

### 7. Completion Celebration

When `checkedSteps.size === steps.length`, show a green celebration banner with checkmark icon.

## Required Dependencies

```bash
npm install lucide-react
```

## File Structure

```
app/
├── globals.css    # Theme variables, animations, scrollbar styling
├── layout.tsx     # Metadata, Inter + Geist fonts
└── page.tsx       # "use client" — all components inline
```

## Key Tailwind v4 Classes Used

| Purpose | Class |
|---------|-------|
| Border | `border-border-github` |
| Code background | `bg-code-bg` |
| Green accent | `text-github-green`, `bg-github-green/10` |
| Blue accent | `text-github-blue` |
| Monospace font | `font-mono` |
| Sans font | Inherited from `--font-sans` |
| Backdrop blur | `backdrop-blur-md` |
| Hover lift | Custom `.step-card` class with transition |
