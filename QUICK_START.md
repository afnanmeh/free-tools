# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
cd /var/www/html/tools
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 What You'll See

### Homepage (/)
- Bold landing page
- "Explore Dev Tools" button

### Dev Tools Index (/dev-tools)
- Lists all 32 tools
- Grouped by subcategory:
  - JSON Tools (8 tools)
  - JWT & Security (7 tools)
  - Regex Tools (7 tools)
  - Code Utilities (10 tools)

### Example Tool Pages (Fully Built)
1. **/dev-tools/json-tools/json-formatter** - Format JSON with Monaco editor
2. **/dev-tools/jwt-security/jwt-decoder** - Decode JWT tokens offline
3. **/dev-tools/regex-tools/regex-tester** - Test regex patterns live
4. **/dev-tools/json-tools/json-to-yaml** - Convert JSON to YAML
5. **/dev-tools/jwt-security/base64-encode-decode** - Base64 encoding
6. **/dev-tools/code-utilities/html-minifier** - Minify HTML code

## 📝 Add Your First Tool (10 Minutes)

### 1. Add to Config
Edit `config/tools.config.ts`:

```typescript
{
  id: 'url-encoder',
  name: 'URL Encoder/Decoder',
  description: 'Encode and decode URLs',
  path: '/dev-tools/code-utilities/url-encoder',
  category: 'dev-tools',
  subcategory: 'code-utilities',
  keywords: ['url', 'encode', 'decode'],
}
```

### 2. Create Logic (Optional)
Create `lib/tools/code/url-utils.ts`:

```typescript
export function encodeUrl(url: string): string {
  return encodeURIComponent(url);
}

export function decodeUrl(url: string): string {
  return decodeURIComponent(url);
}
```

### 3. Create Page
Create `app/dev-tools/code-utilities/url-encoder/page.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Stack, Group, Button } from '@mantine/core';
import { ToolLayout } from '@/components/layout/ToolLayout';
import { ToolHeader } from '@/components/tool/ToolHeader';
import { TextAreaEditor } from '@/components/editors/TextAreaEditor';
import { CopyButton } from '@/components/shared/CopyButton';
import { encodeUrl, decodeUrl } from '@/lib/tools/code/url-utils';

export default function UrlEncoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = () => {
    const result = mode === 'encode' ? encodeUrl(input) : decodeUrl(input);
    setOutput(result);
  };

  return (
    <ToolLayout>
      <ToolHeader
        title="URL ENCODER/DECODER"
        description="Encode and decode URLs"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dev Tools', href: '/dev-tools' },
          { label: 'Code Utilities', href: '/dev-tools/code-utilities' },
          { label: 'URL Encoder', href: '/dev-tools/code-utilities/url-encoder' },
        ]}
      />

      <Stack gap="xl">
        <Stack gap="md">
          <Group justify="space-between">
            <div style={{ color: '#fff', fontWeight: 700 }}>INPUT</div>
            <Button onClick={handleProcess}>
              {mode === 'encode' ? 'ENCODE' : 'DECODE'}
            </Button>
          </Group>
          <TextAreaEditor value={input} onChange={setInput} />
        </Stack>

        {output && (
          <Stack gap="md">
            <Group justify="space-between">
              <div style={{ color: '#fff', fontWeight: 700 }}>OUTPUT</div>
              <CopyButton text={output} />
            </Group>
            <TextAreaEditor value={output} onChange={() => {}} readOnly />
          </Stack>
        )}
      </Stack>
    </ToolLayout>
  );
}
```

### 4. Test
Visit [http://localhost:3000/dev-tools/code-utilities/url-encoder](http://localhost:3000/dev-tools/code-utilities/url-encoder)

Done! Your tool is live.

## 🎨 Customize the Theme

Edit `config/theme.ts`:

```typescript
export const theme: MantineThemeOverride = {
  primaryColor: 'violet', // Change to 'blue', 'green', etc.
  // ... other theme options
};
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build command: `npm run build`
2. Publish directory: `.next`

### Docker
```bash
docker build -t tools-app .
docker run -p 3000:3000 tools-app
```

## 🔧 Common Tasks

### Add New Category
1. Edit `config/tools.config.ts` - add to `CATEGORIES`
2. Create `app/[category]/page.tsx`
3. Update `components/layout/SiteHeader.tsx`

### Change Colors
Edit `config/theme.ts` - update `colors` object

### Add More Tools
Just repeat the "Add Your First Tool" steps above!

## 📚 Learn More

- **README.md** - Complete documentation
- **ARCHITECTURE.md** - Deep dive into architecture
- **INSTALLATION.md** - Detailed setup guide
- **PROJECT_SUMMARY.md** - Project overview

## 🆘 Troubleshooting

### TypeScript Errors
All errors are expected until you run `npm install`

### Port 3000 Busy
```bash
PORT=3001 npm run dev
```

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 💡 Pro Tips

1. **Copy existing tools** - Don't start from scratch
2. **Use TypeScript** - Catch errors early
3. **Test locally first** - Before deploying
4. **Keep it simple** - Client-side only
5. **Follow the patterns** - Consistency is key

---

**You're ready to build! Start adding tools and scale to 100+.**
