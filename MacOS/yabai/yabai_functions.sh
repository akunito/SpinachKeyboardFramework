#!/bin/bash

# Enable or disable logging
LOGGING_ENABLED=true

# Function for logging messages
log_message() {
  local message="$1"
  if [ "$LOGGING_ENABLED" = true ]; then
    echo "$message" >> ~/yabai_result
  fi
}

# ============================================================== Functions
test_function() {
  log_message "test"
}

check_if_window_floating() {
  # Return true if the window is floating, false otherwise
  local window_id="$1"
  # Check if a parameter is provided; use it if available, otherwise get the focused id
  if [ -n "$1" ]; then
    window_id="$1"
  else
    window_id=$(get_focused_id)
  fi
  is_floating=$(yabai -m query --windows | jq --arg app_name "$app_name" --arg key "is-floating" '.[] | select(.app == $app_name) | .[$key]')
  log_message "Checking if $window_id is_floating: $is_floating"
  echo "$is_floating"
}

get_focused_id() {
  # Returns the app name of the currently focused window
  yabai -m query --windows --window | jq -r '.id'
}

get_focused_app() {
  # Returns the app name of the currently focused window
  yabai -m query --windows --window | jq -r '.app'
}

get_full_query_by_app() {
  # Fetches all windows belonging to the specified app or the currently focused app if no parameter is provided
  local app_name="$1"

  # Check if a parameter is provided; use it if available, otherwise get the focused app name
  if [ -n "$1" ]; then
    app_name="$1"
  else
    app_name=$(get_focused_app)
  fi

  log_message "Focused app name: $app_name"
  # Wrap the output in an array
  yabai -m query --windows | jq --arg app_name "$app_name" '[.[] | select(.app == $app_name)]'
}

filter_query() { 
  # Filters the query to extract only id, title, and minimized state of the windows
  local query
  local app_name="$1"
  query=$(get_full_query_by_app "$app_name")
  log_message "Query: $query"
  # Ensure we wrap the keys correctly in jq
  echo "$query" | jq '[.[] | {id, title, "is-minimized"}]'
}

get_array_windows_same_app() {
  # Returns an array of windows for the focused app, including id, title, and minimized state
  local array
  local app_name="$1"
  array=$(filter_query "$app_name")
  # Sort the filtered array by id
  sorted_data=$(echo "$array" | jq 'sort_by(.id)')
  log_message "Final Result: $sorted_data"
  echo "$sorted_data"
}

nav_single_float_window_app() {
  local app_name="$1"
  local app_id="$2"
  
  local is_minimized=$(yabai -m query --windows | jq --arg app_name "$app_name" --arg key "is-minimized" '.[] | select(.app == $app_name) | .[$key]')
  log_message "is_minimized: $is_minimized"
  if [ "$is_minimized" == "false" ]; then
      log_message "Minimizing $app_name window with id $app_id"
      yabai -m window $app_id --minimize
  else
      log_message "Focusing $app_name window with id $app_id"
      yabai -m window $app_id --focus
  fi
}

nav_single_tiling_window_app() {
  local app_name="$1"
  local app_id="$2"
  log_message "Focusing $app_name window with id $app_id"
  log_message "Tiling windows are not being minimized by default as floating. Use another function to minimize them."
  yabai -m window $app_id --focus
}

nav_single_window_app() {
  local app_name="$1"
  local app_id="$2"

  # Check if the window is floating
  local is_floating=$(check_if_window_floating "$app_id")
  log_message "is_floating: $is_floating"

  if [ "$is_floating" == "true" ]; then
      nav_single_float_window_app "$app_name" "$app_id"
  else
      nav_single_tiling_window_app "$app_name" "$app_id"
  fi
}

