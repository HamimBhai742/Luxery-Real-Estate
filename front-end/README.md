# 🏰 Luxury Real Estate Platform

A modern, luxury real estate platform built with Next.js 16, React 19, and Tailwind CSS v4. Features glassmorphic design, smooth animations, and a premium user experience.

## 🌐 Live Demo

**[https://luxery-real-estate-742.vercel.app/](https://luxery-real-estate-742.vercel.app/)**

## ✨ Features

### 🎨 Modern UI/UX
- Glassmorphic card designs with backdrop blur effects
- Gradient backgrounds and accents
- Smooth animations and transitions
- Parallax scrolling effects
- Responsive design for all devices
- Dark/Light theme with seamless toggle

### 🏠 Property Management
- Browse luxury properties with detailed information
- Property listings with images, amenities, and pricing
- Dynamic property pages with slug-based routing
- Property search and filtering
- Interactive property cards with hover effects

### 👤 User Features
- User authentication (Login/Register/Forgot Password/Reset Password)
- **Profile Management** 🆕
  - View and edit profile information (name, address, photo)
  - Upload profile photo with preview
  - Change password with real-time validation
  - Dark/Light mode toggle
  - Modern glassmorphic design
- My Bookings page with booking management
- View booking status (Pending, Confirmed, Cancelled)
- Pay Now functionality for pending bookings
- Payment history tracking

### 💳 Payment System
- Payment success page with confetti animation
- Payment cancelled page
- Payment failed page with error details
- Transaction details display
- Booking confirmation

### 🛡️ Admin Dashboard
- Create and manage properties
- Manage users
- Property table with CRUD operations
- Analytics and charts (Area Chart, Pie Chart)
- User statistics
- Protected admin routes

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.7
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS v4, DaisyUI
- **Language:** TypeScript
- **UI Components:** Headless UI, Radix UI
- **Icons:** React Icons (Feather Icons)
- **Notifications:** React Hot Toast, SweetAlert2
- **Charts:** Recharts
- **Theme:** Next Themes
- **Image Optimization:** Next/Image, Cloudinary
- **Font:** Geist (Vercel)

## 📁 Project Structure

```
src/
├── app/
│   ├── (authLayout)/          # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   ├── (commonLayout)/        # Public pages
│   │   ├── about/
│   │   ├── services/
│   │   ├── properties/
│   │   ├── contact/
│   │   ├── profile/          # 🆕 User profile
│   │   └── my-bookings/
│   ├── (dashboardLayout)/     # Admin dashboard
│   │   └── dashboard/
│   │       ├── create-property/
│   │       ├── manage-property/
│   │       └── manage-users/
│   ├── (paymentLayout)/       # Payment pages
│   │   └── payment/
│   │       ├── success/
│   │       ├── cancel/
│   │       └── failed/
│   └── api/                   # API routes
│       ├── logout/
│       └── proxy/
├── components/                # Reusable components
│   ├── Dashboard/
│   ├── Properties/
│   ├── Profile/              # 🆕 Profile components
│   ├── Navbar/
│   ├── Sidebar/
│   ├── Footer/
│   ├── Chart/
│   └── ui/
├── types/                     # TypeScript type definitions
├── helpers/                   # Utility functions
├── lib/                       # Libraries
└── proxy.ts                   # Middleware for route protection
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
- **Forgot Password** (`/forgot-password`) - Password recovery
- **Reset Password** (`/reset-password`) - Set new password
- **Profile** (`/profile`) - 🆕 User profile management
- **My Bookings** (`/my-bookings`) - User's booking history

### Admin Pages
- **Dashboard** (`/dashboard`) - Admin overview with analytics
- **Create Property** (`/dashboard/create-property`) - Add new properties
- **Manage Properties** (`/dashboard/manage-property`) - Edit/delete properties
- **Manage Users** (`/dashboard/manage-users`) - User management

### Payment Pages
- **Success** (`/payment/success`) - Payment successful
- **Cancel** (`/payment/cancel`) - Payment cancelled
- **Failed** (`/payment/failed`) - Payment failed

## 🔐 Authentication

The platform uses token-based authentication stored in httpOnly cookies. Protected routes include:
- `/dashboard/*` - Admin routes
- `/properties/[id]` - Property details
- `/my-bookings/*` - User bookings
- `/profile` - User profile

## 🎨 Design Features

- **Glassmorphism:** Backdrop blur effects with transparent backgrounds
- **Gradient Accents:** Multi-color gradient text and backgrounds
- **Hover Effects:** Scale, shadow, and border glow on hover
- **Status Badges:** Color-coded status indicators
- **Smooth Transitions:** 300-500ms duration transitions
- **Custom Animations:** Pulse, float, fade-in, confetti effects
- **Loading Skeletons:** Animated loading states for better UX
- **Real-time Validation:** Instant feedback on form inputs

## 🆕 Profile Features

### User Information
- Display name, email, address, role, and profile photo
- Edit profile information (name, address)
- Upload and preview profile photo
- Role badge with icon

### Password Management
- Change password with current password verification
- Real-time password validation:
  - ✅ Minimum 6 characters check
  - ✅ Password match validation
  - ✅ Visual feedback with icons
  - ✅ Color-coded input borders
  - ✅ Inline error messages
  - ✅ Disabled submit when invalid

### Theme Toggle
- Switch between Light/Dark mode
- Sun/Moon icon indicator
- Persistent theme preference

### Design
- Modern glassmorphic card design
- Gradient header banner
- Large circular profile photo (160px)
- Responsive layout (mobile-first)
- Smooth animations and transitions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚢 Deployment

The project is deployed on Vercel. To deploy your own instance:

```bash
npm run build
```

Then deploy to Vercel or your preferred hosting platform.

## 📦 Key Dependencies

```json
{
  "next": "^16.0.7",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "tailwindcss": "^4",
  "typescript": "^5",
  "react-icons": "^5.5.0",
  "react-hot-toast": "^2.6.0",
  "sweetalert2": "^11.26.3",
  "next-themes": "^0.4.6",
  "recharts": "^2.15.4",
  "cloudinary": "^2.8.0",
  "@headlessui/react": "^2.2.9",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "daisyui": "^5.5.5"
}
```

## 🔧 Configuration

### Next.js Config
- React Compiler enabled
- Image optimization with Cloudinary
- Remote patterns configured

### TypeScript
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`
- JSX: react-jsx

### Tailwind CSS
- Version 4 with PostCSS
- DaisyUI plugin
- Custom animations
- Dark mode support

## 🤝 Support

For support, contact the development team or open an issue in the repository.

## 🎯 Future Enhancements

- [ ] Advanced property search filters
- [ ] Property comparison feature
- [ ] Wishlist/Favorites
- [ ] Real-time chat support
- [ ] Property virtual tours
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-language support

---

**Built with ❤️ using Next.js 16 and React 19**

**Develop By HAMIM**
