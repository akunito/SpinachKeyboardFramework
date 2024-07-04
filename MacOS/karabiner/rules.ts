import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

// Run the next command to build the changes of this file to "karabiner.json": 
// cd ~/github/mxstbr/karabiner && yarn run build && ./replace_string.sh

// declare a variable for scriptPach = ~/github/mxstbr/karabiner/scripts/
const scriptPath = "~/syncthing/git_repos/mySCRIPTS/MACOS";


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
    p: app("Bitwarden"),
    g: app("Chromium"),
    d: app("Obsidian"),
    v: app("Vivaldi"),
    c: app("Visual Studio Code"),
    t: app("kitty"),
    e: app("Finder"),
    y: app("Spotify"),
    m: app("Activity Monitor"),
    s: app("System Settings"),
    x: app("Calendar"),
    // ===================================================================================================================
    // ============================================================================================= GLOBAL NAVIGATION: SPACES, FOCUS
    // ===================================================================================================================
    // SYSTEM SHORTCUTS (in case System Integrity Protection is enabled)
    // This can be replaced by Yabai when SIP is disabled??
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
    hyphen: {
      description: "Focus to the menu bar (-)",
      to: [{ key_code: "hyphen",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    equal_sign: {
      description: "Focus to Dock (equal_sign)",
      to: [{ key_code: "equal_sign",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    // ===================================================== SPACE LEFT/RIGHT
    q: {
      description: "Space: LEFT",
      to: [{ key_code: "q",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    w: {
      description: "Space: RIGHT",
      to: [{ key_code: "w",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    1: {
      description: "Space: 1",
      to: [{ key_code: "1",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    2: {
      description: "Space: 2",
      to: [{ key_code: "2",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    3: {
      description: "Space: 3",
      to: [{ key_code: "3",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    4: {
      description: "Space: 4",
      to: [{ key_code: "4",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    5: {
      description: "Space: 5",
      to: [{ key_code: "5",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    6: {
      description: "Space: 6",
      to: [{ key_code: "6",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    7: {
      description: "Space: 7",
      to: [{ key_code: "7",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    8: {
      description: "Space: 8",
      to: [{ key_code: "8",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    9: {
      description: "Space: 9",
      to: [{ key_code: "9",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
    },
    0: {
      description: "Space: 0",
      to: [{ key_code: "0",
          modifiers: ["left_command", "left_control", "left_option"], }, ],
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
    // ============================================================================================= Currently OFF
    // ===================================================================================================================
    // // Open applications -> replicate below for mouse the same way
    // right_command: {
    //   b: app("Bitwarden"),
    //   g: app("Chromium"),
    //   d: app("Obsidian"),
    //   v: app("Vivaldi"),
    //   c: app("Visual Studio Code"),
    //   t: app("Alacritty"),
    //   e: app("Finder"),
    //   y: app("Spotify"),
    //   m: app("Activity Monitor"),
    //   s: app("System Settings"),
    //   x: app("Calendar"),
    //   // l: open(
    //   //   "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
    //   // ),
    // },
    // // Open applications with mouse too // "to_replace1" should be replaced by button5 running "replace_string.sh" after building the changes,
    // to_replace1: {
    //   b: app("Bitwarden"),
    //   g: app("Chromium"),
    //   d: app("Obsidian"),
    //   v: app("Vivaldi"),
    //   c: app("Visual Studio Code"),
    //   t: app("Alacritty"),
    //   e: app("Finder"),
    //   y: app("Spotify"),
    //   m: app("Activity Monitor"),
    //   s: app("System Settings"),
    //   x: app("Calendar"),
    //   // l: open(
    //   //   "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
    //   // ),
    // },

    // ===================================================================================================================
    // ============================================================================================= TILING WINDOW MANAGER
    // ===================================================================================================================
    // ======================================== rectangle.app
    // "Window" via rectangle.app
    // right_alt: {
    //   semicolon: {
    //     description: "Window: Hide",
    //     to: [
    //       {
    //         key_code: "h",
    //         modifiers: ["left_command"],
    //       },
    //     ],
    //   },
    //   y: rectangle("previous-display"),
    //   o: rectangle("next-display"),
    //   k: rectangle("top-half"),
    //   j: rectangle("bottom-half"),
    //   h: rectangle("left-half"),
    //   l: rectangle("right-half"),
    //   f: rectangle("maximize"),
    //   u: {
    //     description: "Window: Previous Tab",
    //     to: [
    //       {
    //         key_code: "tab",
    //         modifiers: ["right_control", "right_shift"],
    //       },
    //     ],
    //   },
    //   i: {
    //     description: "Window: Next Tab",
    //     to: [
    //       {
    //         key_code: "tab",
    //         modifiers: ["right_control"],
    //       },
    //     ],
    //   },
    //   n: {
    //     description: "Window: Next Window",
    //     to: [
    //       {
    //         key_code: "grave_accent_and_tilde",
    //         modifiers: ["left_command"],
    //       },
    //     ],
    //   },
    //   b: {
    //     description: "Window: Back",
    //     to: [
    //       {
    //         key_code: "open_bracket",
    //         modifiers: ["left_command"],
    //       },
    //     ],
    //   },
    //   // Note: No literal connection. Both f and n are already taken.
    //   m: {
    //     description: "Window: Forward",
    //     to: [
    //       {
    //         key_code: "close_bracket",
    //         modifiers: ["left_command"],
    //       },
    //     ],
    //   },
    //   d: {
    //     description: "Window: Next display",
    //     to: [
    //       {
    //         key_code: "right_arrow",
    //         modifiers: ["right_control", "right_option", "left_command"],
    //       },
    //     ],
    //   },
    // },

    // ======================================== Yabai / to be recoded after disable SIP

    right_alt: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["left_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["left_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["left_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["left_command"],
          },
        ],
      },
      d: {
        description: "Window: Next display",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option", "left_command"],
          },
        ],
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
      // ============ THIS HAS BEEN REPLACED BY FLAMESHOT !!!
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
        description: "Screenshots (rectangle to Clipboard) (bind to flameshot)",
        to: [{ key_code: "c",
            modifiers: ["left_command", "left_control", "left_option"], }, ],
      },
    },

    // ===================================================================================================================
    // ============================================================================================= MOVEMENT / NAVIGATION
    // ===================================================================================================================
    // Spacebar cause can be used confty by any hand with hjlk. right_command or right_option might work too.
    // so that hjkl work like they do in vim
    spacebar: {
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
    // r = "Raycast"
    r: {
      n: open("raycast://script-commands/dismiss-notifications"),
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
      ),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },
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
