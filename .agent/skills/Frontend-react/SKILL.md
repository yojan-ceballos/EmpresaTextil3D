---
name: frontend-react
description: Standards for the React frontend with Three.js/Babylon.js integration.
---
# Frontend-react Skill

This skill governs the user interface and 3D visualization components.

## Tech Stack
-   **Framework**: React (Secure Version 18.x).
-   **3D Engine**: Three.js (via React Three Fiber) OR Babylon.js.
-   **Styling**: TailwindCSS.

## 3D Visualization Patterns
-   **Canvas Management**: The 3D Canvas is heavy. Never mount/unmount it unnecessarily. Persist it in the layout if possible.
-   **Asset Loading**:
    -   Use `React.Suspense` for async model loading.
    -   Use Draco compression decoders (WASM) for GLB files.
    -   Implement "Level of Detail" (LOD) strategies for scene performance.
-   **Interactivity**:
    -   OrbitControls for model inspection.
    -   Raycasting for mesh selection (picking).

## Security (Frontend)
-   **XSS Prevention**: React handles most text escaping, but be careful with `dangerouslySetInnerHTML`.
-   **Dependencies**: Explicitly avoid React versions 19.0.0 - 19.2.2 (Security constraint).
-   **Token Handling**: tokens are stored in memory (preferable) or HttpOnly cookies. If in LocalStorage (less secure), be aware of XSS risks.

## Performance
-   **Bundle Splitting**: Split code by route.
-   **Texture Management**: Dispose of textures and geometries when components unmount to avoid WebGL memory leaks.
