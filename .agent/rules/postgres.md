---
activates_on: database_changes, schema_design
---
# PostgreSQL Rules

## Multi-Tenancy & Security
-   **Row Level Security (RLS)**: MUST be enabled on all tables containing tenant data.
    ```sql
    ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
    CREATE POLICY project_isolation_policy ON projects
    USING (organization_id = current_setting('app.current_org')::uuid);
    ```
-   **Mandatory Column**: Every table (except dicts/lookup) MUST have `organization_id UUID NOT NULL`.

## Performance
-   **Indexes**: Index `organization_id` on every table.
-   **JSONB**: Use sparingly. Prefer structured columns for queryable metadata.

## Schema Management
-   Use **Go Migrate** or similar standard tool.
-   Never change schema manually in production.
