[[Keychron K11 Max - map]]

# CapsLock to send CTRL + WIN
Install AutoHotKeys v2

save a script with the content:
```cs
; The keyboard hook must be installed.
InstallKeybdHook

SendSuppressedKeyUp(key) {
    DllCall("keybd_event"
        , "char", GetKeyVK(key)
        , "char", GetKeySC(key)
        , "uint", KEYEVENTF_KEYUP := 0x2
        , "uptr", KEY_BLOCK_THIS := 0xFFC3D450)
}

; Disable Alt+key shortcuts for the IME.
~LAlt::SendSuppressedKeyUp "LAlt"

; Remap CapsLock to LCtrl in a way compatible with IME.
*CapsLock::
{
    Send "{Blind}{LCtrl DownR}{LWin DownR}"
    SendSuppressedKeyUp "LCtrl" "LWin"
	SetCapsLockState "Off"
}
*CapsLock up::
{
    Send "{Blind}{LCtrl Up}{LWin Up}"
}

; WIN + TAB
CapsLock & Tab::
{
	Send "{LWin Down}{Tab}{LWin Up}"
}

```

# PowerToys
Is another tool that we can use. Less powerfull for keybinding than AutoHotkey
Notes:
Microsoft APP
Config the shortcuts as in the pic
#### Keyboard Manager
PowerToys will not recognize the previous mapping when setting up a shortcut,
but work around setting the Keys that are sent, will work.

ie: (Move to left desktop)
CTRL + WIN + Q         -->     CTRL + WIN + LEFT
(aka CapsLock + Q)
