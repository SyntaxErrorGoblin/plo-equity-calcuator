import React from 'react';

export default function ResultsDisplay({ result, error, isLoading }) {
  const renderContent = () => {
    if (isLoading) {
      return <p className="text-xl text-slate-400">Calculating...</p>;
    }
    if (error) {
      return <p className="text-xl text-red-500">{error}</p>;
    }
    if (result) {
      // We now access the 'equity' key from the response
      return <p className="text-5xl font-bold text-cyan-400">{result.equity}</p>;
    }
    return <p className="text-5xl font-bold text-cyan-400">--.--%</p>;
  };

  return (
    <div className="text-center p-6 bg-slate-900 rounded-lg min-h-[124px] flex items-center justify-center">
      <div>
        <h3 className="text-lg font-semibold text-slate-400 mb-2">Hero's Equity vs. Villain's Range</h3>
        {renderContent()}
      </div>
    </div>
  );
}
