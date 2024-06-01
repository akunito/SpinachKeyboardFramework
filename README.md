Documentation under:
https://github.com/akunito/SpinachKeyboardFramework/tree/main/docs

<img width="1135" alt="image" src="https://github.com/akunito/SpinachKeyboardFramework/assets/9993221/717cb4e5-8e10-4f12-940b-2221cf42edd6">


Project contains:
- Keychron K11 Max files for VIA
  - Hyper Key map on Caps Lock
    - Mapping (Caps Lock) to send (L_CTL + L_ALT + L_CMD)
    - This allows to create shortcuts on any Operative System
      
- MacOS
  - Karabiner | typescript project that builds karabiner.json
      - Makes Caps Lock to behive as Hyper key.
      - Recognize the combination of (L_CTL + L_ALT + L_CMD) to work as Hyper key.
      - Makes Mouse Side Button 4 to behive as Hyper Key.
      - Set sublayers under Hyper key to be able to use the same key for different functions.
      - Able to execute commands and scripts with a shortcut
      - More in https://github.com/akunito/SpinachKeyboardFramework/blob/main/docs/Keychron_K11_Pro_MacOS_docs_annotated.pdf
        
  - Yabai tiling manager | config files
      - Set some basic rules for Yabai. You can modify your config from this one.
      - To config these files, you can either (make backup of your yabai files if you already had them)
          - Copy them to your /.config/yabai
          - or create link with ln -sf /SpinachKeyboardFramework/MacOS/yabai ~/.config
       
  - skhd | config files
      - Set some shortcuts that call Yabai functions
      - This is complementary to Karabiner, and it will be replaced totally by Karabiner when all the functions will be integrated there.
      - To config these files, you can either (make backup of your skhd files if you already had them)
          - Copy them to your /.config/skhd
          - or create link with ln -sf /SpinachKeyboardFramework/MacOS/skhd ~/.config
         
- Windows
  - AutoHotKeys v2 for Win11 (In case you have NOT mapped {Caps Lock} to {Hyper key} on VIA)
      - Install AutoHotKeys
      - Execute this command
      - This script unify a bit our keybindings to match our MacOS config.
      - Will allow you to
        - move between workspaces using caps lock + q/w
        - see all workspaces using caps lock + tab
        - Use some of the commands as on MacOS:
          - cmd + c to copy
          - cmd + p to paste
          - Check the script for all the examples, and modify it to your taste.
          - Note that on some system or strange cases cmd + c will not work, but you can always use ctrl.
          - Note that sometimes you need to click on the AutoHotKeys tray icon to reload the script.
          - It's not perfect yet, but it works stable 95% of the time, and it's nice to use some of the most used commands equal than on MacOS or Linux.
      - There is an alternative called PowerToys by Microsoft, but I found it less powerfull for my specific needs. Anyway PowerToys provide many other power tools, not only keybindings, so it worth a look.

  - AutoHotKeys v2 for Win11 (In case you have mapped {Caps Lock} to {Hyper key} on VIA)
    - TO DO
       
- Linux
  - To allign all the shortcuts, and use Caps Lock as Hyper key. Caps Lock have been mapped by VIA to do CTRL + ALT + CMD (Hyper key)
  - On this way we can now create any shortcut on Linux or Windows

- Scripts
  - You might find that some shortcuts are pointing to scripts that are not included on this project.
  - You can find these scripts here https://github.com/akunito/myScripts/tree/main/MACOS 

TODO:
- DONE - Map CapsLock as Hyper (ctrl+alt+win) at VIA level
- DONE - Make Karabiner to recognize this new change
- Create shortcuts on Plasma 5 using Hyper key !!
- Fix bugs after this change
- Adjust AutoHotKeys
- Update and unify documentation


VIA
To map Caps Lock to Hyper key by firmware level
Map any KEY on VIA to make LCTL + LALT + LGUI + non key
- Choose a KEY and go to Special / Any
- Type the code to replace the original key by
  ```json
  MT(MOD_LCTL | MOD_LALT | MOD_LGUI,KC_NO)
  ```
Map to make LCTL + LSFT + LAT + LGUI + non key
  ```json
  MT(MOD_LCTL | MOD_LSFT | MOD_LALT | MOD_LGUI,KC_NO)
  ```

This way we can map anything on any Operative System by shortcuts
As Capslock will send CTRL ALT CMD to any system, and this can be mapped everywhere.
For example you can do:
- Capslock + 1             -> go to virtual desk 1
- Capslock + Shift + 1     -> send window to desk 1
- Capslock + Q             -> go to virtual desk on the left
- Capslock + T             -> open or focus on terminal
- Capslock + G             -> open or focus on chromium
