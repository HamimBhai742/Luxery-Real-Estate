# Profile Feature Integration Guide

## Quick Start

The profile feature is now fully implemented and ready to use!

## Access the Profile Page

**URL:** `/profile`

## Add Profile Link to Navigation

### Option 1: Add to Navbar Dropdown
```tsx
// In src/components/Navbar/Navbar.tsx
<Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
  Profile
</Link>
```

### Option 2: Add to Sidebar
```tsx
// In src/components/Sidebar/Sidebard.tsx
<Link href="/profile" className="flex items-center gap-3 px-4 py-3">
  <FiUser />
  <span>Profile</span>
</Link>
```

### Option 3: Add to Dashboard
```tsx
// In Dashboard components
<Link href="/profile" className="btn btn-primary">
  View Profile
</Link>
```

## Features Available

✅ View user information (name, email, address, role, photo)
✅ Edit profile (name, address)
✅ Upload/change profile photo
✅ Change password
✅ Toggle dark/light mode
✅ Responsive design
✅ Loading skeleton
✅ Protected route (authentication required)

## API Requirements

Your backend should support these endpoints:

1. **GET/POST** `/user/me` - Returns user data
   ```json
   {
     "success": true,
     "data": {
       "name": "John Doe",
       "email": "john@example.com",
       "address": "123 Main St",
       "photo": "https://...",
       "role": "user"
     }
   }
   ```

2. **PUT** `/user/update` - Updates profile (FormData)
   - Fields: `name`, `address`, `photo` (file)

3. **POST** `/user/change-password` - Changes password
   ```json
   {
     "currentPassword": "old123",
     "newPassword": "new123"
   }
   ```

## Testing

1. Start dev server: `npm run dev`
2. Login to your account
3. Navigate to `/profile`
4. Test all features:
   - View profile info
   - Edit name/address
   - Upload photo
   - Change password
   - Toggle theme

## Troubleshooting

**Issue:** Profile page redirects to login
- **Solution:** Ensure you're logged in and have valid token

**Issue:** Photo upload fails
- **Solution:** Check backend accepts FormData and file uploads

**Issue:** Theme toggle doesn't work
- **Solution:** Ensure ThemeProvider is in root layout

**Issue:** API calls fail
- **Solution:** Verify NEXT_PUBLIC_API_URL in .env.local

## Next Steps

1. Add profile link to your navigation
2. Test all features
3. Customize styling if needed
4. Add additional fields as required
