# Medical City — Current Asset & Component Inventory

This inventory describes the files and game objects currently tracked. It distinguishes procedural meshes from imported 3D assets.

## Application files

- `index.html` — existing single-page game, scene creation, movement, camera, collision checks, patient case data, role/level menu and existing department UI.
- `js/medical-city-enhancements.js` — procedural reception details and adaptive graphics-quality profiles.
- `js/medical-city-nurse-tasks.js` — Level 2 nurse task props, fictional observation charts, cleaning objectives and task modal.
- `package.json` — lightweight static-server command; no bundler.
- `vercel.json` — static deployment headers.
- `README.md` — setup and current gameplay guide.

## Current menu and gameplay systems

- Four-stage game flow: mode, character, game rules, level.
- Single Player entry. Multiplayer is explicitly marked unavailable until backend player sessions and synchronized state exist.
- Characters: Doctor, Nurse and Patient.
- Doctor Level 1: five distinct patient IDs must complete the current three-question case flow correctly.
- Nurse Level 2: five station charts and three cleaning tasks must be recorded.
- Patient Free Roam: campus exploration without professional objectives.
- Levels 3 and 4: locked and not implemented.
- English-only player-facing menu and language control removed.

## Existing and newly added 3D content

The active Three.js scene primarily creates geometry and procedural canvas textures in JavaScript. Existing content includes:
- Campus ground and roads, gate, hospital exterior and accessible hospital areas.
- Reception, entrance door panels, patient beds, patient/player characters and an elevator.
- Ambulance and auto-rickshaw props.
- Reception enhancement: dual workstation monitors, counter detailing, waiting chairs, directory kiosk/panels, ceiling light panels, floor inlays and planter.
- Nurse Level 2 props: five observation station stands/monitors, three marked work surfaces, animated task rings and labels.

The nurse observation figures are fictional in-game display values; these meshes are mission props, not real patient-monitoring devices.

## Imported asset pipeline status

- Three.js runtime: r128 from CDN.
- GLB/GLTF model library: **not present in the inspected repository**.
- GLTFLoader / DRACO / KTX2 / Meshopt pipeline: not configured in the tracked code.
- Instanced rendering: no existing `InstancedMesh` use was found in the original application.
- Human characters: procedural stylized geometry; no realistic face/rigged character asset library currently tracked.
- MRI, CT, ECG and blood-pressure equipment: some learning UI and monitor-like props exist, but no verified detailed GLB equipment set is present.
- Vehicle gameplay: ambulance/auto props exist; no enter/exit driving controller is implemented.
- City expansion: metro-station environment and animated crowd system are not implemented.

Do not describe the current procedural props as photorealistic or medically accurate imported models.
