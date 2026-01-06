
import React from 'react';
import { UnitContent } from '../types';

interface UnitCardProps {
  unit: UnitContent;
  onClick: (unit: UnitContent) => void;
  isActive: boolean;
}

export const UnitCard: React.FC<UnitCardProps> = ({ unit, onClick, isActive }) => {
  return (
    <button
      onClick={() => onClick(unit)}
      className={`relative w-full text-left p-6 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-lg group ${
        isActive 
          ? `${unit.color} text-white ring-4 ring-offset-2 ring-white` 
          : 'bg-white hover:bg-gray-50 text-gray-800'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold opacity-75 uppercase tracking-wider">Unit {unit.id}</span>
        <span className="text-3xl group-hover:animate-bounce">{unit.icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-1">{unit.title}</h3>
      <p className={`text-sm ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
        {unit.theme}
      </p>
      {isActive && (
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};
