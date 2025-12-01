# 🏰 Luxury Real Estate Platform

A modern, luxury real estate platform built with Next.js 16, React 19, and Tailwind CSS v4. Features glassmorphic design, smooth animations, and a premium user experience.

## 🌐 Live Demo

**[https://luxery-real-estate-742.vercel.app/](https://luxery-real-estate-742.vercel.app/)**

## ✨ Features

### 🎨 Modern UI/UX
- Glassmorphic card designs with backdrop blur effects
- Smooth animations and transitions
- Parallax scrolling effects
- Responsive design for all devices
- Dark theme with linear accents

### 🏠 Property Management
- Browse luxury properties with detailed information
- Property listings with images, amenities, and pricing
- Dynamic property pages with slug-based routing
- Property search and filtering

### 👤 User Features
- User authentication (Login/Register)
- My Bookings page with booking management
- View booking status (Pending, Confirmed, Cancelled)
- Pay Now functionality for pending bookings

### 💳 Payment System
- Payment success page with confetti animation
- Payment cancelled page
- Payment failed page with error details
- Transaction details display

### 🛡️ Admin Dashboard
- Create and manage properties
- Manage users
- Property table with CRUD operations
- Protected admin routes

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.3
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **UI Components:** Headless UI
- **Icons:** React Icons
- **Notifications:** React Hot Toast, SweetAlert2
- **Font:** Geist (Vercel)

## 📁 Project Structure

```
src/
├── app/
│   ├── (authLayout)/          # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (commonLayout)/        # Public pages
│   │   ├── about/
│   │   ├── services/
│   │   ├── properties/
│   │   ├── contact/
│   │   └── my-bookings/
│   ├── (dashboardLayout)/     # Admin dashboard
│   │   └── dashboard/
│   │       ├── create-property/
│   │       ├── manage-property/
│   │       └── manage-users/
│   └── (paymentLayout)/       # Payment pages
│       ├── success/
│       ├── cancel/
│       └── failed/
├── components/                # Reusable components
├── types/                     # TypeScript type definitions
└── middleware/                # Route protection
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd front-end
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Key Pages

### Public Pages
- **Home** (`/`) - Landing page with hero section
- **About** (`/about`) - About the platform
- **Services** (`/services`) - Services offered
- **Properties** (`/properties`) - Property listings
- **Property Details** (`/properties/[slug]`) - Individual property page
- **Contact** (`/contact`) - Contact form

### User Pages
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **My Bookings** (`/my-bookings`) - User's booking history

### Admin Pages
- **Dashboard** (`/dashboard`) - Admin overview
- **Create Property** (`/dashboard/create-property`) - Add new properties
- **Manage Properties** (`/dashboard/manage-property`) - Edit/delete properties
- **Manage Users** (`/dashboard/manage-users`) - User management

### Payment Pages
- **Success** (`/success`) - Payment successful
- **Cancel** (`/cancel`) - Payment cancelled
- **Failed** (`/failed`) - Payment failed

## 🔐 Authentication

The platform uses token-based authentication stored in cookies. Protected routes include:
- `/dashboard/*` - Admin routes
- `/properties/[id]` - Property details
- `/my-bookings/*` - User bookings

## 🎨 Design Features

- **Glassmorphism:** Backdrop blur effects with transparent backgrounds
- **linear Text:** Multi-color linear text animations
- **Hover Effects:** Scale, shadow, and border glow on hover
- **Status Badges:** Color-coded status indicators
- **Smooth Transitions:** 300-500ms duration transitions
- **Custom Animations:** Pulse, float, fade-in, confetti effects

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Flexible grid layouts
- Touch-friendly interactions

## 🚢 Deployment

The project is deployed on Vercel. To deploy your own instance:

```bash
npm run build
```

Then deploy to Vercel or your preferred hosting platform.

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, contact the development team or open an issue in the repository.
