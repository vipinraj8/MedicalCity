# Medical City 3D — Hospital Simulation

Medical City is a browser-based hospital simulation built with **HTML, CSS, JavaScript and Three.js r128**. It keeps the existing static-site architecture and browser gameplay systems; it has not been migrated to Unity or another engine.

## Current architecture

- `index.html` contains the existing UI, game state, Three.js scene, movement/camera controls, collisions, patient-case quiz and department interactions.
- `js/medical-city-enhancements.js` adds reception-area 3D details and adaptive graphics-quality settings.
- `js/medical-city-nurse-tasks.js` adds the Level 2 observation-station and marked-surface objectives.
- `package.json` provides a lightweight static-server command. There is no build bundler or framework migration.
- `vercel.json` configures static hosting headers.

## Current game flow

The home screen has four stages:

1. **Game mode:** Single Player is available. Multiplayer displays an availability notice because network sessions and synchronized player state have not been implemented.
2. **Character:** Doctor, Nurse or Patient.
3. **Game rules:** A role-specific briefing and desktop/mobile controls.
4. **Level:** Select the role-appropriate mission.

### Available play modes

| Character / level | Objective | Status |
|---|---|---|
| Doctor — Level 1 | Diagnose five distinct fictional patients using the existing three-question case flow. A patient ID counts once. | Playable prototype |
| Nurse — Level 2 | Review five fictional observation charts and record three marked surface-cleaning objectives. | Playable prototype |
| Patient — Free roam | Explore the currently available campus as a patient character. | Playable prototype |
| Level 3 | Locked. | Not implemented |
| Level 4 | Locked. | Not implemented |
| Multiplayer | Shows a clear not-yet-available message; no online session is started. | Not implemented |

The English game interface has no language toggle. Some unused Hindi localization data remains in source files, but the player-facing language selector has been removed.

## Run locally

Install Node.js, then from the repository root run:

```bash
npm start
```

Open the local URL printed by the static server (normally `http://localhost:3000`). Alternatively:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Use an HTTP server rather than opening `index.html` directly as a file.

## Deploy to Vercel

Import this GitHub repository into Vercel and keep the project root as the Root Directory. This is a static site: no framework preset or build command is required. Keep the output directory at the static root.

## Graphics and asset status

The environment still uses many procedural Three.js meshes and canvas textures. The project does **not** yet contain a GLB/GLTF model library for realistic human faces, MRI equipment or detailed medical props. The reception and nurse objective props are interactive game geometry, not medically validated equipment models.

The existing scene has hospital areas, campus roads/buildings, patient beds, an ambulance and a small auto-rickshaw. A detailed metro station, moving city crowds and enter/exit car or motorcycle driving systems are not implemented in this phase.

## Performance and testing

Graphics quality can be set to Auto, Low, Medium or High. Shadows remain configurable. Adaptive settings are intended to reduce rendering cost on constrained devices, but real device profiling is still required.

See `docs/TESTING_REPORT.md` for the checks performed and the desktop/Android acceptance tests that remain.
