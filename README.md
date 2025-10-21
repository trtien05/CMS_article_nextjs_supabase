# News CMS - Next.js & Supabase

A simple Content Management System (CMS) for managing news articles with full CRUD operations, built with Next.js 14 and Supabase.

## Features

- ✅ Create news articles
- ✅ Read/View news articles
- ✅ Update existing articles
- ✅ Delete articles with confirmation dialog
- ✅ Modern, responsive UI with shadcn/ui components
- ✅ Beautiful card-based layouts
- ✅ TypeScript for type safety
- ✅ Supabase for backend and database
- ✅ Tailwind CSS for styling
- ✅ Lucide icons for visual elements

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account (sign up at https://supabase.com)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at https://supabase.com
2. In your Supabase project, go to the SQL Editor
3. Run this SQL query to create the news table:

```sql
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for development)
CREATE POLICY "Allow all operations" ON news
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:

   ```bash
   copy .env.local.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in your Supabase project settings under "API".

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Test_CMS/
├── app/
│   ├── api/
│   │   └── news/
│   │       ├── route.ts          # GET all, POST new
│   │       └── [id]/
│   │           └── route.ts      # GET, PUT, DELETE by ID
│   ├── news/
│   │   ├── create/
│   │   │   └── page.tsx          # Create news page
│   │   └── [id]/
│   │       ├── page.tsx          # View single news
│   │       ├── DeleteButton.tsx  # Delete component
│   │       └── edit/
│   │           └── page.tsx      # Edit news page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (list all news)
├── lib/
│   └── supabase.ts               # Supabase client
├── types/
│   └── news.ts                   # TypeScript types
└── package.json
```

## API Routes

- `GET /api/news` - Get all news articles
- `POST /api/news` - Create a new article
- `GET /api/news/[id]` - Get a single article
- `PUT /api/news/[id]` - Update an article
- `DELETE /api/news/[id]` - Delete an article

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Client Library**: @supabase/supabase-js

## Building for Production

```bash
npm run build
npm start
```

## Notes

- This is a development setup with public access policies on Supabase
- For production, implement proper authentication and authorization
- Consider adding image upload support for news articles
- Add pagination for large numbers of articles

## License

MIT
