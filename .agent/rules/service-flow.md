---
activates_on: flow_service_development
priority: high
---
# FLOW-SERVICE Context

**Role**: Product Data Ingestion, Logic & Analytics.
**Stack**: Go (Fiber) + Python (Polars).

## Responsibilities
1.  **Product Management**: CRUD for SKUs, Prices, Descriptions, Metadata.
2.  **Tenant Logic**: Assigning products to Stores (Organizations).
3.  **Analytics**: Ingesting sales/view data to provide insights.
4.  **Integration**: Syncing with ERPs/Shopify/WooCommerce.

## 🚫 EXPLICIT PROHIBITIONS
-   **NO 3D Processing**: Do not import `trimesh` or `gltf` libraries here.
-   **NO Avatar Logic**: Do not handle "fitting" or "posing".
-   **NO Heavy Assets**: Do not store binary GLB blobs in this DB. Store URLs only.

## Data Domain
-   `products`
-   `categories`
-   `prices`
-   `inventory`
-   `analytics_events`

## Interaction with ATLAS
-   When a user uploads a 3D model, FLOW sends a message to ATLAS: "Process this URL".
-   FLOW waits for ATLAS to confirm: "Asset Ready at URL X".
-   FLOW links the Product ID to the Asset URL.
