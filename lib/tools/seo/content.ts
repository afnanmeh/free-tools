export function calculateReadability(text: string): {
  fleschScore: number;
  grade: string;
  level: string;
  sentences: number;
  words: number;
  syllables: number;
} {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  const syllables = text.split(/\s+/).reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);
  
  const fleschScore = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  
  let grade = '';
  let level = '';
  
  if (fleschScore >= 90) {
    grade = '5th grade';
    level = 'Very Easy';
  } else if (fleschScore >= 80) {
    grade = '6th grade';
    level = 'Easy';
  } else if (fleschScore >= 70) {
    grade = '7th grade';
    level = 'Fairly Easy';
  } else if (fleschScore >= 60) {
    grade = '8th-9th grade';
    level = 'Standard';
  } else if (fleschScore >= 50) {
    grade = '10th-12th grade';
    level = 'Fairly Difficult';
  } else if (fleschScore >= 30) {
    grade = 'College';
    level = 'Difficult';
  } else {
    grade = 'College Graduate';
    level = 'Very Difficult';
  }
  
  return {
    fleschScore: Math.max(0, Math.min(100, fleschScore)),
    grade,
    level,
    sentences,
    words,
    syllables,
  };
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  
  const vowels = 'aeiouy';
  let count = 0;
  let previousWasVowel = false;
  
  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      count++;
    }
    previousWasVowel = isVowel;
  }
  
  if (word.endsWith('e')) {
    count--;
  }
  
  return Math.max(1, count);
}

export function calculateKeywordDensity(text: string, keyword: string): {
  count: number;
  density: number;
  totalWords: number;
  positions: number[];
} {
  const words = text.toLowerCase().split(/\s+/);
  const keywordLower = keyword.toLowerCase();
  const totalWords = words.length;
  
  let count = 0;
  const positions: number[] = [];
  
  words.forEach((word, index) => {
    if (word.includes(keywordLower)) {
      count++;
      positions.push(index);
    }
  });
  
  const density = totalWords > 0 ? (count / totalWords) * 100 : 0;
  
  return { count, density, totalWords, positions };
}

export function convertTextCase(text: string, caseType: 'upper' | 'lower' | 'title' | 'sentence'): string {
  switch (caseType) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });
    case 'sentence':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
}

export function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

export function countWords(text: string): {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
} {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200);
  
  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTime,
  };
}

export function summarizeText(text: string, sentenceCount: number = 3): string {
  const sentences = splitSentences(text);
  
  if (sentences.length <= sentenceCount) {
    return text;
  }
  
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0;
    
    if (index === 0) score += 2;
    
    const words = sentence.split(/\s+/);
    score += words.length * 0.1;
    
    const importantWords = ['important', 'key', 'critical', 'essential', 'main', 'primary'];
    importantWords.forEach(word => {
      if (sentence.toLowerCase().includes(word)) score += 1;
    });
    
    return { sentence, score, index };
  });
  
  scoredSentences.sort((a, b) => b.score - a.score);
  
  const topSentences = scoredSentences
    .slice(0, sentenceCount)
    .sort((a, b) => a.index - b.index)
    .map(s => s.sentence);
  
  return topSentences.join('. ') + '.';
}

export function detectPlagiarism(text: string): {
  uniqueSentences: number;
  totalSentences: number;
  duplicates: string[];
} {
  const sentences = splitSentences(text);
  const seen = new Set<string>();
  const duplicates: string[] = [];
  
  sentences.forEach(sentence => {
    const normalized = sentence.toLowerCase().trim();
    if (seen.has(normalized)) {
      duplicates.push(sentence);
    } else {
      seen.add(normalized);
    }
  });
  
  return {
    uniqueSentences: seen.size,
    totalSentences: sentences.length,
    duplicates,
  };
}
