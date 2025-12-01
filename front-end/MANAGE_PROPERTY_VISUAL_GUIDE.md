# Manage Property Page - Visual Guide

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header Card                                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Manage Properties          [+ Add Property]     │  │
│  │  View, edit, and manage...                       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Stats Grid (4 Cards)                                   │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ 🏠   │  │ 📈   │  │ 💰   │  │ 👁️   │              │
│  │ 156  │  │ 89   │  │ $124K│  │ 3.2K │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Search & Filters                                       │
│  ┌──────────────────────────────┐  ┌──────────┐       │
│  │ 🔍 Search properties...      │  │ Filters  │       │
│  └──────────────────────────────┘  └──────────┘       │
│                                                         │
│  [All] [Active] [Pending] [Sold]  (when expanded)     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Property Table                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Property Listings - 156 properties found        │  │
│  ├─────────────────────────────────────────────────┤  │
│  │ Property | Location | Price | Beds | Status | ✏️│  │
│  ├─────────────────────────────────────────────────┤  │
│  │ Villa    | Beverly  | $2.5M | 4/3  | Active | ✏️│  │
│  │ Apt      | Manhattan| $1.2M | 2/2  | Active | ✏️│  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Schemes

### Light Mode Palette
```
Background:     #f9fafb → #ffffff → #f3f4f6
Cards:          rgba(255,255,255,0.8)
Text Primary:   #111827
Text Secondary: #4b5563
Borders:        #e5e7eb
Shadows:        0 10px 15px rgba(0,0,0,0.1)
```

### Dark Mode Palette
```
Background:     #030712 → #111827 → #000000
Cards:          rgba(255,255,255,0.05)
Text Primary:   #ffffff
Text Secondary: #9ca3af
Borders:        rgba(255,255,255,0.1)
Shadows:        0 20px 25px rgba(139,92,246,0.2)
```

---

## 📊 Stats Cards Breakdown

### Card 1: Total Properties
```
┌──────────────────────┐
│ 🏠 [Blue/Cyan]  +12% │
│                      │
│ Total Properties     │
│ 156                  │
└──────────────────────┘
```

### Card 2: Active Listings
```
┌──────────────────────┐
│ 📈 [Purple/Pink] +8% │
│                      │
│ Active Listings      │
│ 89                   │
└──────────────────────┘
```

### Card 3: Total Value
```
┌──────────────────────┐
│ 💰 [Green/Emerald]+15%│
│                      │
│ Total Value          │
│ $124K                │
└──────────────────────┘
```

### Card 4: Total Views
```
┌──────────────────────┐
│ 👁️ [Orange/Red] +23% │
│                      │
│ Total Views          │
│ 3.2K                 │
└──────────────────────┘
```

---

## 🔍 Search & Filter Section

### Search Bar
```
┌────────────────────────────────────┐
│ 🔍  Search properties by name...   │
│                                 ❌ │
└────────────────────────────────────┘
```

### Filter Panel (Expanded)
```
┌────────────────────────────────────┐
│ Filter by Status                   │
│                                    │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐│
│ │ All  │ │Active│ │Pending││Sold││
│ └──────┘ └──────┘ └──────┘ └────┘│
└────────────────────────────────────┘
```

---

## 📱 Desktop Table View

