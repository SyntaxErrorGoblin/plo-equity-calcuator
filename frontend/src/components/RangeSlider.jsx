import React from 'react';

export default function RangeSlider({ value, onChange }) {
  return (
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
      />
      <span className="font-mono text-lg text-cyan-400 w-16 text-center">
        {value}%
      </span>
    </div>
  );
}