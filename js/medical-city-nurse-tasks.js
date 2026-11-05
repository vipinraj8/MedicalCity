/*
 * Medical City — Level 2 nurse objectives.
 * Uses fictional observation data for gameplay only, not clinical guidance.
 */
(function installNurseTasks() {
  'use strict';
  const root = new THREE.Group();
  root.name = 'Level2NurseObjectives';
  worldGroup.add(root);

  const mat = {
    navy: new THREE.MeshStandardMaterial({color:0x0f172a,roughness:0.48,metalness:0.32}),
    steel: new THREE.MeshStandardMaterial({color:0x94a3b8,roughness:0.32,metalness:0.78}),
    white: new THREE.MeshStandardMaterial({color:0xf8fafc,roughness:0.5}),
    amber: new THREE.MeshStandardMaterial({color:0xf59e0b,emissive:0x92400e,emissiveIntensity:0.35}),
    red: new THREE.MeshStandardMaterial({color:0xf97316,emissive:0x9a3412,emissiveIntensity:0.25}),
    green: new THREE.MeshStandardMaterial({color:0x10b981,emissive:0x065f46,emissiveIntensity:0.5})
  };
  const observations = [
    {id:'OBS-01',name:'OPD Observation Station',x:-28,z:12,floor:0,bp:'118/76 mmHg',pulse:'78 bpm',rr:'16 / min',spo2:'98%',temp:'36.8 °C'},
    {id:'OBS-02',name:'Emergency Observation Station',x:28,z:12,floor:0,bp:'124/82 mmHg',pulse:'92 bpm',rr:'18 / min',spo2:'97%',temp:'37.1 °C'},
    {id:'OBS-03',name:'Ground Corridor Observation Station',x:0,z:-10,floor:0,bp:'116/74 mmHg',pulse:'72 bpm',rr:'15 / min',spo2:'99%',temp:'36.7 °C'},
    {id:'OBS-04',name:'Ward Observation Station A',x:-28,z:-10,floor:1,bp:'122/78 mmHg',pulse:'84 bpm',rr:'17 / min',spo2:'98%',temp:'36.9 °C'},
    {id:'OBS-05',name:'Ward Observation Station B',x:-20,z:-10,floor:1,bp:'114/72 mmHg',pulse:'76 bpm',rr:'16 / min',spo2:'99%',temp:'36.6 °C'}
  ];
  const surfaces = [
    {id:'CLN-01',name:'OPD Examination Surface',x:-37,z:15,floor:0},
    {id:'CLN-02',name:'Emergency Work Surface',x:37,z:15,floor:0},
    {id:'CLN-03',name:'Rear Corridor Treatment Surface',x:10,z:-20,floor:0}
  ];
  const state={active:false,completedStations:[],cleanedSurfaces:[],activeTarget:null};

  function addBox(parent,w,h,d,material,x,y,z,name){
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
    mesh.position.set(x,y,z); mesh.castShadow=true; mesh.receiveShadow=true;
    if(name) mesh.name=name;
    parent.add(mesh); return mesh;
  }
  function makeLabel(title,subtitle,color){
    const canvas=document.createElement('canvas'); canvas.width=512; canvas.height=128;
    const ctx=canvas.getContext('2d'); ctx.fillStyle='#071827'; ctx.fillRect(0,0,512,128);
    ctx.fillStyle=color; ctx.fillRect(0,0,512,10);
    ctx.fillStyle='#f8fafc'; ctx.textAlign='center'; ctx.font='bold 27px Arial'; ctx.fillText(title,256,55);
    ctx.fillStyle='#7dd3fc'; ctx.font='bold 19px Arial'; ctx.fillText(subtitle,256,91);
    const texture=new THREE.CanvasTexture(canvas); texture.encoding=THREE.sRGBEncoding; return texture;
  }
  function addNameplate(parent,title,subtitle,color){
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(2.7,0.68),new THREE.MeshBasicMaterial({map:makeLabel(title,subtitle,color),side:THREE.DoubleSide}));
    mesh.position.set(0,2.35,0.12); parent.add(mesh);
  }
  function addRing(x,y,z,material,radius){
    const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,0.055,8,36),material);
    ring.rotation.x=Math.PI/2; ring.position.set(x,y+0.045,z); root.add(ring); return ring;
  }

  observations.forEach(item=>{
    const g=new THREE.Group(); g.name=item.id; g.position.set(item.x,item.floor?7.5:0,item.z);
    addBox(g,1.35,0.9,0.16,mat.navy,0,1.65,0,item.id+' monitor');
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(1.12,0.67),new THREE.MeshBasicMaterial({map:makeLabel('OBSERVATIONS',item.id,'#0e7490')}));
    screen.position.set(0,1.67,0.09); g.add(screen);
    addBox(g,0.22,0.72,0.22,mat.steel,0,1.08,0);
    addBox(g,1.0,0.12,0.72,mat.white,0,0.66,0);
    addBox(g,0.12,0.64,0.12,mat.steel,-0.38,0.32,-0.25);
    addBox(g,0.12,0.64,0.12,mat.steel,0.38,0.32,-0.25);
    addNameplate(g,'NURSE STATION',item.id,'#0e7490');
    root.add(g); item.mesh=g;
    item.ring=addRing(item.x,item.floor?7.5:0,item.z,mat.amber,1.5);
  });

  surfaces.forEach(item=>{
    const g=new THREE.Group(); g.name=item.id; g.position.set(item.x,0,item.z);
    addBox(g,1.8,0.14,1.2,mat.white,0,0.92,0,item.id+' work surface');
    [[-0.72,-0.45],[0.72,-0.45],[-0.72,0.45],[0.72,0.45]].forEach(p=>addBox(g,0.12,0.9,0.12,mat.steel,p[0],0.46,p[1]));
    addNameplate(g,'CLEANING TASK',item.id,'#b45309');
    root.add(g); item.mesh=g; item.ring=addRing(item.x,0,item.z,mat.red,1.65);
    addBoxCollider(item.x-0.85,item.x+0.85,item.z-0.62,item.z+0.62,0,4);
  });

  const modal=document.createElement('div');
  modal.className='modal-overlay'; modal.id='nurse-task-modal'; modal.style.zIndex='110';
  modal.innerHTML='<div class="modal-box" style="max-width:520px;"><div class="modal-header"><div class="modal-title" id="nurse-task-title">Nurse Objective</div><button class="modal-close" id="nurse-task-close" aria-label="Close">×</button></div><div class="modal-body" id="nurse-task-content"></div><div class="modal-footer"><button class="btn-icon" id="nurse-task-action">Confirm</button><button class="btn-icon" id="nurse-task-cancel">Close</button></div></div>';
  document.body.appendChild(modal);
  const titleEl=modal.querySelector('#nurse-task-title'), contentEl=modal.querySelector('#nurse-task-content'), actionEl=modal.querySelector('#nurse-task-action');

  function emitProgress(){
    window.dispatchEvent(new CustomEvent('medicalcity-task-progress',{detail:{observations:state.completedStations.length,cleaning:state.cleanedSurfaces.length}}));
  }
  function closeModal(){modal.style.display='none';state.activeTarget=null;}
  modal.querySelector('#nurse-task-close').addEventListener('click',closeModal);
  modal.querySelector('#nurse-task-cancel').addEventListener('click',closeModal);

  function openObservation(item){
    if(state.completedStations.includes(item.id)){showNotification(item.name+' has already been checked.');return;}
    state.activeTarget={type:'observation',item:item};
    titleEl.textContent=item.name;
    contentEl.innerHTML='<p style="color:#94a3b8;margin-bottom:10px;">Fictional training observation chart • '+item.id+'</p>'+
      '<div class="dept-stat-grid">'+
      '<div class="dept-stat"><div class="dept-stat-label">Blood pressure</div><div class="dept-stat-val">'+item.bp+'</div></div>'+
      '<div class="dept-stat"><div class="dept-stat-label">Pulse</div><div class="dept-stat-val">'+item.pulse+'</div></div>'+
      '<div class="dept-stat"><div class="dept-stat-label">Respiratory rate</div><div class="dept-stat-val">'+item.rr+'</div></div>'+
      '<div class="dept-stat"><div class="dept-stat-label">Oxygen saturation</div><div class="dept-stat-val">'+item.spo2+'</div></div>'+
      '<div class="dept-stat"><div class="dept-stat-label">Temperature</div><div class="dept-stat-val">'+item.temp+'</div></div></div>'+
      '<p style="color:#cbd5e1;font-size:12px;">Review this simulated chart and record that the observation station has been checked.</p>';
    actionEl.textContent='Record observation check'; modal.style.display='flex';
  }
  function openCleaning(item){
    if(state.cleanedSurfaces.includes(item.id)){showNotification(item.name+' has already been marked clean.');return;}
    state.activeTarget={type:'cleaning',item:item}; titleEl.textContent=item.name;
    contentEl.innerHTML='<p style="color:#fbbf24;font-weight:700;">Marked cleaning task • '+item.id+'</p>'+
      '<p style="margin-top:10px;color:#cbd5e1;">Complete the simulated surface-cleaning task and record it in the shift checklist.</p>'+
      '<p style="margin-top:10px;color:#94a3b8;font-size:12px;">This is a game objective, not a real-world infection-control procedure.</p>';
    actionEl.textContent='Mark surface cleaned'; modal.style.display='flex';
  }
  actionEl.addEventListener('click',()=>{
    if(!state.activeTarget||!state.active)return;
    const current=state.activeTarget;
    if(current.type==='observation'&&!state.completedStations.includes(current.item.id)){
      state.completedStations.push(current.item.id); current.item.ring.material=mat.green;
      showNotification('Observation station checked: '+current.item.id);
    }else if(current.type==='cleaning'&&!state.cleanedSurfaces.includes(current.item.id)){
      state.cleanedSurfaces.push(current.item.id); current.item.ring.material=mat.green;
      showNotification('Surface cleaning recorded: '+current.item.id);
    }
    closeModal(); emitProgress();
    if(state.completedStations.length>=5&&state.cleanedSurfaces.length>=3){
      state.active=false; window.dispatchEvent(new CustomEvent('medicalcity-level-complete'));
    }
  });

  function findTarget(position,floor){
    if(!state.active)return null;
    let candidate=null, bestDistance=3.7;
    observations.forEach(item=>{
      if(state.completedStations.includes(item.id)||item.floor!==floor)return;
      const d=Math.hypot(position.x-item.x,position.z-item.z);
      if(d<bestDistance){bestDistance=d;candidate={type:'observation',item:item,distance:d};}
    });
    surfaces.forEach(item=>{
      if(state.cleanedSurfaces.includes(item.id)||item.floor!==floor)return;
      const d=Math.hypot(position.x-item.x,position.z-item.z);
      if(d<bestDistance){bestDistance=d;candidate={type:'cleaning',item:item,distance:d};}
    });
    return candidate;
  }
  function interact(target){
    if(!state.active||!target||!target.item)return;
    if(target.type==='observation')openObservation(target.item);
    else if(target.type==='cleaning')openCleaning(target.item);
  }
  function reset(active){
    state.active=Boolean(active); state.completedStations=[]; state.cleanedSurfaces=[]; state.activeTarget=null;
    observations.forEach(item=>{item.ring.material=mat.amber;});
    surfaces.forEach(item=>{item.ring.material=mat.red;});
    emitProgress();
  }
  function animateMarkers(time){
    observations.forEach((item,i)=>{if(!state.completedStations.includes(item.id))item.ring.scale.setScalar(1+Math.sin((time||0)*2+i)*0.08);});
    surfaces.forEach((item,i)=>{if(!state.cleanedSurfaces.includes(item.id))item.ring.scale.setScalar(1+Math.sin((time||0)*2.4+i)*0.08);});
  }

  window.MedicalCityTasks={observations,surfaces,findTarget,interact,reset,animateMarkers,
    getProgress:()=>({observations:state.completedStations.length,cleaning:state.cleanedSurfaces.length})};
  console.info('[Medical City] Level 2 nurse objectives ready.');
})();