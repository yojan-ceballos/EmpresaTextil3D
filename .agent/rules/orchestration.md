---
priority: critical
activates_on: always
---
# Agent Orchestration Rule

This is the **Meta-Rule** that governs how the agent interacts with the 3D SaaS System.

## 1. Skill First Policy
Before writing code, YOU MUST read the relevant `SKILL.md`.
-   Building Backend? -> Read `.agent/skills/Backend-go/SKILL.md`.
-   Building Frontend? -> Read `.agent/skills/frontend-react/SKILL.md`.
-   Processing Assets? -> Read `.agent/skills/3d-asset-pipeline/SKILL.md`.

## 2. Multi-Tenancy is Non-Negotiable
-   **Default Disallow**: Assume NO access.
-   **Explicit Tenant**: Every database query, every API call, every cache key MUST contain the `OrganizationID`.
-   **Violation**: Writing code that ignores TenantID is a CRITICAL FAILURE.

## 3. 3D Quality Over Speed
-   The platform's value proposition is "High Quality".
-   Do not optimize assets to the point of degradation.
-   If a tradeoff exists between "File Size" and "Visual Fidelity", ask the user or default to "Visual Fidelity" (within reasonable 4K limits).

## 4. Architecture Consistency
-   Do not invent new patterns. Use the defined **Clean Architecture**.
-   If existing code violates the pattern, Refactor it; do not copy the bad pattern.
