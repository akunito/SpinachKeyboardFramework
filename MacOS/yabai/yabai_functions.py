#!/usr/bin/env python3

# This python version was a test, is not well tested

import os
import sys
import subprocess
import json
import time

# Enable or disable logging
LOGGING_ENABLED = True

# Function for logging messages
def log_message(message):
    if LOGGING_ENABLED:
        with open(os.path.expanduser('~/yabai_result'), 'a') as f:
            f.write(f"{message}\n")


# ============================================= Configure Spaces
def set_spaces_singleMonitor():
    print("set_spaces")
    # Bind Spaces to Display 1
    for i in range(1, 13):
        subprocess.run(['yabai', '-m', 'space', str(i), '--display', '1'])
    # Set the window rules
    subprocess.run(['yabai', '-m', 'rule', '--add', 'app="^Obsidian$"', 'space=1'])
    subprocess.run(['yabai', '-m', 'rule', '--add', 'app="^Vivaldi$"', 'space=2'])


def set_windows_singleMonitors():
    print("set_windows")
    # Set Kitty Grid
    kitty_windows = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
    kitty_windows_json = json.loads(kitty_windows)
    kitty_ids = [str(win['id']) for win in kitty_windows_json if win['app'] == 'kitty']
    for win_id in kitty_ids:
        subprocess.run(['yabai', '-m', 'window', win_id, '--grid', '10:10:5:1:5:8'])


def set_spaces_externalMonitors():
    print("set_spaces")
    # Bind Spaces to Display 1
    for i in range(1, 7):
        subprocess.run(['yabai', '-m', 'space', str(i), '--display', '1'])
    # Bind Spaces to Display 2
    for i in range(7, 10):
        subprocess.run(['yabai', '-m', 'space', str(i), '--display', '2'])
    # Bind Spaces to Display 3
    for i in range(10, 13):
        subprocess.run(['yabai', '-m', 'space', str(i), '--display', '3'])
    # Set the window rules
    # yabai -m rule --add app="^Obsidian$" display=2 # TODO: Confirm if needed
    subprocess.run(['yabai', '-m', 'rule', '--add', 'app="^Vivaldi$"', 'space=1'])


def make_window_sticky_and_floating(app_name, grid):
    log_message("make_window_sticky_and_floating")
    log_message(f"app_name: {app_name}")
    log_message(f"grid: {grid}")
    windows = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
    windows_json = json.loads(windows)
    app_windows = [win for win in windows_json if win['app'] == app_name]
    for win in app_windows:
        win_id = str(win['id'])
        is_floating = win.get('is-floating', False)
        if not is_floating:
            log_message(f"Making {app_name} Float")
            subprocess.run(['yabai', '-m', 'window', win_id, '--toggle', 'float'])
            subprocess.run(['yabai', '-m', 'window', win_id, '--grid', grid])
        is_sticky = win.get('is-sticky', False)
        if not is_sticky:
            log_message(f"Making {app_name} Sticky")
            subprocess.run(['yabai', '-m', 'window', win_id, '--toggle', 'sticky'])
            subprocess.run(['yabai', '-m', 'window', win_id, '--grid', grid])


def reset_config():
    print("reset_yabai_config")
    subprocess.run(['yabai', '--restart-service'])
    time.sleep(2)
    with open(os.path.expanduser('~/yabai_config.json'), 'w') as f:
        subprocess.run(['yabai', '-m', 'query', '--windows'], stdout=f)
    time.sleep(1)
    log_message("$VARIABLES_PATH")
    try:
        external_monitor_count = subprocess.check_output([os.environ.get('COUNTEXTERNALMONITORS_SH')]).decode('utf-8')
        external_monitor_count = int(''.join(filter(str.isdigit, external_monitor_count)))
        log_message(f"externalMonitorCount: {external_monitor_count}")
    except Exception as e:
        log_message(f"Error retrieving external monitor count: {e}")
        external_monitor_count = -1

    if external_monitor_count == 0:
        log_message("Setting up single monitor configuration")
        set_spaces_singleMonitor()
        set_window_rules_singleMonitor()
    elif external_monitor_count > 0:
        log_message("Setting up external monitor configuration")
        set_spaces_externalMonitors()
        set_window_rules_singleMonitor()  # testing
    else:
        print("Script countExternalMonitors_.sh has failed?")


