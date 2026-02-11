export function calculateKeywordDensity(text: string, keyword: string): {
  count: number;
  density: number;
  totalWords: number;
} {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const keywordLower = keyword.toLowerCase();
  const count = words.filter(w => w.includes(keywordLower)).length;
  const density = words.length > 0 ? (count / words.length) * 100 : 0;
  
  return { count, density, totalWords: words.length };
}

export function calculateTitlePixelWidth(title: string): {
  pixelWidth: number;
  withinLimit: boolean;
  maxPixels: number;
} {
  const avgCharWidth = 10;
  const pixelWidth = title.length * avgCharWidth;
  const maxPixels = 600;
  const withinLimit = pixelWidth <= maxPixels;
  
  return { pixelWidth, withinLimit, maxPixels };
}

export function checkMetaDescriptionLength(description: string): {
  length: number;
  withinLimit: boolean;
  minLength: number;
  maxLength: number;
  status: 'short' | 'optimal' | 'long';
} {
  const length = description.length;
  const minLength = 150;
  const maxLength = 160;
  
  let status: 'short' | 'optimal' | 'long' = 'optimal';
  if (length < minLength) status = 'short';
  if (length > maxLength) status = 'long';
  
  return {
    length,
    withinLimit: length >= minLength && length <= maxLength,
    minLength,
    maxLength,
    status,
  };
}

export function estimatePageSpeedScore(params: {
  loadTimeSeconds: number;
  imageCount: number;
  scriptCount: number;
  cssCount: number;
}): {
  score: number;
  rating: 'poor' | 'needs improvement' | 'good' | 'excellent';
  suggestions: string[];
} {
  let score = 100;
  const suggestions: string[] = [];
  
  if (params.loadTimeSeconds > 3) {
    score -= 20;
    suggestions.push('Reduce page load time (currently > 3s)');
  }
  if (params.loadTimeSeconds > 5) {
    score -= 20;
  }
  
  if (params.imageCount > 20) {
    score -= 10;
    suggestions.push('Too many images, consider lazy loading');
  }
  
  if (params.scriptCount > 10) {
    score -= 10;
    suggestions.push('Too many scripts, consider bundling');
  }
  
  if (params.cssCount > 5) {
    score -= 5;
    suggestions.push('Consolidate CSS files');
  }
  
  let rating: 'poor' | 'needs improvement' | 'good' | 'excellent' = 'excellent';
  if (score < 50) rating = 'poor';
  else if (score < 70) rating = 'needs improvement';
  else if (score < 90) rating = 'good';
  
  return { score: Math.max(0, score), rating, suggestions };
}

export function estimateBacklinkValue(params: {
  domainAuthority: number;
  pageAuthority: number;
  isDofollow: boolean;
  relevance: number;
}): {
  value: number;
  quality: 'low' | 'medium' | 'high' | 'excellent';
} {
  let value = 0;
  
  value += params.domainAuthority * 0.4;
  value += params.pageAuthority * 0.3;
  value += params.isDofollow ? 20 : 5;
  value += params.relevance * 0.3;
  
  let quality: 'low' | 'medium' | 'high' | 'excellent' = 'low';
  if (value >= 80) quality = 'excellent';
  else if (value >= 60) quality = 'high';
  else if (value >= 40) quality = 'medium';
  
  return { value, quality };
}

export function countInternalLinks(html: string): {
  count: number;
  links: string[];
} {
  const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>/gi;
  const matches = html.matchAll(linkRegex);
  const links: string[] = [];
  
  for (const match of matches) {
    const href = match[1];
    if (!href.startsWith('http') && !href.startsWith('//')) {
      links.push(href);
    }
  }
  
  return { count: links.length, links };
}

export function checkCanonicalURL(html: string): {
  hasCanonical: boolean;
  canonicalURL?: string;
  count: number;
} {
  const canonicalRegex = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i;
  const match = html.match(canonicalRegex);
  
  if (match) {
    return {
      hasCanonical: true,
      canonicalURL: match[1],
      count: 1,
    };
  }
  
  return { hasCanonical: false, count: 0 };
}
