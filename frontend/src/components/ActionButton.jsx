import React from 'react';

export default function ActionButton() {
  return (
    <div className="flex justify-center">
      <button className="w-full sm:w-auto px-12 py-3 bg-cyan-600 text-white font-bold text-lg rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-colors duration-300">
        Calculate Equity
      </button>
    </div>
  ); 
  }