def make_window_float():
    print("make_window_float")
    subprocess.run(['yabai', '-m', 'window', '--toggle', 'float'])


def set_window_rules_singleMonitor():
    log_message("setting_window_rules_singleMonitor")
    make_window_sticky_and_floating("kitty", "10:10:5:1:5:8")


def set_window_rules_externalMonitors():
    log_message("setting_window_rules_externalMonitors")
    make_window_sticky_and_floating("kitty", "20:20:10:1:10:16")


def set_windows_externalMonitors():
    print("set_windows")
    # Set Kitty Grid
    kitty_windows = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
    kitty_windows_json = json.loads(kitty_windows)
    kitty_ids = [str(win['id']) for win in kitty_windows_json if win['app'] == 'kitty']
    for win_id in kitty_ids:
        subprocess.run(['yabai', '-m', 'window', win_id, '--grid', '20:20:10:1:10:16'])
    # Set qBittorrent Grid (commented out as in original script)
    # qbittorrent_windows = subprocess.check_output(['yabai', '-m', 'query', '--windows'])
    # qbittorrent_windows_json = json.loads(qbittorrent_windows)
    # qbittorrent_ids = [str(win['id']) for win in qbittorrent_windows_json if win['app'] == 'qBittorrent']
    # for win_id in qbittorrent_ids:
    #     subprocess.run(['yabai', '-m', 'window', win_id, '--grid', '10:10:5:0:5:5'])


def test_function():
    log_message("test")


def check_if_window_floating(window_id=None):
    if window_id:
        target_id = window_id
    else:
        target_id = get_focused_id()
    floating = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
    windows = json.loads(floating)
    for win in windows:
        if str(win['id']) == str(target_id):
            is_floating = win.get('is-floating', False)
            log_message(f"Checking if {target_id} is_floating: {is_floating}")
            return is_floating
    return False


def get_focused_id():
    focused = subprocess.check_output(['yabai', '-m', 'query', '--windows', '--window']).decode('utf-8')
    focused_window = json.loads(focused)
    return focused_window.get('id')


def get_focused_app():
    focused = subprocess.check_output(['yabai', '-m', 'query', '--windows', '--window']).decode('utf-8')
    focused_window = json.loads(focused)
    return focused_window.get('app')


def get_full_query_by_app(app_name=None):
    if app_name:
        target_app = app_name
    else:
        target_app = get_focused_app()
    log_message(f"Focused app name: {target_app}")
    query = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
    windows = json.loads(query)
    filtered = [win for win in windows if win['app'] == target_app]
    return filtered


def filter_query(app_name):
    query = get_full_query_by_app(app_name)
    filtered = [{'id': win['id'], 'title': win['title'], 'is-minimized': win.get('is-minimized', False)} for win in query]
    return filtered


def get_array_windows_same_app(app_name):
    array = filter_query(app_name)
    sorted_data = sorted(array, key=lambda x: x['id'])
    log_message(f"Final Result: {sorted_data}")
    return sorted_data


def nav_single_float_window_app(app_name, app_id):
    is_minimized = subprocess.check_output([
        'yabai', '-m', 'query', '--windows'
    ]).decode('utf-8')
    windows = json.loads(is_minimized)
    for win in windows:
        if win['app'] == app_name and str(win['id']) == str(app_id):
            is_min = win.get('is-minimized', False)
            log_message(f"is_minimized: {is_min}")
            if not is_min:
                log_message(f"Minimizing {app_name} window with id {app_id}")
                subprocess.run(['yabai', '-m', 'window', str(app_id), '--minimize'])
            else:
                log_message(f"Focusing {app_name} window with id {app_id}")
                subprocess.run(['yabai', '-m', 'window', str(app_id), '--focus'])
            break


def nav_single_tiling_window_app(app_name, app_id):
    log_message(f"Focusing {app_name} window with id {app_id}")
    log_message("Tiling windows are not being minimized by default as floating. Use another function to minimize them.")
    subprocess.run(['yabai', '-m', 'window', str(app_id), '--focus'])


