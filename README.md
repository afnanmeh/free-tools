# Free Online Tools for Developers & Marketers

A scalable, SEO-focused tools website built with Next.js 14 (App Router), TypeScript, and Mantine UI.

## 🎯 Project Overview

This project is architected for **extreme scalability** - designed to grow from a handful of tools to 100+ tools across multiple categories without requiring refactoring.

### Current Status
- ✅ **Dev Tools Category** - Fully implemented with 32 tools
- 🔜 **SEO Tools** - Ready to add
- 🔜 **Marketing Tools** - Ready to add
- 🔜 **Calculators** - Ready to add

## 🏗️ Architecture

### Design Principles
1. **Centralized Configuration** - All tools, categories, and routes defined in `config/tools.config.ts`
2. **Reusable Components** - Shared layouts, editors, and UI components
3. **Type Safety** - Full TypeScript coverage
4. **Client-Side Only** - No database, no backend, no APIs
5. **SEO Optimized** - Metadata generation for every page

### Project Structure

```
/app
  /layout.tsx                    # Root layout with Mantine provider
  /page.tsx                      # Homepage
  /dev-tools
    /page.tsx                    # Dev tools index (lists all tools)
    /json-tools
      /json-formatter
        /page.tsx                # Individual tool page
      /json-to-yaml
        /page.tsx
      ... (more JSON tools)
    /jwt-security
      /jwt-decoder
        /page.tsx
      ... (more JWT tools)
    /regex-tools
      /regex-tester
        /page.tsx
      ... (more regex tools)
    /code-utilities
      ... (code tools)

/components
  /layout
    /SiteHeader.tsx              # Global header
    /ToolLayout.tsx              # Wrapper for tool pages
  /tool
    /ToolHeader.tsx              # Tool page header with breadcrumbs
    /ToolCard.tsx                # Tool card for listings
  /editors
    /CodeEditor.tsx              # Monaco editor wrapper
    /TextAreaEditor.tsx          # Styled textarea
  /shared
    /CopyButton.tsx              # Copy to clipboard
    /ErrorAlert.tsx              # Error display

/lib
  /tools
    /json
      /converters.ts             # JSON conversion logic
    /jwt
      /decoder.ts                # JWT decoding logic
    /security
      /encoders.ts               # Encoding/hashing functions
    /regex
      /patterns.ts               # Regex utilities
    /code
      /minifiers.ts              # Code minification/formatting

/config
  /tools.config.ts               # ⭐ CENTRAL CONFIGURATION
  /theme.ts                      # Mantine theme (bold, high-contrast)
```

## 🎨 Design System

### Bold, High-Contrast UI
- **NO gradients**
- **NO glassmorphism**
- **Flat design only**
- **Bold typography** (900 weight headings)
- **Large font scale**
- **Strong color contrast**

