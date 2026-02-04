---
name: backend-fiber
description: Standards for building the multi-tenant SaaS backend in Go using Fiber.
---
# Backend-Fiber Skill

This skill governs the development of the core Go services using the **Fiber** framework.
It adheres to **Clean Architecture** but adapted for Fiber's middleware-heavy and context-driven approach.

## Tech Stack
-   **Language**: Go 1.22+
-   **Web Framework**: [Gofiber/fiber](https://github.com/gofiber/fiber) (v2 or v3).
-   **Database**: PostgreSQL (pgx).
-   **Serialization**: Standard JSON (Fiber uses efficient mashallers).

## Microservices Architecture
The backend is split into specialized services:
-   **FLOW-SERVICE**: Product Data Ingestion, Catalog Management, Data Analysis.
-   **ATLAS-SERVICE**: 3D Asset Management, Pipeline, Avatar Interaction.

## Fiber Adaptation of Clean Architecture

### 1. Delivery Layer (Adapters)
-   **Handlers**: Use `*fiber.Ctx`.
    ```go
    func (h *ProductHandler) Create(c *fiber.Ctx) error {
        var dto CreateProductDTO
        if err := c.BodyParser(&dto); err != nil {
            return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Input"})
        }
        // Call Usecase...
    }
    ```
-   **Middleware**: Critical for Multi-Tenancy.
    -   `AuthMiddleware`: Validates JWT, extracts `OrgID`.
    -   `TenantMiddleware`: Injects `OrgID` into `c.Locals("org_id")`.

### 2. Usecase Layer (Business Logic)
-   **Context Agnostic**: The Usecase layer should NOT import `fiber`.
-   **Context Propagation**:
    -   The Handler MUST extract `c.UserContext()` (or build a new context with timeout) to pass to the Usecase.
    -   Pass `TenantID` explicitly as an argument or via Context value (Explicit argument preferred for clarity).

### 3. Repository Layer (Data Access)
-   **Pgx + Squirrel**: Use `squirrel` for dynamic query building if needed, but raw SQL with `pgx` is preferred for performance.
-   **Traces**: Ensure SQL queries are traced.

## Middleware Pattern
All services must implement a standard chain:
1.  `fiber.Recover()` (Panic safety).
2.  `Logger` (Structured JSON logging).
3.  `CORS`.
4.  `AuthMiddleware` (JWT Verification).
5.  `RateLimiter` (Per Tenant).

## Error Handling
-   Use `fiber.NewError(code, message)`.
-   Centralized **ErrorHandler** middleware to catch custom errors and return standard JSON responses:
    ```json
    {
        "status": "error",
        "code": 400,
        "message": "Invalid SKU format",
        "request_id": "abc-123"
    }
    ```
