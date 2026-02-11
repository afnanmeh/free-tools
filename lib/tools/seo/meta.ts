export function analyzeHeadline(headline: string): {
  score: number;
  wordCount: number;
  charCount: number;
  feedback: string[];
} {
  const wordCount = headline.trim().split(/\s+/).length;
  const charCount = headline.length;
  const feedback: string[] = [];
  let score = 50;

  if (wordCount >= 6 && wordCount <= 12) {
    score += 20;
  } else if (wordCount < 6) {
    feedback.push('Headline is too short. Aim for 6-12 words.');
    score -= 10;
  } else {
    feedback.push('Headline is too long. Aim for 6-12 words.');
    score -= 10;
  }

  if (charCount >= 40 && charCount <= 60) {
    score += 15;
  } else if (charCount < 40) {
    feedback.push('Character count is low. Aim for 40-60 characters.');
  } else if (charCount > 70) {
    feedback.push('Character count is too high. Keep it under 70 characters.');
    score -= 5;
  }

  const powerWords = ['amazing', 'ultimate', 'essential', 'proven', 'powerful', 'best', 'top', 'free', 'easy', 'quick'];
  const hasPowerWord = powerWords.some(word => headline.toLowerCase().includes(word));
  if (hasPowerWord) {
    score += 15;
    feedback.push('✓ Contains power words');
  } else {
    feedback.push('Consider adding power words (amazing, ultimate, proven, etc.)');
  }

  const hasNumber = /\d+/.test(headline);
  if (hasNumber) {
    score += 10;
    feedback.push('✓ Contains numbers');
  } else {
    feedback.push('Consider adding numbers for specificity');
  }

  if (score > 100) score = 100;
  if (score < 0) score = 0;

  return { score, wordCount, charCount, feedback };
}

export function validateSchema(jsonLd: string): { valid: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonLd);
    
    if (!parsed['@context']) {
      return { valid: false, error: 'Missing @context property' };
    }
    
    if (!parsed['@type']) {
      return { valid: false, error: 'Missing @type property' };
    }
    
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err instanceof Error ? err.message : 'Invalid JSON' };
  }
}

export function countCharacters(text: string): {
  total: number;
  withoutSpaces: number;
  words: number;
  sentences: number;
} {
  const total = text.length;
  const withoutSpaces = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  return { total, withoutSpaces, words, sentences };
}
