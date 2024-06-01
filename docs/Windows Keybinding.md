[[Keychron K11 Max - map]]

# CapsLock to send CTRL + WIN
Install AutoHotKeys v2

save a script with the content: 
```cs
; this is just an example
; full script located on https://github.com/akunito/SpinachKeyboardFramework/tree/main/Windows/AutoHotKey


; The keyboard hook mustbe installed.
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
