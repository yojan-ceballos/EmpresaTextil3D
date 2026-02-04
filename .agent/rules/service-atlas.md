---
activates_on: atlas_service_development
priority: high
---
# ATLAS-SERVICE Context

**Role**: 3D Engine, Asset Pipeline & Interactivity.
**Stack**: Go (Fiber) + Python (Blender/MeshLab).

## Responsibilities
1.  **Asset Pipeline**: Ingestion, Validation, Optimization of GLB/FBX.
2.  **Visual Quality**: Ensuring textures are PBR compliant.
3.  **Avatar System**: Managing rig compatibility and "Virtual Try-On" logic.
4.  **Streaming**: Serving 3D assets via CDN/Signed URLs.
5.  **MCP**: Model / Merchant / Company Portal for technical 3D management.

## 🚫 EXPLICIT PROHIBITIONS
-   **NO Commerce Logic**: Do not calculate taxes, shipping, or cart totals.
-   **NO Customer PII**: Minimize storage of end-customer data.

## Data Domain
-   `assets` (Metadata: vertex count, bounding box)
-   `materials` (Textures, shaders)
-   `animations`
-   `avatars`

## Interaction with FLOW
-   ATLAS receives "Raw Assets".
-   ATLAS performs magic (Optimization).
-   ATLAS returns "Production Aseets" to FLOW (via URL/ID reference).
