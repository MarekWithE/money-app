import React from 'react';
import { Account } from '../types';

interface AccountListProps {
  accounts: Account[];
  onUpdateAmount: (index: number, newAmount: number) => void;
}

export const AccountList: React.FC<AccountListProps> = ({ accounts, onUpdateAmount }) => {
  const totalAmount = accounts.reduce((sum, account) => sum + account.amount, 0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {accounts.map((account, index) => {
          const percentage = (account.amount / totalAmount) * 100;
          return (
            <div
              key={index}
              className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{account.name}</span>
                  <span className="text-xs text-gray-400">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="number"
                  value={account.amount}
                  onChange={(e) => onUpdateAmount(index, Number(e.target.value))}
                  className="bg-gray-600 text-white px-3 py-1 rounded-md w-32 text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 