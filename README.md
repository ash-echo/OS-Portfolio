# 📂 MacOS Portfolio

A **React‑based** portfolio website that mimics the classic macOS desktop environment.  
It showcases a full‑screen desktop, draggable windows, smooth GSAP animations, and a set of interactive apps.

---

##  Features

- **Desktop Environment** – Full‑screen background, top bar, and dock.
- **Window Management** – Drag, resize, focus, and minimize windows using `react‑rnd`.
- **Animations** – GSAP‑powered transitions for a premium feel.
- **Tailwind CSS v4** – Modern utility‑first styling.
- **Apps**:
  - **Finder** – File explorer with nested folders, create/delete files & folders.
  - **Terminal** – Interactive CLI with custom commands (`help`, `ls`, `cd`, `cat`, `clear`).
  - **Safari** – Mini‑browser for external links and project demos.
  - **Photos** – Gallery app to view personal and project screenshots.
  - **Trash** – Real‑time trash management (restore, permanent delete, empty).
  - **Text Editor** – Create and edit text files directly on the desktop.
  - **Games** – Integrated emulators for *Pokemon Fire Red* and *Sonic 2*.
  - **OS Portfolio** – Interactive showcase of the project itself.

---

## 📁 Project Structure

```text
src/
├── apps/               # Application components
│   ├── AboutMeApp.jsx
│   ├── ProjectsApp.jsx
│   ├── TerminalApp.jsx
│   ├── OSPortfolioApp.jsx
│   ├── TrashApp.jsx
│   └── ...
├── components/         # Core UI components
│   ├── Desktop.jsx      # Main desktop container & window manager
│   ├── Dock.jsx         # Bottom app dock
│   ├── Icon.jsx         # Desktop/Dock icons
│   ├── TopBar.jsx       # Top menu bar
│   ├── Window.jsx       # Reusable window component
│   └── ContextMenu.jsx  # Right‑click context menu
├── App.jsx             # Root component
├── main.jsx            # Entry point
└── index.css           # Global styles & Tailwind setup
```

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Build for production**
   ```bash
   npm run build
   ```

---

## 🛠️ Technologies

- **React 19**
- **Vite** – Lightning‑fast bundler
- **Tailwind CSS v4** – Utility‑first styling
- **GSAP** – High‑performance animations
- **react‑rnd** – Draggable/resizable windows
- **lucide‑react** – Icon library

---

## 📸 Screenshots & Media

Below are some screenshots from the `proj1` folder that illustrate the UI.  Replace the placeholders with your own GIFs later.
<img width="1914" height="1079" alt="desktop" src="https://github.com/user-attachments/assets/c31750e7-d230-4ff1-866a-0ae68104f5b4" />

<img width="1919" height="1079" alt="games and apps" src="https://github.com/user-attachments/assets/04d6e6cb-3fd7-4fde-ace1-47eca046f1d7" />

<img width="1919" height="1079" alt="portfolio" src="https://github.com/user-attachments/assets/779108b3-96bd-44a6-8dfe-f0ce01303741" />

![gif4](https://github.com/user-attachments/assets/031ecb22-d3d6-45be-86dd-e5bb7f404761)

---

## 🔗 Useful Links

- **Live Demo:** [https://your‑portfolio‑demo.com](https://ashwathp-portfolio.vercel.app/)
- **GitHub Repository:** h[ttps://github.com/yourusername/macos-portfolio](https://github.com/ash-echo/OS-Portfolio)

---

## 📖 Workflow Overview

1. **Design** – UI mockups were created with a modern dark‑mode aesthetic, glass‑morphism, and subtle micro‑animations.
2. **Component Architecture** – Core components (`Desktop`, `Window`, `ContextMenu`) are reusable and decoupled from app logic.
3. **State Management** – Global state lives in `Desktop.jsx` (desktop items, folder data, trash items) and is persisted via `localStorage`.
4. **Trash Integration** – Deleting an item calls `handleMoveToTrash`, which moves the item to the `trashItems` array and updates the UI in real‑time.
5. **Finder Deletion** – Finder now uses the same `onDeleteItem` prop to move files/folders to the trash instead of permanently deleting them.
6. **Testing** – Manual testing across different screen sizes ensures the context menu never overflows and the trash works in both desktop and Finder contexts.

---

## 🎉 Final Thoughts

This project demonstrates a polished, fully‑functional macOS‑style desktop built entirely with modern web technologies. Feel free to explore, fork, and extend it – whether you want to add new apps, improve animations, or integrate a backend for persistent storage.

*Happy coding!*