nav_multiple_windows_app() {
  # Navigates through the windows belonging to the focused app
  # If some window is minimized, focus the first minimized window
  # If no minimized window is found, focus the next window in the list
  local app_name="$1"
  array=$(get_array_windows_same_app "$app_name")
  is_minimized=$(echo "$array" | jq '[.[] | select(."is-minimized" == true)] | sort_by(.id) | .[0].id')
  log_message "is_minimized: $is_minimized"

  if [ -n "$is_minimized" ] && [ "$is_minimized" != "null" ]; then
    id=$is_minimized
    log_message "Focusing minimized window with id $id"
    yabai -m window "$id" --focus
  else
    focus=$(get_focused_id)
    log_message "Focused window id: $focus"
    ids=($(echo "$array" | jq -r '.[].id'))
    for i in "${!ids[@]}"; do
      if [ "${ids[$i]}" -gt "$focus" ]; then
        next="${ids[$i]}"
        break
      fi
    done

    if [ -z "$next" ]; then
      next="${ids[0]}"
    fi

    log_message "Focusing next window with id $next"
    yabai -m window "$next" --focus
  fi
}

navigate_app() {
  # Global function to navigate apps according different contexts
  # If the app has multiple windows, navigate through them
  # If the app has a single window, focus it, if it's already focused, minimize it instead.
  local app_name="$1"

  app_id=$(yabai -m query --windows | jq -r ".[] | select(.app == \"$app_name\").id")
  log_message "App: $app_name ids: $app_id"

  if [ -z "$app_id" ]; then
      log_message "Opening $app_name"
      open -a "${app_name}.app"
  else
      local id_count=$(echo "$app_id" | wc -l)
      if [ "$id_count" -eq 1 ]; then
          nav_single_window_app "$app_name" "$app_id"
      else
          nav_multiple_windows_app "$app_name"
      fi
  fi
}

space_management() {
  local order="$1"
  local order2="$2"
  log_message "Space management, order: $order $order2"

  case "$order" in
    "prev")
      yabai -m space --focus prev || yabai -m space --focus last
      ;;
    "next")
      yabai -m space --focus next || yabai -m space --focus first
      ;;
    "first")
      yabai -m space --focus first
      ;;
    "last")
      yabai -m space --focus last
      ;;
    "move")
      case "$order2" in
        "left")
          log_message "Moving Space to left"
          yabai -m space --move prev
          ;;
        "right")
          log_message "Moving Space to right"
          yabai -m space --move next
          ;;
        *)
          yabai -m space --move "$order2"
          ;;
      esac
      ;;
    *)
      yabai -m space --focus "$order"
      ;;
  esac
}

