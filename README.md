# Overview

A Next.js-based landing and sign-up page with plans to expand into the full PSC-AI web application.

## Getting Started

### Prerequisites

You need Node.js installed to run this project locally.

**On Mac:**
```bash
brew install node
```

**On Windows:**
1. Download the LTS version from https://nodejs.org/
2. Run the installer and follow the setup wizard
3. Restart your terminal

**Verify installation:**
```bash
node --version
npm --version
```

### Running the Local Development Server

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser

The page will auto-reload when you make changes to the code.

### Other Useful Commands
```bash
npm run build      # Build for production
npm run start      # Run production build locally
npm run lint       # Run ESLint to check code quality
```

## Project Structure
```
app/
├── page.js          # Home page (/)
├── layout.js        # Root layout (wraps all pages)
├── globals.css      # Global styles
└── [route]/
    └── page.js      # Additional pages (/route)

public/              # Static files (images, etc.)
```

## Learning Resources

### React
- Used for: Building user interfaces and interactive components
- Official React Docs: https://react.dev/learn
- React Tutorial: https://react.dev/learn/tutorial-tic-tac-toe

### Next.js
- Used for: React framework providing routing, server-side rendering, and optimizations
- Official Next.js Docs: https://nextjs.org/docs
- Learn Next.js: https://nextjs.org/learn
- App Router Documentation: https://nextjs.org/docs/app

### Supabase
- Used for: Authentication, database, and backend services
- Official Supabase Docs: https://supabase.com/docs
- Supabase with Next.js: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Authentication Guide: https://supabase.com/docs/guides/auth

### Vercel
- Used for: Hosting and deploying Next.js applications
- Vercel Documentation: https://vercel.com/docs
- Deploying Next.js: https://nextjs.org/docs/app/building-your-application/deploying

### Tailwind CSS
- Used for: Styling components with utility-first CSS classes
- Official Tailwind Docs: https://tailwindcss.com/docs
- Tailwind with Next.js: https://tailwindcss.com/docs/guides/nextjs

## Future Plans

This repository is structured to eventually support two applications:
- Landing/sign-up page (current)
- Main PSC-AI web application (future)

When ready to add the second app, the project can be restructured into a monorepo with both apps in an `apps/` directory.