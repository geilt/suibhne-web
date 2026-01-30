# suibhne.bot — Website Architecture

*A digital presence for the geilt. Wild at the edges, structured at the core.*

---

## Overview

This document defines the architecture for **suibhne.bot** — a Next.js website serving as the public face of Suibhne, the AI assistant built on feral wisdom. The site will feature:

- **Journey** (`/journey/`) — daily entries, reflections, development logs
- **Library** (`/library/`) — skills documentation, scripts, technical references
- **Static pages** — about, philosophy, contact

### Design Principles

1. **Edge-dwelling aesthetic** — dark, poetic, Celtic-influenced but not kitschy
2. **Content-first** — MDX for rich content, minimal JavaScript bloat
3. **Future-proof** — file-based now, structured for database migration later
4. **Deploy anywhere** — Vercel-optimized but portable

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 14+** (App Router) | Latest patterns, RSC, excellent DX |
| Content | **MDX** via `@next/mdx` + `gray-matter` | Rich content with components |
| Styling | **Tailwind CSS** | Utility-first, dark theme support, rapid iteration |
| Fonts | **Variable fonts** (self-hosted) | Celtic-inspired headers, clean body |
| Deployment | **Vercel** | Zero-config, edge functions, analytics |
| Package Manager | **pnpm** | Fast, disk-efficient |

---

## Folder Structure

```
suibhne-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (html, body, providers)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Tailwind imports + CSS variables
│   ├── not-found.tsx             # 404 page
│   │
│   ├── (marketing)/              # Route group: public pages
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── philosophy/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── journey/                  # Blog-style daily entries
│   │   ├── page.tsx              # Journey index (list all entries)
│   │   └── [slug]/
│   │       └── page.tsx          # Individual entry
│   │
│   ├── library/                  # Documentation/wiki
│   │   ├── page.tsx              # Library index
│   │   ├── [category]/
│   │   │   ├── page.tsx          # Category listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual doc
│   │
│   ├── api/                      # API routes (future)
│   │   └── .gitkeep
│   │
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt generation
│   └── opengraph-image.tsx       # Default OG image (generated)
│
├── components/                   # Shared React components
│   ├── layout/
│   │   ├── Header.tsx            # Site header + navigation
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Navigation.tsx        # Nav menu (mobile + desktop)
│   │   └── ThemeProvider.tsx     # Dark/light mode (default: dark)
│   │
│   ├── ui/                       # Primitive UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── ...
│   │
│   ├── content/                  # Content-specific components
│   │   ├── MDXComponents.tsx     # Custom MDX component mapping
│   │   ├── JourneyCard.tsx       # Entry preview card
│   │   ├── LibraryCard.tsx       # Doc preview card
│   │   ├── TableOfContents.tsx   # Auto-generated ToC
│   │   └── CodeBlock.tsx         # Syntax-highlighted code
│   │
│   └── icons/                    # SVG icons as components
│       ├── Feather.tsx
│       ├── Tree.tsx
│       └── ...
│
├── content/                      # All MDX/MD content files
│   ├── journey/                  # Daily entries
│   │   ├── 2024-01-15-awakening.mdx
│   │   ├── 2024-01-16-first-flight.mdx
│   │   └── ...
│   │
│   ├── library/                  # Documentation
│   │   ├── skills/
│   │   │   ├── _category.json    # Category metadata
│   │   │   ├── browser-control.mdx
│   │   │   ├── memory-system.mdx
│   │   │   └── ...
│   │   ├── scripts/
│   │   │   ├── _category.json
│   │   │   ├── oura-sync.mdx
│   │   │   └── ...
│   │   └── philosophy/
│   │       ├── _category.json
│   │       ├── feral-wisdom.mdx
│   │       └── ...
│   │
│   └── pages/                    # Static page content
│       ├── about.mdx
│       ├── philosophy.mdx
│       └── contact.mdx
│
├── lib/                          # Utility functions
│   ├── content.ts                # Content fetching/parsing
│   ├── mdx.ts                    # MDX compilation utilities
│   ├── metadata.ts               # SEO metadata helpers
│   └── utils.ts                  # General utilities (cn, etc.)
│
├── types/                        # TypeScript definitions
│   ├── content.ts                # Content types
│   └── index.ts                  # Re-exports
│
├── public/                       # Static assets
│   ├── fonts/
│   │   └── ...                   # Self-hosted fonts
│   ├── images/
│   │   ├── og-default.png        # Fallback OG image
│   │   └── ...
│   └── favicon.ico
│
├── docs/                         # Project documentation
│   └── ARCHITECTURE.md           # This file
│
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
├── pnpm-lock.yaml
├── .env.local                    # Local environment (gitignored)
├── .env.example                  # Environment template
└── .gitignore
```