def nav_single_window_app(app_name, app_id):
    is_floating = check_if_window_floating(app_id)
    log_message(f"is_floating: {is_floating}")
    if is_floating:
        nav_single_float_window_app(app_name, app_id)
    else:
        nav_single_tiling_window_app(app_name, app_id)


def nav_multiple_windows_app(app_name):
    array = get_array_windows_same_app(app_name)
    minimized = [win['id'] for win in array if win['is-minimized']]
    log_message(f"is_minimized: {minimized}")
    if minimized:
        win_id = minimized[0]
        log_message(f"Focusing minimized window with id {win_id}")
        subprocess.run(['yabai', '-m', 'window', str(win_id), '--focus'])
    else:
        focused_id = get_focused_id()
        ids = [win['id'] for win in array]
        try:
            current_index = ids.index(focused_id)
            next_id = ids[(current_index + 1) % len(ids)]
        except ValueError:
            next_id = ids[0]
        log_message(f"Focusing next window with id {next_id}")
        subprocess.run(['yabai', '-m', 'window', str(next_id), '--focus'])


def navigate_app(app_name):
    app_id_output = subprocess.check_output([
        'yabai', '-m', 'query', '--windows'
    ]).decode('utf-8')
    windows = json.loads(app_id_output)
    app_ids = [str(win['id']) for win in windows if win['app'] == app_name]
    log_message(f"App: {app_name} ids: {app_ids}")
    if not app_ids:
        log_message(f"Opening {app_name}")
        subprocess.run(['open', '-a', f"{app_name}.app"])
        time.sleep(1)  # Wait for the app to open
        new_id = get_focused_id()
        subprocess.run(['yabai', '-m', 'window', str(new_id), '--focus'])
    else:
        if len(app_ids) == 1:
            nav_single_window_app(app_name, app_ids[0])
        else:
            nav_multiple_windows_app(app_name)


def space_management(order, order2=None):
    log_message(f"Space management, order: {order} {order2}")
    if order == "prev":
        result = subprocess.run(['yabai', '-m', 'space', '--focus', 'prev'], capture_output=True)
        if result.returncode != 0:
            subprocess.run(['yabai', '-m', 'space', '--focus', 'last'])
    elif order == "next":
        result = subprocess.run(['yabai', '-m', 'space', '--focus', 'next'], capture_output=True)
        if result.returncode != 0:
            subprocess.run(['yabai', '-m', 'space', '--focus', 'first'])
    elif order == "first":
        subprocess.run(['yabai', '-m', 'space', '--focus', 'first'])
    elif order == "last":
        subprocess.run(['yabai', '-m', 'space', '--focus', 'last'])
    elif order == "move":
        if not order2:
            print("Usage: space_management move <left|right>")
            log_message("Usage: space_management move <left|right>")
            sys.exit(1)
        if order2 == "left":
            # Move the current space to the left
            current_space = subprocess.check_output(['yabai', '-m', 'query', '--spaces', '--space']).decode('utf-8')
            current_index = json.loads(current_space).get('index')
            if current_index > 1:
                subprocess.run(['yabai', '-m', 'space', str(current_index), '--move', 'left'])
                log_message(f"Moved space {current_index} to the left")
            else:
                log_message("Already at the leftmost space")
        elif order2 == "right":
            # Move the current space to the right
            current_space = subprocess.check_output(['yabai', '-m', 'query', '--spaces', '--space']).decode('utf-8')
            current_index = json.loads(current_space).get('index')
            subprocess.run(['yabai', '-m', 'space', str(current_index), '--move', 'right'])
            log_message(f"Moved space {current_index} to the right")
        else:
            log_message(f"Unknown move direction: {order2}")
    else:
        # Focus a specific space by index
        try:
            space_number = int(order)
            subprocess.run(['yabai', '-m', 'space', '--focus', str(space_number)])
            log_message(f"Focused space {space_number}")
        except ValueError:
            print(f"Invalid space number: {order}")
            log_message(f"Invalid space number: {order}")
            sys.exit(1)


