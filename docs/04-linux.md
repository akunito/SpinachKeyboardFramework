# Linux Mapping

Complete guide to setting up the Spinach Keyboard Framework on Linux, with focus on Sway/SwayFX window manager integration.

## Overview

Linux integration uses system-wide keyboard remapping and a tiling window manager:

1. **keyd** - System-wide Hyper key configuration
2. **Sway/SwayFX** - Wayland tiling window manager
3. **Application Toggle Script** - Intelligent app launching
4. **Window Management Scripts** - Advanced window operations
5. **Workspace Management** - Multi-monitor workspace groups

## 1. Hyper Key Configuration (keyd)

The Hyper key is configured system-wide using `keyd`, a kernel-level input remapping service.

### Why keyd?

- **System-wide**: Works everywhere (Sway, Plasma, console, TTY, login screens)
- **Kernel-level**: Works at input level, not just in window managers
- **No per-app setup**: Avoids installing additional software in each desktop environment
- **Consistent**: Same behavior across all Linux environments

### Configuration

- **Physical Key**: CapsLock
- **Function**: Acts as Hyper (Ctrl+Alt+Super) when held, Escape when tapped
- **Method**: Uses `keyd` service with "overload" functionality
- **System-wide**: Works at kernel input level

### How It Works

1. **Firmware Remapping**: If your keyboard has VIA firmware remapping that sends Ctrl+Alt+Super directly, keyd recognizes it
2. **Standard CapsLock**: If your keyboard sends standard CapsLock keycodes, keyd remaps it to Hyper
3. **Overload Feature**: CapsLock acts as Hyper when held, and Escape when tapped

This approach provides consistent behavior across all Linux environments without requiring per-environment configuration.

## 2. Sway/SwayFX Window Manager

SwayFX is a fork of Sway (i3-compatible Wayland compositor) with additional visual effects.

### Key Features

- **Tiling Window Manager**: Automatic layout management
- **Wayland-native**: Secure, modern display protocol
- **i3-compatible**: Familiar configuration and keybindings
- **Visual Effects**: Blur, shadows, rounded corners (via SwayFX)
- **Multi-monitor**: Per-monitor workspace groups

### Configuration Location

- **Main config**: `user/wm/sway/swayfx-config.nix` (NixOS/Home Manager)
- **Scripts**: `~/.config/sway/scripts/`

The configuration integrates all Spinach Keyboard Framework keybindings using the Hyper key, providing a consistent experience across all applications and window management operations.

## 3. Application Toggle Script (app-toggle.sh)

The `app-toggle.sh` script provides intelligent application launching and window management with toggle behavior.

### Usage

```bash
app-toggle.sh <app_id|class> <launch_command...>
```

### Examples

```bash
app-toggle.sh cursor cursor --flags
app-toggle.sh org.telegram.desktop Telegram
app-toggle.sh Alacritty alacritty
```

### How It Works

#### 1. Window Detection

Searches for existing windows by:
- `app_id` (Wayland application identifier)
- Window class (X11 compatibility)
- Case-insensitive matching

#### 2. Launch Logic

If no windows are found:
- Launches the application
- Detects Flatpak applications automatically
- Handles NixOS/Nix profile binaries (searches in `~/.nix-profile/bin` and `/run/current-system/sw/bin`)
- Waits for window to appear after launch
- Applies window properties (floating, sticky) based on app type

#### 3. Toggle Logic

- **Focused + single instance**: Hides to scratchpad (preserves geometry for tiled windows)
- **Focused + multiple instances**: Cycles to next instance
- **Exists but not focused**: Focuses the window
- **In scratchpad**: Restores and focuses (restores original floating state)

### Window State Management

- **Preserves state**: Floating/tiled state is preserved when hiding to scratchpad
- **Tiled windows**: Enables floating temporarily to preserve geometry, then moves to scratchpad
- **Floating windows**: Moves directly to scratchpad
- **Restoration**: Restores original state when bringing window back from scratchpad

### Special Window Properties

Some applications are automatically configured:
- **Alacritty**: Floating and sticky (appears on all workspaces)
- **Spotify**: Floating and sticky

This ensures they don't interfere with tiling layout while remaining accessible.

### Integration with Keybindings

All application shortcuts in Sway use this script:

- `Hyper+C` → Cursor (VS Code)
- `Hyper+T` → Kitty terminal
- `Hyper+R` → Alacritty terminal
- `Hyper+L` → Telegram
- `Hyper+E` → Dolphin file manager
- `Hyper+V` → Vivaldi browser
- `Hyper+Y` → Spotify
- And many more...

