import React, { useState, useMemo } from 'react';
import HandInput from './components/HandInput';
import RangeSlider from './components/RangeSlider';
import ActionButton from './components/ActionButton';
import ResultsDisplay from './components/ResultsDisplay';
import CardSelector from './components/CardSelector';

const API_URL = "http://127.0.0.1:8000"; 

function App() {
  const [heroHand, setHeroHand] = useState(['', '', '', '', '']);
  const [villainRange, setVillainRange] = useState(15);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRangeChange = (event) => setVillainRange(event.target.value);
  const handleCardSlotClick = (index) => {
    setEditingIndex(index);
    setIsSelectorOpen(true);
  };
  const handleCardSelect = (card) => {
    const newHand = [...heroHand];
    newHand[editingIndex] = card;
    setHeroHand(newHand);
    setIsSelectorOpen(false);
    setEditingIndex(null);
  };
  const handleClearHand = () => setHeroHand(['', '', '', '', '']);

  const handleCalculate = async () => {
    const handString = heroHand.join('');
    if (handString.length !== 10) {
      setError("Please select a full 5-card hand for the Hero.");
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    setError(null);

    const requestBody = { 
      hero_hand: handString,
      villain_range_percent: parseInt(villainRange, 10) 
    };

    console.log("Sending request to backend:", requestBody);

    try {
      const response = await fetch(`${API_URL}/api/calculate-equity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        console.error("API Error Response Status:", response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response from backend:", data);
      setResult(data);

    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch equity. Please check the backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  const usedCards = useMemo(() => new Set(heroHand.filter(card => card !== '')), [heroHand]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-slate-800 rounded-lg shadow-xl p-6 space-y-6 relative">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-cyan-400">PLO5 Equity Calculator</h1>
          <p className="text-slate-400 mt-1">Hand vs. Range Equity</p>
        </header>
        <main className="space-y-8">
          <HandInput 
            playerName="Hero"
            hand={heroHand}
            onCardClick={handleCardSlotClick}
            onClear={handleClearHand}
          />
          <div className="p-4 bg-slate-700/50 rounded-md">
            <h2 className="text-xl font-semibold mb-3 text-slate-300">Villain's Range</h2>
            <p className="text-sm text-slate-400 mb-4">Select the percentage of the strongest starting hands to include in the villain's range.</p>
            <RangeSlider value={villainRange} onChange={handleRangeChange} />
          </div>
          <ActionButton onClick={handleCalculate} isLoading={isLoading} />
          <ResultsDisplay result={result} error={error} isLoading={isLoading} />
        </main>
      </div>
      {isSelectorOpen && (
        <CardSelector 
          onSelect={handleCardSelect}
          onClose={() => setIsSelectorOpen(false)}
          usedCards={usedCards}
        />
      )}
       <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Built by Lucas Dylan Purnell</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/SyntaxErrorGoblin" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="GitHub">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/lucas-dylan-purnell-0a90091a9/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
