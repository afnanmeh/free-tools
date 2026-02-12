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
    whatItDoes: 'The JSON Formatter is a powerful, free online tool that beautifies, validates, and formats JSON data instantly. Whether you need to format JSON, validate JSON syntax, or convert minified JSON into a readable structure, this JSON beautifier handles it all. Our JSON validator checks for syntax errors while the JSON pretty print feature transforms messy code into clean, properly indented output with syntax highlighting. Perfect for developers who need a reliable JSON formatting tool that works entirely in your browser with zero data collection.',
    howItWorks: [
      'Paste or type your JSON data into the input editor - supports minified, compressed, or unformatted JSON',
      'The JSON validator automatically checks syntax in real-time and highlights any errors with precise error messages',
      'View the formatted JSON output with syntax highlighting for keys, values, strings, numbers, and booleans',
    ],
    benefits: [
      'Instant JSON validation - Detect syntax errors, missing brackets, trailing commas, and invalid characters immediately',
      'Beautiful syntax highlighting - Color-coded JSON makes it easy to identify keys, values, arrays, and objects at a glance',
      'Real-time formatting - Auto-format JSON as you type with live validation and error detection',
      'Complete privacy - All JSON processing happens locally in your browser; no data is uploaded to servers',
      'Handle large files - Format and validate JSON files up to 10MB without performance degradation',
      'Free forever - No registration, no sign-up, no credit card required; unlimited JSON formatting',
      'Cross-browser compatible - Works perfectly on Chrome, Firefox, Safari, Edge, and all modern browsers',
      'Mobile-friendly - Format JSON on any device including smartphones and tablets',
      'Developer-friendly - Supports nested objects, arrays, special characters, Unicode, and escaped strings',
    ],
    useCases: [
      'Debug API responses - Format JSON responses from REST APIs, GraphQL, or webhooks to inspect data structure and values',
      'Validate configuration files - Check JSON config files for syntax errors before deployment to prevent runtime failures',
      'Clean minified JSON - Convert compressed production JSON into readable format for debugging and analysis',
      'Learn JSON syntax - Understand JSON structure, nesting, and formatting rules with real-time validation feedback',
      'Format database exports - Beautify JSON exports from MongoDB, Firebase, or other NoSQL databases',
      'Prepare data for documentation - Create clean, readable JSON examples for API documentation and tutorials',
      'Fix JSON errors - Identify and fix syntax errors like missing commas, unclosed brackets, or invalid escape sequences',
      'Compare JSON files - Format multiple JSON files to the same indentation level for easier comparison',
      'Test JSON parsers - Validate JSON before feeding it to parsers in JavaScript, Python, Java, or other languages',
      'Code review preparation - Format JSON data in pull requests and code reviews for better readability',
    ],
    faqs: [
      {
        question: 'Is my JSON data secure when using this formatter?',
        answer: 'Yes, absolutely secure. This JSON formatter processes all data locally in your browser using JavaScript. Your JSON data never leaves your device, is not uploaded to any server, and is not stored anywhere. We have zero access to your data, making it completely safe for sensitive information, API keys, or confidential configurations.',
      },
      {
        question: 'Can this tool handle large JSON files?',
        answer: 'Yes, our JSON formatter efficiently handles large JSON files up to 10MB. For extremely large files (5-10MB), processing may take a few seconds depending on your device\'s performance. If you experience slowness with very large files, try breaking them into smaller chunks or use a desktop JSON editor for files over 10MB.',
      },
      {
        question: 'Does the JSON formatter validate syntax automatically?',
        answer: 'Yes, the tool includes a built-in JSON validator that automatically checks syntax as you type or paste. It detects common errors like missing commas, unclosed brackets, invalid escape sequences, trailing commas, and malformed strings. Error messages appear instantly with line numbers to help you fix issues quickly.',
      },
      {
        question: 'Can I use this JSON formatter offline?',
        answer: 'Yes, once the page is fully loaded, the JSON formatter works completely offline without an internet connection. All formatting, validation, and beautification happens in your browser. You can bookmark this page and use it anytime, even on flights or in areas without internet access.',
      },
      {
        question: 'What\'s the difference between JSON formatter and JSON validator?',
        answer: 'A JSON formatter (or beautifier) makes JSON readable by adding proper indentation, line breaks, and spacing. A JSON validator checks if the JSON syntax is correct and identifies errors. Our tool combines both - it validates your JSON for errors AND formats it beautifully in one step, saving you time.',
      },
      {
        question: 'Can I format minified or compressed JSON?',
        answer: 'Yes, this tool excels at formatting minified JSON. Simply paste compressed JSON (all on one line) and click Format. The tool will expand it into a properly indented, multi-line structure with syntax highlighting, making it easy to read and understand the data hierarchy.',
      },
      {
        question: 'Does this work with nested JSON objects and arrays?',
        answer: 'Absolutely. The JSON formatter handles deeply nested objects, arrays within arrays, mixed data types, and complex JSON structures. It properly indents each nesting level, making it easy to visualize the hierarchy and relationships between data elements.',
      },
      {
        question: 'Is this JSON formatter free to use?',
        answer: 'Yes, completely free forever. There are no hidden fees, no premium features, no usage limits, and no registration required. Format unlimited JSON files as many times as you need without any restrictions.',
      },
      {
        question: 'Can I customize the indentation spacing?',
        answer: 'The default indentation is 2 spaces, which is the most common standard for JSON formatting. This creates clean, readable output that works well for most use cases and follows JSON best practices recommended by major style guides.',
      },
      {
        question: 'What browsers support this JSON formatter?',
        answer: 'The JSON formatter works on all modern browsers including Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, Opera, and Brave. It also works on mobile browsers on iOS and Android devices. For the best experience, use the latest version of your preferred browser.',
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