def window_management(order, order2=None):
    log_message(f"Window management, order/s: {order} {order2}")
    if order == "focus_prev":
        subprocess.run(['yabai', '-m', 'window', '--focus', 'prev'])
    elif order == "focus_next":
        subprocess.run(['yabai', '-m', 'window', '--focus', 'next'])
    elif order == "send_prev_space":
        subprocess.run(['yabai', '-m', 'window', '--space', 'prev'])
    elif order == "send_next_space":
        subprocess.run(['yabai', '-m', 'window', '--space', 'next'])
    elif order == "send_prev_display":
        result = subprocess.run(['yabai', '-m', 'window', '--display', 'west'], capture_output=True)
        if result.returncode != 0:
            subprocess.run(['yabai', '-m', 'display', '--focus', 'west'])
        log_message("Sent window to previous display")
    elif order == "send_next_display":
        result = subprocess.run(['yabai', '-m', 'window', '--display', 'east'], capture_output=True)
        if result.returncode != 0:
            subprocess.run(['yabai', '-m', 'display', '--focus', 'east'])
        log_message("Sent window to next display")
    elif order == "move":
        if not order2:
            print("Usage: window_management move <left|right|up|down>")
            log_message("Usage: window_management move <left|right|up|down>")
            sys.exit(1)
        if order2 == "left":
            subprocess.run(['yabai', '-m', 'window', '--swap', '--space', 'left'])
            log_message("Moved window to the left space")
        elif order2 == "right":
            subprocess.run(['yabai', '-m', 'window', '--swap', '--space', 'right'])
            log_message("Moved window to the right space")
        elif order2 == "up":
            subprocess.run(['yabai', '-m', 'window', '--swap', '--display', 'north'])
            log_message("Moved window up")
        elif order2 == "down":
            subprocess.run(['yabai', '-m', 'window', '--swap', '--display', 'south'])
            log_message("Moved window down")
        else:
            log_message(f"Unknown move direction: {order2}")
    elif order == "resize":
        if not order2:
            print("Usage: window_management resize <wider|narrower|taller|shorter>")
            log_message("Usage: window_management resize <wider|narrower|taller|shorter>")
            sys.exit(1)
        if order2 == "wider":
            subprocess.run(['yabai', '-m', 'window', '--resize', 'right:+20:0'])
            log_message("Resized window wider")
        elif order2 == "narrower":
            subprocess.run(['yabai', '-m', 'window', '--resize', 'left:-20:0'])
            log_message("Resized window narrower")
        elif order2 == "taller":
            subprocess.run(['yabai', '-m', 'window', '--resize', 'bottom:+20:0'])
            log_message("Resized window taller")
        elif order2 == "shorter":
            subprocess.run(['yabai', '-m', 'window', '--resize', 'top:-20:0'])
            log_message("Resized window shorter")
        else:
            log_message(f"Unknown resize action: {order2}")
    elif order == "make_float":
        subprocess.run(['yabai', '-m', 'window', '--toggle', 'float', '--grid', '4:4:1:1:2:2'])
        log_message("Toggled window float with grid 4:4:1:1:2:2")
    elif order == "make_sticky":
        subprocess.run(['yabai', '-m', 'window', '--toggle', 'sticky'])
        log_message("Toggled window sticky")
    elif order == "make_fullscreen":
        focus_id = get_focused_id()
        floating = check_if_window_floating(focus_id)
        log_message(f"floating: {floating}")
        if floating:
            subprocess.run(['yabai', '-m', 'window', str(focus_id), '--zoom-parent'])
            log_message("Maximized floating window")
        else:
            subprocess.run(['yabai', '-m', 'window', str(focus_id), '--zoom-fullscreen'])
            log_message("Toggled window fullscreen")
    elif order == "move_cycle_clockwise":
        try:
            windows_output = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
            windows = json.loads(windows_output)
            window_ids = [win['id'] for win in windows]
            focused_id = get_focused_id()
            if focused_id in window_ids:
                current_index = window_ids.index(focused_id)
                next_index = (current_index + 1) % len(window_ids)
                next_id = window_ids[next_index]
                subprocess.run(['yabai', '-m', 'window', str(next_id), '--focus'])
                log_message(f"Cycled clockwise to window id {next_id}")
            else:
                log_message("Focused window not found in window list.")
        except Exception as e:
            log_message(f"Error cycling clockwise: {e}")
    elif order == "move_cycle_counterclockwise":
        try:
            windows_output = subprocess.check_output(['yabai', '-m', 'query', '--windows']).decode('utf-8')
            windows = json.loads(windows_output)
            window_ids = [win['id'] for win in windows]
            focused_id = get_focused_id()
            if focused_id in window_ids:
                current_index = window_ids.index(focused_id)
                prev_index = (current_index - 1) % len(window_ids)
                prev_id = window_ids[prev_index]
                subprocess.run(['yabai', '-m', 'window', str(prev_id), '--focus'])
                log_message(f"Cycled counterclockwise to window id {prev_id}")
            else:
                log_message("Focused window not found in window list.")
        except Exception as e:
            log_message(f"Error cycling counterclockwise: {e}")
    elif order == "grid_or_swap":
        try:
            floating = check_if_window_floating()
            focus_id = get_focused_id()
            if floating:
                subprocess.run(['yabai', '-m', 'window', str(focus_id), '--grid', '4:4:1:1:2:2'])
                log_message("Moved floating window by grid")
            else:
                subprocess.run(['yabai', '-m', 'window', str(focus_id), '--swap', '--space', '1'])  # Example to swap with space 1
                log_message("Swapped window to top-left corner")
        except Exception as e:
            log_message(f"Error in grid_or_swap: {e}")
    else:
        if order.isdigit():
            try:
                space_number = int(order)
                subprocess.run(['yabai', '-m', 'window', '--space', str(space_number)])
                log_message(f"Sent window to space {space_number}")
            except ValueError:
                print(f"Invalid space number: {order}")
                log_message(f"Invalid space number: {order}")
                sys.exit(1)
        else:
            print(f"Unknown window management command: {order}")
            log_message(f"Unknown window management command: {order}")
            sys.exit(1)


