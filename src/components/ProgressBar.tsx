import React from 'react';

interface ProgressBarProps {
  current: number;
  goal: number;
  label: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, goal, label }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  // Determine color based on percentage
  const getColor = (percent: number) => {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 75) return 'bg-blue-500';
    if (percent >= 50) return 'bg-yellow-500';
    if (percent >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-medium text-gray-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex-grow">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getColor(percentage)}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="ml-4 min-w-[120px] text-right">
          <div className="text-sm font-medium text-gray-300">
            {current.toLocaleString()} Kč
          </div>
          <div className="text-xs text-gray-500">
            of {goal.toLocaleString()} Kč
          </div>
        </div>
      </div>
    </div>
  );
}; 