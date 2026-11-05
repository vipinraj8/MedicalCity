# Medical City — Current Asset & Component Inventory

This inventory describes the files currently tracked in the repository. It intentionally distinguishes existing procedural geometry from external 3D assets.

## Application files

- `index.html` — existing single-page browser game. Loads Three.js r128 from a CDN and contains the current UI, state, gameplay, scene construction, character geometry, patient cases and interaction logic.
- `js/medical-city-enhancements.js` — additive reception-area geometry and adaptive graphics settings, loaded after the existing inline game script.
- `package.json` — lightweight static-server script; no bundler or front-end framework is configured.
- `vercel.json` — static deployment headers.
- `README.md` — setup and deployment instructions.

## Existing 3D content

The Three.js scene currently constructs its world in JavaScript using primitive geometries and procedural canvas textures. Existing items include the hospital shell, entrance doors, reception desk, stretcher/elevator elements, patient beds, patient/player characters, ambulance, campus roads, gate, landscape elements and medical learning UI.

The new enhancement module adds:
- Two reception workstation displays and counter detailing.
- Three waiting chairs with collision bounds.
- A freestanding campus-directory kiosk.
- OPD and emergency wall directory panels.
- Ceiling light panels and floor wayfinding inlays.
- A lobby planter.

## Asset pipeline status

- Three.js runtime: r128 (CDN).
- GLB/GLTF models: **no imported model library or GLTF loader found in the current tracked project**.
- Draco/KTX2/Meshopt compression: not configured.
- Instanced rendering: no existing `InstancedMesh` usage found in the inspected application.
- Lighting/materials: existing Lambert, Standard and Physical materials, procedural canvas textures, ambient/directional/point lights and optional shadow maps.
- NPC/medical model accuracy: existing characters and equipment are simple game meshes; they should not be described as clinically validated or production-quality medical models.

## Out-of-date references

Older inventory notes referred to a `medical_city_3d.html` file, a Unity C# project and a separate `cases_data.json`. Those items were not present in the repository root or the inspected tracked folders during this review. The active browser entry point is `index.html`. No Unity migration is part of this project.
