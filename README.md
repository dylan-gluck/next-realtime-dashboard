# Next.js Realtime Dashboard

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-blue)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

A real-time sales analytics dashboard that processes transactions and provides instant updates using Server-Sent Events (SSE).

## Features

- **Real-time Updates**: Data refreshes instantly using Server-Sent Events without page reloads
- **Transaction Management**: Add new sales transactions through an intuitive form
- **Analytics Dashboard**: View key metrics like total revenue and transaction count
- **Customer Filtering**: Filter transactions by customer name
- **Responsive Design**: Works on all device sizes with adaptive UI

## Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) with App Router and React 19
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) with [Tailwind CSS](https://tailwindcss.com/)
- **Real-time Updates**: Server-Sent Events (SSE)
- **State Management**: React Hooks with custom `useSSE` hook
- **Database**: SQLite with Prisma ORM
- **Type Safety**: TypeScript with Zod validation
- **Development**: Turbopack for fast refresh

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v9.15 or newer)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dylan-gluck/next-realtime-dashboard.git
   cd next-realtime-dashboard
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the database:
   ```bash
   pnpm db:seed
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/
├── prisma/        # Prisma ORM files
│   ├── schema.prisma # Database schema
│   └── seed.js    # Database seeding script
├── public/        # Static assets
├── src/
│   ├── app/       # Next.js App Router pages
│   │   ├── api/   # API routes for SSE, transactions, and analytics
│   │   ├── new/   # Add transaction page
│   │   └── page.tsx # Dashboard page
│   ├── components/ # UI components
│   │   ├── app/   # Application components
│   │   ├── dashboard/ # Dashboard-specific components
│   │   └── ui/   # Shadcn UI components
│   ├── hooks/    # Custom React hooks
│   │   └── useSSE.ts # SSE connection management hook
│   └── lib/      # Shared utilities and types
│       ├── prisma.ts # Prisma client
│       ├── sse.ts # SSE utility functions
│       ├── transactions.ts # Transaction operations
│       └── types.ts # TypeScript types
└── ...           # Config files
```

## API Routes

The application provides the following API endpoints:

- **GET /api/events**: SSE endpoint for real-time update notifications
- **GET /api/transactions**: Endpoint to fetch all transactions
- **GET /api/analytics**: Endpoint to fetch analytics data
- **POST /api/transaction**: Endpoint to add new transactions

## Usage

### Viewing the Dashboard

The main dashboard page displays:
- Total revenue
- Number of transactions
- Transaction table with customer filtering

### Adding Transactions

1. Navigate to the "New Transaction" page
2. Fill in customer name, amount, and select currency
3. Click "Add" to submit the transaction
4. The dashboard will update in real-time with the new data

## Development Commands

```bash
# Start development server with Turbopack
pnpm dev

# Build the application
pnpm build

# Start the production server
pnpm start

# Run linting
pnpm lint

# Seed the database
pnpm db:seed

# Open Prisma Studio database UI
pnpm prisma:studio
```

## Data Model

### Transaction

```typescript
model Transaction {
  id           String   @id @default(uuid())
  date         DateTime @default(now())
  customerName String
  amount       Float
  currency     String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Analytics

```typescript
interface Analytics {
  totalRevenue: number;
}
```

## Architecture

The application follows a client-server architecture with real-time communication:

1. **Server-Side**:
   - API routes handle SSE connections, data fetching, and transaction submission
   - Prisma ORM with SQLite database maintains transaction data
   - SSE client connections are managed separately from data storage
   - Analytics are calculated server-side with database queries
   - Input validation with Zod ensures data integrity

2. **Client-Side**:
   - Custom `useSSE` hook manages the EventSource connection and data fetching
   - React components render and update based on real-time data
   - Client-side filtering for transactions

3. **Real-time Flow**:
   - Client establishes SSE connection to `/api/events`
   - Client fetches initial data from `/api/transactions` and `/api/analytics` on page load
   - Server only sends lightweight update notifications with timestamps via SSE
   - When a notification is received, client fetches fresh data from the API
   - New transactions are stored in the database and trigger update notifications to all connected clients
   - UI components re-render with fresh data without page reloads

## Future Improvements

- [x] Add Zod validation for form inputs and API requests
- [x] Implement persistent storage with a local database (SQLite + Prisma)
- [x] Refactor SSE to send lightweight notifications instead of full state
- [ ] Implement reconnection strategy for SSE with exponential backoff
- [ ] Implement currency conversion for multi-currency transactions
- [ ] Add more analytics metrics and visualizations
- [ ] Add pagination for large transaction lists
- [ ] Implement unit and integration tests

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
- [Zod](https://zod.dev/)