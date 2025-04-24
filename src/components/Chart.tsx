import React from 'react';
import { Account } from '../types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  accounts: Account[];
}

// Predefined colors for better readability
const colors = {
  stock: '#3B82F6', // blue-500
  bank: '#10B981', // emerald-500
  individual: [
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#8B5CF6', // violet-500
    '#EC4899', // pink-500
    '#14B8A6', // teal-500
    '#F97316', // orange-500
    '#06B6D4', // cyan-500
  ]
};

// Group similar accounts and assign colors
const accountGroups = [
  {
    name: 'Stock',
    color: colors.stock,
    matcher: (name: string) => 
      name.includes('Broker') || 
      name.includes('INVST') || 
      name.includes('Trading')
  },
  {
    name: 'Bank',
    color: colors.bank,
    matcher: (name: string) => 
      name.includes('Green') || 
      name.includes('Red') || 
      name.includes('Yellow') || 
      name.includes('HOME')
  },
  {
    name: 'Cash & Invoices',
    color: colors.individual[0],
    matcher: (name: string) => 
      name.includes('Hotovost') || 
      name.includes('Faktury') ||
      name.includes('Odtrénuju')
  },
  {
    name: 'Receivables',
    color: colors.individual[1],
    matcher: (name: string) => 
      name.includes('Dluh') || 
      name.includes('Adsense') ||
      name.includes('Letenky')
  },
  {
    name: 'Precious Metals',
    color: colors.individual[2],
    matcher: (name: string) => 
      name.includes('Zlato')
  },
  {
    name: 'Business',
    color: colors.individual[3],
    matcher: (name: string) => 
      name.includes('Pawtraits') ||
      name.includes('Kurz')
  }
];

const historicalData = {
  months: ['10/24', '11/24', '12/24', '1/25', '2/25', '3/25'],
  data: [
    // Stock (Broker, Trading, INVST)
    [146476, 146476, 144032, 138557, 155565, 154091], // Broker + Trading + INVST
    // Bank (Green, Red, Yellow, HOME)
    [53411, 4535, 15731, 5107, 44582, 8449], // Green + Red + Yellow + HOME
    // Cash & Invoices (Hotovost, Faktury, Odtrénuju)
    [53054, 65000, 49400, 64500, 76732, 97175], // Hotovost + Faktury + Odtrénuju
    // Receivables (Dluh, Adsense, Letenky)
    [150000, 193000, 168980, 113980, 100740, 95000], // Dluh + Adsense + Letenky
    // Precious Metals (Zlato)
    [44038, 44038, 45000, 45800, 48688, 48323], // Zlato
    // Business (Pawtraits, Kurz)
    [6283, 7019, 7749, 7749, 0, 1175], // Pawtraits + Kurz
  ]
};

export const WealthChart: React.FC<ChartProps> = ({ accounts }) => {
  // Calculate current values for each group
  const currentValues = accountGroups.map(group => {
    const matchingAccounts = accounts.filter(account => group.matcher(account.name));
    return matchingAccounts.reduce((sum, account) => sum + account.amount, 0);
  });

  // Add current month to historical data
  const currentMonth = new Date().toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' });
  
  const data = {
    labels: [...historicalData.months, currentMonth],
    datasets: accountGroups.map((group, index) => ({
      label: group.name,
      data: [...historicalData.data[index], currentValues[index]],
      backgroundColor: group.color,
      borderColor: group.color,
      borderWidth: 1,
      stack: 'stack0',
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          padding: 20,
          font: {
            size: 12
          }
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} Kč`;
          },
          footer: function(tooltipItems: any) {
            const total = tooltipItems.reduce((sum: number, item: any) => sum + item.parsed.y, 0);
            return `Total: ${total.toLocaleString()} Kč`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12
          }
        }
      },
      y: {
        stacked: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: any) {
            return (value / 1000).toLocaleString() + 'k Kč';
          },
          font: {
            size: 12
          }
        }
      }
    },
  };

  return (
    <div className="w-full">
      <div style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}; 