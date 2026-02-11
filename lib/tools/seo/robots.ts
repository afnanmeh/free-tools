export function generateRobotsTxt(options: {
  allowAll?: boolean;
  disallowAll?: boolean;
  customRules?: string[];
  sitemapUrl?: string;
}): string {
  let content = '';

  if (options.allowAll) {
    content += 'User-agent: *\n';
    content += 'Allow: /\n';
  } else if (options.disallowAll) {
    content += 'User-agent: *\n';
    content += 'Disallow: /\n';
  } else if (options.customRules && options.customRules.length > 0) {
    content += 'User-agent: *\n';
    options.customRules.forEach(rule => {
      content += `${rule}\n`;
    });
  } else {
    content += 'User-agent: *\n';
    content += 'Disallow:\n';
  }

  if (options.sitemapUrl) {
    content += `\nSitemap: ${options.sitemapUrl}\n`;
  }

  return content;
}

export function generateMetaRobots(options: {
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
}): string {
  const directives: string[] = [];

  if (options.noindex) directives.push('noindex');
  if (options.nofollow) directives.push('nofollow');
  if (options.noarchive) directives.push('noarchive');
  if (options.nosnippet) directives.push('nosnippet');

  if (directives.length === 0) {
    return '<meta name="robots" content="index, follow" />';
  }

  return `<meta name="robots" content="${directives.join(', ')}" />`;
}

export function checkNoindexNofollow(html: string): {
  hasNoindex: boolean;
  hasNofollow: boolean;
  metaTags: string[];
} {
  const metaTags: string[] = [];
  const metaRegex = /<meta[^>]*name=["']robots["'][^>]*>/gi;
  const matches = html.match(metaRegex) || [];

  let hasNoindex = false;
  let hasNofollow = false;

  matches.forEach(tag => {
    metaTags.push(tag);
    if (/noindex/i.test(tag)) hasNoindex = true;
    if (/nofollow/i.test(tag)) hasNofollow = true;
  });

  return { hasNoindex, hasNofollow, metaTags };
}

export function generateCanonicalTag(url: string): string {
  return `<link rel="canonical" href="${url}" />`;
}

export function generateSitemap(urls: string[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

export function checkDisallowPath(robotsTxt: string, path: string): {
  isDisallowed: boolean;
  matchingRule?: string;
} {
  const lines = robotsTxt.split('\n');
  let currentUserAgent = '';
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.toLowerCase().startsWith('user-agent:')) {
      currentUserAgent = trimmed.split(':')[1].trim();
    }
    
    if (trimmed.toLowerCase().startsWith('disallow:') && (currentUserAgent === '*' || currentUserAgent === '')) {
      const disallowPath = trimmed.split(':')[1].trim();
      if (disallowPath && path.startsWith(disallowPath)) {
        return { isDisallowed: true, matchingRule: trimmed };
      }
    }
  }
  
  return { isDisallowed: false };
}

export function validateRobotsTxt(content: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const lines = content.split('\n');

  let hasUserAgent = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (trimmed.toLowerCase().startsWith('user-agent:')) {
      hasUserAgent = true;
    } else if (trimmed.toLowerCase().startsWith('disallow:') || trimmed.toLowerCase().startsWith('allow:')) {
      if (!hasUserAgent) {
        errors.push(`Line ${index + 1}: Disallow/Allow directive without User-agent`);
      }
    } else if (trimmed.toLowerCase().startsWith('sitemap:')) {
      const url = trimmed.split(':').slice(1).join(':').trim();
      if (!url.startsWith('http')) {
        warnings.push(`Line ${index + 1}: Sitemap URL should be absolute`);
      }
    } else if (trimmed.includes(':')) {
      const directive = trimmed.split(':')[0].toLowerCase();
      if (!['user-agent', 'disallow', 'allow', 'sitemap', 'crawl-delay'].includes(directive)) {
        warnings.push(`Line ${index + 1}: Unknown directive "${directive}"`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
