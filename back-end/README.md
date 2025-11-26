# Luxury Real Estate Backend API

A robust backend API for a luxury real estate booking platform built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- 🔐 JWT Authentication & Authorization
- 🏠 Property Management (CRUD)
- 📅 Booking System
- 💳 Payment Integration (SSLCommerz)
- 👥 User Management
- 🛡️ Role-based Access Control (USER/ADMIN)
- ✅ Request Validation with Zod
- 🗄️ PostgreSQL with Prisma ORM

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js v5
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Payment**: SSLCommerz

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
DATABASE_URL="postgresql://user:password@localhost:5432/luxury_real_estate"
PORT=5000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
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

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user` | Get all users | Protected |
| GET | `/user/:id` | Get user by ID | Protected |
| PATCH | `/user/:id` | Update user | Protected |
| DELETE | `/user/:id` | Delete user | Protected |

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

## Database Schema

### User
- id, name, email, phone, password, role (USER/ADMIN)

### Property
- id, name, slug, description, location, price, bedrooms, bathrooms, amenities, status, isBooked

### Booking
- id, userId, propertyId, totalAmount, status (pending/paid/canceled)

### Payment
- id, bookingId, provider, transactionId, status, rawResponse

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
├── modules/         # Feature modules
│   ├── auth/
│   ├── user/
│   ├── property/
│   ├── booking/
│   ├── payment/
│   └── sslcommerz/
├── middleware/      # Express middlewares
├── utils/           # Utility functions
├── types/           # TypeScript types
├── routes/          # Route definitions
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

## License

ISC

## Author

Hamim
