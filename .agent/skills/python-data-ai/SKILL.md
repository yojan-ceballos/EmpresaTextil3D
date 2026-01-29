---
name: python-data-ai
description: Standards for Data Analysis, AI services, and Asset Processing scripts.
---
# Python Data & AI Skill

This skill governs the "Data Plane" of the application: 3D processing and AI analysis.

## Responsibilities
-   **Asset Optimization**: Reducing polygon counts, compressing textures (using `Blender Python API` or `MeshLab`).
-   **Data Analysis**: Analyzing usage patterns for SaaS billing insights (Pandas).
-   **AI Services**: Automatic classification of fashion items (e.g., "Sleeve Length", "Neckline Type") using Computer Vision models.

## Code Standards
-   **Type Hinting**: All functions must use type hints (`typing` module) and be checked with `mypy`.
-   **Async Processing**: These tasks are long-running. Scripts should be designed to run as **Celery Tasks** or K8s Jobs.
-   **Hardware Acceleration**: Explicitly manage GPU memory (CUDA) when using PyTorch or Blender.

## 3D Processing Libraries
-   **Trimesh**: For geometry headers and simple validation.
-   **Blender (bpy)**: For complex operations (format conversion, decimation).
-   **Open3D**: For point cloud operations if needed.

## Directory Structure
```text
/python-services
  /asset-processor
    /scripts
    /tests
  /ai-tagger
    /models
    /inference
```

## Interactions
-   **Backend-go**: Triggers these jobs via a Message Queue (e.g., RabbitMQ/Redis).
-   **3d-asset-pipeline**: The code here IMPLEMENTS the logic defined in the pipeline skill.