### Colors
- Primary: Violet (#7c00f0)
- Background: Black (#000, #0a0a0a, #111)
- Borders: Dark gray (#222, #333)
- Text: White (#fff) / Gray (#999, #aaa)

### Typography
- Headings: 900 weight, tight letter-spacing
- Body: Clean, readable
- Code: Monospace with syntax highlighting

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## 📦 Dependencies

### Core
- **Next.js 14** - App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Mantine UI 7** - Component library

### Tools
- **Monaco Editor** - Code editor with syntax highlighting
- **js-yaml** - YAML parsing
- **jsonwebtoken** - JWT decoding
- **smol-toml** - TOML parsing

## 🔧 Adding New Tools

### 1. Add Tool to Configuration

Edit `config/tools.config.ts`:

```typescript
export const TOOLS: Tool[] = [
  // ... existing tools
  {
    id: 'my-new-tool',
    name: 'My New Tool',
    description: 'Description of what it does',
    path: '/dev-tools/json-tools/my-new-tool',
    category: 'dev-tools',
    subcategory: 'json-tools',
    keywords: ['keyword1', 'keyword2'],
  },
];
```

### 2. Create Tool Logic (Optional)

Add business logic in `lib/tools/[category]/`:

```typescript
// lib/tools/json/my-logic.ts
export function myToolFunction(input: string): string {
  // Your logic here
  return output;
}
```

### 3. Create Tool Page

Create `app/dev-tools/[subcategory]/[tool-id]/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
// ... import other components

export default function MyToolPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <ToolLayout>
      <ToolHeader
        title="MY TOOL NAME"
        description="Tool description"
        breadcrumbs={[...]}
      />
      {/* Your tool UI */}
    </ToolLayout>
  );
}
```

### 4. Add Metadata (SEO)

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Tool - Free Online Tools',
  description: 'Description for SEO',
  keywords: ['keyword1', 'keyword2'],
};
```

## 🌟 Adding New Categories

### 1. Update Configuration

Add to `config/tools.config.ts`:

```typescript
export const CATEGORIES: Record<string, Category> = {
  'dev-tools': { /* existing */ },
  'seo-tools': {
    id: 'seo-tools',
    name: 'SEO Tools',
    description: 'SEO optimization tools',
    path: '/seo-tools',
    subcategories: [
      {
        id: 'keyword-research',
        name: 'Keyword Research',
        description: 'Keyword analysis tools',
        path: '/seo-tools/keyword-research',
        icon: '🔍',
      },
    ],
  },
};
```

### 2. Create Category Page

Create `app/seo-tools/page.tsx` (copy structure from `app/dev-tools/page.tsx`)

### 3. Update Header Navigation

Edit `components/layout/SiteHeader.tsx` to add new category link

## 🛠️ Available Tools

### JSON / Data Tools (8 tools)
- JSON → YAML Converter
- YAML → JSON Converter
- JSON → TOML Converter
- JSON Formatter / Prettifier
- JSON Minifier
- JSON Validator
- CSV → JSON Converter
- JSON Diff Checker

### JWT & Security Tools (7 tools)
- JWT Decoder (offline)
- JWT Expiry Checker
- Base64 Encode / Decode
- SHA256 Hash Generator
- MD5 Hash Generator
- Password Strength Checker
- Random String Generator

### Regex Tools (7 tools)
- Regex Tester
- Regex Cheatsheet
- Regex Generator
- Regex Replace Tool
- Regex Visualizer
- Regex for HTML Tags
- Regex for Numbers

### Code Utilities (10 tools)
- HTML Minifier
- CSS Minifier
- JavaScript Minifier
- HTML Formatter
- CSS Formatter
- JavaScript Formatter
- HTML Encoder / Decoder
- CSS to Inline Style Converter

## 🎯 Key Features

### Scalability
- **Centralized config** - Add tools without touching routing
- **Reusable components** - Consistent UI across all tools
- **Type-safe** - Catch errors at compile time
- **Modular logic** - Separate business logic from UI

### Performance
- **Client-side only** - No server calls
- **Instant results** - All processing in browser
- **Code splitting** - Only load what's needed
- **Optimized bundle** - Tree-shaking and minification

### SEO
- **Metadata per page** - Unique titles and descriptions
- **Semantic HTML** - Proper heading hierarchy
- **Internal linking** - Breadcrumbs and navigation
- **Keywords** - Relevant keywords per tool

### UX
- **Bold design** - High contrast, easy to read
- **Clear hierarchy** - Visual organization
- **Error handling** - Helpful error messages
- **Copy buttons** - Easy result copying
- **Keyboard friendly** - Accessible interactions

## 📝 Code Style

- **Client components** - Use `'use client'` directive
- **TypeScript** - Full type coverage
- **Functional** - React hooks, no classes
- **Consistent naming** - PascalCase for components
- **Modular** - Small, focused files

## 🔮 Future Expansion

The architecture supports easy addition of:
- **SEO Tools** - Meta tag generators, schema markup, etc.
- **Marketing Tools** - UTM builders, email validators, etc.
- **Calculators** - ROI, conversion rate, etc.
- **Image Tools** - Compression, conversion, etc.
- **Text Tools** - Word count, case converters, etc.

Simply add to `config/tools.config.ts` and create the pages!

## 📄 License

MIT

## 🤝 Contributing

This is a scalable foundation. To contribute:
1. Add tools to the config
2. Create reusable logic in `/lib`
3. Build tool pages using existing components
4. Maintain the bold, high-contrast design system

---

**Built with ❤️ for developers and marketers**
