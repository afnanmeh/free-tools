export function calculatePercentage(params: {
  type: 'what-is' | 'is-what-percent' | 'percent-change';
  value1: number;
  value2: number;
}): number {
  switch (params.type) {
    case 'what-is':
      return (params.value1 / 100) * params.value2;
    case 'is-what-percent':
      return (params.value1 / params.value2) * 100;
    case 'percent-change':
      return ((params.value2 - params.value1) / params.value1) * 100;
    default:
      return 0;
  }
}

export function calculateTimeDifference(date1: Date, date2: Date): {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
} {
  const diff = Math.abs(date2.getTime() - date1.getTime());

  return {
    milliseconds: diff,
    seconds: diff / 1000,
    minutes: diff / (1000 * 60),
    hours: diff / (1000 * 60 * 60),
    days: diff / (1000 * 60 * 60 * 24),
    weeks: diff / (1000 * 60 * 60 * 24 * 7),
    months: diff / (1000 * 60 * 60 * 24 * 30),
    years: diff / (1000 * 60 * 60 * 24 * 365),
  };
}

export function convertUnit(value: number, from: string, to: string): any {
  const conversions: Record<
    string,
    Record<string, number | ((v: number) => number)>
  > = {
    length: {
      'cm-in': 0.393701,
      'in-cm': 2.54,
      'm-ft': 3.28084,
      'ft-m': 0.3048,
      'km-mi': 0.621371,
      'mi-km': 1.60934,
    },
    weight: {
      'kg-lb': 2.20462,
      'lb-kg': 0.453592,
      'g-oz': 0.035274,
      'oz-g': 28.3495,
    },
    temperature: {
      'c-f': (v: number) => (v * 9) / 5 + 32,
      'f-c': (v: number) => ((v - 32) * 5) / 9,
    },
  };

  const key = `${from}-${to}`;

  for (const category of Object.values(conversions)) {
    if (key in category) {
      const converter = category[key];
      return typeof converter === 'function'
        ? converter(value)
        : value * converter;
    }
  }

  return value;
}

export function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
} {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays };
}

export function calculateDateDifference(date1: Date, date2: Date): {
  days: number;
  weeks: number;
  months: number;
  years: number;
} {
  const diff = calculateTimeDifference(date1, date2);

  return {
    days: Math.floor(diff.days),
    weeks: Math.floor(diff.weeks),
    months: Math.floor(diff.months),
    years: Math.floor(diff.years),
  };
}

export function convertCurrency(amount: number, from: string, to: string): number {
  const rates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
  };

  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;

  return (amount / fromRate) * toRate;
}

export function generateRandomNumber(
  min: number,
  max: number,
  count: number = 1
): number[] {
  const numbers: number[] = [];

  for (let i = 0; i < count; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return numbers;
}
