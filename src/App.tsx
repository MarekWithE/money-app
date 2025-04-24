import { useState, useEffect } from 'react';
import { WealthChart } from './components/Chart';
import { AccountList } from './components/AccountList';
import { ProgressBar } from './components/ProgressBar';
import { Account, INVESTMENT_GOAL, TOTAL_WEALTH_GOAL } from './types';

// Move initialAccounts outside the component
const defaultAccounts: Account[] = [
  { name: "🏦 Fio Broker", amount: 114251 },
  { name: "👪 Dluh rodiče", amount: 80000 },
  { name: "💚 Fio Green", amount: 254 },
  { name: "❤️ Fio Red", amount: 92 },
  { name: "💛 Fio Yellow", amount: 18955 },
  { name: "📈 Trading 212", amount: 3700 },
  { name: "🥇 Zlato + Stříbro", amount: 78596 },
  { name: "💵 Hotovost", amount: 25175 },
  { name: "📢 Adsense", amount: 5000 },
  { name: "🧾 Faktury 01/02", amount: 11007 },
  { name: "🧾 Faktury 03/04", amount: 60000 },
  { name: "🐾 Pawtraits", amount: 826 },
  { name: "🏠 Revolut HOME", amount: 15 },
  { name: "💹 Revolut INVST", amount: 10865 },
];

function App() {
  // Initialize state from localStorage or use default accounts
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const savedAccounts = localStorage.getItem('accounts');
    return savedAccounts ? JSON.parse(savedAccounts) : defaultAccounts;
  });
  
  // Save to localStorage whenever accounts change
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const totalWealth = accounts.reduce((sum, account) => sum + account.amount, 0);

  const investedAmount = accounts
    .filter(account => 
      account.name.includes("Broker") || 
      account.name.includes("Trading") || 
      account.name.includes("INVST") ||
      account.name.includes("Zlato")
    )
    .reduce((sum, account) => sum + account.amount, 0);

  const handleUpdateAmount = (index: number, newAmount: number) => {
    const newAccounts = [...accounts];
    newAccounts[index].amount = newAmount;
    setAccounts(newAccounts);
  };

  // Add reset functionality
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all values to default?')) {
      setAccounts(defaultAccounts);
      localStorage.removeItem('accounts');
    }
  };

  // Group accounts by type for Money Allocation
  const groupedAccounts = [
    // Individual accounts
    ...accounts
      .filter(account => 
        !account.name.includes("Green") && 
        !account.name.includes("Yellow") && 
        !account.name.includes("Red") && 
        !account.name.includes("HOME") &&
        !account.name.includes("Broker") &&
        !account.name.includes("Trading") &&
        !account.name.includes("INVST")
      )
      .map(account => ({
        name: account.name,
        amount: account.amount,
        type: 'individual'
      })),
    // Stock accounts
    {
      name: "📈 Stock",
      amount: accounts
        .filter(acc => 
          acc.name.includes("Broker") ||
          acc.name.includes("Trading") ||
          acc.name.includes("INVST")
        )
        .reduce((sum, acc) => sum + acc.amount, 0),
      type: 'stock'
    },
    // Bank accounts
    {
      name: "🏛️ Bank Accounts",
      amount: accounts
        .filter(acc => 
          acc.name.includes("Green") || 
          acc.name.includes("Yellow") || 
          acc.name.includes("Red") || 
          acc.name.includes("HOME")
        )
        .reduce((sum, acc) => sum + acc.amount, 0),
      type: 'bank'
    }
  ].sort((a, b) => b.amount - a.amount).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Bar - Money Allocation */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-white">Money Allocation</h2>
              <button
                onClick={handleReset}
                className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Reset to Default
              </button>
            </div>
            {/* Progress Bar */}
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              {groupedAccounts.map((item, index) => {
                const percentage = (item.amount / totalWealth) * 100;
                const colors = {
                  stock: '#3B82F6',
                  bank: '#10B981',
                  individual: [
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6',
                    '#EC4899',
                    '#14B8A6',
                    '#F97316',
                    '#06B6D4',
                  ]
                };
                
                const color = item.type === 'stock' 
                  ? colors.stock 
                  : item.type === 'bank'
                  ? colors.bank
                  : colors.individual[index % colors.individual.length];

                return (
                  <div
                    key={index}
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      float: 'left',
                      backgroundColor: color
                    }}
                  />
                );
              })}
            </div>
            {/* Labels */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {groupedAccounts.map((item, index) => {
                const percentage = (item.amount / totalWealth) * 100;
                const colors = {
                  stock: '#3B82F6',
                  bank: '#10B981',
                  individual: [
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6',
                    '#EC4899',
                    '#14B8A6',
                    '#F97316',
                    '#06B6D4',
                  ]
                };
                
                const color = item.type === 'stock' 
                  ? colors.stock 
                  : item.type === 'bank'
                  ? colors.bank
                  : colors.individual[index % colors.individual.length];

                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2"
                    style={{ color: color }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="truncate">{item.name}</span>
                    <span className="text-gray-400">({percentage.toFixed(1)}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Total Wealth */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="text-2xl text-gray-400">You currently own:</div>
              <div className="text-4xl font-bold text-white">{totalWealth.toLocaleString()} Kč</div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Investment Goal</h3>
            <ProgressBar
              current={investedAmount}
              goal={INVESTMENT_GOAL}
              label="Investment Progress"
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Wealth Goal</h3>
            <ProgressBar
              current={totalWealth}
              goal={TOTAL_WEALTH_GOAL}
              label="Total Wealth Progress"
            />
          </div>
        </div>

        {/* Wealth Trend Chart */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Wealth Trend</h2>
          <WealthChart accounts={accounts} />
        </div>

        {/* Account List */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Account Allocations</h2>
          <AccountList
            accounts={accounts}
            onUpdateAmount={handleUpdateAmount}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 