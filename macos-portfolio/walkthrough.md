# MacOS Portfolio Walkthrough

## Overview
This walkthrough documents the implementation of a pixel-perfect MacOS-style portfolio website. The focus was on achieving high visual fidelity, smooth animations, and functional core UI elements.

## Key Features Implemented

### 1. Desktop Environment (`Desktop.jsx`)
- **Boot Sequence**: A custom Apple boot animation using GSAP.
- **Wallpaper**: Integrated a specific MacOS Monterey dark mode wallpaper.
- **Window Management**: Fully functional window system with dragging, resizing, minimizing, and focusing (z-index management).
- **Hero Text**: Added "Hey, I'm Adrian! welcome to my portfolio." overlay.

### 2. Dock & Icons (`Dock.jsx`, `Icon.jsx`)
- **Magnification Effect**: Implemented a smooth, distance-based magnification effect for dock icons using GSAP, mimicking the native MacOS behavior.
- **Glassmorphism**: Applied heavy backdrop blur and transparency for a premium feel.
- **Custom Icons**: 
    - Integrated a high-quality PNG for the Finder icon.
    - Integrated a custom PNG for the Safari icon.
    - Updated `Icon` component to support both Lucide SVGs and image URLs.

### 3. Functional Apps
- **Finder (`ProjectsApp.jsx`)**: A fully functional file explorer with a sidebar and content view. Includes a detailed "Resume" view and a "Work" folder grid.
- **Safari (`SafariApp.jsx`)**: A browser simulation with an address bar, favorites grid, and privacy report UI.
- **Photos (`PhotosApp.jsx`)**: A gallery application with a sidebar library and a grid of photo placeholders.
- **Trash (`TrashApp.jsx`)**: A functional trash bin UI showing deleted files.
- **Terminal (`TerminalApp.jsx`)**: A basic terminal emulator.
- **Contacts (`AboutMeApp.jsx`)**: A contact card style app.

### 4. Top Bar (`TopBar.jsx`)
- **Status Indicators**: Working clock, date, and system icons (Wifi, Battery, Control Center).
- **Menu Items**: Custom menu items ("Adrian's Portfolio", "Projects", "Contact", "Resume").

## Verification Results

### Visual Fidelity
- **Colors & Styling**: Matches MacOS Sonoma/Ventura dark mode aesthetics.
- **Animations**: Boot sequence and dock magnification are smooth and responsive.
- **Layout**: Desktop icons are correctly positioned on the right, and the dock is centered at the bottom.

### Functionality
- **Window Operations**: Windows can be opened, closed, minimized, and focused correctly.
- **App Switching**: Clicking dock icons opens the respective apps or brings them to the front.
- **Content**: All apps display their intended content (Resume, Projects, Photos, etc.).

## Next Steps
- **Content Population**: Replace placeholder images in Photos and Safari with real project screenshots or links.
- **Mobile Responsiveness**: Further refine the experience for smaller screens (currently optimized for desktop).
