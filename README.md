Documentation under:
https://github.com/akunito/SpinachKeyboardFramework/tree/main/docs

<img width="1135" alt="image" src="https://github.com/akunito/SpinachKeyboardFramework/assets/9993221/717cb4e5-8e10-4f12-940b-2221cf42edd6">

--------------------------------------------------
Project content:
- (1) Glossary
- (2) VIA adjustments 
- (3) MacOS mapping
- (4) Linux mapping
- (5) Windows mapping
- (6) TODO


--------------------------------------------------
- (1) Glossary
  - Hyper key<br>
    This is how we name the combination of (Ctrl + Alt + Win) keys together.<br>
    It allows us to create shortcuts without conflicts on any system.<br>
    You can find around that some people add Shift into the combo, however we keep it out, so we can use Shift as an additional modifier.<br>
    In that way we can use (Hyper + Key) for global navigation and (Hyper + Shift + Key) for other commands.
  - Sublayers<br>
    We can use (Hyper + Sublayer key + Key) to have different layers under Hyper key.<br>
    For example:
    - (Hyper + key)                -> Move between desktops
    - (Hyper + Shift + key)        -> Send windows to desk / screenshots / audio control
    - (Hyper + Spacebar + key)     -> Text navigation with hjkl / scroll / etc
  - Keys<br>
    You will find that the Super key can be called Command, Window or GUI depending of the context. They all do the same.
    - Super == CMD == WIN == GUI
    The same for Alt and Option
    - Alt == Opt

   
--------------------------------------------------
- (2) VIA adjustments<br>
  This is the base of the rest of the project.<br>
  We do 2 main changes (2.1, 2.2) and an additional (2.3) that includes smaller changes for our VIA layout<br>
  Content:
  - (2.1) CapsLock == Hyper
    - (A) Mapping by Keyboard firmware
    - (B) Mapping by the Operative System
  - (2.2) Unify CopyPaste/etc between Mac/Linux/Win
  - (2.3) Keyboard general VIA Layout
 
  - (2.1) CapsLock == Hyper
    - (A) Mapping by Keyboard firmware
      - By VIA
        - Mapping (Caps Lock) to (Hyper)
        - This allows to create shortcuts on any Operative System
        - A Json file is included on this project with my layout for Keychron K11 Max.
          If you have a different keyboard, you can adjust it to your own.
        
        How to do this on VIA<br>
        Map any KEY on VIA to make LCTL + LALT + LGUI + non key
        - Choose a KEY and go to Special / Any
        - Type the code to replace the original key by
          ```json
          MT(MOD_LCTL | MOD_LALT | MOD_LGUI,KC_NO)
          ```
  
    - (B) Mapping by the Operative System<br>
      Some of the ways to do this will be explained later for each system.<br>
      As general info:
      - MacOS -> Karabiner (Included on this project, check below)
      - Linux -> It depends of the desktop and environment.
        - KDE Plasma is the easiest probably, as it has built in the most advanced features.
        - The other option is to install some additional software to do this.
          - This will be different if you use X11 or Wayland
          I have avoided to do this as I didn't want to install and maintain additional libraries and software.<br>
          The general idea is to install as less as possible, so in case we need to use a computer for work where<br>
          we cannot install software, or in case we want to avoid installing things everywhere.
      - Windows -> AutoHotKeys (Included on this project, check below)
  
  - (2.2) Unify CopyPaste/etc between Mac/Linux/Win<br>
    Switch L_CTL to L_CMD on VIA<br>
    This allows to unify many of the common shotcuts between MacOS and Linux/Windows<br>
    Then you can adjust either Linux and Windows or MacOS to switch the key back.
    - For example.<br>
      Our keyboard layout is now         -> LWin / LAlt / LCtrl<br>
      On Linux and Windows we have       -> LWin / LAlt / LCtrl<br>
      On MacOS we switch back to have    -> LCtrl / LAlt / LWin<br>
    - Issues?<br>
      On test
    - Specifics for K11 keyboard<br>
      As in this keyboard we have and additional mod key on the left hand (FN1 by default)<br>
      I have changed the Layout to be like -> LCtrl / LAlt / RCtrl / LWin<br>
      So on Linux/Windows I can use RCtrl with my Left hand to copy, paste, etc.<br>
      And on MacOS I have switched back the RCtrl to be RWin.

  - (2.3) Keyboard general VIA Layout<br>
    TODO: Print here my general VIA layouts


