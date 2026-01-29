---
name: Backend-go
description: Standards for building the multi-tenant SaaS backend in Go.
---
# Backend-go Skill

This skill governs the development of the core Go services. It focuses on Clean Architecture, high concurrency, and strict multi-tenancy enforcement.

## Global Context
The backend serves a **3D Fashion SaaS Platform**. It handles:
-   High-volume asset metadata.
-   complex permission queries (RBAC + Tenancy).
-   Billing and usage tracking.

## Architecture Pattern
We use **Clean Architecture** with a strict dependency rule:
`cmd` -> `adapter` -> `usecase` -> `domain`.

### 1. Domain Layer (`internal/domain`)
-   **Pure Go structs** and **Interfaces**.
-   NO external dependencies (no SQL, no JSON tags if possible, though soft allowed for simpleDTOs).
-   **Entities**: `Organization`, `Project`, `Asset`, `User`.
-   **Errors**: Define sentinel errors here (e.g., `ErrAssetNotFound`).

### 2. Usecase Layer (`internal/usecase`)
-   **Application Business Rules**.
-   Orchestrates data flow to/from entities.
-   **Dependencies**: Injected via interfaces (Repositories, Services).
-   **Multi-tenancy**: MUST accept `context.Context` and extract `TenantID` to pass to repositories.

### 3. Adapter Layer (`internal/adapter`)
-   **Storage**: PostgreSQL implementations using `pgx`.
    -   MUST enforce `tenant_id` in EVERY query.
-   **Handler**: HTTP handlers (REST/GraphQL).
    -    responsible for mapping DTOs to Domain Entities.

## Multi-Tenancy Enforcement
-   **Context Propagation**: The `TenantID` is extracted from the JWT in the middleware (see `auth-multitenancy` skill) and planted into `context`.
-   **Repository Safety**:
    ```go
    // BAD
    func (r *Repo) GetUsers(ctx context.Context) ([]User, error)
    
    // GOOD
    func (r *Repo) GetUsers(ctx context.Context, tenantID uuid.UUID) ([]User, error)
    ```

## Concurrency & Performance
-   **Worker Pools**: For processing 3D asset ingestion (unzipping, validating), use worker pools, not unbounded goroutines.
-   **Graceful Shutdown**: All services must implement standard graceful shutdown for zero-downtime deployments.

## Interactions
-   **Auth**: Relies on `auth-multitenancy` for identity.
-   **Billing**: Calls `saas-architecture` logic for credit deduction before processing heavy tasks.
