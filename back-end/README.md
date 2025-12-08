# Luxury Real Estate Backend API

A robust backend API for a luxury real estate booking platform built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🔐 JWT Authentication & Authorization
- 🌐 Google OAuth Integration (Passport)
- 🏠 Property Management (CRUD)
- 📅 Booking System
- 💳 Payment Integration (SSLCommerz)
- 👥 User Management
- 🛡️ Role-based Access Control (USER/ADMIN)
- ✅ Request Validation with Zod
- 🗄️ PostgreSQL with Prisma ORM
- ☁️ Image Upload (Cloudinary)
- 📧 Email Notifications (Nodemailer)
- 📊 Statistics Dashboard
- 👁️ Property Views Tracking

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js v5
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt + Passport (Google OAuth)
- **Validation**: Zod
- **Payment**: SSLCommerz
- **Storage**: Cloudinary
- **Email**: Nodemailer

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd back-end
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure `.env` file
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/luxury_real_estate"

# Admin Seed
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
ADMIN_PASS_SALT_ROUNDS=10

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
RESET_JWT_SECRET=your_reset_jwt_secret
RESET_TOKEN_EXPIRE_IN=15m
BCRYPT_SALT_ROUNDS=10

# SSLCommerz
SSL_STORE_ID=your_store_id
SSL_STORE_PASSWORD=your_store_password
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
SSL_IPN_URL=your_ipn_url
SSL_SUCCESS_BACK_END_URL=http://localhost:5000/api/v1/payment/success
SSL_FAILED_BACK_END_URL=http://localhost:5000/api/v1/payment/fail
SSL_CANCEL_BACK_END_URL=http://localhost:5000/api/v1/payment/cancel
SSL_SUCCESS_FRONT_END_URL=http://localhost:3000/payment/success
SSL_FAIL_FRONT_END_URL=http://localhost:3000/payment/fail
SSL_CANCEL_FRONT_END_URL=http://localhost:3000/payment/cancel

# Cloudinary
CLOUDINARY_API_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_API_URL=your_cloudinary_url

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALL_BACK_URL=http://localhost:5000/api/v1/auth/google/callback

# Session
EXPRESS_SESSION_SECRET=your_session_secret

# Client
CLIENT_URL=http://localhost:3000
APP_NAME=Luxury Real Estate
```

5. Run database migrations
```bash
npx prisma migrate dev
```

6. Generate Prisma Client
```bash
npx prisma generate
```

7. Start development server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Base URL: `/api/v1`

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | User login | Public |
| GET | `/auth/google` | Google OAuth login | Public |
| GET | `/auth/google/callback` | Google OAuth callback | Public |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user` | Get all users | Admin |
| GET | `/user/:id` | Get user by ID | Protected |
| PATCH | `/user/:id` | Update user | Protected |
| DELETE | `/user/:id` | Delete user | Admin |

### Properties
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/property` | Get all properties | Public |
| GET | `/property/:slug` | Get property by slug | Public |
| POST | `/property` | Create property | Admin |
| PATCH | `/property/:id` | Update property | Admin |
| DELETE | `/property/:id` | Delete property | Admin |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/booking` | Get all bookings | Protected |
| POST | `/booking` | Create booking | Protected |
| GET | `/booking/:id` | Get booking by ID | Protected |

### Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/payment/init` | Initialize payment | Protected |
| POST | `/payment/success` | Payment success callback | Public |
| POST | `/payment/fail` | Payment failure callback | Public |
| POST | `/payment/cancel` | Payment cancel callback | Public |

### Statistics
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/stats` | Get dashboard statistics | Admin |

## Database Schema

### User
- id, name, email, profile, address, phone, password
- provider (google/credential), providerId
- role (USER/ADMIN), status (active/inactive)
- isDeleted, createdAt, updatedAt

### Property
- id (UUID), name, slug, description, location
- images[], price, bedrooms, bathrooms, amenities[]
- views, status (available/unavailable/booked/sold)
- isBooked, createdAt, updatedAt

### Booking
- id (UUID), userId, propertyId, totalAmount
- status (pending/paid/canceled)
- createdAt, updatedAt

### Payment
- id (UUID), bookingId, userId, provider
- transactionId, status (pending/succeeded/failed/canceled)
- amount, rawResponse (JSON)
- createdAt, updatedAt

## Scripts

```bash
npm run dev          # Start development server
npm run postinstall  # Generate Prisma client
npx prisma studio    # Open Prisma Studio GUI
npx prisma migrate dev  # Create and apply migrations
```

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── cloudinary.config.ts
│   ├── conneect.db.ts
│   ├── env.ts
│   ├── multer.config.ts
│   ├── passport.ts
│   └── prisma.configs.ts
├── modules/         # Feature modules
│   ├── auth/        # Authentication (register, login, OAuth)
│   ├── user/        # User management
│   ├── property/    # Property CRUD
│   ├── booking/     # Booking system
│   ├── payment/     # Payment processing
│   ├── sslcommerz/  # SSLCommerz integration
│   └── stats/       # Statistics endpoints
├── middleware/      # Express middlewares
│   ├── check.auth.ts
│   ├── global.error.ts
│   ├── not.found.ts
│   └── zod.validation.ts
├── utils/           # Utility functions
│   ├── create.async.fn.ts
│   ├── create.jwt.ts
│   ├── create.token.ts
│   ├── generate.uniqe.slug.ts
│   ├── pagination.ts
│   ├── pick.query.ts
│   ├── seedAdmin.ts
│   ├── send.email.ts
│   ├── send.response.ts
│   ├── set.cookies.ts
│   └── templates/
├── types/           # TypeScript types
│   ├── interfaces.ts
│   └── user.interface.ts
├── error/           # Custom error classes
│   └── coustom.error.ts
├── routes/          # Route definitions
│   └── routes.ts
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Authentication

The API uses JWT tokens stored in HTTP-only cookies. Include credentials in requests:

```javascript
fetch('http://localhost:5000/api/v1/user', {
  credentials: 'include'
})
```

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Error details"
}
```

## CORS Configuration

Allowed origins:
- `http://localhost:3000`
- `https://luxery-real-estate-742.vercel.app`


## Author

Hamim
