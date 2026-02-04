---
activates_on: backend_fiber_development
---
# Backend-Fiber Rules

## Orchestration
-   **Skill Reference**: Follow `.agent/skills/backend-fiber/SKILL.md`.

## Fiber Specifics
-   **Locals**: Use `c.Locals()` ONLY for request-scoped infrastructure data (UserID, TenantID, TraceID). NEVER for passing business data between implementation layers.
-   **BodyParser**: Always check error on `c.BodyParser()`.
-   **Routing**: Group routes by Feature, then version. `api/v1/products/...`.

## Service Boundaries
### FLOW-SERVICE
-   **Can**: Access `products`, `orders`, `customers` tables.
-   **Cannot**: Import 3D libraries, Process GLB files directly.
-   **Must**: Delegate 3D tasks to ATLAS via Event Bus or API.

### ATLAS-SERVICE
-   **Can**: Access `assets`, `avatars`, `materials` tables.
-   **Cannot**: Calculate cart totals, manage billing subscriptions (check only).
-   **Must**: Expose optimized assets to FLOW.

## Performance
-   **Prefork**: Enable `Prefork: true` in production for high concurrency.
-   **JSON**: Use `goccy/go-json` if extremely high throughput is required.
