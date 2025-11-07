import React from 'react';
import { Leaf, History } from 'lucide-react';

const Navbar = ({ onShowHistory, scansCount }) => {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">EcoShopper</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Sustainable Shopping Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onShowHistory}
            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
            aria-label="View scan history"
          >
            <History className="h-4 w-4" />
            History
            {typeof scansCount === 'number' && (
              <span className="ml-1 inline-flex items-center justify-center h-5 min-w-[1.25rem] rounded bg-emerald-600 text-white text-xs px-1">
                {scansCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
