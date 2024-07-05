; This version of the script expects CTRL + ALT + SUPER when you press Caps Lock. This can be modified by VIA on your keyboard.
; The most common modifiers are Ctrl (^), Alt (!), Shift (+) and Win (#).
; < to use only the Left modifier. For example <^ is LCtrl.

; IMPORTANT !!!! The combination [CTRL + ALT + SHIFT + WIN] might trigger openning office365 website...
; Fix here https://superuser.com/questions/1455857/how-to-disable-office-key-keyboard-shortcut-opening-office-app

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
	SetCapsLockState "Off"
}

; ===================================== DESKTOP NAV
; WIN + TAB
<#<!<^Tab::
{
	Send "{LWin Down}{Tab}{LWin Up}"
}
; LEFT DESK
<#<!<^q::
{
	Send "{LWin Down}{LCtrl Down}{Left}{LWin Up}{LCtrl Up}"
}
; RIGHT DESK
<#<!<^w::
{
	Send "{LWin Down}{LCtrl Down}{Right}{LWin Up}{LCtrl Up}"
}

; ===================================== Screenshots
; You could install LightShot and map the shortcut there.


; ===================================== WIN NAV
<#<!<^>+q::
{
	Send "{LAlt Down}{F4}{LAlt Up}" ; CLOSE APP/Window
}
