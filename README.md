<div align="center">

# 🚀 TechSphere

### **A Modern Full-Stack E-Commerce Platform**

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.2-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**TechSphere** is a feature-rich, production-ready e-commerce platform for tech gadgets and electronics. It includes a polished customer-facing storefront, a comprehensive admin dashboard, Stripe-powered payments, JWT-less authentication, and real-time inventory management — all built with a modern TypeScript stack.

[🛒 Live Demo](#) · [📖 Documentation](#-project-structure) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

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

### 🔐 Authentication
| Feature | Description |
|---------|-------------|
| **Sign Up / Sign In** | Email + password auth with bcrypt hashing |
| **Persistent Sessions** | LocalStorage-based session management |
| **Protected Routes** | Admin routes gated by authentication |
| **Error Handling** | Animated error toasts with auto-clear |

### 📊 Admin Dashboard
| Feature | Description |
|---------|-------------|
| **Overview Analytics** | Revenue, orders, visitors, and stock alert cards |
| **Inventory Management** | Full product CRUD with add/edit capabilities |
| **Order Tracking** | Order history with status badges (Delivered, Processing, Shipped) |
| **Customer Directory** | User management panel |
| **Settings** | Admin profile and API configuration |
| **Trending Products** | Real-time click-based trending analytics |
| **Stock Alerts** | Out-of-stock and low-stock warning panels |

---

## 🏗️ Tech Stack

### Frontend (`/dashboard`)

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript 5.8** | Type-safe development |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **React Router 7** | Client-side routing |
| **Zustand 5** | Lightweight state management |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |
| **Stripe React** | Payment UI components |

### Backend (`/backend`)

| Technology | Purpose |
|-----------|---------|
| **Express 5** | Web framework |
| **TypeScript 6** | Type-safe server code |
| **MongoDB 7.2** | Document database (native driver) |
| **Stripe SDK** | Payment processing |
| **bcrypt** | Password hashing |
| **CORS** | Cross-origin resource sharing |
| **tsx** | TypeScript execution (dev) |
| **nodemon** | Hot-reload via `tsx watch` |

### DevOps

| Technology | Purpose |
|-----------|---------|
| **Vercel** | Frontend & backend deployment |
| **Concurrently** | Parallel dev server execution |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
techsphere/
├── 📦 package.json              # Root workspace (concurrently runs both)
├── 📝 README.md
│
├── 🖥️ backend/                   # Express REST API
│   ├── src/
│   │   ├── app.ts               # Express app setup, CORS, routes
│   │   ├── server.ts            # Server bootstrap & DB connection
│   │   ├── config/
│   │   │   └── db.ts            # MongoDB connection singleton
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts # Auth & admin guards
│   │   ├── modules/
│   │   │   ├── auth/            # Signup/signin (controller, service, routes, model)
│   │   │   ├── products/        # Product CRUD (controller, service, routes, model)
│   │   │   ├── cart/            # Cart management (controller, service, routes, model)
│   │   │   ├── payments/        # Stripe integration (controller, routes)
│   │   │   ├── orders/          # Order management (placeholder)
│   │   │   └── admin/           # Admin-specific endpoints (placeholder)
│   │   ├── services/            # Shared services
│   │   └── utils/               # Utilities
│   ├── .env                     # Environment config (gitignored)
│   ├── vercel.json              # Vercel serverless config
│   └── tsconfig.json
│
├── 🎨 dashboard/                 # React SPA (Vite)
│   ├── index.html               # HTML entry point
│   ├── src/
│   │   ├── App.tsx              # Root component
│   │   ├── main.tsx             # React DOM mount
│   │   ├── index.css            # Global styles
│   │   ├── routes/
│   │   │   └── index.tsx        # Route definitions (storefront + admin)
│   │   ├── layouts/
│   │   │   ├── StoreLayout.tsx  # Customer layout (navbar, footer)
│   │   │   └── AdminLayout.tsx  # Admin layout (sidebar, header)
│   │   ├── pages/
│   │   │   ├── Home.tsx         # Hero + trending products
│   │   │   ├── Catalog.tsx      # Product listing with filters
│   │   │   ├── ProductDetail.tsx # Single product view
│   │   │   ├── Cart.tsx         # Shopping cart
│   │   │   ├── Checkout.tsx     # Stripe checkout
│   │   │   ├── Login.tsx        # Authentication (sign in)
│   │   │   ├── Signup.tsx       # Authentication (sign up)
│   │   │   ├── Dashboard.tsx    # Admin overview
│   │   │   ├── Inventory.tsx    # Product management
│   │   │   ├── AddProduct.tsx   # Add new product form
│   │   │   ├── Orders.tsx       # Order management
│   │   │   ├── Customers.tsx    # Customer directory
│   │   │   └── Settings.tsx     # Admin settings
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx # Error boundary wrapper
│   │   │   ├── CheckoutForm.tsx # Stripe checkout form
│   │   │   └── ui/
│   │   │       ├── Button.tsx   # Reusable button component
│   │   │       └── Card.tsx     # Reusable card component
│   │   ├── store/
│   │   │   ├── useAppStore.ts   # Products & cart state (Zustand)
│   │   │   └── useAuthStore.ts  # Auth state (Zustand)
│   │   ├── services/
│   │   │   └── api.ts           # API service layer
│   │   └── utils/               # Utility functions
│   ├── .env                     # Frontend env (gitignored)
│   ├── .env.example             # Template for env variables
│   ├── vite.config.ts           # Vite configuration
│   ├── vercel.json              # SPA rewrite rules
│   └── tsconfig.json
│
└── 📝 .gitignore                # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| **npm** | ≥ 9.x | Comes with Node.js |
| **MongoDB** | Atlas or local | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Stripe Account** | Test mode | [dashboard.stripe.com](https://dashboard.stripe.com/register) |

### 1. Clone the Repository

```bash
git clone https://github.com/chetanb-11/TechSphere.git
cd TechSphere
```

### 2. Install Dependencies

From the project root, install all dependencies for the root workspace, backend, and dashboard:

```bash
# Install root dependencies (concurrently)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../dashboard
npm install

# Return to root
cd ..
```

### 3. Configure Environment Variables

#### Backend (`/backend/.env`)

Create a `.env` file in the `backend/` directory:

```env
PORT=3001
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<appName>
FRONTEND_DOMAIN=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `3001`) |
| `MONGO_URL` | MongoDB Atlas connection string |
| `FRONTEND_DOMAIN` | Allowed CORS origin for the frontend |
| `STRIPE_SECRET_KEY` | Stripe secret key ([get from Stripe Dashboard](https://dashboard.stripe.com/apikeys)) |

#### Frontend (`/dashboard/.env`)

Create a `.env` file in the `dashboard/` directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_API_BASE_URL=http://localhost:3001/api
```

| Variable | Description |
|----------|-------------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key ([get from Stripe Dashboard](https://dashboard.stripe.com/apikeys)) |
| `VITE_API_BASE_URL` | Backend API base URL (optional — defaults to `http://localhost:3001/api`) |

> **💡 Tip:** You can copy the provided template: `cp dashboard/.env.example dashboard/.env`

### 4. Set Up MongoDB

1. **Create a free cluster** on [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create a database** named `ecom`
3. **Create a collection** named `products`
4. **Add your IP** to the Atlas network access whitelist
5. **Copy the connection string** into `backend/.env` as `MONGO_URL`

> **📝 Note:** The backend uses the native MongoDB driver (not Mongoose), connecting to the `ecom` database.

### 5. Run the Application

#### Option A: Run Both Together (Recommended)

From the project root:

```bash
npm run dev
```

This uses `concurrently` to start both servers simultaneously:
- **Backend** → `http://localhost:3001`
- **Frontend** → `http://localhost:3000`

#### Option B: Run Separately

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd dashboard
npm run dev
```

### 6. Open in Browser

Navigate to **[http://localhost:3000](http://localhost:3000)** to view the storefront.

Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)** for the admin dashboard.

---

## 🛣️ Route Map

### Customer Storefront

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero section + trending products |
| `/catalog` | Catalog | Product listing with filters |
| `/product/:id` | Product Detail | Individual product page |
| `/cart` | Cart | Shopping cart & summary |
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

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/signin` | Authenticate a user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get a single product |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update a product |
| `GET` | `/api/search/:query` | Search products by keyword |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cart?userId=<id>` | Get cart items for a user |
| `POST` | `/api/cart/:productId` | Add item to cart |
| `POST` | `/api/cart/removecartitem/:productId` | Remove item from cart |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/payments/create-payment-intent` | Create Stripe payment intent |

---

## 🧪 Development

### Available Scripts

#### Root (`/`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Run backend + frontend concurrently |
| `backend` | `npm run backend` | Run backend only |
| `dashboard` | `npm run dashboard` | Run frontend only |

#### Backend (`/backend`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start with hot-reload (`tsx watch`) |
| `build` | `npm run build` | Build for production |
| `start` | `npm run start` | Run production build |

#### Frontend (`/dashboard`)

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
npm run preview   # Preview the build at http://localhost:4173

# Backend
cd backend
npm run build
npm run start
```

---

## ☁️ Deployment

Both the frontend and backend are configured for **Vercel** deployment.

### Frontend (Dashboard)

1. Import the `dashboard/` directory as a new Vercel project
2. Set **Framework Preset** to `Vite`
3. Add environment variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `VITE_API_BASE_URL` (your deployed backend URL)
4. The `vercel.json` rewrites are already configured for SPA routing

### Backend

1. Import the `backend/` directory as a new Vercel project
2. Vercel will auto-detect the serverless function at `src/app.ts`
3. Add environment variables:
   - `PORT`
   - `MONGO_URL`
   - `FRONTEND_DOMAIN` (your deployed frontend URL)
   - `STRIPE_SECRET_KEY`
4. The `vercel.json` routes all requests to `src/app.ts`

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code patterns and file structure
- Use TypeScript for all new code
- Follow the modular structure (`controller → service → model → routes`)
- Write descriptive commit messages
- Ensure no TypeScript errors: `cd dashboard && npm run lint`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Chetan B](https://github.com/chetanb-11)**

⭐ Star this repo if you found it helpful!

</div>
