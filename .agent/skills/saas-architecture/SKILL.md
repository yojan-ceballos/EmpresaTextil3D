---
name: saas-architecture
description: Logic for subscriptions, credits, and SaaS business rules.
---
# SaaS Architecture Skill

This skill governs the business model implementation: Subscriptions, Usage Credits, and Tiers.

## Business Model
-   **Subscriptions**: Monthly/Yearly fee for platform access + base features.
    -   *Tiers*: Starter, Pro, Enterprise.
-   **Usage Credits**: "Compute Units" for processing 3D assets.
    -   Uploading a simple GLB = Low cost.
    -   Complex format conversion / Optimization = High cost.

## Credit System Logic
-   **Pre-Check**: Before ANY asset processing starts, the system checks `RemainingCredits >= EstimatedCost`.
-   **Atomic Deduction**: Credit deduction must be transactional.
    -   1. Start DB Transaction.
    -   2. Lock Wallet row (`SELECT FOR UPDATE`).
    -   3. Deduct Credits.
    -   4. Create usage ledger entry.
    -   5. Commit.
-   **Refunds**: If processing fails (system error), credits are refunded automatically.

## Feature Gating
-   Use **Feature Flags** linked to Subscription Tiers.
    -   Example: `Pro` tier gets "4K Texture Export". `Starter` gets "2K Limit".
-   The Backend `usecase` layer checks these flags.

## Interactions
-   **Backend**: `backend-fiber` services call this skill's logic for quota checks.
-   **Python-data-ai**: Reports actual compute usage back to the SaaS ledger for auditing.
