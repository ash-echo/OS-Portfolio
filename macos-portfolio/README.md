# MacOS Portfolio

A React-based portfolio website that mimics the MacOS desktop environment.

## Features

- **Desktop Environment**: Full-screen desktop with background, top bar, and dock.
- **Window Management**: Draggable, resizable, and focusable windows using `react-rnd`.
- **Animations**: Smooth transitions and interactions powered by GSAP.
- **Tailwind CSS v4**: Modern utility-first styling.
- **Apps**:
  - **Finder**: Fully functional file explorer with nested folders and file management.
  - **Terminal**: Interactive CLI with custom commands (help, ls, cd, cat, clear).
  - **Safari**: Browser simulation for viewing external links and projects.
  - **Photos**: Gallery app for viewing personal and project photos.
  - **Trash**: Real-time trash management with restore and permanent delete.
  - **Text Editor**: Create and edit text files directly on the desktop.
  - **Games**: Integrated emulators for Pokemon Fire Red and Sonic 2.
  - **OS Portfolio**: Interactive showcase of the project itself.

## Project Structure

```
src/
├── apps/               # Application content components
│   ├── AboutMeApp.jsx
│   ├── ProjectsApp.jsx
│   ├── TerminalApp.jsx
│   ├── OSPortfolioApp.jsx
│   ├── TrashApp.jsx
│   └── ...
├── components/         # Core UI components
│   ├── Desktop.jsx     # Main desktop container & window manager
│   ├── Dock.jsx        # Bottom app dock
│   ├── Icon.jsx        # Desktop/Dock icons
│   ├── TopBar.jsx      # Top menu bar
│   ├── Window.jsx      # Reusable window component
│   └── ContextMenu.jsx # Right-click context menu
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
