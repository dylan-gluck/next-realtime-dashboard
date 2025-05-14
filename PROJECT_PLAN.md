# Next.js Realtime Dashboard Demo

## Objective

Build a Real-Time Sales Analytics Dashboard that processes transactions and provides real-time analytics.

### Requirements

#### 1. User Interface

Dashboard Page
- Displays a table of sales transactions with columns:
- Date, Customer Name, Amount
- A search bar(s) to filter transactions by Customer Name
- Displays real-time analytics (e.g., total revenue)

Add Transaction Page
- Form to create a new transaction:
- Fields: Customer Name, Amount, Currency

#### 2. Real-Time Updates

Broadcast new transactions and analytics from the backend to the frontend. The real-time analytics must be updated without refreshing the page.

- Total Revenue
- Sum of all transactions

---

## Approach

Stack:
*Next.js* App router, SSR
*Hono* API, SSE
*Zod* Validation, Type safety
*Shadcn/ui* Base components

### Questions & Assumptions

How should data be stored, retreived, persisted in the backend?
- Start with in-memory, Update to use local DB

How should data be fetched / loaded in the front-end?
- Initial load, SSR -- Interface + existing transactions
- Subscribe to SSE endpoint for real-time updates
- Use next `use` hook + Suspense

Transactions appear to have different currencies, total revinue would be in a single currency.
- Start with just a sum of Transactions
- Look into converting to base currency?

### TODO:

- [x] Project Plan
- [x] Init Next, TW, Shadcn
- [x] Project structure, Types
- [x] Dashboard Basic UI
- [x] API routes
  - [x] API route GET `/events` (SSE)
  - [x] API route POST `/transactions`
- [x] Dashboard UI Refactor
- [x] Add transaction form
- [ ] Zod validation

---

### Key Decisions & Trade-offs

When starting the project I considered websockets and SSE, but decided to go with SSE because data was only flowing in one direction.

I build the original API using Hono, however was running into issues with the SSE implementation and spent most of my time debugging connection issues. I ended up ditching Hono and wrote a custom implementation of the SSE endpoint which worked as expected.

The goal was to swap out the in-memory store for a DB. With more time I would implement DuckDB and utilize their analytics queries to do most of the calculations. This would also improve the separation of concerns in the backend.