window_management() {
  local order="$1"
  local order2="$2"
  log_message "Window management, order/s: $order $order2"

  case "$order" in
    "focus_prev")
      yabai -m window --focus prev
      ;;
    "focus_next")
      yabai -m window --focus next
      ;;
    "send_prev_space")
      yabai -m window --space prev # TODO add cycling from yabai docs and find why does not work
      ;;
    "send_next_space")
      yabai -m window --space next
      ;;
    "send_prev_display")
      yabai -m window --display west || yabai -m display --focus west;
      ;;
    "send_next_display")
      yabai -m window --display east || yabai -m display --focus east;
      ;;
    "move")
      case "$order2" in
        "left")
          yabai -m window --move rel:-100:0
          ;;
        "right")
          yabai -m window --move rel:100:0
          ;;
        "up")
          yabai -m window --move rel:0:-100
          ;;
        "down")
          yabai -m window --move rel:0:100
          ;;
        *)
          yabai -m window --move abs:"$order2"
          ;;
      esac
      ;;
    "resize")
      case "$order2" in
        "wider")
          # (options: top, left, bottom, right, top_left, top_right, bottom_right, bottom_left)
          yabai -m window --resize right:100:0
          ;;
        "narrower")
          yabai -m window --resize right:-100:0
          ;;
        "taller")
          yabai -m window --resize bottom:0:100
          ;;
        "shorter")
          yabai -m window --resize bottom:0:-100
          ;;
        *)
          yabai -m window --resize abs:"$order2"
          ;;
      esac
      ;;
    "make_float")
      yabai -m window --toggle float --grid 4:4:1:1:2:2
      ;;
    "make_sticky")
      yabai -m window --toggle sticky
      ;;
    "make_fullscreen")
      # if tailing window, make zoom-parent. if floating, make zoom-fullscreen
      focus_id=$(get_focused_id)
      floating=$(check_if_window_floating "$focus_id")
      log_message "floating: $floating"
      if [ $floating == "true" ]; then
        # floating window
        yabai -m window --grid 1:1:0:0:1:1
        log_message "Maximized"
      else
        # tailing window
        yabai -m window --toggle zoom-parent
        log_message "Toggled fullscreen"
      fi
      ;;
    "move_cycle_clockwise")
      win=$(yabai -m query --windows --window last | jq '.id')

      while : ; do
          yabai -m window $win --swap prev &> /dev/null
          if [[ $? -eq 1 ]]; then
              break
          fi
      done
      ;;
    "move_cycle_counterclockwise")
      win=$(yabai -m query --windows --window first | jq '.id')

      while : ; do
          yabai -m window $win --swap next &> /dev/null
          if [[ $? -eq 1 ]]; then
              break
          fi
      done
      ;;
    "grid_or_swap")
      # if focused window is floating, move it by grid
      floating=$(yabai -m query --windows --window | jq '.["is-floating"]')
      log_message "floating: $floating"
      if [ $floating == "true" ]; then
        case "$order2" in
          "top_left")
            yabai -m window --grid 10:10:0:0:5:5
            ;;
          "top_right")
            yabai -m window --grid 10:10:5:0:5:5
            ;;
          "bot_left")
            yabai -m window --grid 10:10:0:5:5:5
            ;;
          "bot_right")
            yabai -m window --grid 10:10:5:5:5:5
            ;;

          "north")
            yabai -m window --grid 10:10:0:0:10:5
            ;;
          "south")
            yabai -m window --grid 10:10:0:5:10:5
            ;;
          "west")
            yabai -m window --grid 10:10:0:0:5:10
            ;;
          "east")
            yabai -m window --grid 10:10:5:0:5:10
            ;;
          *)
            yabai -m window --grid "$order2"
            ;;
        esac
      # if not floating, move it to the top left corner
      else
        case "$order2" in
          "top_left")
            yabai -m window --swap north
            yabai -m window --swap west
            ;;
          "top_right")
            yabai -m window --swap north
            yabai -m window --swap east
            ;;
          "bot_left")
            yabai -m window --swap south
            yabai -m window --swap west
            ;;
          "bot_right")
            yabai -m window --swap south
            yabai -m window --swap east
            ;;

          "north")
            yabai -m window --swap north
            ;;
          "south")
            yabai -m window --swap south
            ;;
          "west")
            yabai -m window --swap west
            ;;
          "east")
            yabai -m window --swap east
            ;;
          *)
            yabai -m window --grid "$order2"
            ;;
        esac
      fi
      ;;
    *)
      yabai -m window --space "$order"
      ;;
  esac
}

# First message to clean the file
if [ "$LOGGING_ENABLED" = true ]; then
  echo "===================== $1 $2" > ~/yabai_result
fi

# Main script logic
case "$1" in
    test)
        test_function
        ;;
    navigate_app)
        navigate_app "$2"
        ;;
    query_app)
        query_app "$2"
        ;;
    get_array_windows_same_app)
        get_array_windows_same_app
        ;;
    nav_multiple_windows_app)
        nav_multiple_windows_app "$2"
        ;;
    space_management)
        space_management "$2" "$3"
        ;;
    window_management)
        window_management "$2" "$3"
        ;;
    *)
        echo "Usage: need parameters check the script"
        log_message "Usage: need parameters check the script"
        exit 1
        ;;
esac