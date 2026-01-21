# Glossary

This document defines key terms and concepts used throughout the Spinach Keyboard Framework.

## Hyper Key

The **Hyper key** is the combination of `Ctrl + Alt + Win` (Super) keys together.

### Why Hyper Key?

- **Non-conflicting**: Doesn't interfere with application shortcuts
- **Ergonomic**: Easy to access (mapped to CapsLock)
- **System-wide**: Works everywhere, not just in window managers
- **Consistent**: Same modifier across all operating systems

### Usage Pattern

We keep Shift out of the Hyper key combination so we can use Shift as an additional modifier:

- `Hyper + Key` → Global navigation and primary actions
- `Hyper + Shift + Key` → Secondary actions (send windows, screenshots, audio control)
- `Hyper + Sublayer + Key` → Sublayer-specific functions

## Sublayers

Sublayers allow us to use the same key for different functions under the Hyper key:

- `Hyper + key` → Move between desktops
- `Hyper + Shift + key` → Send windows to desk / screenshots / audio control
- `Hyper + Spacebar + key` → Text navigation with hjkl / scroll / etc

## Key Naming Conventions

Different systems use different names for the same keys:

### Super Key
- **Super** == **CMD** == **WIN** == **GUI**
- All refer to the Windows/Command key

### Alt Key
- **Alt** == **Opt** (Option on macOS)
- Both refer to the Alt/Option key

## Related Documentation

- [VIA Adjustments](02-via-adjustments.md) - How to configure Hyper key in VIA
- [macOS Mapping](03-macos.md) - Hyper key setup on macOS
- [Linux Mapping](04-linux.md) - Hyper key setup on Linux
- [Windows Mapping](05-windows.md) - Hyper key setup on Windows
