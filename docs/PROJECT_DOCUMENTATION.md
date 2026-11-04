# Medical City 3D - Hospital Simulation Game

## Overview
**Medical City** is an optimized realistic 3D open-world hospital simulation game set in a fictional Delhi/NCR Indian government medical college hospital campus.

Playable directly in modern web browsers (Desktop Chrome/Edge, Android Chrome, Safari) and ready for zero-config **Vercel** deployment.

## Features
- **22 Interconnected Campus Areas**: Main Entrance, Security Post, Reception & OPD registration, OPD Building, Emergency & Trauma Department, Ambulance Bay, General Inpatient Wards, Nursing Station, ICU Simulation Suite, Operation Theatre, Pathology Lab, Radiology/MRI Suite, Medical College Block, Tiered Lecture Theaters, Central Medical Library, Cafeteria/Canteen, 24x7 Jan Aushadhi Pharmacy, Doctors' Hostel Quarters, Healing Garden, Vehicle Parking, Internal Campus Loop Roads, and Working Stretcher Elevators.
- **Third-Person Player Controller**: Smooth chase camera with mouse orbit/zoom, WASD movement, sprint, jump, collision detection, and mobile on-screen virtual joystick with touch controls.
- **20 Fictional Educational Patient Cases**: Complete with patient demographics, symptoms, physical examination, vitals, lab reports, multiple-choice quizzes, and comprehensive clinical rationales.
- **Bilingual Support**: Instant toggle between English and Hindi for all signs, UI labels, department dialogs, and medical cases.
- **Audio Synthesizer**: Web Audio API generated ambulance sirens, heart monitor beeps, elevator chimes, and interaction feedback with mute toggle.
- **Day / Night Shift Lighting**: Ambient daylight Delhi sun and eerie night shift lighting providing the foundation for future hospital horror survival missions.
- **Save & Load System**: Auto-persists player progress and case completions in browser `localStorage`.

## Vercel Deployment Instructions
1. Install Vercel CLI (or connect GitHub repository to Vercel):
   ```bash
   npm i -g vercel
   ```
2. Deploy directly from the `vercel_dist` folder:
   ```bash
   cd vercel_dist
   vercel --prod
   ```
3. Open the provided `.vercel.app` URL on your phone or desktop browser to play immediately!

## Local Offline Testing
Run a quick local web server using Python or Node.js:
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.
