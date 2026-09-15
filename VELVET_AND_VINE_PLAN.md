# Velvet & Vine - Full Stack Development Plan

## Project Overview
A premium salon/spa booking website with full-stack development using React, Supabase, Tailwind CSS, and React Router.

## Architecture

### Frontend (React + TypeScript + Tailwind)
- Single Page Application with React Router
- Responsive design (mobile-first approach)
- Dark mode toggle
- Real-time updates using Supabase realtime subscriptions

### Backend (Supabase)
- PostgreSQL database with Supabase
- Authentication (Supabase Auth)
- Row-Level Security (RLS) for data access control
- Edge Functions for email notifications
- Real-time subscriptions

## Pages

### Public Pages
1. **Home** (`/`)
   - Hero section with booking CTA
   - Featured services showcase
   - Client testimonials
   - FAQ accordion
   - Trust badges

2. **Services** (`/services`)
   - Categorized by: Hair, Nails, Facials, Massage
   - Display: Service name, price, duration, description
   - Filter by category
   - Quick book buttons

3. **Stylists** (`/stylists`)
   - Photo gallery
   - Bio and specialty
   - Rating/reviews
   - Book with specific stylist button

4. **Gallery** (`/gallery`)
   - Before/after transformations
   - Salon ambiance photos
   - Swipe support on mobile
   - Lightbox view

5. **Contact** (`/contact`)
   - Contact form (name, email, phone, message)
   - Embedded Google Map
   - Business hours
   - Social media links

### Protected Pages (Auth Required)
6. **Client Dashboard** (`/dashboard`)
   - Upcoming appointments
   - Past appointments
   - Reschedule/Cancel buttons
   - Download invoice
   - Edit profile

7. **Admin Dashboard** (`/admin`)
   - Manage bookings (view, cancel, reschedule)
   - Block time slots
   - CRUD services
   - CRUD stylists
   - View analytics/reports
   - Manage availability

### Auth Pages
8. **Login** (`/login`)
9. **Sign Up** (`/signup`)
10. **Password Reset** (`/reset-password`)

## Database Schema

### Tables
1. **profiles** (extends auth.users)
   - id (FK to auth.users)
   - email
   - full_name
   - user_role: 'client' | 'stylist' | 'admin'
   - created_at, updated_at

2. **services**
   - id
   - name
   - category: 'Hair' | 'Nails' | 'Facials' | 'Massage'
   - description
   - price
   - duration (minutes)
   - image_url
   - created_at, updated_at

3. **stylists**
   - id
   - user_id (FK to profiles)
   - name
   - specialty (service type)
   - bio
   - image_url
   - rating (0-5)
   - created_at, updated_at

4. **bookings**
   - id
   - client_id (FK to profiles)
   - service_id (FK to services)
   - stylist_id (FK to stylists)
   - scheduled_date
   - scheduled_time
   - status: 'confirmed' | 'cancelled' | 'completed'
   - notes
   - created_at, updated_at

5. **availability_slots**
   - id
   - stylist_id (FK to stylists)
   - date
   - time
   - is_available (boolean)
   - created_at

## Component Library

### Core Components
- **Button** - Primary, Secondary, Ghost variants; sm, md, lg sizes
- **Card** - Reusable container with optional hover effects
- **Modal** - Dialog component for confirmations/forms
- **Form** - Input wrapper with validation
- **Badge** - Status/category badges
- **Navbar** - Sticky header with auth state
- **Footer** - Site footer with links
- **Hero** - Landing section
- **FAQ** - Accordion component
- **Toast** - Notifications (success, error, info)
- **SkeletonLoader** - Loading placeholder

### Feature Components
- **ServiceCard** - Display service info
- **StylistCard** - Display stylist profile
- **MultiStepForm** - Booking flow (service → stylist → date/time → confirm)
- **AppointmentsList** - Dashboard appointments
- **AdminPanel** - Admin controls
- **Gallery** - Image gallery with lightbox
- **ContactForm** - Contact submission
- **MapEmbed** - Google Maps embed

## Features Checklist

