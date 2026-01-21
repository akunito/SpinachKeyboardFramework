# Windows Mapping

Complete guide to setting up the Spinach Keyboard Framework on Windows.

## Overview

Windows integration uses AutoHotKey scripts to provide Hyper key functionality and window management features.

## 1. AutoHotKey v2 Script for CapsLock

Use this script if you have **NOT** mapped CapsLock to Hyper key in VIA firmware.

### Location

```
Windows/AutoHotKey/SpinachKeyBinding_CapsLock.ahk
```

### What It Does

- Maps CapsLock to Hyper key (Ctrl+Alt+Win) at the OS level
- Provides Hyper key functionality without firmware remapping

## 2. AutoHotKey v2 Script for Hyper Key

Use this script if you have **already mapped** CapsLock to Hyper key in VIA firmware.

### Location

```
Windows/AutoHotKey/SpinachKeyBinding_Hyper.ahk
```

### What It Does

- Recognizes the firmware-level Hyper key mapping
- Provides additional keybinding functionality on top of the firmware mapping

## 3. PowerToys (Alternative)

Microsoft PowerToys is an alternative solution that provides many power tools, not just keybindings.

### Features

- **Keybinding management**: Less powerful for specific needs compared to AutoHotKey
- **Additional tools**: Many other power tools beyond keybindings
- **Official Microsoft**: Supported by Microsoft

### When to Use

PowerToys might be less powerful for some specific needs, but it provides many other useful tools beyond keybindings, so it's worth considering.

## 4. AutoHotKey v1 Script: Easy Window Dragging (KDE Style)

This script provides window management functionality similar to KDE Plasma.

### Location

```
Windows/AutoHotKey/Easy Window Dragging KDE style.ahk
```

### Features

- **Move windows**: Click and drag any part of the window with `Alt + Left Click`
- **Resize windows**: Resize windows with `Alt + Right Click`

### Installation Note

If you already have AutoHotKey v2 installed and want to use this v1 script:

1. Try to run the v1 script
2. AutoHotKey v2 will prompt you to install v1
3. You can keep both v1 and v2 installed simultaneously
4. Both versions can run different scripts at the same time

## Related Documentation

- [Glossary](01-glossary.md) - Understanding Hyper key and terminology
- [VIA Adjustments](02-via-adjustments.md) - Firmware-level configuration
- [macOS Mapping](03-macos.md) - Alternative setup for macOS
- [Linux Mapping](04-linux.md) - Alternative setup for Linux
