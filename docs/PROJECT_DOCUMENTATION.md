# Medical City 3D — Hospital Simulation Game

## Overview

Medical City is a browser-based hospital simulation built with HTML, CSS, JavaScript and Three.js r128. The existing scene, controls, collision checks, hospital navigation, patient case quiz, save flow and campus props are retained.

## Current playable flow

The home page uses four stages: Game Mode → Character Selection → Game Rules → Level Selection.

- **Single Player:** available.
- **Multiplayer:** clearly marked unavailable until server sessions and synchronized player state are implemented.
- **Doctor / Level 1:** diagnose five different fictional patient cases. Patient IDs count only once.
- **Nurse / Level 2:** review five fictional observation stations and complete three marked surface-cleaning tasks.
- **Patient / Free Roam:** explore the currently available campus without clinical objectives.
- **Levels 3 and 4:** locked and not implemented.

The current game-facing interface is English-only. Unused Hindi localization values may remain in source data.

## Current world and graphics

The existing campus includes hospital structures, rooms and corridors, roads, reception, patient-bed props, a two-floor elevator transition, an ambulance and an auto-rickshaw. The reception enhancement adds workstation displays, waiting chairs, wayfinding kiosk and directory panels. Nurse Level 2 adds five observation station props and three cleaning surfaces.

The current visual style remains a mixture of procedural geometry, canvas textures and Three.js materials. It is not a photorealistic GTA-scale world.

## Features still requiring development

- Detailed GLB/GLTF people with realistic faces, rigs and animations.
- Verified detailed MRI/CT/ECG/BP equipment models.
- Metro station and animated city pedestrian crowds.
- Car and motorcycle assets with enter/exit driving controls.
- Multiplayer backend and player synchronization.
- Levels 3 and 4.
- Progressive model/room streaming and device-specific profiling.

## Local development

Run `npm start` or `python3 -m http.server 8080` from the repository root. Use a browser and open the static-server URL.

## Quality assurance

See `TESTING_REPORT.md`. Static syntax and markup checks were run for the latest role/level changes; full desktop and Android gameplay testing remains outstanding.
