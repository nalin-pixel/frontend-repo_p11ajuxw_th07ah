import React from 'react';

export default function Navbar({ onLogin, onLogout, onToggleHistory, scanCount = 0 }) {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 grid place-items-center">
            <span className="text-emerald-400 font-bold">E</span>
          </div>
          <div>
            <p className="text-white font-semibold leading-none">EcoShopper</p>
            <p className="text-xs text-white/60 leading-none mt-1">Scan smarter. Shop greener.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleHistory}
            className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md border border-white/10 text-white/90 hover:text-white hover:border-white/20 transition"
          >
            History
            <span className="ml-1 inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/80">
              {scanCount}
            </span>
          </button>

          <button
            onClick={onLogin}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-emerald-500/90 hover:bg-emerald-500 text-white transition"
          >
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
