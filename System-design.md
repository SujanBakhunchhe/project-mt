delete my project# BikeParts Nepal - System Design & Architecture

## 1. System Overview

E-commerce platform for selling bike parts in Nepal.
Built with Next.js (fullstack), MongoDB, Prisma, deployed on Vercel.

---

## 2. Tech Stack

| Layer        | Technology                  | Why                              |
| ------------ | --------------------------- | -------------------------------- |
| Framework    | Next.js 16 (App Router)     | SSR, API routes, fullstack       |
| Language     | TypeScript                  | Type safety                      |
| Database     | MongoDB Atlas (free tier)   | Free 512MB, flexible schema      |
| ORM          | Prisma                      | Type-safe DB queries             |
| Auth         | NextAuth.js v5              | Email + Google login             |
| Styling      | Tailwind CSS 4              | Already installed                |
| UI           | shadcn/ui                   | Pre-built accessible components  |
| Payments     | eSewa + Khalti              | Nepal payment gateways           |
| Images       | Cloudinary (free tier)      | 25GB storage, image optimization |
| Email        | Resend (free tier)          | 3000 emails/month                |
| Hosting      | Vercel (free tier)          | Auto deploy from GitHub          |
| State        | Zustand                     | Lightweight cart state           |

---

## 3. Architecture Diagram

```
┌──────────────────────────────────────────────────────┐
│                      VERCEL                          │
│                                                      │
│  ┌─────────────────────────────────────────────┐     │
│  │              Next.js App                     │     │
│  │                                              │     │
│  │  ┌──────────────┐    ┌───────────────────┐   │     │
│  │  │  Frontend     │    │  API Routes       │   │     │
│  │  │  (React/SSR)  │───▶│  /api/*           │   │     │
│  │  │              │    │                    │   │     │
│  │  │  - Pages     │    │  - /api/products   │   │     │
│  │  │  - Components│    │  - /api/orders     │   │     │
│  │  │  - Layouts   │    │  - /api/auth       │   │     │
│  │  │              │    │  - /api/cart        │   │     │
│  │  │              │    │  - /api/payment     │   │     │
│  │  │              │    │  - /api/admin       │   │     │
│  │  └──────────────┘    └────────┬──────────┘   │     │
│  │                               │               │     │
│  └───────────────────────────────┼───────────────┘     │
│                                  │                     │
└──────────────────────────────────┼─────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
             ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
             │  MongoDB    │ │Cloudinary│ │  Resend    │
             │  Atlas      │ │ (Images) │ │  (Email)   │
             │  (Free)     │ │ (Free)   │ │  (Free)    │
             └─────────────┘ └──────────┘ └────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
             ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
             │   eSewa     │ │  Khalti  │ │   COD      │
             │  Gateway    │ │ Gateway  │ │  (Manual)  │
             └─────────────┘ └──────────┘ └────────────┘
```

---

## 4. Folder Structure

```
project-mt/
├── app/
│   ├── (store)/                    # Customer-facing pages
│   │   ├── page.tsx                # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx            # Product listing
│   │   │   └── [id]/page.tsx       # Product detail
│   │   ├── cart/page.tsx           # Shopping cart
│   │   ├── checkout/page.tsx       # Checkout
│   │   ├── orders/page.tsx         # Order history
│   │   └── orders/[id]/page.tsx    # Order detail
│   │
│   ├── admin/                      # Admin panel
│   │   ├── page.tsx                # Dashboard
│   │   ├── products/
│   │   │   ├── page.tsx            # Manage products
│   │   │   └── [id]/edit/page.tsx  # Edit product
│   │   ├── orders/page.tsx         # Manage orders
│   │   ├── customers/page.tsx      # View customers
│   │   └── inventory/page.tsx      # Stock management
│   │
│   ├── auth/                       # Auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── api/                        # API routes
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── products/route.ts
│   │   ├── orders/route.ts
│   │   ├── cart/route.ts
│   │   ├── payment/
│   │   │   ├── esewa/route.ts
│   │   │   └── khalti/route.ts
│   │   ├── admin/
│   │   │   ├── products/route.ts
│   │   │   ├── orders/route.ts
│   │   │   └── dashboard/route.ts
│   │   └── upload/route.ts
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                         # shadcn components
│   ├── store/                      # Store components
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartItem.tsx
│   │   ├── SearchBar.tsx
│   │   └── Footer.tsx
│   └── admin/                      # Admin components
│       ├── Sidebar.tsx
│       ├── ProductForm.tsx
│       ├── OrderTable.tsx
│       └── StatsCard.tsx
│
├── lib/
│   ├── db.ts                       # Prisma client
│   ├── auth.ts                     # NextAuth config
│   ├── esewa.ts                    # eSewa integration
│   ├── khalti.ts                   # Khalti integration
│   ├── email.ts                    # Resend email
│   ├── cloudinary.ts               # Image upload
│   └── utils.ts                    # Helpers
│
├── store/
│   └── cart.ts                     # Zustand cart store
│
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── seed.ts                     # Seed data
│
├── types/
│   └── index.ts                    # TypeScript types
│
└── public/
    └── images/
```

