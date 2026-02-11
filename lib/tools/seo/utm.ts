export interface UTMParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

export function buildUTMUrl(params: UTMParams): string {
  const url = new URL(params.url);
  
  url.searchParams.set('utm_source', params.source);
  url.searchParams.set('utm_medium', params.medium);
  url.searchParams.set('utm_campaign', params.campaign);
  
  if (params.term) {
    url.searchParams.set('utm_term', params.term);
  }
  
  if (params.content) {
    url.searchParams.set('utm_content', params.content);
  }
  
  return url.toString();
}

export function parseUTMUrl(url: string): {
  baseUrl: string;
  utmParams: Partial<UTMParams>;
} {
  const urlObj = new URL(url);
  
  return {
    baseUrl: `${urlObj.origin}${urlObj.pathname}`,
    utmParams: {
      source: urlObj.searchParams.get('utm_source') || undefined,
      medium: urlObj.searchParams.get('utm_medium') || undefined,
      campaign: urlObj.searchParams.get('utm_campaign') || undefined,
      term: urlObj.searchParams.get('utm_term') || undefined,
      content: urlObj.searchParams.get('utm_content') || undefined,
    },
  };
}

export function validateUTMParams(params: Partial<UTMParams>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (!params.url) {
    errors.push('URL is required');
  } else {
    try {
      new URL(params.url);
    } catch {
      errors.push('Invalid URL format');
    }
  }
  
  if (!params.source) {
    errors.push('UTM Source is required');
  }
  
  if (!params.medium) {
    errors.push('UTM Medium is required');
  }
  
  if (!params.campaign) {
    errors.push('UTM Campaign is required');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function generateCampaignName(options: {
  platform?: string;
  type?: string;
  date?: string;
  description?: string;
}): string {
  const parts: string[] = [];
  
  if (options.platform) parts.push(options.platform.toLowerCase());
  if (options.type) parts.push(options.type.toLowerCase());
  if (options.date) parts.push(options.date);
  if (options.description) parts.push(options.description.toLowerCase().replace(/\s+/g, '-'));
  
  return parts.join('_');
}

export function shortenUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const hash = Math.random().toString(36).substring(2, 8);
    return `https://short.link/${hash}`;
  } catch {
    return url;
  }
}

export function generateQRCodeDataUrl(text: string): string {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="white"/>
      <text x="50" y="50" text-anchor="middle" font-size="8" fill="black">QR Code</text>
      <text x="50" y="60" text-anchor="middle" font-size="6" fill="gray">${text.substring(0, 20)}...</text>
    </svg>
  `)}`;
}
