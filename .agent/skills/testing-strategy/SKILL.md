---
name: testing-strategy
description: Global testing strategy for the SaaS platform.
---
# Testing Strategy Skill

This skill defines how we ensure quality across the multi-tenant architecture.

## Testing Pyramid

### 1. Unit Tests (High Volume)
-   **Go**: Test `usecase` logic and `domain` methods. Mock `repositories`.
-   **React**: Test hooks and utility functions.
-   **Python**: Test data transformation functions.

### 2. Integration Tests (Medium Volume)
-   **Go**: Test `adapter` layer against a REAL Postgres (using `testcontainers` or Docker Compose).
    -   *Crucial*: Verify RLS and Multi-tenancy isolation here.
-   **React**: Test complex components (Forms, 3D Viewers) with `React Testing Library`.

### 3. E2E Tests (Low Volume)
-   **Tool**: Playwright or Cypress.
-   **Scope**: Critical User Flows (Signup -> Upload Asset -> View Asset).

## 3D Specific Testing
-   **Visual Regression**: Snapshot testing for the 3D Canvas.
    -   Render a standard cube/model.
    -   Compare pixel difference against baseline.
-   **Asset Validation**: Unit tests that upload invalid FBX files and assert that the `3d-asset-pipeline` rejects them.

## Continuous Integration (CI)
-   All PRs must pass:
    -   Linting (Go, TS, Python).
    -   Unit Tests.
    -   Integration Tests (Database).
