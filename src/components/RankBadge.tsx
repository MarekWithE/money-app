import React from 'react';
import { RANK_TIERS } from '../types';

interface RankBadgeProps {
  totalWealth: number;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ totalWealth }) => {
  const currentTier = RANK_TIERS.find(
    tier => totalWealth >= tier.minAmount && totalWealth < tier.maxAmount
  ) || RANK_TIERS[RANK_TIERS.length - 1];

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
      <span className="text-3xl">{currentTier.icon}</span>
      <div>
        <h3 className="text-xl font-bold text-white">{currentTier.name} Tier</h3>
        <p className="text-gray-400">
          {currentTier.minAmount.toLocaleString()} - {currentTier.maxAmount.toLocaleString()} Kč
        </p>
      </div>
    </div>
  );
}; 