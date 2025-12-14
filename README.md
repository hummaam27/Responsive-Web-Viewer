# Responsive Web Viewer

A lightweight local development tool for previewing websites across multiple responsive viewport sizes simultaneously.

This tool is designed for **visual layout testing**, allowing developers to see how a website behaves at common mobile, tablet, laptop, and desktop screen sizes at the same time—without relying on browser DevTools or manual window resizing.

---

## Features

- **Multiple Viewports at Once**  
  Render the same website in multiple iframe viewports simultaneously for side-by-side comparison.

- **Predefined Viewport Presets**  
  Includes common viewport sizes for mobile, tablet, laptop, and desktop layouts.

- **Custom Viewport Presets**  
  Create, adjust, and save your own custom viewport width and height presets to match your needs.

- **Zoom Controls**  
  Scale viewports up or down to fit more screens on a single display.

- **Local & Public URL Support**  
  Works with local development servers (`localhost`) and publicly accessible URLs (subject to browser security restrictions).

> **Note**: This tool previews **viewport sizes**, not real devices. It does not emulate mobile hardware, operating systems, or browser engines.

---

## Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd responsive-web-viewer
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Usage

1. Enter a URL (e.g. `http://localhost:3000`) in the address input.
2. Click **Load**.
3. View the website rendered across multiple viewport sizes simultaneously.
4. Add, edit, or remove viewport presets as needed.
5. Use zoom controls to scale the layout for easier comparison.

## Content Security Policy (CSP) Notice

This tool renders websites using `iframe` elements.

If a website sends restrictive security headers—such as:
- `Content-Security-Policy: frame-ancestors`
- `X-Frame-Options`

...the browser may block it from being embedded. **This is expected browser behavior, not a bug in this tool.**

### Allowing embedding during local development

If you control the website being previewed and want to allow embedding in development only, you can configure its CSP to allow this viewer:

```http
Content-Security-Policy: frame-ancestors 'self' http://localhost:5173;
```

Some websites (e.g. Google, GitHub, banking or admin portals) intentionally block iframe embedding and will not work in this tool.

## Limitations

- This tool does not emulate real devices or mobile browsers.
- Touch input, OS-specific behavior, and browser engine differences are not simulated.
- Rendering is subject to browser iframe security policies.