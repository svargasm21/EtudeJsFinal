"use client";
import React from 'react';
import Link from 'next/link';

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
  color: 'yellow' | 'blue' | 'green' | 'purple' | 'red';
  icon: string;
  index?: number;
}

const QuickActionCard: React.FC<QuickActionProps> = ({ 
  title, 
  description, 
  href, 
  color, 
  icon, 
  index = 0 
}) => {
  const colorClasses = {
    yellow: 'bg-yellow-400/20 text-yellow-300',
    blue: 'bg-blue-400/20 text-blue-300',
    green: 'bg-green-400/20 text-green-300',
    purple: 'bg-purple-400/20 text-purple-300',
    red: 'bg-red-400/20 text-red-300',
  };

  return (
    <Link href={href}>
      <div 
        className="group p-6 rounded-2xl stats-card cursor-pointer animate-fadeInUp overflow-hidden relative"
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Efecto de fondo animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="relative z-10 flex items-center gap-4">
          <div 
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
          </div>
          <div className="text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
            →
          </div>
        </div>
        
        {/* Línea animada en la parte inferior */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-purple-400 w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </Link>
  );
};

interface QuickActionsProps {
  actions: QuickActionProps[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 animate-fadeInUp">
        ⚡ Acciones Rápidas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
          <QuickActionCard key={action.href} {...action} index={index} />
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
