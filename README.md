# Project Overview

This is a pre-launch landing page for the `ReviewMyAgent` platform - [https://www.reviewmyagent.today](https://www.reviewmyagent.today)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [npm](https://www.npmjs.com)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/gentle-weapons/psc-ai.git
   cd psc-ai
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── page.js          # Home page (/)
├── layout.js        # Root layout (wraps all pages)
├── globals.css      # Global styles
└── [route]/
    └── page.js      # Additional pages (/route)

public/              # Static files (images, etc.)

components/          # Custom React Components
```

## Environment Variables

If running/testing locally, the project requires two environment variables to be set in a .env file:

```
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Tech Stack

### React
- Used for: Building user interfaces and interactive components
- Official React Docs: https://react.dev/learn

### Next.js
- Used for: React framework providing routing, server-side rendering, and optimizations
- Official Next.js Docs: https://nextjs.org/docs

### Supabase
- Used for: Authentication, database, and backend services
- Official Supabase Docs: https://supabase.com/docs

### Railway
- Used for: Hosting and deploying
- Official Railway Docs: https://docs.railway.com