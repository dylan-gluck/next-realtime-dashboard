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
- [ ] Init Next, TW, Shadcn
- [ ] Project structure, Types
- [ ] API route GET `/transactions`
- [ ] API route POST `/transactions`
- [ ] API route GET `/events`
- [ ] Dashboard UI
- [ ] Add transaction form
