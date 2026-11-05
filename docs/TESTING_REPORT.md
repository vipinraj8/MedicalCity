# Medical City 3D — Testing & QA Status

## Scope

This change adds a four-stage mode/character/rules/level menu, Doctor Level 1 progress, Nurse Level 2 objectives, Patient Free Roam and an English-only player-facing interface. It preserves the existing Three.js r128 scene and gameplay architecture.

## Checks performed

| Check | Result | Notes |
|---|---|---|
| Inline application JavaScript parse | Passed | Parsed with the JavaScript Function constructor; code was compiled for syntax only, not executed. |
| Reception enhancement script parse | Passed | Syntax parse only. |
| Nurse task script parse | Passed | Syntax parse only. |
| Duplicate HTML IDs | None found | Static ID scan of the updated `index.html`. |
| Static event listener targets | Passed | All `getElementById(...).addEventListener(...)` targets found in the static HTML. |
| Mission data counts | Passed | Five observation stations and three cleaning tasks found in the nurse task module. |
| Real desktop browser session | Not run | Requires visual and gameplay validation in Chrome/Edge. |
| Android Chrome device session | Not run | Requires physical-device testing of touch controls, movement and performance. |
| Level 1 end-to-end gameplay | Not run | Patient route accessibility, repeat prevention and victory overlay need manual verification. |
| Level 2 end-to-end gameplay | Not run | All stations/surfaces, floor switching and progress completion need manual verification. |
| FPS, GPU memory and thermal profiling | Not run | No performance numbers are claimed. |

## Manual acceptance checklist

- [ ] Start Single Player and step through all four home screens.
- [ ] Select Doctor, open the briefing, select Level 1 and start the shift.
- [ ] Confirm only five distinct patient IDs count toward the 5/5 objective.
- [ ] Complete five cases and confirm the Level 1 completion screen.
- [ ] Restart Level 1 and confirm progress resets.
- [ ] Select Nurse, open the briefing, select Level 2 and start the shift.
- [ ] Check each of the five observation stations using E / mobile Interact and record the chart.
- [ ] Clean all three marked surfaces and confirm the 8/8 objective completion.
- [ ] Use the elevator to reach the ward-floor observation stations and return to ground floor.
- [ ] Select Patient and confirm free-roam movement without diagnosis or nursing tasks.
- [ ] Confirm Multiplayer displays an accurate not-available notice; it must not imply that an online session starts.
- [ ] Confirm Levels 3 and 4 remain visibly locked and cannot be started.
- [ ] Confirm no language toggle is displayed and the game-facing menu/case labels/signboards remain English.
- [ ] Test graphics settings, collisions, mobile joystick, touch controls, modal behavior and resize.
- [ ] Test on a lower-memory Android device and reduce graphics settings if frame pacing is poor.

## Important limitations

A syntax parse is not a runtime or browser test. No claim is made that Level 1/2 have been visually or physically verified in desktop or Android browsers. Any issue found in the manual checklist should be fixed before public deployment.

Multiplayer networking, Levels 3/4, a metro station, moving crowds, vehicle driving, progressive GLB streaming and a verified high-detail medical equipment library remain outside this implementation.
