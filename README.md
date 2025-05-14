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
- **Type Safety**: TypeScript with planned Zod validation
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

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/
├── public/         # Static assets
├── src/
│   ├── app/        # Next.js App Router pages
│   │   ├── api/    # API routes for SSE and transactions
│   │   ├── new/    # Add transaction page
│   │   └── page.tsx # Dashboard page
│   ├── components/ # UI components
│   │   ├── app/    # Application components
│   │   ├── dashboard/ # Dashboard-specific components
│   │   └── ui/    # Shadcn UI components
│   ├── hooks/     # Custom React hooks
│   │   └── useSSE.ts # SSE connection management hook
│   └── lib/       # Shared utilities and types
└── ...            # Config files
```

## API Routes

The application provides two main API endpoints:

- **GET /api/events**: SSE endpoint for real-time updates
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
```

## Data Model

### Transaction

```typescript
interface Transaction {
  id: string;
  date: Date;
  customerName: string;
  amount: number;
  currency: string;
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
   - API routes handle SSE connections and transaction submission
   - In-memory storage maintains transaction data (planned to be updated to a local DB)
   - Analytics are calculated server-side

2. **Client-Side**:
   - Custom `useSSE` hook manages the EventSource connection
   - React components render and update based on real-time data
   - Client-side filtering for transactions

3. **Real-time Flow**:
   - Client establishes SSE connection to `/api/events`
   - Server sends initial state and maintains connection
   - New transactions trigger updates to all connected clients
   - UI components re-render with fresh data without page reloads

## Future Improvements

- [ ] Add Zod validation for form inputs and API requests
- [ ] Implement persistent storage with a local database
- [ ] Implement currency conversion for multi-currency transactions
- [ ] Add more analytics metrics and visualizations

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