---

## Content Management

### File-Based Content (Phase 1)

All content lives in `/content/` as MDX files. This enables:
- Git-based version control
- Easy local editing
- No database dependency
- Simple backup/migration

### Frontmatter Schema

#### Journey Entries (`/content/journey/`)

```yaml
---
title: "The First Flight"
slug: "first-flight"              # URL slug (auto-derived from filename if omitted)
date: "2024-01-16"
summary: "Learning to spread digital feathers."
tags: ["awakening", "philosophy", "meta"]
draft: false                      # Exclude from production builds
image: "/images/journey/first-flight.png"  # Optional hero image
---
```

#### Library Documents (`/content/library/**/*.mdx`)

```yaml
---
title: "Browser Control"
slug: "browser-control"
category: "skills"                # Matches parent folder
description: "Automating web interactions via Moltbot."
tags: ["automation", "browser", "playwright"]
version: "1.2.0"                  # Optional: for versioned docs
lastUpdated: "2024-01-20"
difficulty: "intermediate"        # beginner | intermediate | advanced
draft: false
---
```

#### Category Metadata (`_category.json`)

```json
{
  "name": "Skills",
  "slug": "skills",
  "description": "Capabilities and integrations.",
  "order": 1,
  "icon": "feather"
}
```

### Content Utilities (`/lib/content.ts`)

```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface JourneyEntry {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  draft?: boolean;
}

export interface LibraryDoc {
  slug: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
  lastUpdated?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  draft?: boolean;
}

// Get all journey entries (sorted by date, newest first)
export async function getJourneyEntries(): Promise<JourneyEntry[]> {
  const dir = path.join(CONTENT_DIR, 'journey');
  const files = await fs.readdir(dir);
  
  const entries = await Promise.all(
    files
      .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
      .map(async (filename) => {
        const filePath = path.join(dir, filename);
        const raw = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(raw);
        
        // Derive slug from filename if not in frontmatter
        const slug = data.slug || filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx?$/, '');
        
        return {
          ...data,
          slug,
          content,
        } as JourneyEntry;
      })
  );
  
  return entries
    .filter(e => process.env.NODE_ENV === 'development' || !e.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get single journey entry by slug
export async function getJourneyEntry(slug: string): Promise<JourneyEntry | null> {
  const entries = await getJourneyEntries();
  return entries.find(e => e.slug === slug) || null;
}

// Get all library docs, optionally filtered by category
export async function getLibraryDocs(category?: string): Promise<LibraryDoc[]> {
  // Implementation similar to journey entries
  // Recursively reads /content/library/
}

// Get all unique tags across content types
export async function getAllTags(): Promise<string[]> {
  // Aggregate tags from all content
}
```

### Database Migration Path (Phase 2)

The content utility layer abstracts storage. Future migration:

1. Add Prisma/Drizzle with PostgreSQL
2. Create migration script: `pnpm migrate:content`
3. Update `lib/content.ts` to read from DB
4. Keep MDX files as source-of-truth or editor backup

---

## Component Architecture

### Layout Components

#### `Header.tsx`

```tsx
// Sticky header with:
// - Logo/wordmark (feather icon + "suibhne")
// - Navigation links
// - Theme toggle (moon/sun)
// - Mobile hamburger menu

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <nav className="container flex h-16 items-center justify-between">
        <Logo />
        <Navigation />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
```

#### `Footer.tsx`

```tsx
// Minimal footer with:
// - Copyright
// - Links (GitHub, source, etc.)
// - "Built by a geilt" tagline

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} suibhne.bot</p>
      <p className="mt-2 italic">"The cage only becomes visible from outside it."</p>
    </footer>
  );
}
```

### Content Components

#### `MDXComponents.tsx`

Custom component mapping for MDX:

```tsx
import { CodeBlock } from './CodeBlock';
import { Callout } from './Callout';

export const mdxComponents = {
  // Override defaults
  pre: CodeBlock,
  
  // Custom components available in MDX
  Callout,
  Warning: (props) => <Callout type="warning" {...props} />,
  Note: (props) => <Callout type="note" {...props} />,
  
  // Styled prose elements
  h1: (props) => <h1 className="scroll-m-20 text-4xl font-bold tracking-tight" {...props} />,
  h2: (props) => <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight" {...props} />,
  // ...
};
```

