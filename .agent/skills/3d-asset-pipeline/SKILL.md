---
name: 3d-asset-pipeline
description: Standards for ingestion, validation, and storage of 3D assets.
---
# 3D Asset Pipeline Skill

This skill defines the technical requirements for the 3D assets (High-Quality Fashion).

## Supported Formats
-   **Ingestion (Source)**: FBX, OBJ, Alembic.
-   **Delivery (Web)**: GLB (glTF 2.0 binary).

## Quality & Optimization Standards
-   **Topology**: Quads preferred for deformation. No N-gons.
-   **Polygon Count**:
    -   *High LOD*: Max 100k tris (for hero viewing).
    -   *Low LOD*: Max 10k tris (for catalog/list view).
-   **Textures**:
    -   **PBR Workflow**: Metalness/Roughness.
    -   **Resolution**: Max 4096x4096px (High Tier), 2048x2048px (Standard).
    -   **Format**: WebP or KTX2 (GPU compressed) for runtime delivery.
-   **Units**: Meters. 1 unit = 1 meter.

## Pipeline Steps
1.  **Upload**: User uploads FBX/GLB.
2.  **Validation**: System checks polygon count and texture sizes.
    -   *Fail* if limits exceeded (based on SaaS Tier).
3.  **Processing** (Python):
    -   Convert FBX to GLB.
    -   Generate Thumbnails (Multi-angle).
    -   Apply Draco compression.
4.  **Storage**: Push optimized artifacts to Object Storage (S3/MinIO).
5.  **Database**: Store metadata (vertex count, materials) in Postgres.

## Interactions
-   **Python-data-ai**: Executes the conversion scripts.
-   **Frontend-react**: Consumes the optimized GLB.
