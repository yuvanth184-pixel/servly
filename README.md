# Servly — Home Services Management System

A full-stack home services management platform with 3 portals (Admin, Customer, Technician), built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, and MySQL/Prisma.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.11 (Turbopack) |
| React | 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + @base-ui/react |
| Animation | Motion (Framer Motion) |
| Icons | Lucide React |
| Database | MySQL (via Homebrew) |
| ORM | Prisma 7.9.0 (@prisma/adapter-mariadb) |
| Auth | Phone + Password (bcryptjs), httpOnly session cookie |
| Payments | Razorpay (UPI, Cards, Netbanking) |
| Toast | Sonner |

## Features

### Customer Portal
- Home page with featured services, categories, quick services, offers, testimonials
- Service listing with detail pages (`/customer/services`, `/customer/services/[slug]`)
- Cart system with CartProvider context
- Bookings management
- Invoices
- Notifications
- Subscription plans (Free / Starter ₹499/mo / Pro ₹999/mo) with Razorpay integration
- Profile page with mobile number display and password reset request
- Settings

### Admin Portal
- Dashboard with stats (customers, bookings, revenue, technicians), revenue chart, recent activity, quick actions
- Customer management (CRUD, view, edit, delete)
- Booking management
- Technician management
- Service management with active/inactive toggle (controls customer visibility)
- Payment tracking
- Subscription management
- Reports
- **User management** — Create users directly (phone, password, name, role), promote/demote roles (Admin / Customer / Technician)
- Profile page
- Settings

### Technician Portal
- Dashboard with job stats, today's schedule, earnings summary, recent reviews
- My Jobs (pending/accepted/completed tabs)
- Earnings (weekly/monthly summaries, payout history)
- Availability management (weekly schedule toggle)
- Notifications
- Referrals
- Profile
- Settings

### Authentication & Authorization
- Phone + password registration and login (Indian numbers, +91)
- **Role-based access control**: Admin, Customer, Technician
- First registered user automatically becomes admin
- Proxy middleware enforces portal access by role (`/admin/*` → admin only, `/customer/*` → customer only, `/technician/*` → technician only)
- Session via httpOnly cookie (7-day expiry)
- Passwords hashed with bcryptjs
- Sign-in/sign-up redirect based on user role and original destination (`?from=` param)

### Payments (Razorpay)
- Three subscription plans: Free, Starter (₹499/mo), Pro (₹999/mo)
- Razorpay checkout modal (UPI, Cards, Netbanking)
- Server-side order creation and HMAC-SHA256 signature verification
- Subscription stored in MySQL via Prisma

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL (via Homebrew on macOS: `brew install mysql && brew services start mysql`)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up MySQL

```bash
mysql -u root -e "CREATE DATABASE servly;"
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

### 4. Run database migrations

```bash
npx prisma db push
npx prisma generate
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | MySQL connection string | `mysql://root:@localhost:3306/servly` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID (server-side) | `rzp_test_xxxxxxxxxxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret (server-side) | `xxxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Key ID (client-side, safe to expose) | `rzp_test_xxxxxxxxxxxxx` |

### Getting Razorpay Keys

1. Sign up at [razorpay.com](https://razorpay.com)
2. Dashboard → **Settings → API Keys → Generate Test Key**
3. Copy the Key ID and Key Secret
4. Add them to `.env`
5. For production, generate **Live Mode** keys and replace the test keys

## Project Structure

```
servly/
├── prisma/
│   └── schema.prisma          # User + Subscription models
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # register, login, logout, me
│   │   │   ├── admin/users/   # Admin user management (GET, POST, PATCH)
│   │   │   ├── customer/      # subscription API
│   │   │   └── razorpay/      # create-order, verify
│   │   ├── admin/             # 11 pages (dashboard, customers, bookings, etc.)
│   │   ├── customer/          # 9 pages (home, services, bookings, subscriptions, etc.)
│   │   ├── technician/        # 10 pages (dashboard, jobs, earnings, etc.)
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── components/
│   │   ├── admin/shared/      # PageHeader, SearchFilter, StatusBadge, ConfirmDialog
│   │   ├── customer/          # RazorpayCheckout, home sections
│   │   ├── shared/layout/     # Navbar, Sidebar, ProfilePage
│   │   └── ui/                # shadcn/ui components
│   ├── context/
│   │   ├── auth-context.tsx   # AuthProvider with signIn, signUp, signOut
│   │   └── service-context.tsx # ServiceProvider with active/inactive toggle
│   ├── lib/
│   │   ├── constants.ts       # Nav items, page titles
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── razorpay.ts        # Razorpay instance + plan configs
│   │   └── utils.ts           # cn() utility
│   ├── data/                  # Mock data for all portals
│   ├── types/                 # TypeScript interfaces
│   └── proxy.ts               # Middleware — auth, role-based access
├── .env                       # Environment variables (not committed)
└── package.json
```

## Default Test Accounts

| Phone | Password | Role |
|---|---|---|
| `9677192579` | `admin123` | Admin |
| `7305028335` | `user123` | Customer |
| `8888888888` | `tech123` | Technician |

**Note:** New accounts can be created via the Admin Users page or the sign-up page. First user to register becomes admin.

## Razorpay Test Cards

| Card | Number | Expiry | CVV | OTP |
|---|---|---|---|---|
| Visa (Indian) | `4111 1111 1111 1111` | Any future | Any | `1234` |
| Mastercard | `5267 3182 4177 0775` | Any future | Any | `1234` |
| RuPay | `6070 1000 2000 0004` | Any future | Any | `1234` |

UPI test: Use `success@razorpay` as UPI ID.

## Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

Private — All rights reserved.