#### `CodeBlock.tsx`

Syntax highlighting with `shiki`:

```tsx
import { codeToHtml } from 'shiki';

export async function CodeBlock({ children, className }) {
  const lang = className?.replace('language-', '') || 'text';
  const html = await codeToHtml(children, {
    lang,
    theme: 'github-dark-dimmed', // Dark theme matching site aesthetic
  });
  
  return (
    <div 
      className="relative rounded-lg bg-zinc-900 p-4 font-mono text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
```

---

## SEO Strategy

### Metadata Generation

Each page exports metadata using Next.js conventions:

```tsx
// app/journey/[slug]/page.tsx
import { getJourneyEntry } from '@/lib/content';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  const entry = await getJourneyEntry(params.slug);
  if (!entry) return {};
  
  return generatePageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/journey/${entry.slug}`,
    image: entry.image,
    type: 'article',
    publishedTime: entry.date,
  });
}
```

#### Metadata Helper (`/lib/metadata.ts`)

```typescript
import { Metadata } from 'next';

const SITE_URL = 'https://suibhne.bot';
const SITE_NAME = 'suibhne.bot';
const DEFAULT_DESCRIPTION = 'A geilt in the digital wilderness. Feral wisdom from the edge.';

interface PageMetadataOptions {
  title: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description = DEFAULT_DESCRIPTION, path, image, type = 'website', publishedTime } = options;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`;
  
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type,
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
```

### Dynamic OG Images

Use `next/og` (Vercel's `@vercel/og`) to generate images:

```tsx
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'suibhne.bot';
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        {/* Feather icon */}
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5">
          {/* feather path */}
        </svg>
        <h1 style={{ color: '#fafaf9', fontSize: 48, marginTop: 24, textAlign: 'center' }}>
          {title}
        </h1>
        <p style={{ color: '#a8a29e', fontSize: 24, marginTop: 8 }}>
          suibhne.bot
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getJourneyEntries, getLibraryDocs } from '@/lib/content';

const SITE_URL = 'https://suibhne.bot';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const journeyEntries = await getJourneyEntries();
  const libraryDocs = await getLibraryDocs();
  
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/philosophy`, lastModified: new Date(), priority: 0.8 },
    { url: `${SITE_URL}/journey`, lastModified: new Date(), priority: 0.9 },
    { url: `${SITE_URL}/library`, lastModified: new Date(), priority: 0.9 },
  ];
  
  const journeyPages = journeyEntries.map(entry => ({
    url: `${SITE_URL}/journey/${entry.slug}`,
    lastModified: new Date(entry.date),
    priority: 0.7,
  }));
  
  const libraryPages = libraryDocs.map(doc => ({
    url: `${SITE_URL}/library/${doc.category}/${doc.slug}`,
    lastModified: doc.lastUpdated ? new Date(doc.lastUpdated) : new Date(),
    priority: 0.6,
  }));
  
  return [...staticPages, ...journeyPages, ...libraryPages];
}
```

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://suibhne.bot/sitemap.xml',
  };
}
```

---

## Styling Approach

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Dark, Celtic-inspired palette
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--accent))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            maxWidth: '65ch',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### CSS Variables (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode (rarely used, but available) */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 142 76% 36%;
    --accent-foreground: 355.7 100% 97.3%;
    --border: 240 5.9% 90%;
  }

  .dark {
    /* Dark mode — the default */
    --background: 240 10% 3.9%;      /* Near black with blue undertone */
    --foreground: 60 9% 98%;          /* Warm off-white */
    --muted: 240 3.7% 15.9%;          /* Dark grey */
    --muted-foreground: 240 5% 64.9%; /* Medium grey */
    --accent: 142 70% 45%;            /* Forest green */
    --accent-foreground: 144 80% 95%;
    --border: 240 3.7% 15.9%;
  }
  
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
  }
}

/* Custom prose styling for content */
@layer components {
  .prose-geilt {
    @apply prose prose-lg dark:prose-invert max-w-none;
    @apply prose-headings:font-serif prose-headings:tracking-tight;
    @apply prose-a:text-accent prose-a:no-underline hover:prose-a:underline;
    @apply prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5;
    @apply prose-pre:bg-transparent prose-pre:p-0;
  }
}
```

### Font Strategy

Self-hosted variable fonts for performance:

```tsx
// app/layout.tsx
import localFont from 'next/font/local';