### Phase 1: MVP (Core Functionality)
- [ ] User authentication (sign up, login, logout)
- [ ] View services with filtering
- [ ] View stylists and ratings
- [ ] Multi-step booking form
- [ ] Booking confirmation email
- [ ] Client dashboard (view/cancel appointments)
- [ ] Admin basic panel
- [ ] Dark mode toggle
- [ ] Mobile responsive design
- [ ] Sitemap & SEO meta tags

### Phase 2: Enhanced Features
- [ ] Stylist availability calendar
- [ ] Rating/review system
- [ ] Gallery lightbox
- [ ] Contact form submissions
- [ ] Email notifications (booking, cancellation, reminder)
- [ ] Admin analytics dashboard
- [ ] Reschedule appointments
- [ ] Payment integration (Stripe/Square)

### Phase 3: Advanced Features
- [ ] Real-time chat with stylists
- [ ] Loyalty/rewards program
- [ ] Gift certificates
- [ ] SMS notifications
- [ ] Push notifications
- [ ] Social media integration
- [ ] Referral program

## Design System

### Color Palette
- **Primary:** Blush Pink (#E91E63 or #F06292)
- **Secondary:** Gold (#FFB300 or #FFA500)
- **Accent:** Rose (#C2185B)
- **Background:** Off-white (#F5F5F5) / Dark (#1a1a1a)
- **Text:** Charcoal (#333333) / White (#FFFFFF)

### Typography
- **Headings:** Inter, Bold
- **Body:** Inter, Regular
- **Accent:** Playfair Display, Bold

### Spacing
- Mobile: 16px padding
- Tablet: 24px padding
- Desktop: 32px padding

### Shadows & Effects
- Subtle shadows for depth
- Smooth transitions (300ms)
- Blur effects for modals
- Gradient overlays

## Development Setup

### Frontend
```bash
cd frontend
npm install
npm start
```

### Environment Variables
```
REACT_APP_SUPABASE_URL=<your_url>
REACT_APP_SUPABASE_ANON_KEY=<your_key>
```

### Deployment
- **Frontend:** Vercel
- **Backend:** Supabase (serverless)
- **Database:** Supabase PostgreSQL
- **Storage:** Supabase Storage for images

## External APIs & Services

### Data Sources (Development)
- **RandomUser API** - Placeholder stylist data
- **Unsplash API** - Salon/spa imagery
- **LoremPicsum** - Image placeholders

### Production Services
- **Google Maps API** - Location embedding
- **Stripe/Square** - Payment processing
- **Resend/SendGrid** - Email service
- **Twilio** - SMS notifications
- **Firebase Analytics** or **Mixpanel** - Analytics

## SEO Optimization

### On-Page
- [ ] Meta tags (title, description, keywords)
- [ ] Open Graph tags
- [ ] Structured data (JSON-LD)
- [ ] Alt text on images
- [ ] Heading hierarchy (H1, H2, H3)
- [ ] Internal linking
- [ ] Mobile-friendly design
- [ ] Page speed optimization

### Technical
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] FastLink/Preconnect
- [ ] Image optimization (WebP)
- [ ] Lazy loading
- [ ] CSS/JS minification

## Accessibility (WCAG 2.1 AA)
- [ ] Touch targets ≥ 44px
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Color contrast (4.5:1)
- [ ] Focus indicators
- [ ] Screen reader testing
- [ ] Reduced motion support

## Testing
- Unit tests (React Testing Library)
- Integration tests
- E2E tests (Cypress/Playwright)
- Accessibility testing
- Performance testing (Lighthouse)

## Timeline
- **Week 1-2:** Setup, database schema, auth
- **Week 3-4:** Frontend pages (Home, Services, Stylists)
- **Week 5-6:** Booking flow & admin panel
- **Week 7:** Testing & optimization
- **Week 8:** Deployment & launch

## Team Roles
- Frontend Developer: React/TypeScript
- Backend Developer: Supabase/PostgreSQL
- UI/UX Designer: Figma prototypes
- QA/Tester: Testing & optimization
