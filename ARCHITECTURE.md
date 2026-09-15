# Marveaux Digital Studio - Full Stack Architecture

## Project Structure

```
MAREVAUX-DIGITAL-STUDIO/
├── frontend/              # Next.js React Application
│   ├── src/
│   │   ├── pages/         # Next.js pages
│   │   ├── components/    # React components
│   │   ├── styles/        # CSS/Tailwind
│   │   └── lib/           # Utilities and helpers
│   ├── public/            # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── backend/               # Express.js API
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   ├── controllers/   # Route handlers
│   │   └── middleware/    # Custom middleware
│   ├── package.json
│   └── .env.example
│
└── docs/                  # Documentation
```

## Tech Stack

### Frontend
- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT
- **Security:** CORS, bcryptjs for password hashing

## Features to Build

### Phase 1: Core Website
- [ ] Landing page with hero section
- [ ] Services showcase (Website Design, Graphic Design, Content Strategy, etc.)
- [ ] Portfolio/Projects gallery
- [ ] Team section
- [ ] Contact form with backend submission

### Phase 2: Backend Services
- [ ] User authentication (Admin login)
- [ ] Portfolio management API
- [ ] Contact form handler with email notifications
- [ ] Blog/Content management system

### Phase 3: Advanced Features
- [ ] Client testimonials system
- [ ] Service inquiry forms
- [ ] Analytics integration
- [ ] Admin dashboard

## Setup Instructions

### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

See `.env.example` files in both frontend and backend directories.

## Deployment
- **Frontend:** Vercel
- **Backend:** Heroku, Railway, or similar Node.js hosting
- **Database:** MongoDB Atlas (Cloud)