This script is the foundation for all application keybindings, ensuring consistent and predictable behavior.

## 4. Window Management Scripts

Several scripts handle window management operations with intelligent behavior.

### window-move.sh

Conditional window movement based on window state.

**Usage:**
```bash
window-move.sh <direction>
```

**Directions:** `left`, `right`, `up`, `down`

**Behavior:**
- **Floating windows**: Moves by 5% of screen size (percentage points)
- **Tiled windows**: Swaps position with adjacent window

**Keybindings:**
- `Hyper+Shift+j` → Move left
- `Hyper+:` → Move right
- `Hyper+Shift+k` → Move down
- `Hyper+Shift+l` → Move up

### window-overview-grouped.sh

Mission Control-like window overview using Rofi.

**Features:**
- Groups windows by application to reduce clutter
- Grid layout with large icons for easy window selection
- Inherits Stylix colors automatically

**Keybinding:** `Hyper+Tab`

These scripts provide intelligent window management that adapts to the current window state.

## 5. Workspace Management

Workspace management uses per-monitor workspace groups for multi-monitor setups.

### Per-Monitor Workspace Groups

Each monitor has its own set of workspaces:
- **Monitor 1**: Workspaces 1-10
- **Monitor 2**: Workspaces 11-20
- And so on...

This allows independent navigation on each monitor.

### Workspace Navigation Scripts

- **workspace-nav-next.sh** / **workspace-nav-prev.sh**: Navigate between workspaces in current group
- **workspace-move-next.sh** / **workspace-move-prev.sh**: Move window to next/previous workspace
- All scripts support auto-creation and wrapping at boundaries

### Keybindings

**Navigation:**
- `Hyper+Q/W` → Navigate to previous/next workspace (wraps at boundaries)
- `Hyper+1` through `Hyper+0` → Direct workspace access (using swaysome)

**Window Movement:**
- `Hyper+Shift+Q/W` → Move window to previous/next workspace
- `Hyper+Shift+1` through `Hyper+Shift+0` → Move window to workspace

### swaysome

The workspace system uses `swaysome` for per-monitor workspace groups, ensuring that workspace numbers are relative to the current monitor, not global across all monitors.

## 6. Keybinding Integration

All keybindings in Sway use the Hyper key as the primary modifier, providing a consistent and conflict-free keybinding system.

### Keybinding Categories

**System:**
- `Hyper+Shift+r` → Reload Sway configuration
- `Hyper+Shift+End` → Exit Sway (with confirmation)

**Launchers:**
- `Hyper+Space` → Rofi universal launcher
- `Hyper+Tab` → Window overview
- `Hyper+BackSpace` → Rofi launcher (alternative)

**Workspace Navigation:**
- `Hyper+Q/W` → Previous/next workspace
- `Hyper+1-0` → Direct workspace access

**Window Management:**
- `Hyper+h/j/k` → Focus left/down/up
- `Hyper+f` → Toggle fullscreen
- `Hyper+Shift+Space` → Toggle floating
- `Hyper+Escape` → Kill window

**Application Shortcuts:**
- `Hyper+<letter>` → Application toggles (via app-toggle.sh)

**Media:**
- `XF86Audio*` keys → Volume control

**Screenshots:**
- `Hyper+Shift+x` → Fullscreen screenshot
- `Hyper+Shift+c` → Area screenshot
- `Print` → Area screenshot

### Hyper Key Notation

All keybindings use the `${hyper}` notation in the Sway configuration, which is automatically expanded to `Mod4+Control+Mod1` (Super+Ctrl+Alt) by the keyd service.

This integration ensures that all Spinach Keyboard Framework keybindings work seamlessly in the Sway environment.

## 7. Alternative: KDE Plasma

KDE Plasma is also supported and recommended as an alternative desktop environment.

### Why Plasma?

- **Built-in features**: Allows all modifications without additional packages
- **Advanced keybinding**: Built-in support for complex keybinding configuration
- **Traditional desktop**: Familiar desktop environment experience

### Setup

The keyd service works system-wide, so the Hyper key configuration applies to Plasma as well. You can then configure Plasma's keybindings to use the Hyper key for all shortcuts, providing a similar experience to Sway but with a traditional desktop environment.

## Related Documentation

- [Glossary](01-glossary.md) - Understanding Hyper key and terminology
- [VIA Adjustments](02-via-adjustments.md) - Firmware-level configuration
- [macOS Mapping](03-macos.md) - Alternative setup for macOS
- [Windows Mapping](05-windows.md) - Alternative setup for Windows
