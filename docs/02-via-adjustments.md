# VIA Adjustments

This is the foundation of the Spinach Keyboard Framework. The VIA (Visual Input Application) configuration sets up the keyboard firmware to work consistently across all operating systems.

## Overview

We make two main changes and one additional adjustment:

1. **CapsLock → Hyper** - Maps CapsLock to the Hyper key combination
2. **Unify Copy/Paste** - Standardizes modifier keys across Mac/Linux/Windows
3. **General VIA Layout** - Additional keyboard layout customizations

## 1. CapsLock → Hyper

This is the most important change. It maps the CapsLock key to the Hyper key (Ctrl+Alt+Super) at the firmware level.

### A. Mapping by Keyboard Firmware (VIA)

Mapping CapsLock to Hyper in VIA allows you to create shortcuts on any operating system without additional software.

#### Included Layout

A JSON file is included in this project with the layout for Keychron K11 Max:
- Location: `Keychron K11 Max/keychron_k11_max_ansi_rgb_knob.layout.json`
- If you have a different keyboard, you can adjust it to your own needs

#### How to Configure in VIA

1. Open VIA and connect your keyboard
2. Choose the key you want to remap (typically CapsLock)
3. Go to **Special** → **Any**
4. Type the following code to replace the original key:

```json
MT(MOD_LCTL | MOD_LALT | MOD_LGUI, KC_NO)
```

This creates a "momentary toggle" that sends `Left Control + Left Alt + Left GUI` (Super/Windows key) when held, and does nothing when tapped.

### B. Mapping by Operating System

If you don't have firmware remapping available, you can configure the Hyper key at the OS level:

- **macOS** → Karabiner (see [macOS Mapping](03-macos.md))
- **Linux** → keyd service (see [Linux Mapping](04-linux.md))
- **Windows** → AutoHotKey (see [Windows Mapping](05-windows.md))

**Note**: OS-level remapping is less ideal because:
- Requires installation of additional software
- May not work in all contexts (login screens, TTY, etc.)
- Needs to be configured on each system

Firmware-level remapping (VIA) is preferred because it works everywhere without additional software.

## 2. Unify Copy/Paste Across Mac/Linux/Windows

This adjustment standardizes modifier keys so common shortcuts work the same way across all operating systems.

### The Problem

- **macOS**: Uses `Cmd` (Super) for copy/paste (`Cmd+C`, `Cmd+V`)
- **Linux/Windows**: Use `Ctrl` for copy/paste (`Ctrl+C`, `Ctrl+V`)

### The Solution

Switch `L_CTL` to `L_CMD` in VIA, then adjust at the OS level:

#### Keyboard Layout After VIA Change

```
LWin / LAlt / LCtrl
```

#### OS-Level Adjustments

- **Linux/Windows**: Keep as-is → `LWin / LAlt / LCtrl`
- **macOS**: Switch back → `LCtrl / LAlt / LWin`

This way, you can use the same physical key position for copy/paste on all systems.

### Keychron K11 Specifics

The K11 keyboard has an additional modifier key on the left hand (FN1 by default). The layout is adjusted to:

```
LCtrl / LAlt / RCtrl / LWin
```

**Benefits:**
- On Linux/Windows: Use `RCtrl` with left hand for copy, paste, etc.
- On macOS: `RCtrl` is switched back to `RWin` for system compatibility

## 3. General VIA Layout

Additional keyboard layout customizations and layer configurations.

> **TODO**: Document general VIA layout configurations

## Related Documentation

- [Glossary](01-glossary.md) - Understanding Hyper key and terminology
- [macOS Mapping](03-macos.md) - OS-level configuration for macOS
- [Linux Mapping](04-linux.md) - OS-level configuration for Linux
- [Windows Mapping](05-windows.md) - OS-level configuration for Windows
