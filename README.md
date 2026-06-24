# Imagor ~ Image Editor

A lightweight, browser-based image editor built with vanilla HTML, CSS and JavaScript. No frameworks, no dependencies — just the Web APIs.

## Features

- **Upload any image** from your device
- **6 adjustable filters** via range sliders:
  - Brightness (0–200%)
  - Contrast (0–200%)
  - Saturation (0–200%)
  - Hue Rotate (0–360deg)
  - Grayscale (0–200%)
  - Opacity (0–100%)
- **5 one-click presets:**
  - Dreamy
  - Cinematic
  - Cool Blue
  - Warm Sunset
  - Retro Film
- **Reset** all filters back to their defaults
- **Download** the edited image as a PNG

## Project Structure

```
imagor/
├── index.html      # App layout and canvas
├── style.css       # Component styles and layout
├── theme.css       # CSS custom properties (colors, spacing, typography)
└── script.js       # All editor logic
```

## How It Works

Images are rendered onto an HTML `<canvas>` element. Filters are applied using the Canvas 2D API's `ctx.filter` property, which accepts standard CSS filter functions. When filters or presets are changed, the canvas is cleared and the image is redrawn with the updated filter string.

Downloading works by converting the canvas to a data URL via `canvas.toDataURL()` and triggering a link click.

