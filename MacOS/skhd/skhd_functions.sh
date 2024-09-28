#!/bin/bash

# ============================================================== Functions
test_function() {
  echo "test" >> ~/yabai_result
}

toggle_app() {
  local app_name="$1"

  app_id=$(yabai -m query --windows | jq -r ".[] | select(.app == \"$app_name\").id")
  echo "====== App: $app_name ids: $app_id" > ~/yabai_result

  if [ -z "$app_id" ]; then
    echo "Opening $app_name" >> ~/yabai_result
    open -a "${app_name}.app"
  else
    local id_count=$(echo "$app_id" | wc -l)
    if [ "$id_count" -eq 1 ]; then
      local is_minimized=$(yabai -m query --windows | jq --arg app_name "$app_name" --arg key "is-minimized" '.[] | select(.app == $app_name) | .[$key]')
      echo "is_minimized: $is_minimized" >> ~/yabai_resultmm
      if [ "$is_minimized" == "false" ]; then
        echo "Minimizing $app_name window with id $app_id" >> ~/yabai_result
        yabai -m window $app_id --minimize
      else
        echo "Focusing $app_name window with id $app_id" >> ~/yabai_result
        yabai -m window $app_id --focus
      fi
    else
      echo "More than one window for $app_name, functionality pending implementation." >> ~/yabai_result
      # Placeholder for handling multiple windows
    fi
  fi
}

# Main script logic
case "$1" in
    test)
        test_function
        ;;
    toggle_app)
        toggle_app "$2"
        ;;
    *)
        echo "Usage: $0 {test|toggle_single|toggle_multi} app_name"
        exit 1
        ;;
esac