# Pokémon FireRed - EmulatorJS Web Player

A complete standalone website for playing Pokémon FireRed using EmulatorJS.

## 📁 Project Structure

```
pokemon-firered/
├── index.html                 # Main HTML file (emulator interface)
├── README.md                  # This file
├── emulatorjs/               # EmulatorJS files (loaded from CDN)
│   └── bios/                 # BIOS files directory
│       ├── README.txt        # Instructions for BIOS placement
│       └── gba_bios.bin     # ⚠️ PLACE YOUR GBA BIOS HERE
└── roms/                     # ROM files directory
    ├── README.txt            # Instructions for ROM placement
    └── firered.gba          # ⚠️ PLACE YOUR POKEMON FIRERED ROM HERE
```

## 🎮 Setup Instructions

### Step 1: Place Required Files

You need two files to run the emulator:

#### 1. **Pokémon FireRed ROM** (`firered.gba`)
   - **Location:** `pokemon-firered/roms/firered.gba`
   - **Filename must be exactly:** `firered.gba` (lowercase)
   - ⚠️ **Legal requirement:** You must own a legitimate copy of Pokémon FireRed

#### 2. **Game Boy Advance BIOS** (`gba_bios.bin`)
   - **Location:** `pokemon-firered/emulatorjs/bios/gba_bios.bin`
   - **Filename must be exactly:** `gba_bios.bin` (lowercase)
   - **File size:** 16 KB (16,384 bytes)
   - ⚠️ **Legal requirement:** Must be obtained legally from your GBA hardware

### Step 2: Run a Local Web Server

EmulatorJS requires a local web server to run (cannot open `index.html` directly in browser due to CORS restrictions).

#### Option 1: Using Node.js (Recommended)

If you have Node.js installed:

```bash
# Navigate to the project directory
cd pokemon-firered

# Install and run a simple HTTP server
npx serve .
```

The emulator will be available at: `http://localhost:3000`

#### Option 2: Using Python

If you have Python installed:

**Python 3:**
```bash
cd pokemon-firered
python -m http.server 8000
```

**Python 2:**
```bash
cd pokemon-firered
python -m SimpleHTTPServer 8000
```

The emulator will be available at: `http://localhost:8000`

#### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 4: Using PowerShell (Windows)

```powershell
cd pokemon-firered
python -m http.server 8000
```

Or install a simple HTTP server:

```powershell
npm install -g http-server
http-server -p 8000
```

### Step 3: Open in Browser

Once the server is running, open your web browser and navigate to:
- `http://localhost:3000` (if using `npx serve`)
- `http://localhost:8000` (if using Python or http-server)

## 🎯 Keyboard Controls

The emulator uses the following default keyboard mappings:

| Game Button | Keyboard Key |
|-------------|--------------|
| D-Pad Up    | Arrow Up ↑   |
| D-Pad Down  | Arrow Down ↓ |
| D-Pad Left  | Arrow Left ← |
| D-Pad Right | Arrow Right →|
| A Button    | Z            |
| B Button    | X            |
| Start       | Enter        |
| Select      | Shift        |
| L Button    | A            |
| R Button    | S            |

### Additional Controls

- **F11** or **Fullscreen button**: Toggle fullscreen mode
- **Save/Load States**: Use the EmulatorJS menu (click the menu icon in the emulator)
- **Fast Forward**: Available in the EmulatorJS menu
- **Screenshot**: Available in the EmulatorJS menu

You can customize controls by clicking the settings icon in the emulator interface.

## 🌐 EmulatorJS Features

This implementation uses EmulatorJS with the following features:

- ✅ Full Game Boy Advance emulation
- ✅ Save states (save/load game progress at any point)
- ✅ Fast forward mode
- ✅ Screenshot capture
- ✅ Fullscreen mode
- ✅ Touch controls on mobile devices
- ✅ Gamepad/controller support
- ✅ Responsive design (works on desktop, tablet, and mobile)
- ✅ Browser-based saves (automatically saved in your browser)

## 📱 Mobile Support

The emulator is fully responsive and includes:
- Touch-based virtual gamepad
- Auto-adjusting screen size
- Mobile-optimized controls

## ⚙️ Technical Details

### EmulatorJS Configuration

The emulator is configured with:

```javascript
EJS_player = "#game";                    // Container element
EJS_core = "gba";                        // Game Boy Advance core
EJS_gameUrl = "roms/firered.gba";       // ROM location
EJS_biosUrl = "emulatorjs/bios/gba_bios.bin"; // BIOS location
EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/"; // CDN path
EJS_gameName = "Pokemon FireRed";       // Game name
EJS_startOnLoaded = true;               // Auto-start when loaded
```

### Browser Compatibility

Tested and working on:
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari (macOS/iOS)
- ✅ Opera

## 🔧 Troubleshooting

### "Files Not Found" Error

**Problem:** The emulator displays an error about missing files.

**Solution:**
1. Verify `firered.gba` is in the `roms/` folder
2. Verify `gba_bios.bin` is in the `emulatorjs/bios/` folder
3. Check that filenames match exactly (case-sensitive)
4. Ensure you're running a local web server (not opening the file directly)

### Blank Screen or Loading Forever

**Problem:** The emulator shows a loading screen indefinitely.

**Solution:**
1. Check browser console for errors (F12 → Console tab)
2. Verify BIOS file is valid (16 KB / 16,384 bytes)
3. Verify ROM file is a valid GBA ROM
4. Try using a different browser
5. Clear browser cache and reload

### Controls Not Working

**Problem:** Keyboard inputs aren't responding.

**Solution:**
1. Click inside the emulator window to focus it
2. Check that you're using the correct key mappings
3. Try remapping controls in the EmulatorJS settings menu

### Performance Issues / Lag

**Problem:** The game runs slowly or stutters.

**Solution:**
1. Close other browser tabs and applications
2. Disable browser extensions temporarily
3. Try using Chrome (best performance)
4. Enable hardware acceleration in browser settings
5. Lower audio/video quality in emulator settings if available

### Sound Issues

**Problem:** No audio or distorted sound.

**Solution:**
1. Check that browser sound isn't muted
2. Check that emulator volume isn't muted (in EmulatorJS menu)
3. Try a different browser
4. Ensure BIOS file is correct

## 📖 Additional Resources

- **EmulatorJS Documentation:** https://emulatorjs.org/docs/
- **EmulatorJS GitHub:** https://github.com/EmulatorJS/EmulatorJS
- **Report Issues:** Open an issue on the EmulatorJS GitHub repository

## ⚖️ Legal Notice

**IMPORTANT:** This project is a ROM emulator framework only. It does NOT include:
- Any copyrighted ROM files
- Any copyrighted BIOS files

You must legally obtain these files:
- You must own a legitimate copy of Pokémon FireRed to use its ROM
- You must extract the BIOS from your own Game Boy Advance hardware

**This project is for educational and personal backup purposes only.**

Pokémon is a trademark of Nintendo/Game Freak/The Pokémon Company.

## 📄 License

This web implementation is provided as-is. EmulatorJS is licensed under GPL-3.0.

---

## 🚀 Quick Start Summary

```bash
# 1. Place your files
#    - roms/firered.gba
#    - emulatorjs/bios/gba_bios.bin

# 2. Start a local server
cd pokemon-firered
npx serve .

# 3. Open browser
#    http://localhost:3000

# 4. Play!
```

Enjoy playing Pokémon FireRed! 🎮
