<div align="center">

# 🚀 TechSphere

### A Modern Full-Stack E-Commerce Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A feature-rich, production-ready e-commerce platform for tech gadgets and electronics — complete with a customer-facing storefront, an admin dashboard, Stripe-powered payments, JWT authentication, and real-time inventory management.

[🛒 Live Demo](#) · [📖 Documentation](#-project-structure) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## 🎯 Key Highlights

| | Highlight |
|:---:|:---|
| 🏗️ | **Clean Architecture** — Modular backend with `controller → service → model → routes` separation |
| 🔒 | **JWT Auth with RBAC** — Role-based access control (admin / user / guest) with bcrypt password hashing |
| 💳 | **Stripe Integration** — End-to-end payment flow using Stripe Elements and Payment Intents |
| 📦 | **Native MongoDB Driver** — Direct MongoDB usage (no ORM) for fine-grained query control |
| ⚡ | **Modern Tooling** — React 19 + Vite 6 + TypeScript 6 + Tailwind CSS 4 + Zustand 5 |
| 🚀 | **Production Deployed** — Both frontend and backend deployed on Vercel with serverless functions |
| 📊 | **Full Admin Dashboard** — Analytics, inventory CRUD, order tracking, customer management |

---

## 🏛️ Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │          React 19 SPA  ·  Vite 6  ·  Tailwind CSS 4       │  │
│  │                                                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────────────┐  │  │
│  │  │  Zustand  │  │  Router  │  │   Stripe Elements UI    │  │  │
│  │  │  Stores   │  │  v7      │  │   (Payment Forms)       │  │  │
│  │  └────┬─────┘  └────┬─────┘  └───────────┬─────────────┘  │  │
│  │       └──────────────┼────────────────────┘                │  │
│  │                      │ fetch()                             │  │
│  └──────────────────────┼─────────────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────────────┘
                          │ HTTPS (REST API)
┌─────────────────────────┼────────────────────────────────────────┐
│                    Express 5  ·  TypeScript 6                    │
│                                                                  │
│  ┌──────────┐  ┌──────────────────────────────────────────────┐  │
│  │   CORS   │  │                 Modules                      │  │
│  │ Middleware│  │  ┌──────┐ ┌──────────┐ ┌──────┐ ┌────────┐  │  │
│  └────┬─────┘  │  │ Auth │ │ Products │ │ Cart │ │Payments│  │  │
│       │        │  └──┬───┘ └────┬─────┘ └──┬───┘ └───┬────┘  │  │
│  ┌────┴─────┐  └────┼──────────┼──────────┼─────────┼────────┘  │
│  │   JWT    │       │          │          │         │            │
│  │  Guard   │───────┤          │          │         │            │
│  └──────────┘       │          │          │         │            │
│                     ▼          ▼          ▼         ▼            │
│               ┌──────────┐              ┌──────────────┐        │
│               │ MongoDB  │              │  Stripe API  │        │
│               │  7.2     │              │  (Payments)  │        │
│               └──────────┘              └──────────────┘        │
└──────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🛍️ Customer Storefront

| Feature | Description |
|---------|-------------|
| **Hero Section** | Dynamic featured product showcase with gradient overlays and CTAs |
| **Product Catalog** | Filterable grid with category & stock filters |
| **Product Detail** | Full product view with "Add to Cart" |
| **Shopping Cart** | Real-time cart management with quantity controls |
| **Stripe Checkout** | Secure payment processing via Stripe Elements |
| **Search** | Client-side + API-backed product search with fallback |
| **Skeleton Loading** | Polished loading states across all pages |
| **Responsive Design** | Fully mobile-first responsive layout |

### 🔐 Authentication & Authorization

| Feature | Description |
|---------|-------------|
| **Sign Up / Sign In** | Email + password auth with bcrypt hashing |
| **JWT Tokens** | Stateless authentication with 1-hour token expiry |
| **Role-Based Access** | Admin, user, and guest roles with middleware guards |
| **Protected Routes** | Backend routes gated by `requireSignin` and `checkAdmin` middleware |
| **Error Handling** | Animated error toasts with contextual messages |

### 📊 Admin Dashboard

| Feature | Description |
|---------|-------------|
| **Overview Analytics** | Revenue, orders, visitors, and stock alert cards |
| **Inventory Management** | Full product CRUD with add/edit capabilities |
| **Order Tracking** | Order history with status badges (Delivered, Processing, Shipped) |
| **Customer Directory** | User management panel with role display |
| **Settings** | Admin profile and API configuration |
| **Trending Products** | Real-time click-based trending analytics |
| **Stock Alerts** | Out-of-stock and low-stock warning panels |

---

## 🏗️ Tech Stack

### Frontend — `/dashboard`

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework with hooks and functional components |
| TypeScript | 5.8 | End-to-end type safety |
| Vite | 6 | Lightning-fast build tool & HMR dev server |
| Tailwind CSS | 4 | Utility-first CSS framework |
| React Router | 7 | Declarative client-side routing |
| Zustand | 5 | Lightweight state management (products, cart, auth) |
| Framer Motion | — | Smooth animations & page transitions |
| Stripe React | — | Pre-built payment UI components |
| Lucide React | — | Modern icon library |

### Backend — `/backend`

| Technology | Version | Purpose |
|------------|---------|---------|
| Express | 5 | Minimal web framework for REST APIs |
| TypeScript | 6 | Type-safe server-side development |
| MongoDB | 7.2 | Document database via native driver (no ORM) |
| JSON Web Token | — | Stateless authentication |
| Stripe SDK | 22 | Server-side payment processing |
| bcrypt | 6 | Secure password hashing with salt rounds |
| CORS | — | Configurable cross-origin resource sharing |

### DevOps & Tooling

| Technology | Purpose |
|------------|---------|
| **Vercel** | Serverless deployment for both frontend and backend |
| **Concurrently** | Parallel dev server execution from monorepo root |
| **tsx** | Fast TypeScript execution for development |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
TechSphere/
├── 📦 package.json                 # Root workspace — runs both servers
├── 📝 README.md
│
├── 🖥️  backend/                     # Express REST API
│   ├── src/
│   │   ├── app.ts                  # Express app setup, CORS, route mounting
│   │   ├── server.ts               # Server bootstrap & DB connection
│   │   ├── config/
│   │   │   └── db.ts               # MongoDB connection singleton
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts   # JWT verification & admin guards
│   │   ├── modules/
│   │   │   ├── auth/               # Auth (controller · service · model · routes)
│   │   │   ├── products/           # Products CRUD (controller · service · model · routes)
│   │   │   ├── cart/               # Cart management (controller · service · model · routes)
│   │   │   ├── payments/           # Stripe integration (controller · routes)
│   │   │   ├── orders/             # Order management
│   │   │   └── admin/              # Admin-specific endpoints
│   │   ├── services/               # Shared business logic
│   │   └── utils/                  # Utility functions
│   ├── vercel.json                 # Vercel serverless config
│   └── tsconfig.json
│
├── 🎨 dashboard/                    # React SPA (Vite)
│   ├── index.html                  # HTML entry point
│   ├── src/
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # React DOM mount
│   │   ├── index.css               # Global styles
│   │   ├── routes/
│   │   │   └── index.tsx           # Route definitions (storefront + admin)
│   │   ├── layouts/
│   │   │   ├── StoreLayout.tsx     # Customer layout (navbar, footer)
│   │   │   └── AdminLayout.tsx     # Admin layout (sidebar, header)
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Hero + trending products
│   │   │   ├── Catalog.tsx         # Product listing with filters
│   │   │   ├── ProductDetail.tsx   # Single product view
│   │   │   ├── Cart.tsx            # Shopping cart
│   │   │   ├── Checkout.tsx        # Stripe checkout
│   │   │   ├── Login.tsx           # Sign in page
│   │   │   ├── Signup.tsx          # Sign up page
│   │   │   ├── Dashboard.tsx       # Admin overview
│   │   │   ├── Inventory.tsx       # Product management
│   │   │   ├── AddProduct.tsx      # Add new product form
│   │   │   ├── Orders.tsx          # Order management
│   │   │   ├── Customers.tsx       # Customer directory
│   │   │   └── Settings.tsx        # Admin settings
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx   # Error boundary wrapper
│   │   │   ├── CheckoutForm.tsx    # Stripe checkout form
│   │   │   └── ui/                 # Reusable UI components (Button, Card)
│   │   ├── store/
│   │   │   ├── useAppStore.ts      # Products & cart state (Zustand)
│   │   │   └── useAuthStore.ts     # Auth state (Zustand)
│   │   ├── services/
│   │   │   └── api.ts              # Centralized API service layer
│   │   └── utils/                  # Utility functions
│   ├── .env.example                # Environment variable template
│   ├── vite.config.ts              # Vite configuration
│   ├── vercel.json                 # SPA rewrite rules
│   └── tsconfig.json
│
└── 📝 .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Link |
|------|---------|------|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| npm | ≥ 9.x | Comes with Node.js |
| MongoDB | Atlas or local | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| Stripe Account | Test mode | [dashboard.stripe.com](https://dashboard.stripe.com/register) |

### 1. Clone the Repository

```bash
git clone https://github.com/chetanb-11/TechSphere.git
cd TechSphere
```

### 2. Install Dependencies

```bash
# Install root dependencies (concurrently)
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../dashboard && npm install

# Return to root
cd ..
```

### 3. Configure Environment Variables

#### Backend — `backend/.env`

```env
PORT=3001
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appName>
FRONTEND_DOMAIN=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
JWT_SECRET=your_jwt_secret_key_here
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `3001`) |
| `MONGO_URL` | MongoDB Atlas connection string |
| `FRONTEND_DOMAIN` | Allowed CORS origin for the frontend |
| `STRIPE_SECRET_KEY` | Stripe secret key — [Get from Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |

#### Frontend — `dashboard/.env`

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_API_BASE_URL=http://localhost:3001/api
```

| Variable | Description |
|----------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key — [Get from Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `VITE_API_BASE_URL` | Backend API base URL (defaults to `http://localhost:3001/api`) |

> **💡 Tip:** Copy the template to get started quickly: `cp dashboard/.env.example dashboard/.env`

### 4. Set Up MongoDB

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database named **`ecom`**
3. Create collections: **`products`**, **`user`**, **`cart`**
4. Add your IP to the Atlas network access whitelist
5. Copy the connection string into `backend/.env` as `MONGO_URL`

> **📝 Note:** The backend uses the native MongoDB driver (not Mongoose) for direct database access.

### 5. Run the Application

#### Option A: Run Both Together (Recommended)

```bash
npm run dev
```

This uses `concurrently` to start both servers:

| Service | URL |
|---------|-----|
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Backend | [http://localhost:3001](http://localhost:3001) |

#### Option B: Run Separately

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd dashboard && npm run dev
```

### 6. Open in Browser

| Page | URL |
|------|-----|
| 🛒 Storefront | [http://localhost:3000](http://localhost:3000) |
| 📊 Admin Dashboard | [http://localhost:3000/admin](http://localhost:3000/admin) |

---

## 🛣️ Route Map

### Customer Storefront

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero section + trending products |
| `/catalog` | Catalog | Product listing with filters |
| `/product/:id` | Product Detail | Individual product page |
| `/cart` | Cart | Shopping cart & order summary |
| `/checkout` | Checkout | Stripe payment flow |
| `/login` | Login | Sign in page |
| `/signup` | Signup | Create account page |

### Admin Console

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Analytics overview |
| `/admin/inventory` | Inventory | Product management |
| `/admin/inventory/add` | Add Product | Create new product form |
| `/admin/orders` | Orders | Order history & fulfillment |
| `/admin/customers` | Customers | User directory |
| `/admin/settings` | Settings | Admin profile & API config |

---

## 🔌 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/signup` | — | Register a new user |
| `POST` | `/api/auth/signin` | — | Authenticate and receive JWT |
| `GET` | `/api/auth/user` | Admin | Get all users |
| `GET` | `/api/auth/user/:id` | JWT | Get user by ID |

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/products` | — | List all products |
| `GET` | `/api/products/:id` | — | Get single product |
| `POST` | `/api/products` | JWT | Create a new product |
| `PUT` | `/api/products/:id` | JWT | Update a product |
| `GET` | `/api/products/search/:query` | — | Search products by keyword |

### Cart

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/cart?userId=<id>` | JWT | Get cart items for a user |
| `POST` | `/api/cart/:productId` | JWT | Add item to cart |
| `PATCH` | `/api/cart/:cartItemId` | JWT | Update item quantity |
| `POST` | `/api/cart/removecartitem/:productId` | JWT | Remove item from cart |

### Payments

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/payments/create-payment-intent` | JWT | Create Stripe payment intent |

---

## 🧪 Development

### Available Scripts

**Root** — run from project root:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Run backend + frontend concurrently |
| `backend` | `npm run backend` | Run backend only |
| `dashboard` | `npm run dashboard` | Run frontend only |

**Backend** — `cd backend`:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start with hot-reload (`tsx watch`) |
| `build` | `npm run build` | Build for production |
| `start` | `npm run start` | Run production build |

**Frontend** — `cd dashboard`:

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server on port 3000 |
| `build` | `npm run build` | Production build |
| `preview` | `npm run preview` | Preview production build |
| `lint` | `npm run lint` | TypeScript type-checking |
| `clean` | `npm run clean` | Remove dist & build artifacts |

### Building for Production

```bash
# Frontend
cd dashboard
npm run build
npm run preview     # Preview at http://localhost:4173

# Backend
cd backend
npm run build
npm run start
```

---

## ☁️ Deployment

Both services are configured for **Vercel** deployment.

### Frontend

1. Import `dashboard/` as a Vercel project
2. Set **Framework Preset** → `Vite`
3. Add environment variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_API_BASE_URL` → your deployed backend URL
4. `vercel.json` handles SPA routing rewrites automatically

### Backend

1. Import `backend/` as a Vercel project
2. Vercel auto-detects the serverless entry at `src/app.ts`
3. Add environment variables:
   - `PORT`, `MONGO_URL`, `JWT_SECRET`
   - `FRONTEND_DOMAIN` → your deployed frontend URL
   - `STRIPE_SECRET_KEY`
4. `vercel.json` routes all requests to `src/app.ts`

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch — `git checkout -b feature/amazing-feature`
3. **Commit** your changes — `git commit -m 'Add amazing feature'`
4. **Push** to the branch — `git push origin feature/amazing-feature`
5. **Open** a Pull Request

**Guidelines:**
- Follow the existing modular structure (`controller → service → model → routes`)
- Use TypeScript for all new code
- Ensure no type errors — `cd dashboard && npm run lint`
- Write descriptive commit messages

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Chetan B](https://github.com/chetanb-11)**

⭐ Star this repo if you found it helpful!

</div>
