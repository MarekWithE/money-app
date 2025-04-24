export interface Account {
  name: string;
  amount: number;
}

export interface RankTier {
  name: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
}

export const RANK_TIERS: RankTier[] = [
  { name: "Bronze", icon: "🥉", minAmount: 0, maxAmount: 50000 },
  { name: "Silver", icon: "🥈", minAmount: 50000, maxAmount: 200000 },
  { name: "Gold", icon: "🥇", minAmount: 200000, maxAmount: 500000 },
  { name: "Platinum", icon: "💎", minAmount: 500000, maxAmount: 1000000 },
  { name: "Diamond", icon: "👑", minAmount: 1000000, maxAmount: 100000000 }
];

export const INVESTMENT_GOAL = 300000;
export const TOTAL_WEALTH_GOAL = 1000000; 