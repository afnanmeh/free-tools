export function calculateMRR(customers: number, avgPrice: number): {
  mrr: number;
  arr: number;
} {
  const mrr = customers * avgPrice;
  const arr = mrr * 12;
  return { mrr, arr };
}

export function calculateARR(mrr: number): number {
  return mrr * 12;
}

export function calculateChurnImpact(params: {
  startingMRR: number;
  churnRate: number;
  months: number;
}): { month: number; mrr: number; lost: number }[] {
  const results = [];
  let currentMRR = params.startingMRR;
  
  for (let i = 0; i <= params.months; i++) {
    const lost = currentMRR * (params.churnRate / 100);
    results.push({
      month: i,
      mrr: currentMRR,
      lost: lost,
    });
    currentMRR -= lost;
  }
  
  return results;
}

export function calculateCACLTV(params: {
  cac: number;
  avgRevenue: number;
  avgLifetime: number;
  margin: number;
}): {
  ltv: number;
  ratio: number;
  healthy: boolean;
} {
  const ltv = params.avgRevenue * params.avgLifetime * (params.margin / 100);
  const ratio = ltv / params.cac;
  const healthy = ratio >= 3;
  
  return { ltv, ratio, healthy };
}

export function calculateBurnRate(params: {
  cash: number;
  monthlyExpenses: number;
  monthlyRevenue: number;
}): {
  burnRate: number;
  runway: number;
  netBurn: number;
} {
  const netBurn = params.monthlyExpenses - params.monthlyRevenue;
  const burnRate = netBurn;
  const runway = netBurn > 0 ? params.cash / netBurn : Infinity;
  
  return { burnRate, runway, netBurn };
}

export function calculateRevenueGrowth(params: {
  startingRevenue: number;
  growthRate: number;
  months: number;
}): { month: number; revenue: number; growth: number }[] {
  const results = [];
  let currentRevenue = params.startingRevenue;
  
  for (let i = 0; i <= params.months; i++) {
    const growth = i > 0 ? currentRevenue * (params.growthRate / 100) : 0;
    results.push({
      month: i,
      revenue: currentRevenue,
      growth: growth,
    });
    currentRevenue += growth;
  }
  
  return results;
}

export function calculateProfitMargin(params: {
  revenue: number;
  cogs: number;
  expenses: number;
}): {
  grossProfit: number;
  grossMargin: number;
  netProfit: number;
  netMargin: number;
} {
  const grossProfit = params.revenue - params.cogs;
  const grossMargin = (grossProfit / params.revenue) * 100;
  const netProfit = grossProfit - params.expenses;
  const netMargin = (netProfit / params.revenue) * 100;
  
  return { grossProfit, grossMargin, netProfit, netMargin };
}
