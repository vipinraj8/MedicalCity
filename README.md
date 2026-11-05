# Medical City 3D — Hospital Simulation

Medical City is a browser-based hospital simulation built with **HTML, CSS, JavaScript and Three.js r128**. The existing application includes third-person movement, keyboard and touch controls, collision checks, hospital navigation, patient interactions, bilingual interface content, educational cases, audio effects and browser save data.

## Current architecture

- `index.html` contains the existing interface, game state, Three.js scene construction and gameplay systems.
- `js/medical-city-enhancements.js` adds reception-area 3D details and adaptive rendering quality. It loads after the existing inline game script and reuses its Three.js scene, renderer, lighting and collision helpers.
- `package.json` provides a lightweight static-server command. There is no bundler or framework migration.
- `vercel.json` configures static hosting headers.

The project remains a Three.js browser game. It has not been migrated to Unity or another engine.

## Run locally

Install Node.js, then from the repository root run:

```bash
npm start
```

Open the local URL printed by the static server (normally `http://localhost:3000`). Alternatively, use any static HTTP server, such as:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Use an HTTP server rather than opening `index.html` directly as a file so browser asset and module behavior is consistent.

## Deploy to Vercel

Import this GitHub repository into Vercel and keep the project root as the Root Directory. This is a static site: no framework preset or build command is required. Leave the output directory at the platform's default static root unless the deployment configuration is deliberately changed.

## This enhancement phase

The reception enhancement adds procedural 3D mesh props (registration monitors, waiting chairs, a directory kiosk, wall directory panels, ceiling light panels and lobby floor markers). It also adds Auto, Low, Medium and High graphics profiles, with an adaptive mobile-oriented default. The quality preference is stored separately from the existing game save.

Existing movement, case content, patient interactions, role selection, language switching and save-state behavior are retained.

## Current limitations — do not mistake these for completed features

- The main application is still largely a single HTML file; the enhancement script is a first small modular step.
- The repository does not currently contain a GLB/GLTF asset library or a model-loading pipeline.
- Existing medical props and characters are primarily procedural primitive meshes, not verified, medically accurate imported models.
- Full progressive room streaming, robust navmesh pathfinding, a dedicated NPC animation system and comprehensive Android-device profiling remain future work.
- A real browser session on desktop and Android still needs to be tested after deployment. See `docs/TESTING_REPORT.md`.

## Browser support

The target is modern desktop browsers and Android Chrome with WebGL support. Actual performance varies by device, browser, thermal state and GPU. Use the graphics-quality setting to lower pixel density and shadow-map cost on constrained hardware.
