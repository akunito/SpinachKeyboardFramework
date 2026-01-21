# macOS Mapping

Complete guide to setting up the Spinach Keyboard Framework on macOS.

## Overview

macOS integration uses several tools working together:

1. **Karabiner-Elements** - Keyboard remapping and Hyper key recognition
2. **Yabai** - Tiling window manager
3. **skhd** - Simple hotkey daemon (complementary to Karabiner)
4. **Scripts** - Custom automation scripts

## 1. Karabiner-Elements

Karabiner-Elements is a powerful keyboard customization tool for macOS. This project includes a TypeScript-based configuration that builds `karabiner.json`.

### Project Structure

The Karabiner configuration is located in:
```
MacOS/karabiner/
├── rules.ts              # Main rule definitions
├── rules_SIP_ENABLE.ts   # Rules for when System Integrity Protection is enabled
├── types.ts              # TypeScript type definitions
├── utils.ts              # Utility functions
├── package.json          # Node.js dependencies
└── karabiner.json        # Generated configuration file
```

### Hyper Key Configuration

The Karabiner configuration supports two types of Hyper key setups:

#### Bind A: CapsLock → Hyper Variable

Makes CapsLock act as Hyper even if:
- You're using the built-in keyboard
- You don't have firmware modifications on your keyboard

#### Bind B: Hyper Key → Hyper Variable

Recognizes firmware modifications where CapsLock is already mapped to Hyper (Ctrl+Alt+Cmd) in VIA.

This configuration recognizes `LCtrl + LOpt + LCmd` and sets the Hyper key variable in Karabiner.

### Additional Features

- **Mouse Side Button 4** → Also acts as Hyper Key
- **Sublayers** → Different functions under Hyper key
- **Command Execution** → Execute commands and scripts with shortcuts

### Detailed Documentation

For more detailed information, see:
- [Keychron K11 Pro macOS Documentation (PDF)](Keychron_K11_Pro_MacOS_docs_annotated.pdf)

## 2. Yabai Tiling Manager

Yabai is a window management utility that provides tiling window management for macOS.

### Configuration Files

Configuration files are located in:
```
MacOS/yabai/
├── yabairc                    # Main Yabai configuration
├── yabai_functions.sh         # Shell functions for Yabai
├── yabai_functions.py         # Python functions for Yabai
└── yabai_functions_wrapper.sh # Wrapper script
```

### Installation

You can either:

1. **Copy files** (make backup if you already have Yabai configured):
   ```bash
   cp -r MacOS/yabai ~/.config/
   ```

2. **Create symbolic links**:
   ```bash
   ln -sf /path/to/SpinachKeyboardFramework/MacOS/yabai ~/.config/yabai
   ```

## 3. skhd (Simple Hotkey Daemon)

skhd provides additional hotkey functionality that complements Karabiner.

### Configuration

Configuration file:
```
MacOS/skhd/skhdrc
```

### Installation

You can either:

1. **Copy files** (make backup if you already have skhd configured):
   ```bash
   cp -r MacOS/skhd ~/.config/
   ```

2. **Create symbolic links**:
   ```bash
   ln -sf /path/to/SpinachKeyboardFramework/MacOS/skhd ~/.config/skhd
   ```

### Note

skhd is complementary to Karabiner and will eventually be replaced entirely by Karabiner when all functions are integrated there.

## 4. Scripts

Some shortcuts point to scripts that are not included in this project.

### External Scripts

These scripts are located in a separate repository:
- **Location**: [myScripts - macOS](https://github.com/akunito/myScripts/tree/main/MACOS)

You may need to install or configure these scripts separately for full functionality.

## Related Documentation

- [Glossary](01-glossary.md) - Understanding Hyper key and terminology
- [VIA Adjustments](02-via-adjustments.md) - Firmware-level configuration
- [Linux Mapping](04-linux.md) - Alternative setup for Linux
- [Windows Mapping](05-windows.md) - Alternative setup for Windows
