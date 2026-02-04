---
name: auth-multitenancy
description: Standards for authentication, authorization, and multi-tenant isolation.
---
# Auth & Multitenancy Skill

This skill governs how we identify users and isolate data between tenants (Organizations).

## Hierarchy
1.  **Platform**: The SaaS instance.
2.  **Organization (Tenant)**: The billing entity. Data interpretation boundary.
3.  **Project**: A logical grouping of assets within an Org.
4.  **User**: A member of an Org with a specific Role.

## Authentication (AuthN)
-   **JWT Standard**: We use JWTs (JSON Web Tokens).
-   **Claims Structure**:
    ```json
    {
      "sub": "user_uuid",
      "org_id": "organization_uuid",
      "role": "admin|editor|viewer",
      "iss": "fashion-3d-saas"
    }
    ```
-   **Middleware**: The Go backend must have middleware that validates the JWT signature and injects `OrgID` (TenantID) into the request Context.

## Authorization (AuthZ) & Isolation
-   **Logical Isolation**: Data is stored in shared tables but segregated by `organization_id`.
-   **Row Level Security (RLS)**: (See `rules/postgres.md`) The Database MUST enforce isolation as a defense-in-depth measure.
-   **Role Based Access Control (RBAC)**:
    -   `Admin`: Manage Org, Billing, Users.
    -   `Editor`: Upload Assets, Edit Metadata.
    -   `Viewer`: View Assets only.

## Interactions
-   **Backend**: This skill provides the `Middleware` and `Context` patterns used by `backend-fiber`.
-   **Frontend**: The React app must refresh tokens transparently and handle `401 Unauthorized` / `403 Forbidden` gracefully.