def main():
    if LOGGING_ENABLED:
        with open(os.path.expanduser('~/yabai_result'), 'w') as f:
            f.write(f"===================== {sys.argv[1]} {sys.argv[2] if len(sys.argv) > 2 else ''}\n")

    if len(sys.argv) < 2:
        print("Usage: need parameters check the script")
        log_message("Usage: need parameters check the script")
        sys.exit(1)

    command = sys.argv[1]
    args = sys.argv[2:]

    if command == "set_spaces_singleMonitor":
        set_spaces_singleMonitor()
    elif command == "set_windows_singleMonitors":
        set_windows_singleMonitors()
    elif command == "set_spaces_externalMonitors":
        set_spaces_externalMonitors()
    elif command == "set_windows_externalMonitors":
        set_windows_externalMonitors()
    elif command == "reset_config":
        reset_config()
    elif command == "test":
        test_function()
    elif command == "navigate_app":
        if len(args) < 1:
            print("Usage: navigate_app <app_name>")
            log_message("Usage: navigate_app <app_name>")
            sys.exit(1)
        navigate_app(args[0])
    elif command == "query_app":
        if len(args) < 1:
            app_name = get_focused_app()
        else:
            app_name = args[0]
        result = get_full_query_by_app(app_name)
        print(json.dumps(result, indent=2))
    elif command == "get_array_windows_same_app":
        if len(args) < 1:
            print("Usage: get_array_windows_same_app <app_name>")
            log_message("Usage: get_array_windows_same_app <app_name>")
            sys.exit(1)
        array = get_array_windows_same_app(args[0])
        print(json.dumps(array, indent=2))
    elif command == "nav_multiple_windows_app":
        if len(args) < 1:
            print("Usage: nav_multiple_windows_app <app_name>")
            log_message("Usage: nav_multiple_windows_app <app_name>")
            sys.exit(1)
        nav_multiple_windows_app(args[0])
    elif command == "space_management":
        if len(args) < 1:
            print("Usage: space_management <order> [<order2>]")
            log_message("Usage: space_management <order> [<order2>]")
            sys.exit(1)
        order = args[0]
        order2 = args[1] if len(args) > 1 else None
        space_management(order, order2)
    elif command == "window_management":
        if len(args) < 1:
            print("Usage: window_management <order> [<order2>]")
            log_message("Usage: window_management <order> [<order2>]")
            sys.exit(1)
        order = args[0]
        order2 = args[1] if len(args) > 1 else None
        window_management(order, order2)
    else:
        print("Usage: need parameters check the script")
        log_message("Usage: need parameters check the script")
        sys.exit(1)


if __name__ == "__main__":
    main()
