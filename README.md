# Inventory Management System

A modern, full-stack inventory management application built with Next.js 16, featuring real-time analytics, stock tracking, and product management capabilities.

## Features

### Dashboard

- **Key Metrics**: Real-time display of total products, total inventory value, and low-stock alert count (products with quantity ≤ 5)
- **Product Trends**: 12-week rolling chart of newly added products
- **Stock Level Monitor**: Lists the 5 most recently added products with color-coded stock status (in-stock / low-stock / out-of-stock)
- **Efficiency Widget**: Percentage-based inventory health breakdown (in-stock / low-stock / out-of-stock)

### Inventory Management

- **Product Listing**: View all products in a paginated table (5 items per page)
- **Search**: Case-insensitive product search by name (URL-based, works with pagination)
- **Add Product**: Create new products via server action with Zod validation
- **Delete Product**: Remove products directly from the inventory table
- **SKU Tracking**: Optional unique SKU per product
- **Low-Stock Threshold**: Optional per-product `lowStockAt` threshold, displayed in the table

> **Note:** Edit/Update functionality is not yet implemented. The `/add-product` and `/settings` routes are defined in the sidebar but their pages are not yet implemented.

### Authentication

- **Secure Access**: User authentication powered by Stack Auth
- **User Isolation**: Each user's inventory data is completely isolated by `userId`
- **Session Management**: Persistent login sessions via Next.js cookies
- **Sign-in Page**: Rendered using Stack Auth's built-in `<SignIn />` component

## Tech Stack

| Layer          | Technology                                                                             |
| -------------- | -------------------------------------------------------------------------------------- |
| Framework      | [Next.js 16.1.6](https://nextjs.org) with App Router                                   |
| Runtime        | React 19.2.4                                                                           |
| Language       | TypeScript 5.9.3                                                                       |
| Database       | PostgreSQL                                                                             |
| ORM            | [Prisma 7.4.0](https://www.prisma.io/) with `@prisma/adapter-pg` (driver adapter mode) |
| Validation     | [Zod 4.x](https://zod.dev/)                                                            |
| Styling        | [Tailwind CSS 4.1.18](https://tailwindcss.com/)                                        |
| Charts         | [Recharts 3.7.0](https://recharts.org/)                                                |
| Icons          | [Lucide React](https://lucide.dev/)                                                    |
| Authentication | [Stack Auth (@stackframe/stack) 2.8.67](https://stack-auth.com/)                       |

## Project Structure

```
├── app/
│   ├── components/            # Reusable UI components
│   │   ├── Sidebar.tsx        # Navigation sidebar with Stack Auth user button
│   │   ├── Pagination.tsx     # Smart pagination with ellipsis support
│   │   └── ProductChart.tsx   # 12-week area chart (Recharts, client component)
│   ├── dashboard/
│   │   └── page.tsx           # Dashboard: metrics, chart, stock levels, efficiency
│   ├── inventory/
│   │   └── page.tsx           # Inventory table: search, list, delete, pagination
│   ├── sign-in/
│   │   └── page.tsx           # Stack Auth sign-in page
│   ├── handler/
│   │   └── [...stack]/        # Stack Auth catch-all route handler
│   ├── lib/
│   │   ├── auth.ts            # getCurrentUser() — redirects to /sign-in if unauthenticated
│   │   ├── prisma.ts          # Prisma client singleton (driver adapter mode)
│   │   └── actions/
│   │       └── products.ts    # Server actions: createProduct, deleteProduct (Zod-validated)
│   ├── generated/
│   │   └── prisma/            # Prisma-generated client (non-standard output path)
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with StackProvider / StackTheme
│   ├── loading.tsx            # React Suspense loading boundary (empty, for Stack Auth)
│   └── page.tsx               # Landing page — redirects authenticated users to /dashboard
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Migration history
│   ├── seed.ts                # Seed script: 55 auto-generated products for one user
│   └── seed_new.ts            # Alternative seed: 55 realistic products for two users
├── stack/
│   ├── client.tsx             # StackClientApp (nextjs-cookie token store)
│   └── server.tsx             # StackServerApp (inherits from client app)
├── prisma.config.ts           # Prisma config: schema path, migrations path, seed command
├── next.config.ts             # Next.js config
└── package.json
```

## Database Schema

### Product Model

| Field        | Type             | Notes                                        |
| ------------ | ---------------- | -------------------------------------------- |
| `id`         | `String`         | Primary key, CUID                            |
| `userId`     | `String`         | Stack Auth user ID — used for data isolation |
| `name`       | `String`         | Product name                                 |
| `sku`        | `String?`        | Optional, globally unique                    |
| `price`      | `Decimal(12, 2)` | Up to 12 digits, 2 decimal places            |
| `quantity`   | `Int`            | Current stock level, defaults to `0`         |
| `lowStockAt` | `Int?`           | Optional per-product low-stock threshold     |
| `createdAt`  | `DateTime`       | Auto-set on creation                         |
| `updatedAt`  | `DateTime`       | Auto-updated on every write                  |

**Indexes:**

- `(userId, name)` — supports user-scoped name searches
- `(createdAt)` — supports time-series queries on the dashboard

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stack Auth account ([sign up here](https://stack-auth.com/))

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:vavanv/nextjs-fullstack.git
   cd nextjs-fullstack
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the project root:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-publishable-key"
   STACK_SECRET_SERVER_KEY="your-stack-secret-key"
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **(Optional) Seed the database with sample data:**

   The seed command is configured in `prisma.config.ts` and runs via `tsx`:

   ```bash
   npx prisma db seed
   ```

   This runs `prisma/seed.ts`, which creates 55 sample products for a single hard-coded demo user ID. For seeding two users with more realistic product names, run `prisma/seed_new.ts` directly:

   ```bash
   node --import tsx prisma/seed_new.ts
   ```

6. **Start the development server:**

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Build for production                 |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## Pages & Routes

| Route                 | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `/`                   | Landing page — redirects authenticated users to `/dashboard`             |
| `/dashboard`          | Main dashboard: metrics, 12-week product chart, stock levels, efficiency |
| `/inventory`          | Inventory table with search (`?q=`), pagination (`?page=`), and delete   |
| `/sign-in`            | Stack Auth sign-in page                                                  |
| `/add-product`        | ⚠️ Planned — directory exists, page not yet implemented                  |
| `/settings`           | ⚠️ Planned — directory exists, page not yet implemented                  |
| `/handler/[...stack]` | Stack Auth internal route handler                                        |

## Prisma Configuration Notes

- The Prisma client is generated to a **non-standard output path**: `app/generated/prisma/`. This is configured in `schema.prisma` with `output = "../app/generated/prisma"`.
- The project uses **Prisma Driver Adapter mode** (`@prisma/adapter-pg`) instead of the default binary engine. The database URL is read directly from `process.env.DATABASE_URL` at runtime.
- The `prisma.config.ts` file configures the schema path, migrations path, and the seed command (`node --import tsx prisma/seed.ts`).

## Known Limitations

- **No Edit/Update UI**: Products can be created and deleted, but editing existing products is not implemented.
- **`/add-product` page**: The route and server action (`createProduct`) exist, but the form UI page has not been created yet.
- **`/settings` page**: The sidebar links to it but the page has not been created yet.
- **Low-stock count on dashboard**: The "Low Stock" metric card counts products with `quantity ≤ 5` (hardcoded threshold), independent of each product's individual `lowStockAt` value.
- **App metadata**: The root `layout.tsx` still uses the default Next.js metadata (`title: "Create Next App"`).

## License

This project is private and not licensed for public use.
