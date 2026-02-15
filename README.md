# Inventory Management App

A full-stack inventory management application built with Next.js, Prisma, and Tailwind CSS.

## Features

- **Dashboard**: View key metrics such as total products, total inventory value, and low stock alerts.
- **Inventory Management**: Track product stock levels and values.
- **Authentication**: Secure user authentication using Stack Auth.
- **Responsive Design**: Modern UI built with Tailwind CSS and Lucide React icons.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: [Stack Auth](https://stack-auth.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Stack Auth account

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
   Create a `.env` file in the root directory and add your database URL and Stack Auth keys:

   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   NEXT_PUBLIC_STACK_PROJECT_ID="your-stack-project-id"
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your-stack-publishable-key"
   STACK_SECRET_SERVER_KEY="your-stack-secret-key"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (optional):

   ```bash
   npx prisma db seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
