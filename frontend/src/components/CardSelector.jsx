import React from 'react';

// --- Card Visual Data ---
const SUITS = {
  s: { name: 'Spades', symbol: '♠', color: 'text-slate-300' },
  h: { name: 'Hearts', symbol: '♥', color: 'text-red-500' },
  d: { name: 'Diamonds', symbol: '♦', color: 'text-red-500' },
  c: { name: 'Clubs', symbol: '♣', color: 'text-slate-300' },
};
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

// A small component for the card face, to be used inside the buttons
function CardFace({ rank, suitInfo }) {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${suitInfo.color}`}>
      <span className="text-lg font-bold">{rank}</span>
      <span className="text-base">{suitInfo.symbol}</span>
    </div>
  )
}

export default function CardSelector({ onSelect, onClose, usedCards }) {
  return (
    // Modal backdrop
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      {/* Modal content container */}
      <div 
        className="bg-slate-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-cyan-400">Select a Card</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* The new suit-by-suit layout */}
        <div className="space-y-4">
          {Object.entries(SUITS).map(([suitKey, suitInfo]) => (
            <div key={suitKey}>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${suitInfo.color}`}>{suitInfo.symbol}</span>
                <span className="text-lg text-slate-300 font-semibold">{suitInfo.name}</span>
              </div>
              <div className="grid grid-cols-7 lg:grid-cols-13 gap-1 sm:gap-2 mt-2">
                {RANKS.map(rank => {
                  const card = rank + suitKey;
                  const isUsed = usedCards.has(card);
                  return (
                    <button
                      key={card}
                      onClick={() => !isUsed && onSelect(card)}
                      disabled={isUsed}
                      className={`
                        w-10 h-14 sm:w-12 sm:h-16 rounded-md border-2 
                        ${isUsed 
                          ? 'bg-slate-700 text-slate-500 border-slate-600 cursor-not-allowed' 
                          : 'bg-slate-900 border-slate-600 hover:border-cyan-500 transition-colors'
                        }
                      `}
                    >
                      <CardFace rank={rank} suitInfo={suitInfo} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}