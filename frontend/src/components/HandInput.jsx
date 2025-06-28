import React from 'react';

// A shared component to render the face of a card with suit and color
function CardFace({ card }) {
  if (!card) return null;

  const rank = card.slice(0, -1);
  const suitKey = card.slice(-1).toLowerCase();
  
  const SUIT_INFO = {
    s: { symbol: '♠', color: 'text-slate-300' },
    h: { symbol: '♥', color: 'text-red-500' },
    d: { symbol: '♦', color: 'text-red-500' },
    c: { symbol: '♣', color: 'text-slate-300' },
  };

  const suit = SUIT_INFO[suitKey] || { symbol: '?', color: 'text-white' };

  return (
    <div className={`flex flex-col items-center justify-center h-full ${suit.color}`}>
      <span className="text-xl sm:text-2xl font-bold">{rank}</span>
      <span className="text-lg sm:text-xl">{suit.symbol}</span>
    </div>
  );
}

// A single, clickable card slot
function CardSlot({ card, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-16 sm:w-16 sm:h-20 bg-slate-900 border-2 border-slate-600 rounded-md text-center text-3xl font-bold text-slate-500 uppercase focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:bg-slate-700 transition-colors"
    >
      {card ? <CardFace card={card} /> : '+'}
    </button>
  );
}

// The button to clear the hand
function ClearButton({ onClear }) {
    return (
        <button onClick={onClear} className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors" title="Clear hand">
            <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
    )
}

export default function HandInput({ playerName, hand, onCardClick, onClear }) {
  return (
    <div className="p-4 bg-slate-700/50 rounded-md relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-slate-300">{playerName}'s Hand</h2>
      </div>
      <ClearButton onClear={onClear} />
      <div className="flex justify-center space-x-2">
        {hand.map((card, index) => (
          <CardSlot
            key={index}
            card={card}
            onClick={() => onCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
