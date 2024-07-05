; This version expect CapsLock when you press CapsLock.

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
CapsLock & Tab::
{
	Send "{LWin Down}{Tab}{LWin Up}"
}
; LEFT DESK
CapsLock & q::
{
	Send "{LWin Down}{LCtrl Down}{Left}{LWin Up}{LCtrl Up}"
}
; RIGHT DESK
CapsLock & w::
{
	Send "{LWin Down}{LCtrl Down}{Right}{LWin Up}{LCtrl Up}"
}

; ===================================== Screenshots
CapsLock & c::
{
	Send "{LShift Down}{LCtrl Down}{F12}{LShift Up}{LCtrl Up}"
}


; ===================================== WIN NAV
LWin & q::
{
	Send "{LAlt Down}{F4}{LAlt Up}" ; CLOSE APP/Window
}
; ===================================== CTRL BASICS 
; LCtrl has been switched to LWin, so the next commands are disabled !!!
; LWin & z::
; {
; 	Send "{LCtrl Down}{z}{LCtrl Up}"
; }
; LWin & x::
; {
; 	Send "{LCtrl Down}{x}{LCtrl Up}"
; }
; LWin & c::
; {
; 	Send "{LCtrl Down}{c}{LCtrl Up}"
; }
; LWin & v::
; {
; 	Send "{LCtrl Down}{v}{LCtrl Up}"
; }
; LWin & a::
; {
; 	Send "{LCtrl Down}{a}{LCtrl Up}"
; }
; LWin & s::
; {
; 	Send "{LCtrl Down}{s}{LCtrl Up}"
; }
; LWin & d::
; {
; 	Send "{LCtrl Down}{d}{LCtrl Up}"
; }
; LWin & f::
; {
; 	Send "{LCtrl Down}{f}{LCtrl Up}"
; }
; LWin & g::
; {
; 	Send "{LCtrl Down}{g}{LCtrl Up}"
; }
; LWin & b::
; {
; 	Send "{LCtrl Down}{b}{LCtrl Up}"
; }
; LWin & e::
; {
; 	Send "{LCtrl Down}{e}{LCtrl Up}"
; }
; LWin & t::
; {
; 	Send "{LCtrl Down}{t}{LCtrl Up}"
; }
; LWin & w::
; {
; 	Send "{LCtrl Down}{w}{LCtrl Up}"
; }
; LWin & r::
; {
; 	Send "{LCtrl Down}{r}{LCtrl Up}"
; }

