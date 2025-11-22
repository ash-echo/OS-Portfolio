# MacOS Portfolio

A React-based portfolio website that mimics the MacOS desktop environment.

## Features

- **Desktop Environment**: Full-screen desktop with background, top bar, and dock.
- **Window Management**: Draggable, resizable, and focusable windows using `react-rnd`.
- **Animations**: Smooth transitions and interactions powered by GSAP.
- **Tailwind CSS v4**: Modern utility-first styling.
- **Apps**:
  - **Projects**: Finder-style file browser.
  - **About Me**: Text editor style content.
  - **Terminal**: Interactive-looking CLI.

## Project Structure

```
src/
├── apps/               # Application content components
│   ├── AboutMeApp.jsx
│   ├── ProjectsApp.jsx
│   └── TerminalApp.jsx
├── components/         # Core UI components
│   ├── Desktop.jsx     # Main desktop container & window manager
│   ├── Dock.jsx        # Bottom app dock
│   ├── Icon.jsx        # Desktop/Dock icons
│   ├── TopBar.jsx      # Top menu bar
│   └── Window.jsx      # Reusable window component
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles & Tailwind setup
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Technologies

- React 19
- Vite
- Tailwind CSS v4
- GSAP
- react-rnd
- lucide-react
