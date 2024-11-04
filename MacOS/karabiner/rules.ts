// This is the advanced version in case you have disabled SIP following Yabai documentation

// If you want to use advanced features of Yabai you need to disable partially the Apple protection / SIP
// This allows to open/minimize/focus windows and other advanced management, that is not possible with SIP enabled

// If you cannot disable SIP, you can replace this rules.ts version by rules_SIP_ENABLE.ts

import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

// Run the next command to build the changes of this file to "karabiner.json": 
// cd ~/github/mxstbr/karabiner && yarn run build && ./replace_string.sh

// declare a variable for scriptPach = ~/github/mxstbr/karabiner/scripts/
const scriptPath = "~/syncthing/git_repos/mySCRIPTS/MACOS";
const yabaiFunctionsPath = "~/syncthing/git_repos/myProjects/KeyboardProjects/spinachShortcuts/MacOS/yabai/yabai_functions.sh";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⌘)",
    manipulators: [
      {
        description: "CAPS LOCK -> HYPER",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "spacebar",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        type: "basic",
      },
      {
        description: "Caps Lock (as CMD+ALT+CTRL mod mapped by VIA on Keychron) -> Hyper Key.",
        from: {
          key_code: "left_control",
          modifiers: {
            mandatory: ["left_command", "left_option"],
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "spacebar",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        type: "basic",
      },
      {
        description: "MICE_4 -> HYPER",
        from: {
          modifiers: {
            mandatory: ["any"],
          },
          pointing_button: "button4",
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "spacebar",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        type: "basic",
      },
      {
        description: "Switch RCtrl to RCmd",
        from: {
          key_code: "right_control",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "right_command"
          },
        ],
        type: "basic",
      }
      // {
      //   description: "RIGHT_CMD -> FN (for inbuild keyboard)",
      //   from: {
      //     key_code: "right_command",
      //   },
      //   to: [
      //     {
      //       key_code: "fn",
      //     },
      //   ],
      //   to_after_key_up: [
      //     {
      //       key_code: "fn",
      //     },
      //   ],
      //   // to_if_alone: [
      //   //   {
      //   //     key_code: "escape",
      //   //   },
      //   // ],
      //   type: "basic",
      // },

      // {
      //   description: "MICE_5 click -> cmd ctrl alt + TAB",
      //   from: {
      //     modifiers: {
      //       mandatory: ["any"],
      //     },
      //     pointing_button: "button5",
      //   },
      //   to: [
      //     {
      //       pointing_button: "button5",
      //     },
      //   ],
      //   to_after_key_up: [
      //     {
      //       pointing_button: "button5",
      //     },
      //   ],
      //   to_if_alone: [
      //     {
      //       key_code: "tab",
      //       modifiers: ["left_command", "left_control", "left_option"],
      //     },
      //   ],
      //   type: "basic",
      // },
      // {
      //   description: "Disable CMD + Tab to force Hyper Key usage",
      //   from: {
      //     key_code: "tab",
      //     modifiers: {
      //       mandatory: ["left_command"],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: "tab",
      //     },
      //   ],
      //   type: "basic",
      // },
    ],
  },
  ...createHyperSubLayers({
    
    // ===================================================================================================================
    // ============================================================================================= GLOBAL NAVIGATION: APPS
    // ===================================================================================================================
    // To manage windows we call the script .config/skhd/skhd_functions.sh
    p: {
      description: "Bitwarden",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Bitwarden"'` }],
    },
    g: {
      description: "Chromium",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Chromium"'` }],
    },
    d: {
      description: "Obsidian",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Obsidian"'` }],
    },
    v: {
      description: "Vivaldi",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Vivaldi"'` }],
    },
    c: {
      description: "Cursor",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Cursor"'` }],
    },
    t: {
      description: "Kitty",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "kitty"'` }],
    },
    e: {
      description: "Finder",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Finder"'` }],
    },
    y: {
      description: "Spotify",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Spotify"'` }],
    },
    f: {
      description: "FreeTube",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "FreeTube"'` }],
    },
    m: {
      description: "Activity Monitor",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Activity Monitor"'` }],
    },
    s: {
      description: "System Settings",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "System Settings"'` }],
    },
    x: {
      description: "Calendar",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Calendar"'` }],
    },
    u: {
      description: "Calculator",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Calculator"'` }],
    },
    r: {
      description: "Reproductor (VLC)",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "VLC"'` }],
    },
    o: {
      description: "qBittorrent",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "qBittorrent"'` }],
    },
    n: {
      description: "NordVPN",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "NordVPN"'` }],
    },
    l: {
      description: "Telegram",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} navigate_app "Telegram"'` }],
    },

    // TEST
    i: {
      description: "TEST",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} nav_multiple_windows_app'` }],
    },

    // ===================================================================================================================
    // ============================================================================================= GLOBAL NAVIGATION: SPACES, FOCUS
    // ===================================================================================================================
    tab: {
      description: "Mission Control",
      to: [{ key_code: "tab",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    escape: {
      description: "Show Desktop",
      to: [{ key_code: "escape",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    up_arrow: {
      description: "Focus to the menu bar (-)",
      to: [{ key_code: "hyphen",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    down_arrow: {
      description: "Focus to Dock (equal_sign)",
      to: [{ key_code: "equal_sign",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    left_arrow: {
      description: "Space: SWAP with LEFT",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management move left'` }],
    },
    right_arrow: {
      description: "Space: SWAP with RIGHT",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management move right'` }],
    },
    // ===================================================== NAV thought the Deep SPACE
    q: {
      description: "Space: LEFT",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management prev'` }],
    },
    w: {
      description: "Space: RIGHT",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management next'` }],
    },
    1: {
      description: "Space: 1",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 1'` }],
    },
    2: {
      description: "Space: 2",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 2'` }],
    },
    3: {
      description: "Space: 3",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 3'` }],
    },
    4: {
      description: "Space: 4",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 4'` }],
    },
    5: {
      description: "Space: 5",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 5'` }],
    },
    6: {
      description: "Space: 6",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 6'` }],
    },
    7: {
      description: "Space: 7",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 7'` }],
    },
    8: {
      description: "Space: 8",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 8'` }],
    },
    9: {
      description: "Space: 9",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 9'` }],
    },
    0: {
      description: "Space: 10",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 10'` }],
    },
    hyphen: {
      description: "Space: 11",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 11'` }],
    },
    equal_sign: {
      description: "Space: 12",
      to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} space_management 12'` }],
    },
    
    // ===================================================================================================================
    // ============================================================================================= BROWSER
    // ===================================================================================================================
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      // Quarterly "P"lan
      p: open("https://qrtr.ly/plan"),
      y: open("https://news.ycombinator.com"),
      f: open("https://facebook.com"),
      r: open("https://reddit.com"),
    },


    // ===================================================================================================================
    // ============================================================================================= TILING WINDOW MANAGER
    // ===================================================================================================================
    spacebar: {
      // ================================================================== WIN NAV
      // TODO: Switch all this to trigger Yabai directly and disable skhdrc
      // ================== SEND to SPACES
      1: {
        description: "Send Window to 1",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 1'` }],
      },
      2: {
        description: "Send Window to 2",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 2'` }],
      },
      3: {
        description: "Send Window to 3",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 3'` }],
      },
      4: {
        description: "Send Window to 4",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 4'` }],
      },
      5: {
        description: "Send Window to 5",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 5'` }],
      },
      6: {
        description: "Send Window to 6",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 6'` }],
      },
      7: {
        description: "Send Window to 7",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 7'` }],
      },
      8: {
        description: "Send Window to 8",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 8'` }],
      },
      9: {
        description: "Send Window to 9",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 9'` }],
      },
      0: {
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 10'` }],
      },
      hyphen: {
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 11'` }],
      },
      equal_sign: {
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management 12'` }],
      },
      q: {
        description: "Send Window to Left",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management send_prev_space'` }],
      },
      w: {
        description: "Send Window to Right",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management send_next_space'` }],
      },
      // ================== MOVE to CORNERS
      e: {
        description: "Window to corner Top-Left",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap top_left'` }],
      },
      t: {
        description: "Window to corner Top-Right",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap top_right'` }],
      },
      c: {
        description: "Window to corner Bot-Left",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap bot_left'` }],
      },
      b: {
        description: "Window to corner Bot-Right",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap bot_right'` }],
      },
      // ================== MOVE to N/W/S/E
      r: {
        description: "Window to North",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap north'` }],
      },
      v: {
        description: "Window to South",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap south'` }],
      },
      d: {
        description: "Window to West",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap west'` }],
      },
      g: {
        description: "Window to East",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management grid_or_swap east'` }],
      },
      // ================== SWAP by Cycle Clockwise/Counter Clockwise
      // Cycle the Tile to prev/next window focused
      x: {
        description: "Cycle clockwise",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management cycle_clockwise'` }],
      },
      z: {
        description: "Cycle counter clockwise",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management cycle_counterclockwise'` }],
      },
      // ================== SEND to MONITORS
      left_arrow: {
        description: "Send Window to Left Monitor",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management send_prev_display'` }],
      },
      right_arrow: {
        description: "Send Window to Right Monitor",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management send_next_display'` }],
      },
      // ================== TOGGLE PROPERTIES
      a: {
        description: "Toggle Window Float",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management make_float'` }],
      },
      s: {
        description: "Toggle Window Sticky (show on all spaces)",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management make_sticky'` }],
      },
      f: {
        description: "Toggle Window FullScreen",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management make_fullscreen'` }],
      },
      // ================== MOVE WINDOW
      // Move the focused window manually
      h: {
        description: "Move window left",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management move left'` }],
      },
      l: {
        description: "Move window right",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management move right'` }],
      },
      j: {
        description: "Move window up",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management move up'` }],
      },
      k: {
        description: "Move window down",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management move down'` }],
      },
      // ================== RESIZE WINDOW
      // Resize the focused window manually
      o: {
        description: "Resize window wider",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management resize wider'` }],
      },
      y: {
        description: "Resize window narrower",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management resize narrower'` }],
      },
      u: {
        description: "Resize window taller",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management resize taller'` }],
      },
      i: {
        description: "Resize window shorter",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; ${yabaiFunctionsPath} window_management resize shorter'` }],
      },
      // ================== GENERAL SETTINGS RELATED TO WINDOWS and AUTOMATION
      return_or_enter: {
        description: "Restart Yabai & Skhdrc",
        to: [{ shell_command: `/bin/zsh -c 'source ~/.zshrc; $YABAI_FUNCTIONS_PATH reset_config'` }],
      },
    },

    // ===================================================================================================================
    // ============================================================================================= SYSTEM CONTROLS / AUDIO / SCREENSHOTS
    // ===================================================================================================================
    // Shift = "System Control"
    left_shift: {
      // ================================================================== POWER CONTROL
      delete_forward: { // execute a shell_command with the varialbe scriptPath + lock_screen.sh
        to: [{ shell_command: `${scriptPath}/powerControl/lock_screen.sh` }],
      },
      escape: {
        to: [{ shell_command: `${scriptPath}/powerControl/powerControlMenu.sh` }],
      },
      // ================================================================== AUDIO / MUSIC / MICROPHONE
      d: {
        to: [{ consumer_key_code: "dictation", }], // key_code must be replaced probably by customer_key_code TEST
      },
      h: {
        to: [{ key_code: "rewind" }],
      },
      l: {
        to: [{ key_code: "fastforward" }],
      },
      k: {
        to: [{ key_code: "volume_increment" }],
      },
      j: {
        to: [{ key_code: "volume_decrement" }],
      },
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ consumer_key_code: "mute", }], // key_code must be replaced probably by customer_key_code TESTnn
      },
      m: {
        to: [{ shell_command: `${scriptPath}/audioControl/microphone.sh` }],
      },
      // ================================================================== BLUETOOTH
      b: {
        to: [{ shell_command: "open /System/Library/PreferencePanes/Bluetooth.prefPane" }],
      },
      // ================================================================== BRIGHTNESS
      i: {
        to: [{ key_code: "display_brightness_increment" }],
      },
      u: {
        to: [{ key_code: "display_brightness_decrement" }],
      },
      // ================================================================== SCREENSHOTS
      g: {
        description: "Screenshots (GUI)",
        to: [{ key_code: "g",
            modifiers: ["left_command", "left_control", "left_option"], }, ],
      },
      f: {
        description: "Screenshots (full screenshot to save as file)",
        to: [{ key_code: "f",
            modifiers: ["left_command", "left_control", "left_option"], }, ],
      },
      r: {
        description: "Screenshots (rectangle to save as file)",
        to: [{ key_code: "r",
            modifiers: ["left_command", "left_control", "left_option"], }, ],
      },
      c: {
        description: "Screenshots (rectangle to Clipboard) (bind to Flameshot)",
        to: [{ key_code: "c",
            modifiers: ["left_command", "left_control", "left_option"], }, ],
      },
    },

    // ===================================================================================================================
    // ============================================================================================= MOVEMENT / NAVIGATION
    // ===================================================================================================================
    // Spacebar cause can be used confty by any hand with hjlk. right_command or right_option might work too.
    // so that hjkl work like they do in vim
    right_control: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "left_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // ===================================================================================================================
    // ============================================================================================= Raycast / Alfred or whatever
    // ===================================================================================================================
    // // r = "Raycast"
    // r: {
    //   n: open("raycast://script-commands/dismiss-notifications"),
    //   l: open(
    //     "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
    //   ),
    //   e: open(
    //     "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
    //   ),
    //   p: open("raycast://extensions/raycast/raycast/confetti"),
    //   a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
    //   s: open("raycast://extensions/peduarte/silent-mention/index"),
    //   h: open(
    //     "raycast://extensions/raycast/clipboard-history/clipboard-history"
    //   ),
    //   1: open(
    //     "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
    //   ),
    //   2: open(
    //     "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
    //   ),
    // },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          devices: [
            { // K11 Max
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: false,
                product_id: 2739,
                vendor_id: 13364,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // K11 Max
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: true,
                product_id: 2739,
                vendor_id: 13364,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: true,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // DUSTERSILVER D84 - WIRED ???
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: true,
                product_id: 16401,
                vendor_id: 12625,
              },
              ignore: true,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // DUSTERSILVER D84 - WIRELESS
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: false,
                product_id: 16401,
                vendor_id: 12625,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // Internal Keyboard ?
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: false,
                product_id: 0,
                vendor_id: 0,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // Internal Trackpad ?
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: false,
                is_pointing_device: true,
                product_id: 0,
                vendor_id: 0,
              },
              ignore: true,
              manipulate_caps_lock_led: false,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // Razer DeathAdder V3 Keyboard > to IGNORE
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: false,
                product_id: 178,
                vendor_id: 5426,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            { // Razer DeathAdder V3 Mouse > OK
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: false,
                is_pointing_device: true,
                product_id: 178,
                vendor_id: 5426,
              },
              ignore: false,
              manipulate_caps_lock_led: false,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: true,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
          ],
          name: "Default",
          virtual_hid_keyboard: { // after some update, Karabiner ask you if you use ansi, ISO or other type of keyboards. With this you can set it directly, avoiding the prompt.
            keyboard_type_v2: "ansi", 
          },
          complex_modifications: {
            rules,
          },
          // fn_function_keys: [
          //   { from: { key_code: "f1" }, to: [{ consumer_key_code: "display_brightness_decrement" }] },
          //   { from: { key_code: "f2" }, to: [{ consumer_key_code: "display_brightness_increment" }] },
          //   { from: { key_code: "f3" }, to: [{ apple_vendor_keyboard_key_code: "mission_control" }] },
          //   { from: { key_code: "f4" }, to: [{ apple_vendor_keyboard_key_code: "spotlight" }] },
          //   { from: { key_code: "f5" }, to: [{ consumer_key_code: "dictation" }] },
          //   { from: { key_code: "f6" }, to: [{ key_code: "f6" }] },
          //   { from: { key_code: "f7" }, to: [{ consumer_key_code: "rewind" }] },
          //   { from: { key_code: "f8" }, to: [{ consumer_key_code: "play_or_pause" }] },
          //   { from: { key_code: "f9" }, to: [{ consumer_key_code: "fast_forward" }] },
          //   { from: { key_code: "f10" }, to: [{ consumer_key_code: "mute" }] },
          //   { from: { key_code: "f11" }, to: [{ consumer_key_code: "volume_decrement" }] },
          //   { from: { key_code: "f12" }, to: [{ consumer_key_code: "volume_increment" }] },
          // ],
        },
      ],
    },
    null,
    2
  )
);
