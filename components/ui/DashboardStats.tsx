"use client";
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  color: 'green' | 'blue' | 'purple' | 'yellow' | 'red';
  icon: string;
  index?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, color, icon, index = 0 }) => {
  const colorClasses = {
    green: 'bg-green-400/20 text-green-300 border-green-400/30',
    blue: 'bg-blue-400/20 text-blue-300 border-blue-400/30',
    purple: 'bg-purple-400/20 text-purple-300 border-purple-400/30',
    yellow: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
    red: 'bg-red-400/20 text-red-300 border-red-400/30',
  };

  return (
    <div
      className="stats-card p-6 rounded-2xl hover:scale-105 animate-fadeInUp group cursor-default"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl animate-float" style={{ animationDelay: `${index * 200}ms` }}>
          {icon}
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${colorClasses[color]}`}>
          {change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">
        {value}
      </h3>
      <p className="text-gray-400 text-sm">{title}</p>
      
      {/* Efecto shimmer en hover */}
      <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    </div>
  );
};

interface DashboardStatsProps {
  stats: StatCardProps[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
};

export default DashboardStats;
