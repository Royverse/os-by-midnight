---
description: Build a real OS with a GUI tool (like the YouTube video)
---

# Build Your Own OS - GUI Method

This uses **Cubic** - a graphical point-and-click tool to build a custom operating system.

## Quick Start

### 1. Install Ubuntu (WSL or VM)
```bash
# Windows - PowerShell (Admin):
wsl --install -d Ubuntu-22.04
```

### 2. Install Cubic
// turbo
```bash
sudo apt-add-repository universe
sudo apt-add-repository ppa:cubic-wizard/release
sudo apt update
sudo apt install --no-install-recommends cubic
```

### 3. Download Base ISO
// turbo
```bash
cd ~/Downloads
wget https://releases.ubuntu.com/24.04/ubuntu-24.04-desktop-amd64.iso
```

### 4. Launch Cubic (GUI)
```bash
cubic
```

### 5. Customize in the GUI
- **Project**: Create new project, select downloaded ISO
- **Details**: Change OS name, version (e.g., "MidnightOS 1.0")
- **Terminal**: Remove bloat, add your apps
  ```bash
  apt remove firefox libreoffice* gnome-games*
  apt install chromium-browser vlc gimp code
  ```
- **Generate**: Click to build your ISO

### 6. Flash to USB
**Windows**: Use Rufus - https://rufus.ie/
**Linux**: `sudo dd if=YourOS.iso of=/dev/sdX bs=4M`

### 7. Boot on Real Hardware
- Insert USB
- Restart, press F12
- Select USB
- Install your OS!

## Result
You get a **real, installable operating system** you can use on any computer.

See `EASY_OS_BUILD_GUIDE.md` for detailed instructions with screenshots and customization options.
