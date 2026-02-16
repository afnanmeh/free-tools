# Theme Fix Patterns - Quick Reference

## Search & Replace Patterns

### Pattern 1: Main Container
```tsx
// FIND:
style={{
  background: 'rgba(26,26,26,0.6)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.1)',
  // ... other styles
}}

// REPLACE WITH:
className="tool-container"
style={{
  // ... keep only layout styles (padding, borderRadius, margin, etc.)
}}
```

### Pattern 2: Input/Output Areas
```tsx
// FIND:
style={{ background: '#0a0a0a', color: '#fff', border: '1px solid #333' }}

// REPLACE WITH:
className="tool-input-area"
style={{ /* layout only */ }}
```

### Pattern 3: Result Boxes
```tsx
// FIND:
style={{ background: '#1a1a1a', color: '#fff' }}

// REPLACE WITH:
className="tool-result"
```

### Pattern 4: Text Colors
```tsx
// FIND: style={{ color: '#fff' }}
// REPLACE: className="tool-text-primary"

// FIND: style={{ color: '#aaa' }}
// REPLACE: className="tool-text-secondary"

// FIND: style={{ color: '#666' }}
// REPLACE: className="tool-text-muted"
```

### Pattern 5: Panels
```tsx
// FIND:
style={{ background: '#121212', border: '1px solid #222' }}

// REPLACE WITH:
className="tool-panel"
```

## Priority Order

1. **Homepage** (✅ DONE)
2. **Category Pages** (✅ DONE)
3. **High-Traffic Tools** (TODO)
   - JSON Formatter
   - JWT Decoder
   - Base64 Encoder
   - UTM Builder
   - Color Palette Generator
4. **Remaining Tools** (TODO - 70 files)
