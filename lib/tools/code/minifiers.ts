export function minifyHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

export function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

export function minifyJs(js: string): string {
  return js
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
    .trim();
}

export function formatHtml(html: string): string {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  html.split(/(<[^>]+>)/g).forEach((part) => {
    if (!part.trim()) return;

    if (part.startsWith('</')) {
      indent--;
      formatted += tab.repeat(Math.max(0, indent)) + part + '\n';
    } else if (part.startsWith('<') && !part.endsWith('/>')) {
      formatted += tab.repeat(indent) + part + '\n';
      if (!part.startsWith('<!') && !part.match(/<(br|hr|img|input|meta|link)/i)) {
        indent++;
      }
    } else if (part.startsWith('<') && part.endsWith('/>')) {
      formatted += tab.repeat(indent) + part + '\n';
    } else {
      formatted += tab.repeat(indent) + part.trim() + '\n';
    }
  });

  return formatted.trim();
}

export function formatCss(css: string): string {
  return css
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/\s*}\s*/g, '\n}\n\n')
    .replace(/\s*;\s*/g, ';\n  ')
    .replace(/\s*,\s*/g, ',\n')
    .trim();
}

export function formatJs(js: string): string {
  let formatted = '';
  let indent = 0;
  const tab = '  ';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < js.length; i++) {
    const char = js[i];
    const nextChar = js[i + 1];

    if ((char === '"' || char === "'") && js[i - 1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === '{') {
        formatted += char + '\n';
        indent++;
        formatted += tab.repeat(indent);
      } else if (char === '}') {
        indent--;
        formatted += '\n' + tab.repeat(indent) + char;
        if (nextChar && nextChar !== ';' && nextChar !== ',') {
          formatted += '\n' + tab.repeat(indent);
        }
      } else if (char === ';') {
        formatted += char + '\n' + tab.repeat(indent);
      } else if (char === '\n' || char === '\r') {
        continue;
      } else {
        formatted += char;
      }
    } else {
      formatted += char;
    }
  }

  return formatted.trim();
}

export function encodeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function decodeHtml(text: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (m) => map[m]);
}

export function cssToInline(css: string): string {
  const rules = css.match(/[^{]+\{[^}]+\}/g) || [];
  let result = 'Convert CSS rules to inline styles:\n\n';

  rules.forEach((rule) => {
    const [selector, styles] = rule.split('{');
    const cleanStyles = styles.replace('}', '').trim();
    result += `${selector.trim()}: style="${cleanStyles}"\n`;
  });

  return result;
}
