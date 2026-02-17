# Inventory Management System

A modern, full-stack inventory management application built with Next.js 16, featuring real-time analytics, stock tracking, and comprehensive product management capabilities.

## Features

### Dashboard
- **Key Metrics**: Real-time display of total products, inventory value, and low stock alerts
- **Product Trends**: Weekly product addition tracking with interactive charts
- **Stock Level Monitoring**: Visual indicators for stock status (in-stock, low-stock, out-of-stock)
- **Efficiency Analytics**: Percentage-based inventory health visualization

### Inventory Management
- **Product Tracking**: Complete CRUD operations for products
- **Search & Filter**: Fast product search by name with case-insensitive matching
- **Pagination**: Efficient navigation through large product catalogs
- **Stock Alerts**: Configurable low-stock thresholds per product
- **SKU Management**: Unique SKU tracking for each product

### Authentication
- **Secure Access**: User authentication powered by Stack Auth
- **User Isolation**: Each user's inventory is completely isolated
- **Session Management**: Persistent login sessions across page visits

## Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org) with App Router
- **Runtime**: React 19.2.4
- **Database**: PostgreSQL with [Prisma ORM 7.4.0](https://www.prisma.io/)
- **Styling**: [Tailwind CSS 4.1.18](https://tailwindcss.com/)
- **Charts**: [Recharts 3.7.0](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Stack Auth 2.8.67](https://stack-auth.com/)
- **Language**: TypeScript 5.9.3

## Project Structure

```
├── app/
│   ├── components/         # Reusable UI components
│   │   ├── Sidebar.tsx    # Navigation sidebar
│   │   ├── Pagination.tsx # Pagination controls
│   │   └── ProductChart.tsx # Weekly product chart
│   ├── dashboard/         # Dashboard page
│   ├── inventory/         # Inventory management page
│   ├── lib/              # Utility functions and configs
│   │   ├── actions/      # Server actions
│   │   ├── auth.ts       # Authentication utilities
│   │   └── prisma.ts     # Prisma client instance
│   ├── handler/          # Stack Auth handler
│   └── generated/        # Prisma generated types
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Database migrations
│   └── seed.ts          # Database seeding script
└── stack/               # Stack Auth configuration
```

## Database Schema

### Product Model
- `id` (String): Unique CUID identifier
- `userId` (String): Stack Auth user ID for data isolation
- `name` (String): Product name
- `sku` (String?): Optional unique stock keeping unit
- `price` (Decimal): Product price with 2 decimal precision
- `quantity` (Int): Current stock quantity
- `lowStockAt` (Int?): Optional low stock threshold
- `createdAt` (DateTime): Record creation timestamp
- `updatedAt` (DateTime): Last update timestamp

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- PostgreSQL database
- Stack Auth account ([sign up here](https://stack-auth.com/))

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nextjs-fullstack
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-publishable-key"
   STACK_SECRET_SERVER_KEY="your-stack-secret-key"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. (Optional) Seed the database with sample data:

   ```bash
   npx prisma db seed
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Pages

- `/` - Landing page with authentication redirect
- `/dashboard` - Main dashboard with analytics and metrics
- `/inventory` - Product management and search interface
- `/sign-in` - Authentication page
- `/settings` - User settings (if applicable)

## Development

This project uses:
- TypeScript for type safety
- Prisma for type-safe database access
- Server Components for optimal performance
- Server Actions for data mutations
- Tailwind CSS for styling

## License

This project is private and not licensed for public use.
