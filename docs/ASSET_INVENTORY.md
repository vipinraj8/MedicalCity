# Medical City - Asset & Component Inventory

1. **Core Runtime**:
   - `medical_city_3d.html`: Self-contained 3D hospital open-world game (HTML5, Three.js r128, Web Audio API, responsive UI).
2. **Unity C# Scripts** (`UnityProject/Assets/MedicalCity/Scripts/`):
   - `PlayerController.cs`
   - `CameraController.cs`
   - `HospitalBuilder.cs`
   - `HospitalInteraction.cs`
   - `DoorController.cs`
   - `ElevatorController.cs`
   - `NPCController.cs`
   - `NPCSpawner.cs`
   - `MedicalCityHUD.cs`
   - `MiniMapController.cs`
   - `MapNavigation.cs`
   - `MissionManager.cs`
   - `SaveManager.cs`
   - `SettingsManager.cs`
   - `LanguageManager.cs`
   - `MedicalDisclaimerUI.cs`
3. **Vercel Package**:
   - `vercel.json`: Static server headers & routing
   - `package.json`: NPM runner script
   - `README.md`: Setup guide
4. **Data Modules**:
   - `cases_data.json`: 20 Fictional Clinical Educational Cases (Bilingual English & Hindi)