---

## 5. Database Schema (Prisma + MongoDB)

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// ─── USER ───────────────────────────────────
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId
  name           String
  email          String    @unique
  phone          String?
  password       String?
  image          String?
  role           Role      @default(CUSTOMER)
  emailVerified  DateTime?
  addresses      Address[]
  orders         Order[]
  reviews        Review[]
  wishlist       Wishlist[]
  accounts       Account[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

model Account {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  userId            String  @db.ObjectId
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Address {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  userId      String  @db.ObjectId
  fullName    String
  phone       String
  street      String
  city        String
  district    String
  landmark    String?
  isDefault   Boolean @default(false)
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ─── PRODUCT ────────────────────────────────
model Product {
  id            String       @id @default(auto()) @map("_id") @db.ObjectId
  name          String
  slug          String       @unique
  description   String
  price         Float
  comparePrice  Float?
  images        String[]
  categoryId    String       @db.ObjectId
  category      Category     @relation(fields: [categoryId], references: [id])
  brand         String?
  sku           String?      @unique
  stock         Int          @default(0)
  isActive      Boolean      @default(true)
  tags          String[]
  compatibility String[]     // e.g. ["Honda Shine 2020", "Pulsar 150"]
  reviews       Review[]
  wishlist      Wishlist[]
  orderItems    OrderItem[]
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Category {
  id        String     @id @default(auto()) @map("_id") @db.ObjectId
  name      String     @unique
  slug      String     @unique
  image     String?
  parentId  String?    @db.ObjectId
  products  Product[]
}

// ─── ORDER ──────────────────────────────────
model Order {
  id              String        @id @default(auto()) @map("_id") @db.ObjectId
  orderNumber     String        @unique
  userId          String        @db.ObjectId
  user            User          @relation(fields: [userId], references: [id])
  items           OrderItem[]
  status          OrderStatus   @default(PENDING)
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus @default(UNPAID)
  transactionId   String?
  subtotal        Float
  shippingCost    Float
  total           Float
  shippingAddress Json
  notes           String?
  statusHistory   Json[]        // [{status, timestamp, note}]
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model OrderItem {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  orderId     String  @db.ObjectId
  order       Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String  @db.ObjectId
  product     Product @relation(fields: [productId], references: [id])
  productName String
  price       Float
  quantity    Int
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}

enum PaymentMethod {
  ESEWA
  KHALTI
  COD
}

enum PaymentStatus {
  UNPAID
  PAID
  REFUNDED
  FAILED
}

// ─── REVIEW ─────────────────────────────────
model Review {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id])
  productId String   @db.ObjectId
  product   Product  @relation(fields: [productId], references: [id])
  rating    Int
  comment   String?
  createdAt DateTime @default(now())
}

// ─── WISHLIST ───────────────────────────────
model Wishlist {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id])
  productId String   @db.ObjectId
  product   Product  @relation(fields: [productId], references: [id])
  createdAt DateTime @default(now())

  @@unique([userId, productId])
}
```

---

## 6. User Flows

### 6.1 Customer Shopping Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Homepage │────▶│ Browse   │────▶│ Product  │────▶│ Add to   │
│          │     │ Products │     │ Detail   │     │ Cart     │
└──────────┘     └──────────┘     └──────────┘     └────┬─────┘
                                                        │
                                                        ▼
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ Order    │◀────│ Payment  │◀────│ Checkout │◀────│ View     │
│ Confirm  │     │ (eSewa/  │     │ (Address │     │ Cart     │
│ + Email  │     │  Khalti/ │     │  + Pay)  │     │          │
└──────────┘     │  COD)    │     └──────────┘     └──────────┘
                 └──────────┘
                      │
                      ▼
               ┌──────────┐     ┌──────────┐
               │ Track    │────▶│ Review   │
               │ Order    │     │ Product  │
               └──────────┘     └──────────┘
```

### 6.2 eSewa Payment Flow

```
Customer                    Our Server                  eSewa
   │                            │                         │
   │  1. Click "Pay with eSewa" │                         │
   │───────────────────────────▶│                         │
   │                            │                         │
   │  2. Create order (PENDING) │                         │
   │                            │                         │
   │  3. Redirect to eSewa      │                         │
   │◀───────────────────────────│                         │
   │                            │                         │
   │  4. Pay on eSewa page      │                         │
   │───────────────────────────────────────────────────▶  │
   │                            │                         │
   │  5. eSewa redirects back   │                         │
   │◀──────────────────────────────────────────────────── │
   │                            │                         │
   │  6. Verify payment         │                         │
   │───────────────────────────▶│  7. Verify with eSewa   │
   │                            │────────────────────────▶│
   │                            │  8. Confirmed            │
   │                            │◀────────────────────────│
   │  9. Order confirmed        │                         │
   │◀───────────────────────────│                         │
   │                            │  10. Send email          │
   │◀───────────────────────────│                         │
```

### 6.3 Admin Order Management Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│ New      │────▶│ Confirm  │────▶│ Process  │────▶│ Ship     │
│ Order    │     │ Order    │     │ (Pack)   │     │ Order    │
│ (PENDING)│     │(CONFIRMED│     │(PROCESS) │     │(SHIPPED) │
└──────────┘     └──────────┘     └──────────┘     └────┬─────┘
                                                        │
                                                        ▼
                                                   ┌──────────┐
                                                   │ Delivered│
                                                   │(DELIVERED│
                                                   └──────────┘
     At any point:
     ┌──────────┐     ┌──────────┐
     │ Cancel   │     │ Return   │
     │(CANCELLED│     │(RETURNED)│
     └──────────┘     └──────────┘
```

---

## 7. API Routes

### Products
```
GET    /api/products              → List (with search, filter, pagination)
GET    /api/products/[id]         → Detail
POST   /api/admin/products        → Create (admin)
PUT    /api/admin/products/[id]   → Update (admin)
DELETE /api/admin/products/[id]   → Delete (admin)
GET    /api/categories            → List categories
```

### Auth
```
POST   /api/auth/register         → Register
POST   /api/auth/[...nextauth]    → NextAuth (login, Google, etc.)
```

### Cart (Zustand local + sync for logged-in users)
```
GET    /api/cart                   → Get user cart
POST   /api/cart                   → Sync cart
```

### Orders
```
POST   /api/orders                → Create order
GET    /api/orders                → User's orders
GET    /api/orders/[id]           → Order detail
PUT    /api/admin/orders/[id]     → Update status (admin)
```

### Payment
```
POST   /api/payment/esewa         → Initiate eSewa payment
GET    /api/payment/esewa/verify  → eSewa callback/verify
POST   /api/payment/khalti        → Initiate Khalti payment
POST   /api/payment/khalti/verify → Khalti verify
```

### Admin
```
GET    /api/admin/dashboard       → Stats (revenue, orders, etc.)
GET    /api/admin/orders          → All orders
GET    /api/admin/customers       → All customers
POST   /api/upload                → Upload image to Cloudinary
```

---

## 8. Authentication & Authorization

```
┌─────────────────────────────────────────────┐
│              NextAuth.js v5                  │
│                                              │
│  Providers:                                  │
│  ├── Credentials (email + password)          │
│  └── Google OAuth                            │
│                                              │
│  Session: JWT (stored in cookie)             │
│                                              │
│  Roles:                                      │
│  ├── CUSTOMER → Store pages, own orders      │
│  └── ADMIN   → Admin panel, all operations   │
│                                              │
│  Middleware:                                  │
│  ├── /admin/*  → Requires ADMIN role         │
│  ├── /orders/* → Requires login              │
│  ├── /checkout → Requires login              │
│  └── /api/admin/* → Requires ADMIN role      │
└─────────────────────────────────────────────┘
```

---

## 9. Email Notifications (Resend)

| Trigger              | Recipient | Template                    |
| -------------------- | --------- | --------------------------- |
| Registration         | Customer  | Welcome email               |
| Order placed         | Customer  | Order confirmation + details |
| Order placed         | Admin     | New order alert             |
| Payment received     | Customer  | Payment confirmation        |
| Order shipped        | Customer  | Shipping update + tracking  |
| Order delivered      | Customer  | Delivery confirmation       |
| Order cancelled      | Customer  | Cancellation notice         |
| Return approved      | Customer  | Return instructions         |
| Low stock (< 5)      | Admin     | Stock alert                 |

---

## 10. Pages Overview

### Customer Pages
| Page             | Route              | Description                    |
| ---------------- | ------------------ | ------------------------------ |
| Home             | /                  | Hero, featured, categories     |
| Products         | /products          | Grid + filters + search        |
| Product Detail   | /products/[id]     | Images, specs, reviews, add    |
| Cart             | /cart              | Items, quantity, total          |
| Checkout         | /checkout          | Address, payment method         |
| Orders           | /orders            | Order history list             |
| Order Detail     | /orders/[id]       | Status, items, tracking        |
| Login            | /auth/login        | Email/password + Google        |
| Register         | /auth/register     | Name, email, phone, password   |
| Profile          | /profile           | Edit info, addresses           |

### Admin Pages
| Page             | Route                    | Description              |
| ---------------- | ------------------------ | ------------------------ |
| Dashboard        | /admin                   | Stats, charts, recent    |
| Products         | /admin/products          | List, add, edit, delete  |
| Add Product      | /admin/products/new      | Product form             |
| Edit Product     | /admin/products/[id]/edit| Edit form                |
| Orders           | /admin/orders            | All orders, update status|
| Order Detail     | /admin/orders/[id]       | Full order info          |
| Customers        | /admin/customers         | Customer list            |
| Categories       | /admin/categories        | Manage categories        |
| Inventory        | /admin/inventory         | Stock levels, alerts     |

---

## 11. Shipping Strategy (Nepal)

```
Inside Kathmandu Valley:  NPR 100 (flat rate)
Outside Kathmandu:        NPR 150-250 (by district)
Free shipping:            Orders above NPR 3000
Delivery time:            2-3 days (KTM), 5-7 days (outside)
```

---

## 12. Security Checklist

- [x] Password hashing (bcrypt)
- [x] JWT session with httpOnly cookies
- [x] RBAC middleware on admin routes
- [x] Input validation (zod)
- [x] Rate limiting on auth routes
- [x] CSRF protection (NextAuth built-in)
- [x] Environment variables for secrets
- [x] Parameterized queries (Prisma)
- [x] Image upload validation (type + size)
- [x] HTTPS (Vercel default)

---

## 13. Free Tier Limits

| Service         | Free Limit                | Enough For          |
| --------------- | ------------------------- | ------------------- |
| Vercel          | 100GB bandwidth/month     | ~50K visits/month   |
| MongoDB Atlas   | 512MB storage             | ~10K products       |
| Cloudinary      | 25GB storage, 25GB BW     | ~5K product images  |
| Resend          | 3000 emails/month         | ~1000 orders/month  |
| eSewa Sandbox   | Unlimited test             | Development         |

---

## 14. Implementation Phases

### Phase 1 - Foundation (Week 1-2)
- Project setup (Prisma, MongoDB, NextAuth)
- Database schema
- Auth (register, login, Google)
- Admin layout + middleware

### Phase 2 - Products (Week 3-4)
- Admin: CRUD products + categories
- Image upload (Cloudinary)
- Store: Product listing + detail page
- Search + filters

### Phase 3 - Cart & Checkout (Week 5-6)
- Cart (Zustand)
- Checkout flow
- Address management
- Order creation

### Phase 4 - Payments (Week 7)
- eSewa integration
- Khalti integration
- COD option
- Payment verification

### Phase 5 - Order Management (Week 8)
- Admin order management
- Status updates
- Email notifications (Resend)
- Customer order tracking

### Phase 6 - Polish (Week 9-10)
- Reviews & ratings
- Wishlist
- Homepage design
- SEO optimization
- Mobile responsiveness
- Testing & bug fixes
