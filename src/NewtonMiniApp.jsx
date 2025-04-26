import React, { useState, useEffect } from 'react';

export default function NewtonMiniApp() {
  const [balance, setBalance] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [isMining, setIsMining] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cooldown > 0) setCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleMine = () => {
    if (cooldown === 0) {
      setIsMining(true);
      setTimeout(() => {
        setBalance(balance + 1);
        setCooldown(43200); // 12h in seconds
        setIsMining(false);
      }, 1500);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">Newton Miner</h1>
        <div className="text-center text-gray-300 mb-6">
          Balance: <span className="text-white font-semibold">{balance} Newton</span>
        </div>
        <button
          onClick={handleMine}
          disabled={cooldown > 0 || isMining}
          className={`w-full py-3 rounded-xl text-lg font-bold transition-all duration-300 
            ${cooldown === 0 && !isMining
              ? 'bg-purple-600 hover:bg-purple-700'
              : 'bg-gray-700 cursor-not-allowed'}
          `}
        >
          {isMining ? 'Mining...' : cooldown === 0 ? 'Mine Newton' : 'On Cooldown'}
        </button>
        {cooldown > 0 && (
          <p className="text-sm text-center text-gray-400 mt-4">
            Next mine available in: {formatTime(cooldown)}
          </p>
        )}
      </div>
    </div>
  );
}
