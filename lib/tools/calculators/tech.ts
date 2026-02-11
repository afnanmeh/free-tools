export function convertFileSize(bytes: number, toUnit: 'B' | 'KB' | 'MB' | 'GB' | 'TB'): number {
  const units = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4 };
  return bytes / Math.pow(1024, units[toUnit]);
}

export function fileSizeToBytes(value: number, fromUnit: 'B' | 'KB' | 'MB' | 'GB' | 'TB'): number {
  const units = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4 };
  return value * Math.pow(1024, units[fromUnit]);
}

export function calculateBandwidth(params: {
  pageSize: number;
  pageViews: number;
  period: 'day' | 'month';
}): {
  totalGB: number;
  totalMB: number;
  perDay: number;
} {
  const totalBytes = params.pageSize * params.pageViews;
  const totalGB = convertFileSize(totalBytes, 'GB');
  const totalMB = convertFileSize(totalBytes, 'MB');
  const perDay = params.period === 'month' ? totalGB / 30 : totalGB;
  
  return { totalGB, totalMB, perDay };
}

export function estimateCDNCost(params: {
  bandwidth: number;
  pricePerGB: number;
}): {
  monthlyCost: number;
  yearlyCost: number;
} {
  const monthlyCost = params.bandwidth * params.pricePerGB;
  const yearlyCost = monthlyCost * 12;
  
  return { monthlyCost, yearlyCost };
}

export function calculateImageLoadTime(params: {
  imageSizeKB: number;
  connectionSpeedMbps: number;
}): {
  loadTimeSeconds: number;
  loadTimeMs: number;
} {
  const imageSizeMb = params.imageSizeKB / 1024;
  const loadTimeSeconds = (imageSizeMb * 8) / params.connectionSpeedMbps;
  const loadTimeMs = loadTimeSeconds * 1000;
  
  return { loadTimeSeconds, loadTimeMs };
}

export function calculateVideoSize(params: {
  durationMinutes: number;
  bitrateMbps: number;
}): {
  sizeGB: number;
  sizeMB: number;
} {
  const durationSeconds = params.durationMinutes * 60;
  const sizeMB = (params.bitrateMbps * durationSeconds) / 8;
  const sizeGB = sizeMB / 1024;
  
  return { sizeGB, sizeMB };
}

export function calculateCompressionSavings(params: {
  originalSize: number;
  compressionRatio: number;
}): {
  compressedSize: number;
  savings: number;
  savingsPercent: number;
} {
  const compressedSize = params.originalSize * (1 - params.compressionRatio / 100);
  const savings = params.originalSize - compressedSize;
  const savingsPercent = (savings / params.originalSize) * 100;
  
  return { compressedSize, savings, savingsPercent };
}

export function calculateHostingCost(params: {
  trafficGB: number;
  plans: { name: string; includedGB: number; pricePerGB: number; baseCost: number }[];
}): { name: string; totalCost: number; overageGB: number; overageCost: number }[] {
  return params.plans.map(plan => {
    const overageGB = Math.max(0, params.trafficGB - plan.includedGB);
    const overageCost = overageGB * plan.pricePerGB;
    const totalCost = plan.baseCost + overageCost;
    
    return {
      name: plan.name,
      totalCost,
      overageGB,
      overageCost,
    };
  });
}
