Documentation under:
https://github.com/akunito/SpinachKeyboardFramework/tree/main/docs

Project contains:
- Keychron K11 Max files for VIA
- MacOS
  - Karabiner | typescript project that builds karabiner.json
      - Makes Caps Lock to behive as Hyper key
      - Makes Mouse Side Button 4 to behive as Hyper Key
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
         
- AutoHotKeys v2 for Win11
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
       
- Linux
  - Currently I use Arch Linux with Hyprland on my server, but this is going to be shut down to use it only for investigation time to time.
  - On the beautiful Hyprland should be easy to unify these keybinding on .config/hypr/hyprland.conf
  - To allign all the shortcuts, and use Caps Lock as Hyper key
    - you have to find the way to map Caps Lock to do CTRL+ALT+WIN on Linux level.
    - Or another longer term fix would be to map Caps Lock on your VIA or QMK to behive as CTRL+ALT+WIN
      - But this will require to readjust the Karabiner and AutoHotKeys project.
      - I will probably do this in the future.

- Scripts
  - You might find that some shortcuts are pointing to scripts that are not included on this project.
  - I will upload my system scripts to another project that will be linked here. 

TODO:
- Map CapsLock as Hyper (ctrl+alt+win) at VIA level
- Make Karabiner to recognize this new change
- Fix bugs after this change
- Adjust AutoHotKeys
- Update and unify documentation
