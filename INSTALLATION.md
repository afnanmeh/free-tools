# Installation & Setup Guide

## Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- A code editor (VS Code recommended)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Mantine UI 7
- Monaco Editor
- js-yaml, jsonwebtoken, smol-toml

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure Overview

```
/var/www/html/tools/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── dev-tools/               # Dev tools category
│       ├── page.tsx             # Category index
│       ├── json-tools/          # Subcategory
│       │   ├── json-formatter/
│       │   │   └── page.tsx     # Individual tool
│       │   └── ...
│       ├── jwt-security/
│       ├── regex-tools/
│       └── code-utilities/
├── components/                   # Reusable React components
│   ├── layout/                  # Layout components
│   ├── tool/                    # Tool-specific components
│   ├── editors/                 # Code/text editors
│   └── shared/                  # Shared UI components
├── lib/                         # Business logic
│   └── tools/                   # Tool processing functions
│       ├── json/
│       ├── jwt/
│       ├── security/
│       ├── regex/
│       └── code/
├── config/                      # Configuration files
│   ├── tools.config.ts          # Central tool configuration
│   └── theme.ts                 # Mantine theme
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── next.config.js              # Next.js config
└── README.md                   # Documentation
```

## Development Workflow

### Adding a New Tool

1. **Add to configuration** (`config/tools.config.ts`):

```typescript
{
  id: 'my-tool',
  name: 'My Tool Name',
  description: 'What the tool does',
  path: '/dev-tools/subcategory/my-tool',
  category: 'dev-tools',
  subcategory: 'json-tools',
  keywords: ['keyword1', 'keyword2'],
}
```

2. **Create business logic** (optional, in `lib/tools/`):

```typescript
// lib/tools/json/my-logic.ts
export function myFunction(input: string): string {
  // Your logic here
  return output;
}
```

3. **Create tool page** (`app/dev-tools/subcategory/my-tool/page.tsx`):

```tsx
'use client';

import { useState } from 'react';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
// ... other imports

export default function MyToolPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProcess = () => {
    try {
      setError(null);
      const result = myFunction(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
      setOutput('');
    }
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="MY TOOL"
        description="Tool description"
        breadcrumbs={[...]}
      />
      {/* Your UI here */}
    </ToolLayout>
  );
}
```

### Adding a New Category

1. **Update config** (`config/tools.config.ts`):

```typescript
export const CATEGORIES: Record<string, Category> = {
  // ... existing categories
  'seo-tools': {
    id: 'seo-tools',
    name: 'SEO Tools',
    description: 'SEO optimization tools',
    path: '/seo-tools',
    subcategories: [
      {
        id: 'meta-tags',
        name: 'Meta Tags',
        description: 'Meta tag generators',
        path: '/seo-tools/meta-tags',
        icon: '🏷️',
      },
    ],
  },
};
```

2. **Create category page** (`app/seo-tools/page.tsx`):

Copy the structure from `app/dev-tools/page.tsx` and adjust.

3. **Update navigation** (`components/layout/SiteHeader.tsx`):

Add link to new category.

## Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Type Checking
npm run type-check   # Check TypeScript types

# Linting
npm run lint         # Run ESLint
```

## Environment Variables

This project doesn't require environment variables as it's 100% client-side.

For future API integrations, create `.env.local`:

```bash
# Example for future use
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export (Optional)

For static hosting:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  // ... other config
}
```

Then:
```bash
npm run build
# Output in /out directory
```

## Troubleshooting

### TypeScript Errors

All TypeScript errors shown during development are expected until dependencies are installed. Run:

```bash
npm install
```

### Monaco Editor Not Loading

Monaco Editor is large (~2MB). If it's slow:

1. Use dynamic import with `{ ssr: false }`
2. Consider lazy loading only when needed
3. Or use TextAreaEditor for simpler tools

### Build Errors

If build fails:

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Port Already in Use

If port 3000 is busy:

```bash
# Use different port
PORT=3001 npm run dev
```

## Performance Tips

1. **Code Splitting**: Automatic per route
2. **Lazy Loading**: Use dynamic imports for heavy components
3. **Memoization**: Use `useMemo` for expensive operations
4. **Bundle Analysis**: 

```bash
npm install -D @next/bundle-analyzer
```

## IDE Setup (VS Code)

Recommended extensions:

- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense (if using Tailwind)

`.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Testing (Future)

To add testing:

```bash
npm install -D @testing-library/react @testing-library/jest-dom jest
```

Create test files alongside components:
```
ComponentName.tsx
ComponentName.test.tsx
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-tool`
3. Commit changes: `git commit -am 'Add my tool'`
4. Push to branch: `git push origin feature/my-tool`
5. Submit pull request

## Support

For issues or questions:
- Check README.md
- Check ARCHITECTURE.md
- Review existing tool implementations
- Open an issue on GitHub

## License

MIT License - See LICENSE file for details