--------------------------------------------------
- (3) MacOS mapping
  Content:
  - (3.1) Karabiner
  - (3.2) Yabai
  - (3.3) skhd
  - (3.4) Scripts
     
  - (3.1) Karabiner<br>
    typescript project that builds karabiner.json<br>
    Karabiner allows us to configure any shortcut or binding for our keyboard and mouse on MacOS<br>
    We want to achive the next:
      - Hyper key
        Our karabiner project will accept two types of Hyper Keys.
        - Bind A: Caps Lock == Hyper variable.
          - This will makes CapsLock to be Hyper even if we are using the built in keyboard,<br>
            or if we don't have firmware modifications on our keyboard.
        - Bind B: Hyper key == Hyper variable.
          - To recognize our firmware modification for CapsLock == Hyper<br>
            So this recognize LCtrl LOpt LCmd and set the Hyper key variable on Karabiner.
      - Makes Mouse Side Button 4 to behive also as Hyper Key.
      - Set sublayers under Hyper key to be able to use the same key for different functions.
      - Able to execute commands and scripts with a shortcut
      - More detail on -> https://github.com/akunito/SpinachKeyboardFramework/blob/main/docs/Keychron_K11_Pro_MacOS_docs_annotated.pdf
        
  - (3.2) Yabai tiling manager
      - Set some basic rules for Yabai. You can modify your config from this one.
      - To config these files, you can either (make backup of your yabai files if you already had them)
          - Copy them to your /.config/yabai
          - or create link with ln -sf /SpinachKeyboardFramework/MacOS/yabai ~/.config
       
  - (3.3) skhd
      - Set some shortcuts that call Yabai functions
      - This is complementary to Karabiner, and it will be replaced totally by Karabiner when all the functions will be integrated there.
      - To config these files, you can either (make backup of your skhd files if you already had them)
          - Copy them to your /.config/skhd
          - or create link with ln -sf /SpinachKeyboardFramework/MacOS/skhd ~/.config
       
  - (3.4) Scripts
    - You might find that some shortcuts are pointing to scripts that are not included on this project.
    - You can find these scripts here https://github.com/akunito/myScripts/tree/main/MACOS
   
    
--------------------------------------------------
- (4) Linux mapping
  - I recommend KDE Plasma for this, as it allows all the modifications that are needed, without installing any additional package.<br>
    I'm still working on it but it looks like if Plasma is set correctly, you even can avoid using tilling managers,<br>
    saving time and having more features and stability.
  - TODO: To include dotfiles
 
  
--------------------------------------------------
- (5) Windows mapping
  Content:
  - (5.1) AutoHotKeys v2 script for CapsLock
  - (5.2) AutoHotKeys v2 script for Hyper Key
  - (5.3) PowerTools
  - (5.4) AutoHotKeys v1 script for Easy Windo Dragging KDE style
 
  - (5.1) AutoHotKeys v2 script for CapsLock.<br>
    Script included on project's files.<br>
    In case you have NOT mapped {Caps Lock} to {Hyper key} on VIA      

  - (5.2) AutoHotKeys v2 script for Hyper Key.<br>
    Script included on project's files.<br>
    In case you have mapped {Caps Lock} to {Hyper key} on VIA

  - (5.3) PowerToys.<br>
    There is an alternative called PowerToys by Microsoft, It might be less powerfull for some specific needs.<br>
    Anyway PowerToys provide many other power tools, not only keybindings, so it worth a look.
    
  - (5.4) AutoHotKeys v1 script for Easy Windo Dragging KDE style
    Functionality to move windows clicking on any part of the window
    - To move the window with (ALT + Left Click)
    - To resize windows with (ALT + Right Click)
    You already have AutohotKeys v2 installed and want to use this script as well.
    Try to run this script v1, you will get a message from Autohotkeys v2 asking you if you want to install v1 while keeping v2, so you can run both type of scripts.

    
--------------------------------------------------
- (6) TODO:
- DONE - Map CapsLock as Hyper (ctrl+alt+win) at VIA level
- DONE - Make Karabiner to recognize this new change
- DONE - Create shortcuts on Plasma 5 using Hyper key !!
- DONE - Fix bugs after this change
- DONE - Adjust AutoHotKeys
- ONGOING - Update and unify documentation
  - (2.3) TODO: Print here my general VIA layouts
  - (4) TODO: To include dotfiles



