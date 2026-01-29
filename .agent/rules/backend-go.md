---
activates_on: backend_go_development
---
# Backend-Go Rules

## Orchestration
-   **Skill Reference**: Follow `.agent/skills/Backend-go/SKILL.md` strictly.

## Constraints
-   **No Global State**: Global variables are forbidden to ensure safe concurrent multi-tenancy.
-   **Interface Segregation**: Define interfaces where they are consumed (UseCase layer), not where they are implemented.
-   **Testing**: logic without Unit Tests is NOT considered "Done".

## Critical Paths
-   **Billing**: Any code changing `credits` or `subscription` MUST be reviewed with extreme caution.
