# Project Overview

This is a pre-launch landing page for the PSC-AI platform - [https://www.reviewmyagent.today](https://www.reviewmyagent.today)

## Test The Project Locally

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

3. Add local environment variables:

The fully deployed project uses Supabase and Google reCAPTCHA environment variables set in Railway.

To test the project locally, you need to create a `.env.local` file, and set the following environment variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_RECAPTCHA_SITE_KEY

You'll need a Supabase project (unless using the actual team Supabase project). Once created, run the below SQL in the SQL Editor to set up the required table. You can find your environment variable values under Project Settings → API.

The following database schema is used:

```sql
CREATE TABLE public.emails (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL DEFAULT ''::text UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  subscribed boolean DEFAULT true,
  role text DEFAULT ''::text,
  CONSTRAINT emails_pkey PRIMARY KEY (id)
);
```

4. Start the development server:

```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Directory Structure

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

## Tech Stack

### Next.js
- Used for: React framework providing routing, server-side rendering, and optimizations
- Official Next.js Docs: https://nextjs.org/docs

### React
- Used for: Building user interfaces and interactive components
- Official React Docs: https://react.dev/learn

### Supabase
- Used for: Authentication, database, and backend services
- Official Supabase Docs: https://supabase.com/docs

### Railway
- Used for: Hosting and deploying
- Official Railway Docs: https://docs.railway.com