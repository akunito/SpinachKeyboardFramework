# Spinach Keyboard Framework

A unified keyboard configuration framework that provides consistent keybindings and window management across macOS, Linux, and Windows.

![Spinach Keyboard Framework](https://github.com/akunito/SpinachKeyboardFramework/assets/9993221/717cb4e5-8e10-4f12-940b-2221cf42edd6)

## Overview

The Spinach Keyboard Framework is a comprehensive solution for creating a consistent keyboard experience across different operating systems. It uses the **Hyper key** (Ctrl+Alt+Super) as the primary modifier, mapped to CapsLock, to provide conflict-free shortcuts and powerful window management.

## Key Features

- **Unified Hyper Key**: CapsLock acts as Hyper key across all platforms
- **Cross-Platform**: Works on macOS, Linux, and Windows
- **Firmware-Level**: Primary configuration at keyboard firmware level (VIA)
- **System Integration**: Deep integration with window managers and desktop environments
- **Intelligent Window Management**: Smart application toggling and window operations

## Documentation

Complete documentation is available in the [`docs/`](docs/) directory:

### Core Concepts

- **[Glossary](docs/01-glossary.md)** - Key terms and concepts
- **[VIA Adjustments](docs/02-via-adjustments.md)** - Firmware-level keyboard configuration

### Platform-Specific Guides

- **[macOS Mapping](docs/03-macos.md)** - Setup guide for macOS (Karabiner, Yabai, skhd)
- **[Linux Mapping](docs/04-linux.md)** - Setup guide for Linux (keyd, Sway/SwayFX)
- **[Windows Mapping](docs/05-windows.md)** - Setup guide for Windows (AutoHotKey)

### Additional Resources

- **[TODO](docs/06-todo.md)** - Project status and remaining tasks
- **[Keychron K11 Max Layout](docs/Keychron%20K11%20Max%20-%20map.md)** - Specific keyboard layout
- **[macOS Documentation (PDF)](docs/Keychron_K11_Pro_MacOS_docs_annotated.pdf)** - Detailed macOS setup

## Quick Start

### 1. Configure VIA (Firmware Level)

1. Open VIA and connect your keyboard
2. Map CapsLock to Hyper key using:
   ```json
   MT(MOD_LCTL | MOD_LALT | MOD_LGUI, KC_NO)
   ```
3. See [VIA Adjustments](docs/02-via-adjustments.md) for detailed instructions

### 2. Configure Your Operating System

Choose your platform:

- **macOS**: Follow [macOS Mapping](docs/03-macos.md) guide
- **Linux**: Follow [Linux Mapping](docs/04-linux.md) guide  
- **Windows**: Follow [Windows Mapping](docs/05-windows.md) guide

## Project Structure

```
SpinachKeyboardFramework/
├── README.md                    # This file
├── docs/                        # Documentation
│   ├── 01-glossary.md          # Key terms and concepts
│   ├── 02-via-adjustments.md   # VIA configuration
│   ├── 03-macos.md             # macOS setup
│   ├── 04-linux.md             # Linux setup
│   ├── 05-windows.md           # Windows setup
│   ├── 06-todo.md              # Project status
│   └── ...                     # Additional resources
├── MacOS/                      # macOS configuration files
│   ├── karabiner/              # Karabiner-Elements config
│   ├── yabai/                  # Yabai tiling manager
│   └── skhd/                   # Simple hotkey daemon
├── Windows/                    # Windows configuration files
│   └── AutoHotKey/             # AutoHotKey scripts
└── Keychron K11 Max/           # Keychron K11 Max layout
```

## Hyper Key

The **Hyper key** is the combination of `Ctrl + Alt + Win` (Super) keys. It's mapped to CapsLock to provide:

- **Non-conflicting shortcuts**: Doesn't interfere with application shortcuts
- **Ergonomic access**: Easy to reach with your pinky
- **System-wide functionality**: Works everywhere, not just in applications
- **Consistent experience**: Same modifier across all platforms

See the [Glossary](docs/01-glossary.md) for more details.

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

See individual files for license information.

## Related Projects

- [myScripts](https://github.com/akunito/myScripts) - Additional automation scripts for macOS

---

**Note**: This framework is designed around the Keychron K11 Max keyboard, but can be adapted to other keyboards with VIA support.