```
┌──────────────────────────────────────────────────────────────┐
│ Property          Location    Price    Beds  Status  Actions │
├──────────────────────────────────────────────────────────────┤
│ 🏠 Luxury Villa   📍 Beverly  $2.5M    4/3   🟢      ✏️ 🗑️  │
│ 🏠 Modern Apt     📍 Manhattan $1.2M   2/2   🟢      ✏️ 🗑️  │
│ 🏠 Beach House    📍 Malibu    $3.8M   5/4   🟡      ✏️ 🗑️  │
└──────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile Card View

```
┌─────────────────────────────────┐
│ 🏠  Luxury Villa        🟢      │
│     📍 Beverly Hills            │
│                                 │
│ ─────────────────────────────── │
│ Price          Beds/Baths       │
│ $2.5M          4 / 3            │
│ ─────────────────────────────── │
│ [✏️ Edit]      [🗑️ Delete]     │
└─────────────────────────────────┘
```

---

## 🎯 Interactive States

### Button States

#### Add Property Button
```
Default:  [Blue → Purple → Pink gradient]
Hover:    [Scale 1.05 + Shadow glow]
Active:   [Scale 0.98]
```

#### Edit Button
```
Light:    [Blue-100 bg, Blue-600 text]
Dark:     [Blue-500/10 bg, Blue-400 text]
Hover:    [Darker bg + Scale 1.1]
```

#### Delete Button
```
Light:    [Red-100 bg, Red-600 text]
Dark:     [Red-500/10 bg, Red-400 text]
Hover:    [Darker bg + Scale 1.1]
```

### Status Badges

#### Active
```
Light:    [Green-100 bg, Green-700 text, Green-200 border]
Dark:     [Green-500/20 bg, Green-400 text, Green-500/30 border]
```

#### Inactive
```
Light:    [Red-100 bg, Red-700 text, Red-200 border]
Dark:     [Red-500/20 bg, Red-400 text, Red-500/30 border]
```

---

## 🎨 Hover Effects

### Stats Card Hover
```
Before:   [Scale 1.0, Shadow-lg]
After:    [Scale 1.05, Shadow-xl + Glow]
Duration: 300ms
```

### Table Row Hover
```
Light:    [bg-gray-50]
Dark:     [bg-white/5]
Duration: 300ms
```

### Action Button Hover
```
Before:   [Scale 1.0]
After:    [Scale 1.1 + Darker bg]
Duration: 300ms
```

---

## 📐 Spacing & Sizing

### Container
```
Max Width:  7xl (1280px)
Padding:    6 (24px) on mobile, 8 (32px) on desktop
Gap:        6 (24px) between sections
```

### Cards
```
Padding:    6 (24px)
Border:     1px
Radius:     2xl (16px)
```

### Stats Grid
```
Columns:    1 (mobile), 2 (tablet), 4 (desktop)
Gap:        6 (24px)
```

### Table
```
Row Height: Auto (py-4)
Cell Padding: 4 (16px)
```

---

## 🎭 Animation Timings

```
Transitions:     300ms
Hover Scale:     300ms
Color Change:    300ms
Shadow Fade:     300ms
Filter Expand:   300ms
```

---

## 📊 Typography

### Headings
```
Page Title:     3xl (30px) → 4xl (36px)
Card Title:     xl (20px)
Table Header:   sm (14px)
```

### Body Text
```
Description:    base (16px)
Table Cell:     base (16px)
Badge:          xs (12px)
```

### Font Weights
```
Title:          bold (700)
Subtitle:       normal (400)
Table Header:   semibold (600)
Price:          semibold (600)
```

---

## 🎨 Gradient Definitions

### Title Gradient
```
Light:  from-blue-600 via-purple-600 to-pink-600
Dark:   from-blue-400 via-purple-400 to-pink-400
```

### Button Gradient
```
Default: from-blue-500 via-purple-500 to-pink-500
Hover:   from-pink-500 via-purple-500 to-blue-500
```

### Icon Gradients
```
Blue/Cyan:      from-blue-500 to-cyan-500
Purple/Pink:    from-purple-500 to-pink-500
Green/Emerald:  from-green-500 to-emerald-500
Orange/Red:     from-orange-500 to-red-500
```

---

## 🔄 Responsive Behavior

### Mobile (< 768px)
- Single column layout
- Card view for properties
- Stacked header elements
- Full-width buttons
- Touch-friendly spacing (44px min)

### Tablet (768px - 1024px)
- 2-column stats grid
- Table view appears
- Side-by-side filters
- Optimized spacing

### Desktop (1024px+)
- 4-column stats grid
- Full table view
- Horizontal header layout
- Maximum width container
- Hover effects enabled

---

## ✨ Special Effects

### Glassmorphism
```
backdrop-blur-xl
bg-white/80 (light) or bg-white/5 (dark)
border with transparency
```

### Shadows
```
Light:  shadow-lg (box shadow)
Dark:   shadow-2xl shadow-purple-500/20 (glow)
```

### Transitions
```
All properties: transition-all duration-300
Smooth easing: ease-in-out
```

---

## 🎯 User Flow

1. **Land on page** → See header + stats
2. **View stats** → Understand property overview
3. **Search/Filter** → Find specific properties
4. **Browse table** → Review property details
5. **Take action** → Edit or Delete
6. **Confirm** → SweetAlert2 dialog
7. **Complete** → Page refresh with updated data

---

**Result**: A cohesive, beautiful, and functional property management interface! 🎉
