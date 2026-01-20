# SignalizeAI Website

A modern, responsive website for **SignalizeAI** — a Chrome extension that transforms any business website into clear, actionable sales intelligence using AI-powered analysis.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
- [Project Structure](#project-structure)
- [Key Technologies](#key-technologies)
- [Authentication & Database](#authentication--database)
- [Payment Integration](#payment-integration)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About the Project

SignalizeAI is a Chrome extension that enables businesses to extract valuable sales intelligence from website content in seconds. This repository contains the official website and documentation portal for the SignalizeAI product.

The website serves as the main landing page, marketing material, documentation hub, and user authentication gateway for the SignalizeAI platform.

## ✨ Features

- **Modern Landing Page**: Engaging hero section with call-to-action buttons
- **Product Showcase**: Detailed features section highlighting SignalizeAI capabilities
- **Pricing Plans**: Multiple subscription tiers with Stripe integration
- **Blog System**: MDX-based blog for articles and updates
- **Documentation**: Comprehensive docs section for users
- **Authentication**: NextAuth integration for user sign-up and login
- **Dark Mode**: Full dark/light theme support with next-themes
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Email Notifications**: Newsletter subscription and contact forms
- **Database Integration**: Supabase for data persistence
- **Contact Form**: Lead capture with email notifications via Nodemailer

## 🛠 Tech Stack

### Frontend
- **Next.js 15.5** - React framework with App Router
- **React 18.3** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Tailgrids 2.2** - Pre-built Tailwind components

### Backend & Services
- **NextAuth.js 4.24** - Authentication and authorization
- **Supabase** - PostgreSQL database and auth
- **Stripe** - Payment processing
- **Nodemailer** - Email service
- **Axios** - HTTP client

### Content & Blog
- **Remark** - Markdown processor
- **gray-matter** - YAML frontmatter parser
- **Prism.js** - Code syntax highlighting

### Development Tools
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwindcss/PostCSS** - CSS processing
- **Cloudflare Next on Pages** - Deployment support

### UI/UX
- **next-themes** - Theme management
- **react-hot-toast** - Toast notifications
- **Lenis** - Smooth scrolling
- **date-fns** - Date utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Supabase account (for database)
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SignalizeAI-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following in `.env.local`:
   - Supabase credentials
   - NextAuth configuration
   - Stripe keys
   - Email service credentials
   - Database URLs

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Lint the codebase:

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (site)/              # Main site routes
│   │   ├── (auth)/          # Authentication pages
│   │   │   ├── signin/
│   │   │   ├── signup/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── about/           # About page
│   │   ├── blogs/           # Blog pages
│   │   ├── contact/         # Contact page
│   │   ├── docs/            # Documentation
│   │   ├── pricing/         # Pricing page
│   │   └── privacy/         # Privacy policy
│   ├── auth/                # Authentication routes
│   ├── layout.tsx           # Root layout
│   └── providers.tsx        # Context providers
│
├── components/              # Reusable React components
│   ├── About/
│   ├── Blog/                # Blog-related components
│   ├── CallToAction/
│   ├── Clients/
│   ├── Common/              # Common UI components
│   ├── Contact/
│   ├── Faq/
│   ├── Features/
│   ├── Footer/
│   ├── Header/
│   ├── Hero/
│   ├── Pricing/
│   ├── Team/
│   ├── Testimonials/
│   └── ui/                  # UI library components
│
├── functions/               # Utility functions
├── stripe/                  # Stripe configuration
├── styles/                  # Global styles
├── types/                   # TypeScript type definitions
├── utils/                   # Helper utilities
│   ├── markdownToHtml.ts
│   ├── supabaseClient.ts
│   ├── email.ts
│   └── validateEmail.ts
│
└── globals.css              # Global styles

public/                       # Static assets
├── icons/
├── images/                  # Images organized by section
└── shapes/                  # SVG shapes

markdown/
└── blogs/                   # MDX blog posts
```

## 🔑 Key Technologies

### Next.js App Router
- File-based routing in the `src/app` directory
- Server and client components
- Route groups for organizing related pages

### Authentication (NextAuth.js)
- User sign-up and login
- Password reset functionality
- Secure session management
- OAuth support

### Database (Supabase)
- PostgreSQL database
- Real-time capabilities
- Row-level security policies
- User authentication

### Markdown/Blog System
- MDX support for blog posts with frontmatter
- `gray-matter` for parsing metadata
- `remark` for markdown processing
- Prism.js for code highlighting

### Email Service
- Nodemailer for transactional emails
- Newsletter subscriptions
- Contact form notifications
- Password reset emails

## 🔐 Authentication & Database

- **NextAuth.js** handles user authentication
- **Supabase** provides the database and real-time updates
- Passwords are hashed using bcrypt
- Email verification for account security
- Protected routes and API endpoints

## 💳 Payment Integration

- **Stripe** for subscription management
- Multiple pricing tiers available in `src/stripe/pricingData.ts`
- Payment success confirmation page
- Webhook handling for payment events

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key

# Email (Nodemailer)
EMAIL_SERVER_HOST=your_email_host
EMAIL_SERVER_PORT=your_port
EMAIL_SERVER_USER=your_email
EMAIL_SERVER_PASSWORD=your_password
EMAIL_FROM=noreply@signalizeai.com

# Database
DATABASE_URL=your_database_url
```

## 🚢 Deployment

The project is configured for deployment on multiple platforms:

### Cloudflare Pages
- Uses `@cloudflare/next-on-pages` for Cloudflare deployment
- Compatible with Cloudflare Workers

### Vercel
- Optimized for Vercel deployment
- Environment variables can be set in Vercel dashboard

### Standard Node.js Hosting
- Use `npm run build` then `npm start`
- Set production environment variables

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 SignalizeAI

## 📞 Contact

For questions, support, or inquiries:
- Website: [SignalizeAI](https://signalizeai.com)
- Email: support@signalizeai.com
- Contact Form: Available on the website

---

**Made with ❤️ by SignalizeAI**