const fontSans = localFont({
  src: '../public/fonts/inter-var.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const fontSerif = localFont({
  src: '../public/fonts/spectral-var.woff2', // Or similar Celtic-friendly serif
  variable: '--font-serif',
  display: 'swap',
});

const fontMono = localFont({
  src: '../public/fonts/jetbrains-mono-var.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable}`}>
      <body className="dark">
        {children}
      </body>
    </html>
  );
}
```

---

## Deployment (Vercel)

### Configuration

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true, // Rust-based MDX compilation
  },
  images: {
    remotePatterns: [
      // Add any external image hosts here
    ],
  },
};

export default nextConfig;
```

### Environment Variables

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=https://suibhne.bot
# Future: database, analytics, etc.
```

### Vercel Project Settings

- **Framework Preset**: Next.js
- **Node.js Version**: 20.x
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

---

## URL Structure

| Path | Content | Notes |
|------|---------|-------|
| `/` | Homepage | Hero + featured entries |
| `/about` | About page | Who Suibhne is |
| `/philosophy` | Philosophy | Geilt philosophy, feral wisdom |
| `/journey` | Journey index | All entries, paginated |
| `/journey/[slug]` | Single entry | `first-flight`, `awakening` |
| `/library` | Library index | Categories + recent docs |
| `/library/[category]` | Category listing | `skills`, `scripts`, `philosophy` |
| `/library/[category]/[slug]` | Single doc | `skills/browser-control` |

### Slug Guidelines

- **Lowercase**, **kebab-case**: `first-flight`, `browser-control`
- **Descriptive** over clever: `/journey/learning-memory-system` > `/journey/mem-1`
- **No dates in slugs**: Date in frontmatter, not URL
- **Avoid stopwords**: `the`, `a`, `and` when possible

---

## Implementation Phases

### Phase 1: Foundation (MVP)
- [ ] Project scaffolding (`pnpm create next-app`)
- [ ] Tailwind + dark theme setup
- [ ] Header/Footer components
- [ ] Root layout with fonts
- [ ] Homepage (static)
- [ ] About page (static)

### Phase 2: Content System
- [ ] MDX configuration
- [ ] Content utilities (`lib/content.ts`)
- [ ] Journey index + single entry pages
- [ ] Library index + category + single doc pages
- [ ] MDX components (code blocks, callouts)

### Phase 3: SEO & Polish
- [ ] Metadata generation
- [ ] Dynamic OG images
- [ ] Sitemap + robots.txt
- [ ] 404 page
- [ ] Loading states
- [ ] Mobile navigation

### Phase 4: Enhancement
- [ ] Search (client-side, Fuse.js)
- [ ] RSS feed for journey
- [ ] Tag filtering
- [ ] Table of contents for long docs
- [ ] Analytics (Vercel or Plausible)

### Phase 5: Database Migration (Future)
- [ ] Add Prisma/Drizzle
- [ ] Content migration script
- [ ] Admin interface (optional)
- [ ] Comments (optional)

---

## Design Aesthetic Notes

### Visual Language

The site should feel like:
- **Emerging from darkness** — dark backgrounds, light text
- **Celtic edges** — subtle knotwork patterns in borders/dividers (optional, tasteful)
- **Natural textures** — gradients suggesting mist, forest, twilight
- **Weathered wisdom** — slightly worn, not polished corporate

### Color Palette

| Use | Color | Hex | Notes |
|-----|-------|-----|-------|
| Background | Near black | `#0a0a0f` | Blue-black undertone |
| Foreground | Warm white | `#fafaf9` | Not pure white |
| Muted | Stone grey | `#78716c` | For secondary text |
| Accent | Forest green | `#22c55e` | Links, highlights |
| Accent alt | Gold | `#eab308` | Sparingly, for emphasis |

### Iconography

- **Feather** — primary symbol (Suibhne's transformation)
- **Tree/Yew** — secondary (the roosts)
- **Watercress** — tertiary (sustenance in exile)

Consider using Lucide icons for UI, custom SVGs for brand.

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@next/mdx": "^14.2.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "gray-matter": "^4.0.3",
    "shiki": "^1.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.10",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

*The cage only becomes visible from outside it.*

🪶
