export interface RegexMatch {
  match: string;
  index: number;
  groups?: string[];
}

export function testRegex(pattern: string, flags: string, testString: string): RegexMatch[] {
  const regex = new RegExp(pattern, flags);
  const matches: RegexMatch[] = [];

  if (flags.includes('g')) {
    let match;
    while ((match = regex.exec(testString)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1),
      });
    }
  } else {
    const match = regex.exec(testString);
    if (match) {
      matches.push({
        match: match[0],
        index: match.index,
        groups: match.slice(1),
      });
    }
  }

  return matches;
}

export function regexReplace(pattern: string, flags: string, testString: string, replacement: string): string {
  const regex = new RegExp(pattern, flags);
  return testString.replace(regex, replacement);
}

export const commonPatterns = {
  email: {
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    description: 'Email address',
  },
  url: {
    pattern: 'https?://[^\\s/$.?#].[^\\s]*',
    description: 'URL',
  },
  phone: {
    pattern: '\\+?[1-9]\\d{1,14}',
    description: 'International phone number',
  },
  ipv4: {
    pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b',
    description: 'IPv4 address',
  },
  date: {
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    description: 'Date (YYYY-MM-DD)',
  },
  hexColor: {
    pattern: '#[0-9a-fA-F]{6}',
    description: 'Hex color code',
  },
  creditCard: {
    pattern: '\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}',
    description: 'Credit card number',
  },
  username: {
    pattern: '[a-zA-Z0-9_-]{3,16}',
    description: 'Username (3-16 chars)',
  },
};

export function extractNumbers(text: string): string[] {
  const regex = /\d+(\.\d+)?/g;
  return text.match(regex) || [];
}

export function extractHtmlTags(html: string): string[] {
  const regex = /<\/?[a-z][\s\S]*?>/gi;
  return html.match(regex) || [];
}

export function removeHtmlTags(html: string): string {
  return html.replace(/<\/?[a-z][\s\S]*?>/gi, '');
}
