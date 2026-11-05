/*
 * Medical City — additive reception and graphics enhancements.
 * This file is loaded after the existing classic script in index.html, so it
 * deliberately reuses the app's existing Three.js scene and collision API.
 * It does not replace the player, camera, patient, or case-management systems.
 */
(function medicalCityEnhancements() {
  'use strict';

  const qualitySelect = document.getElementById('graphics-quality');
  const shadowCheckbox = document.getElementById('chk-shadows');
  const deviceQuery = window.matchMedia('(max-width: 768px), (pointer: coarse)');
  let selectedQuality = 'auto';

  function isConstrainedDevice() {
    const memory = Number(navigator.deviceMemory || 8);
    const cores = Number(navigator.hardwareConcurrency || 8);
    return deviceQuery.matches || memory <= 4 || cores <= 4;
  }

  function applyGraphicsQuality(value) {
    const quality = ['auto', 'low', 'medium', 'high'].includes(value) ? value : 'auto';
    const constrained = isConstrainedDevice();
    const devicePixelRatio = Number(window.devicePixelRatio || 1);
    const profiles = {
      low: { pixelRatio: 1, shadowMap: 512 },
      medium: { pixelRatio: constrained ? 1.2 : 1.5, shadowMap: 1024 },
      high: { pixelRatio: constrained ? 1.35 : 2, shadowMap: constrained ? 1024 : 2048 },
      auto: { pixelRatio: constrained ? 1.2 : 1.65, shadowMap: constrained ? 1024 : 1536 }
    };
    const profile = profiles[quality];

    selectedQuality = quality;
    renderer.setPixelRatio(Math.min(devicePixelRatio, profile.pixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.shadowMap.enabled = shadowCheckbox ? shadowCheckbox.checked : true;

    if (sunLight && sunLight.shadow) {
      sunLight.shadow.mapSize.width = profile.shadowMap;
      sunLight.shadow.mapSize.height = profile.shadowMap;
      if (sunLight.shadow.map) {
        sunLight.shadow.map.dispose();
        sunLight.shadow.map = null;
      }
      sunLight.shadow.needsUpdate = true;
    }

    document.documentElement.dataset.graphicsQuality = quality;
  }

  if (qualitySelect) {
    try {
      const savedQuality = localStorage.getItem('medical_city_graphics_quality_v1');
      if (savedQuality && ['auto', 'low', 'medium', 'high'].includes(savedQuality)) {
        qualitySelect.value = savedQuality;
      }
    } catch (error) {
      // Private browsing or storage restrictions should not prevent gameplay.
    }

    qualitySelect.addEventListener('change', function onQualityChange() {
      applyGraphicsQuality(qualitySelect.value);
      try {
        localStorage.setItem('medical_city_graphics_quality_v1', qualitySelect.value);
      } catch (error) {
        // Quality remains active for this session when storage is unavailable.
      }
    });
  }

  if (shadowCheckbox) {
    shadowCheckbox.addEventListener('change', function onShadowChange() {
      renderer.shadowMap.enabled = shadowCheckbox.checked;
      if (sunLight && sunLight.shadow) sunLight.shadow.needsUpdate = true;
    });
  }

  applyGraphicsQuality(qualitySelect ? qualitySelect.value : 'auto');
  window.addEventListener('resize', function onGraphicsResize() {
    applyGraphicsQuality(selectedQuality);
  });
  if (typeof deviceQuery.addEventListener === 'function') {
    deviceQuery.addEventListener('change', function onDeviceProfileChange() {
      if (selectedQuality === 'auto') applyGraphicsQuality('auto');
    });
  }

  // Procedural 3D lobby props. These are actual meshes, not flat image stand-ins.
  const receptionGroup = new THREE.Group();
  receptionGroup.name = 'MedicalCityReceptionEnhancements';
  worldGroup.add(receptionGroup);

  const materials = {
    counterTop: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.28, metalness: 0.08 }),
    brushedMetal: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.32, metalness: 0.78 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.55 }),
    teal: new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.48, metalness: 0.08 }),
    blue: new THREE.MeshStandardMaterial({ color: 0x075985, roughness: 0.42, metalness: 0.12 }),
    chair: new THREE.MeshStandardMaterial({ color: 0x0f4c67, roughness: 0.78 }),
    chairBack: new THREE.MeshStandardMaterial({ color: 0x164e63, roughness: 0.76 }),
    ceramic: new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 }),
    plantPot: new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.72 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.9 }),
    lightPanel: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xdbeafe, emissiveIntensity: 0.7, roughness: 0.35 }),
    trim: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4, metalness: 0.4 })
  };

  function addBox(width, height, depth, material, x, y, z, parent, name) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (name) mesh.name = name;
    (parent || receptionGroup).add(mesh);
    return mesh;
  }

  function makeDisplayTexture(title, subtitle, accent) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#071827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = accent || '#0e7490';
    ctx.fillRect(0, 0, canvas.width, 46);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 25px Arial, sans-serif';
    ctx.fillText(title, 22, 32);
    ctx.fillStyle = '#7dd3fc';
    ctx.font = 'bold 19px Arial, sans-serif';
    ctx.fillText(subtitle, 22, 82);
    ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(22, 103);
    ctx.lineTo(490, 103);
    ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '17px Arial, sans-serif';
    ctx.fillText('PATIENT REGISTRATION', 22, 145);
    ctx.fillText('TOKEN  •  CONSULTATION  •  INFORMATION', 22, 183);
    ctx.fillStyle = '#34d399';
    ctx.fillRect(22, 207, 148, 9);
    ctx.fillStyle = '#64748b';
    ctx.fillRect(181, 207, 110, 9);
    const texture = new THREE.CanvasTexture(canvas);
    texture.encoding = THREE.sRGBEncoding;
    return texture;
  }

  function addMonitor(x, title, accent) {
    addBox(0.98, 0.68, 0.1, materials.darkMetal, x, 1.93, 8.72, receptionGroup, title + ' monitor bezel');
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.86, 0.54),
      new THREE.MeshBasicMaterial({ map: makeDisplayTexture(title, 'MEDICAL CITY • NEW DELHI', accent) })
    );
    screen.position.set(x, 1.94, 8.778);
    receptionGroup.add(screen);
    addBox(0.13, 0.38, 0.13, materials.brushedMetal, x, 1.55, 8.72);
    addBox(0.56, 0.06, 0.32, materials.darkMetal, x, 1.36, 8.72);
    addBox(0.72, 0.045, 0.25, materials.darkMetal, x, 1.36, 9.42);
  }

  // Refined counter surface and two functional-looking registration workstations.
  addBox(10.25, 0.12, 2.5, materials.counterTop, 0, 1.26, 9, receptionGroup, 'Reception counter stone worktop');
  addBox(9.7, 0.12, 0.09, materials.trim, 0, 0.79, 10.23, receptionGroup, 'Reception counter brass accent');
  addMonitor(-2.35, 'REGISTRATION', '#0e7490');
  addMonitor(2.35, 'PATIENT SERVICES', '#1d4ed8');
  addBox(1.45, 0.34, 0.05, materials.brushedMetal, 0, 1.72, 7.78, receptionGroup, 'Reception nameplate frame');

  // Main waiting seats: three separated, collision-aware, metal-framed chairs.
  function addWaitingChair(x, z, index) {
    const chairGroup = new THREE.Group();
    chairGroup.position.set(x, 0, z);
    chairGroup.name = 'ReceptionWaitingChair' + index;
    addBox(1.45, 0.16, 1.12, materials.chair, 0, 0.61, 0, chairGroup);
    addBox(1.45, 0.82, 0.16, materials.chairBack, 0, 1.04, 0.49, chairGroup);
    addBox(0.1, 0.58, 0.1, materials.brushedMetal, -0.61, 0.31, -0.43, chairGroup);
    addBox(0.1, 0.58, 0.1, materials.brushedMetal, 0.61, 0.31, -0.43, chairGroup);
    addBox(0.1, 0.58, 0.1, materials.brushedMetal, -0.61, 0.31, 0.43, chairGroup);
    addBox(0.1, 0.58, 0.1, materials.brushedMetal, 0.61, 0.31, 0.43, chairGroup);
    addBox(0.1, 0.52, 0.1, materials.brushedMetal, -0.76, 0.88, 0.05, chairGroup);
    addBox(0.1, 0.52, 0.1, materials.brushedMetal, 0.76, 0.88, 0.05, chairGroup);
    receptionGroup.add(chairGroup);
    addBoxCollider(x - 0.9, x + 0.9, z - 0.75, z + 0.85);
  }
  addWaitingChair(12.2, 15.6, 1);
  addWaitingChair(16.0, 15.6, 2);
  addWaitingChair(19.8, 15.6, 3);

  // Self-service wayfinding kiosk, built as a freestanding 3D object.
  const kiosk = new THREE.Group();
  kiosk.position.set(-20.5, 0, 15.4);
  kiosk.name = 'ReceptionWayfindingKiosk';
  addBox(1.25, 0.2, 1.05, materials.darkMetal, 0, 0.16, 0, kiosk);
  addBox(0.72, 1.55, 0.62, materials.ceramic, 0, 1.0, 0, kiosk);
  addBox(0.66, 0.86, 0.08, materials.darkMetal, 0, 1.68, -0.34, kiosk);
  const kioskScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.56, 0.72),
    new THREE.MeshBasicMaterial({ map: makeDisplayTexture('CAMPUS DIRECTORY', 'विभाग निर्देशिका', '#0f766e') })
  );
  kioskScreen.position.set(0, 1.69, -0.294);
  kioskScreen.rotation.y = Math.PI;
  kiosk.add(kioskScreen);
  addBox(0.42, 0.08, 0.08, materials.trim, 0, 1.08, -0.39, kiosk);
  receptionGroup.add(kiosk);
  addBoxCollider(-21.35, -19.65, 14.65, 16.25);

  // Clean ceiling light panels below the first-floor slab.
  [-5.2, 5.2].forEach(function (x, index) {
    addBox(3.4, 0.08, 1.1, materials.lightPanel, x, 7.12, 15.1, receptionGroup, 'Reception ceiling LED panel ' + (index + 1));
  });

  // Floor wayfinding inlays lead from the sliding entrance toward registration.
  addBox(0.12, 0.018, 6.2, materials.teal, -3.4, 0.315, 16.0, receptionGroup, 'Left lobby wayfinding inlay');
  addBox(0.12, 0.018, 6.2, materials.teal, 3.4, 0.315, 16.0, receptionGroup, 'Right lobby wayfinding inlay');
  addBox(1.8, 0.025, 0.12, materials.trim, 0, 0.32, 17.1, receptionGroup, 'Lobby threshold marker');

  // Bilingual wall-mounted department directory panels.
  function addWallDirectory(x, facing, title, subtitle, accent) {
    const panel = new THREE.Group();
    panel.position.set(x, 4.15, 10.9);
    panel.rotation.y = facing;
    addBox(4.8, 1.45, 0.16, materials.darkMetal, 0, 0, 0, panel);
    const texture = makeDisplayTexture(title, subtitle, accent);
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(4.48, 1.15),
      new THREE.MeshBasicMaterial({ map: texture })
    );
    face.position.set(0, 0, 0.09);
    panel.add(face);
    receptionGroup.add(panel);
  }
  addWallDirectory(-44.35, Math.PI / 2, 'OPD • CONSULTATION', 'ओपीडी • परामर्श कक्ष', '#1d4ed8');
  addWallDirectory(44.35, -Math.PI / 2, 'EMERGENCY • TRIAGE', 'आपातकाल • ट्रायेज', '#b91c1c');

  // A single indoor planter adds scale without cluttering the main walking lane.
  const planter = new THREE.Group();
  planter.position.set(39.4, 0, 15.6);
  addBox(1.05, 0.82, 1.05, materials.plantPot, 0, 0.42, 0, planter);
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.43, 0.06, 12), materials.darkMetal);
  soil.position.y = 0.86;
  planter.add(soil);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.08, 1.6, 8), materials.leaf);
  stem.position.y = 1.65;
  planter.add(stem);
  for (let i = 0; i < 6; i += 1) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.38, 10, 8), materials.leaf);
    const angle = (Math.PI * 2 * i) / 6;
    leaf.position.set(Math.cos(angle) * 0.34, 1.75 + (i % 2) * 0.22, Math.sin(angle) * 0.34);
    leaf.scale.set(0.72, 1.15, 0.72);
    planter.add(leaf);
  }
  receptionGroup.add(planter);
  addBoxCollider(38.65, 40.15, 14.85, 16.35);

  // Expose a small diagnostic marker for manual browser checks, not a game button.
  receptionGroup.userData.enhancementVersion = '1.0.0';
  receptionGroup.userData.graphicsQuality = selectedQuality;
  console.info('[Medical City] Reception enhancements loaded; quality:', selectedQuality);
})();