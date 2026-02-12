// SEO content data for tool pages
// This file contains reusable SEO content for different tool types

export interface ToolSEOData {
  whatItDoes: string;
  howItWorks: string[];
  benefits: string[];
  useCases: string[];
  faqs: Array<{ question: string; answer: string }>;
}

// Default SEO data that can be customized per tool
export const defaultToolSEO: Record<string, Partial<ToolSEOData>> = {
  'json-formatter': {
    whatItDoes: 'The JSON Formatter is a free online tool that beautifies and validates JSON data. It takes minified or poorly formatted JSON and transforms it into a clean, readable structure with proper indentation and syntax highlighting.',
    howItWorks: [
      'Paste your JSON data into the input field',
      'The tool automatically validates the JSON syntax',
      'Click format to beautify the JSON with proper indentation',
      'Copy the formatted output or download it as a file',
    ],
    benefits: [
      'Instant JSON validation and error detection',
      'Beautiful syntax highlighting for better readability',
      'Works completely offline in your browser',
      'No data is sent to any server - 100% private',
      'Supports large JSON files without performance issues',
      'Free forever with no registration required',
    ],
    useCases: [
      'Debugging API responses during development',
      'Formatting configuration files for better readability',
      'Validating JSON before deployment',
      'Learning JSON structure and syntax',
      'Cleaning up minified JSON from production',
    ],
    faqs: [
      {
        question: 'Is my JSON data secure?',
        answer: 'Yes, absolutely. All processing happens locally in your browser. Your JSON data never leaves your device and is not sent to any server.',
      },
      {
        question: 'Can I format large JSON files?',
        answer: 'Yes, the tool can handle large JSON files efficiently. However, extremely large files (>10MB) may take a few seconds to process depending on your device.',
      },
      {
        question: 'Does it validate JSON syntax?',
        answer: 'Yes, the tool automatically validates your JSON and highlights any syntax errors with helpful error messages.',
      },
      {
        question: 'Can I use this tool offline?',
        answer: 'Yes, once the page is loaded, the tool works completely offline. You can even bookmark it for quick access.',
      },
    ],
  },
  'jwt-decoder': {
    whatItDoes: 'The JWT Decoder is a free tool that decodes JSON Web Tokens (JWT) and displays the header, payload, and signature in a readable format. Perfect for debugging authentication issues and understanding JWT structure.',
    howItWorks: [
      'Paste your JWT token into the input field',
      'The tool automatically decodes the token',
      'View the decoded header and payload in JSON format',
      'Verify the token structure and claims',
    ],
    benefits: [
      'Instant JWT decoding without any setup',
      'View all token claims and metadata',
      'Completely secure - tokens never leave your browser',
      'Syntax highlighting for better readability',
      'Supports all standard JWT algorithms',
      'Free and no registration required',
    ],
    useCases: [
      'Debugging authentication and authorization issues',
      'Inspecting token expiration times',
      'Verifying token claims and permissions',
      'Learning about JWT structure',
      'Testing API authentication flows',
    ],
    faqs: [
      {
        question: 'Is it safe to decode my JWT here?',
        answer: 'Yes, completely safe. All decoding happens in your browser. Your JWT tokens are never sent to any server or stored anywhere.',
      },
      {
        question: 'Can this tool verify JWT signatures?',
        answer: 'This tool decodes and displays JWT content. For signature verification, you would need the secret key, which should never be shared or entered into online tools.',
      },
      {
        question: 'What JWT algorithms are supported?',
        answer: 'The decoder supports all standard JWT algorithms including HS256, HS384, HS512, RS256, RS384, RS512, ES256, ES384, and ES512.',
      },
    ],
  },
};

// Helper function to get SEO data for a tool
export function getToolSEOData(toolId: string): ToolSEOData | null {
  return defaultToolSEO[toolId] as ToolSEOData || null;
}

// Generic SEO data for tools without specific content
export function generateGenericToolSEO(toolName: string, toolDescription: string): ToolSEOData {
  return {
    whatItDoes: `${toolName} is a free online tool that ${toolDescription}. It works entirely in your browser with no data collection or server uploads.`,
    howItWorks: [
      'Enter or paste your data into the input field',
      'The tool processes your data instantly',
      'View the results in real-time',
      'Copy or download the output',
    ],
    benefits: [
      'Free forever with no registration',
      'Works completely offline in your browser',
      'No data collection - 100% private',
      'Fast and efficient processing',
      'Clean, intuitive interface',
    ],
    useCases: [
      'Quick data processing and conversion',
      'Development and debugging workflows',
      'Learning and experimentation',
      'Production use without privacy concerns',
    ],
    faqs: [
      {
        question: 'Is my data secure?',
        answer: 'Yes, absolutely. All processing happens locally in your browser. Your data never leaves your device.',
      },
      {
        question: 'Do I need to create an account?',
        answer: 'No, all tools are completely free and require no registration or sign-up.',
      },
      {
        question: 'Can I use this tool offline?',
        answer: 'Yes, once the page is loaded, the tool works completely offline.',
      },
    ],
  };
}
