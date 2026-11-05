/*
 * Delhi neighborhood streetscape for Medical City.
 * Built as an additive module on the existing Three.js r128 scene.
 * Adds nearby homes, a pharmacy storefront, Delhi Metro-style station,
 * elevated track/train, street lighting/trees, and an ambulance bay.
 */
(function buildDelhiNeighborhood() {
  'use strict';

  if (window.medicalCityNeighborhoodReady) return;
  window.medicalCityNeighborhoodReady = true;

  const g = new THREE.Group();
  g.name = 'DelhiNeighborhoodStreetscape';
  worldGroup.add(g);

  const mats2 = {
    cream: new THREE.MeshStandardMaterial({ color: 0xf1e6d4, roughness: 0.86 }),
    sand: new THREE.MeshStandardMaterial({ color: 0xd6b98c, roughness: 0.9 }),
    pink: new THREE.MeshStandardMaterial({ color: 0xe7b5a4, roughness: 0.88 }),
    mint: new THREE.MeshStandardMaterial({ color: 0xb8d3c1, roughness: 0.88 }),
    brick: new THREE.MeshStandardMaterial({ color: 0x944d3b, roughness: 0.9 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x7c3f2d, roughness: 0.78 }),
    tile: new THREE.MeshStandardMaterial({ color: 0x9a8c7a, roughness: 0.92 }),
    frame: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.38, metalness: 0.55 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0x75c7dc, roughness: 0.12, metalness: 0.12, transparent: true, opacity: 0.75 }),
    door: new THREE.MeshStandardMaterial({ color: 0x6b422e, roughness: 0.7 }),
    teal: new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.45 }),
    metroBlue: new THREE.MeshStandardMaterial({ color: 0x164e83, roughness: 0.45, metalness: 0.2 }),
    metroSilver: new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.34, metalness: 0.55 }),
    metroRed: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.52 }),
    darkRoad: new THREE.MeshStandardMaterial({ color: 0x303b49, roughness: 0.96 }),
    roadLine: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 }),
    hedge: new THREE.MeshStandardMaterial({ color: 0x256b45, roughness: 1 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x2f855a, roughness: 1 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x74462f, roughness: 1 }),
    lamp: new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0xffe4a3, emissiveIntensity: 0.7 }),
    amber: new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.45 }),
    white: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.72 })
  };

  function addBox(parent, w, h, d, material, x, y, z, name) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (name) mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addLabel(parent, text, x, y, z, w, h, bg, fg) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 128);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 5;
    ctx.strokeRect(3, 3, 506, 122);
    ctx.fillStyle = fg || '#ffffff';
    ctx.font = 'bold 34px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 256, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.encoding = THREE.sRGBEncoding;
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
    panel.position.set(x, y, z);
    parent.add(panel);
    return panel;
  }

  function addHouse(x, z, style, name) {
    const house = new THREE.Group();
    house.name = name;
    house.position.set(x, 0, z);
    const wallMat = style === 'mint' ? mats2.mint : (style === 'pink' ? mats2.pink : (style === 'sand' ? mats2.sand : mats2.cream));
    const width = style === 'apartment' ? 22 : 17;
    const depth = style === 'apartment' ? 17 : 14;
    const height = style === 'apartment' ? 12 : 6.3;

    addBox(house, width, height, depth, wallMat, 0, height / 2, 0, name + ' exterior walls');
    addBox(house, width + 1.0, 0.38, depth + 1.0, mats2.roof, 0, height + 0.18, 0, name + ' roof slab');

    if (style === 'apartment') {
      addBox(house, width + 1.2, 0.7, 1.0, mats2.brick, 0, height + 0.62, 0, name + ' parapet');
      [3.5, 7.4, 10.8].forEach((y, row) => {
        [-6.8, 0, 6.8].forEach((wx, col) => {
          addBox(house, 2.3, 1.85, 0.16, mats2.frame, wx, y, depth / 2 + 0.09, 'Window frame');
          addBox(house, 1.95, 1.48, 0.04, mats2.glass, wx, y, depth / 2 + 0.19, 'Apartment window');
          addBox(house, 2.5, 0.12, 0.5, mats2.frame, wx, y - 0.96, depth / 2 + 0.28, 'Window sill');
        });
        const balcony = addBox(house, 18.8, 0.18, 1.65, mats2.tile, 0, y - 1.12, depth / 2 + 0.76, 'Balcony floor');
        balcony.castShadow = false;
        addBox(house, 18.8, 0.72, 0.12, mats2.frame, 0, y - 0.69, depth / 2 + 1.48, 'Balcony rail');
      });
    } else {
      // Front-facing entry, framed windows and a small shaded porch.
      addBox(house, 1.45, 2.85, 0.18, mats2.door, 0, 1.45, depth / 2 + 0.11, name + ' front door');
      addBox(house, 0.16, 2.95, 0.26, mats2.frame, -0.82, 1.48, depth / 2 + 0.16, 'Door frame');
      addBox(house, 0.16, 2.95, 0.26, mats2.frame, 0.82, 1.48, depth / 2 + 0.16, 'Door frame');
      [-5.0, 5.0].forEach(wx => {
        addBox(house, 2.8, 2.1, 0.16, mats2.frame, wx, 3.5, depth / 2 + 0.09, 'Window frame');
        addBox(house, 2.45, 1.76, 0.04, mats2.glass, wx, 3.5, depth / 2 + 0.19, 'Front window');
        addBox(house, 3.0, 0.14, 0.48, mats2.frame, wx, 2.42, depth / 2 + 0.26, 'Window sill');
      });
      addBox(house, 6.0, 0.35, 3.2, mats2.tile, 0, 0.2, depth / 2 + 1.55, 'Front porch');
      addBox(house, 0.22, 2.55, 0.22, mats2.white, -2.45, 1.25, depth / 2 + 2.6, 'Porch column');
      addBox(house, 0.22, 2.55, 0.22, mats2.white, 2.45, 1.25, depth / 2 + 2.6, 'Porch column');

      // Two upper windows and a projecting sunshade.
      [-4.7, 4.7].forEach(wx => {
        addBox(house, 2.35, 1.6, 0.15, mats2.frame, wx, 5.15, depth / 2 + 0.1, 'Upper window frame');
        addBox(house, 2.0, 1.28, 0.04, mats2.glass, wx, 5.15, depth / 2 + 0.2, 'Upper window');
      });
      addBox(house, width + 0.7, 0.28, depth + 0.6, mats2.roof, 0, 6.55, 0, 'Roof eaves');
    }

    // Roof water tank and AC condenser make the homes read as Delhi housing.
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 1.55, 14), mats.waterTankBlack);
    tank.position.set(-width * 0.27, height + 1.15, -2.2);
    house.add(tank);
    addBox(house, 1.15, 0.72, 0.58, mats.acUnit, width * 0.38, Math.max(3.1, height * 0.54), depth / 2 + 0.38, 'Split AC outdoor unit');

    // A short paved driveway and garden strip in front of each home.
    const drive = new THREE.Mesh(new THREE.PlaneGeometry(width + 2, 5.4), mats2.tile);
    drive.rotation.x = -Math.PI / 2;
    drive.position.set(x, 0.035, z + depth / 2 + 5.2);
    g.add(drive);
    addBox(house, width - 1.2, 0.22, 0.38, mats2.hedge, 0, 0.36, depth / 2 + 3.6, 'Front garden hedge');
    g.add(house);
    addBoxCollider(x - width / 2 - 0.5, x + width / 2 + 0.5, z - depth / 2 - 0.5, z + depth / 2 + 0.8);
    return house;
  }

  // A short residential lane branches away from the main hospital approach.
  const lane = new THREE.Mesh(new THREE.PlaneGeometry(116, 8), mats2.darkRoad);
  lane.rotation.x = -Math.PI / 2;
  lane.position.set(-8, 0.045, 106);
  lane.receiveShadow = true;
  g.add(lane);
  const curbNorth = new THREE.Mesh(new THREE.BoxGeometry(116, 0.16, 0.55), mats2.white);
  curbNorth.position.set(-8, 0.1, 101.7);
  g.add(curbNorth);
  const curbSouth = curbNorth.clone();
  curbSouth.position.z = 110.3;
  g.add(curbSouth);
  for (let i = -60; i <= 44; i += 12) {
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 0.18), mats2.roadLine);
    dash.rotation.x = -Math.PI / 2;
    dash.position.set(i, 0.065, 106);
    g.add(dash);
  }

  // Additional homes sit beside the lane and outside the hospital's main vehicle path.
  addHouse(-54, 91, 'cream', 'Delhi Residential Home A');
  addHouse(50, 91, 'pink', 'Delhi Residential Home B');
  addHouse(-101, 79, 'apartment', 'Delhi Apartment Block C');

  // Apollo-style pharmacy storefront based on the supplied reference photo.
  const pharmacy = new THREE.Group();
  pharmacy.name = 'Apollo Pharmacy Neighborhood Store';
  pharmacy.position.set(-22, 0, 96);
  addBox(pharmacy, 13, 5.2, 9, mats2.white, 0, 2.6, 0, 'Pharmacy shop shell');
  addBox(pharmacy, 13.15, 1.25, 0.38, mats2.teal, 0, 4.55, 4.68, 'Pharmacy teal fascia');
  addLabel(pharmacy, 'APOLLO PHARMACY', 0, 4.6, 4.91, 10.8, 0.95, '#0f766e', '#ffffff');
  addBox(pharmacy, 3.0, 3.0, 0.14, mats2.frame, -3.7, 1.85, 4.62, 'Store glass door frame');
  addBox(pharmacy, 2.7, 2.75, 0.06, mats2.glass, -3.7, 1.85, 4.73, 'Store glass door');
  addBox(pharmacy, 5.0, 2.65, 0.14, mats2.frame, 2.0, 2.0, 4.62, 'Store window frame');
  addBox(pharmacy, 4.68, 2.34, 0.06, mats2.glass, 2.0, 2.0, 4.73, 'Store window');
  addBox(pharmacy, 13.6, 0.28, 10.0, mats2.tile, 0, 0.16, 0.1, 'Pharmacy raised plinth');
  g.add(pharmacy);
  addBoxCollider(-29, -15, 91, 101.5);

  // Street trees and warm street lamps make the edge of the hospital feel inhabited.
  function addTree(x, z, scale) {
    const tree = new THREE.Group();
    tree.position.set(x, 0, z);
    tree.scale.setScalar(scale || 1);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.32, 3.1, 8), mats2.trunk);
    trunk.position.y = 1.55;
    tree.add(trunk);
    const crown = new THREE.Mesh(new THREE.SphereGeometry(2.05, 10, 8), mats2.leaf);
    crown.position.y = 4.15;
    crown.scale.set(1.0, 1.15, 0.9);
    crown.castShadow = true;
    tree.add(crown);
    g.add(tree);
  }
  [[-72, 91, 1],[-37, 92, 0.85],[28, 92, 0.9],[72, 95, 1],[-116, 63, 0.9],[-116, 105, 0.8],[72, 118, 0.9]].forEach(p => addTree(p[0],p[1],p[2]));

  function addStreetLamp(x, z) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 7.2, 8), mats2.frame);
    pole.position.set(x, 3.6, z);
    g.add(pole);
    const arm = addBox(g, 1.7, 0.14, 0.14, mats2.frame, x + 0.65, 7.0, z, 'Street lamp arm');
    arm.rotation.z = -0.1;
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.2, 0.42), mats2.lamp);
    light.position.set(x + 1.35, 6.8, z);
    g.add(light);
    const point = new THREE.PointLight(0xffe8b2, 0.42, 16);
    point.position.set(x + 1.3, 6.4, z);
    g.add(point);
  }
  addStreetLamp(-68, 105);
  addStreetLamp(66, 105);
  addStreetLamp(54, 84);
  addStreetLamp(-88, 76);

  // Elevated Delhi Metro-style station and viaduct on the east side of the campus.
  const metro = new THREE.Group();
  metro.name = 'Medical City Metro Station';
  g.add(metro);

  // Four concrete piers keep the elevated line visually grounded.
  [48, 73, 98, 123].forEach(x => {
    addBox(metro, 1.5, 9.5, 1.6, mats2.sand, x, 4.75, 72, 'Metro concrete pier');
    addBox(metro, 2.4, 0.45, 2.2, mats2.tile, x, 0.23, 72, 'Metro pier footing');
  });

  addBox(metro, 91, 0.9, 11.2, mats2.metroSilver, 85.5, 10.0, 72, 'Elevated metro viaduct');
  addBox(metro, 91, 0.55, 10.1, mats2.metroBlue, 85.5, 10.68, 72, 'Metro platform deck');
  addBox(metro, 91, 0.28, 1.0, mats2.white, 85.5, 11.1, 67.3, 'Platform safety edge');
  addBox(metro, 91, 0.28, 1.0, mats2.white, 85.5, 11.1, 76.7, 'Platform safety edge');

  // Track rails and sleepers are visible beneath the train.
  [-1.8, 1.8].forEach(zoff => {
    addBox(metro, 90, 0.18, 0.18, mats2.frame, 85.5, 11.22, 72 + zoff, 'Metro running rail');
  });
  for (let x = 43; x <= 128; x += 3.2) {
    addBox(metro, 0.35, 0.12, 5.2, mats2.frame, x, 11.1, 72, 'Track sleeper');
  }

  // Three static train cars provide a recognizable metro silhouette.
  [61, 85, 109].forEach((x, carIndex) => {
    const car = new THREE.Group();
    car.position.set(x, 12.65, 72);
    addBox(car, 22.0, 3.2, 3.8, mats2.metroSilver, 0, 0, 0, 'Metro car body');
    addBox(car, 22.1, 0.48, 3.9, mats2.metroRed, 0, -0.58, 0, 'Metro red belt stripe');
    addBox(car, 2.2, 2.15, 0.12, mats2.metroBlue, 0, 0.05, 1.98, 'Metro front windscreen');
    for (let wx = -8.2; wx <= 8.2; wx += 4.1) {
      addBox(car, 2.7, 1.35, 0.12, mats2.frame, wx, 0.28, 1.97, 'Metro window frame');
      addBox(car, 2.38, 1.08, 0.05, mats2.glass, wx, 0.28, 2.06, 'Metro window glass');
    }
    addBox(car, 2.2, 2.0, 0.12, mats2.frame, -10.85, 0.0, 0, 'Metro gangway');
    metro.add(car);
  });

  // Station entrance concourse, canopy, glass doors and stairs.
  const station = new THREE.Group();
  station.name = 'Medical City Metro Concourse';
  station.position.set(101, 0, 96);
  addBox(station, 19, 6.4, 13, mats2.white, 0, 3.2, 0, 'Metro entrance building');
  addBox(station, 19.4, 0.42, 13.4, mats2.metroBlue, 0, 6.45, 0, 'Metro rooftop fascia');
  addBox(station, 10.2, 3.6, 0.18, mats2.frame, 0, 2.2, 6.58, 'Metro entrance door frame');
  addBox(station, 9.7, 3.25, 0.08, mats2.glass, 0, 2.2, 6.7, 'Metro glass doors');
  addLabel(station, 'MEDICAL CITY METRO', 0, 5.92, 6.85, 16.5, 1.0, '#164e83', '#ffffff');
  // A stair run rises towards the elevated concourse without crossing the main road.
  for (let i = 0; i < 10; i++) {
    const step = addBox(station, 5.4, 0.28, 0.8, mats2.tile, -6.7, 0.18 + i * 0.78, -4.8 - i * 0.8, 'Metro stair step');
    step.rotation.x = 0;
  }
  addBox(station, 0.18, 7.8, 8.4, mats2.frame, -9.6, 4.0, -8.1, 'Metro stair handrail left');
  addBox(station, 0.18, 7.8, 8.4, mats2.frame, -3.7, 4.0, -8.1, 'Metro stair handrail right');
  metro.add(station);
  addBoxCollider(90.5, 111.5, 88.5, 103.5);

  // Metro access plaza and sheltered pedestrian waiting space.
  const plaza = new THREE.Mesh(new THREE.PlaneGeometry(26, 17), mats2.tile);
  plaza.rotation.x = -Math.PI / 2;
  plaza.position.set(101, 0.04, 108);
  metro.add(plaza);
  addBox(metro, 23, 0.22, 4, mats2.metroBlue, 101, 3.4, 112, 'Metro bus stop shelter roof');
  [-10, 10].forEach(x => addBox(metro, 0.2, 3.2, 0.2, mats2.frame, 101 + x, 1.7, 112, 'Shelter column'));

  // The existing ambulance is dressed with additional details and a marked bay.
  const ambulance = window.medicalCityAmbulance;
  if (ambulance) {
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.98 });
    const hubMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.65, roughness: 0.34 });
    [-1, 1].forEach(side => {
      [-2.25, 2.25].forEach(z => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.34, 16), wheelMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(side * 1.72, 0.67, z);
        ambulance.add(wheel);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.38, 12), hubMat);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(side * 1.73, 0.67, z);
        ambulance.add(hub);
      });
    });
    // Raised cab, broad windscreen and side windows.
    addBox(ambulance, 3.0, 2.0, 2.3, mats2.white, 0, 2.0, 2.15, 'Ambulance cab');
    addBox(ambulance, 2.45, 1.18, 0.08, mats2.glass, 0, 2.27, 3.32, 'Ambulance windscreen');
    [-1, 1].forEach(side => {
      addBox(ambulance, 0.08, 1.15, 1.4, mats2.glass, side * 1.53, 2.28, 2.18, 'Ambulance side cab glass');
      addBox(ambulance, 0.08, 0.72, 2.8, mats2.glass, side * 1.73, 2.13, -0.9, 'Ambulance patient compartment window');
      // Red/white reflective checker blocks follow the side stripe.
      for (let i = 0; i < 6; i++) {
        const color = (i % 2 === 0) ? 0xdc2626 : 0xf8fafc;
        const tile = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.28, 0.58), new THREE.MeshStandardMaterial({ color }));
        tile.position.set(side * 1.76, 1.5, -2.6 + i * 1.02);
        ambulance.add(tile);
      }
      // Blue Star-of-Life style cross marking, simplified for readability.
      addBox(ambulance, 0.08, 1.0, 0.28, mats2.metroBlue, side * 1.78, 2.38, -0.15, 'Medical cross vertical');
      addBox(ambulance, 0.08, 0.28, 1.0, mats2.metroBlue, side * 1.78, 2.38, -0.15, 'Medical cross horizontal');
    });
    addBox(ambulance, 1.0, 0.28, 0.34, new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x1d4ed8, emissiveIntensity: 0.8 }), 0.7, 3.25, 1.8, 'Blue emergency roof beacon');
    addBox(ambulance, 1.0, 0.28, 0.34, new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0x991b1b, emissiveIntensity: 0.8 }), -0.7, 3.25, 1.8, 'Red emergency roof beacon');
    addLabel(ambulance, '108 EMERGENCY', 0, 2.78, 3.42, 2.5, 0.48, '#b91c1c', '#ffffff');
    ambulance.userData.detailedAmbulance = true;
  }

  // A marked parking bay in front of the ambulance.
  const bay = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), mats2.darkRoad);
  bay.rotation.x = -Math.PI / 2;
  bay.position.set(28, 0.035, 38.2);
  g.add(bay);
  for (let x = 23.2; x <= 32.8; x += 9.6) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 5), mats2.white);
    line.rotation.x = -Math.PI / 2;
    line.position.set(x, 0.06, 38.2);
    g.add(line);
  }
  addBox(g, 9.5, 0.28, 0.3, mats2.white, 28, 0.18, 41.0, 'Ambulance bay threshold');
  addLabel(g, 'AMBULANCE BAY • 108', 28, 5.1, 40.8, 9.0, 1.0, '#b91c1c', '#ffffff');

  // Low planted edging makes the edge of the playable neighborhood legible.
  [[-119,49,0.8,10],[-119,119,0.8,10],[129,50,0.8,10],[129,118,0.8,10]].forEach(([x,z,w,d]) => {
    addBox(g, w, 0.65, d, mats2.hedge, x, 0.32, z, 'Neighborhood boundary hedge');
  });

  window.MedicalCityNeighborhood = {
    homes: ['Delhi Residential Home A', 'Delhi Residential Home B', 'Delhi Apartment Block C'],
    metroStation: 'Medical City Metro',
    pharmacy: 'Apollo Pharmacy',
    ambulance: ambulance || null
  };
  console.info('[Medical City] Delhi neighborhood and metro streetscape loaded.');
})();