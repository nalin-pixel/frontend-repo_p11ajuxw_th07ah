import React from 'react';
import { Leaf, History, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({ user, onLogin, onLogout, onToggleHistory, scanCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-emerald-600" />
          <span className="font-semibold text-slate-800">EcoShopper</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleHistory}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            <History className="h-4 w-4" />
            History
            {scanCount > 0 && (
              <span className="ml-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
                {scanCount}
              </span>
            )}
          </button>

          {user ? (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700"
            >
              <User className="h-4 w-4" />
              Sign out
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onLogin}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800"
            >
              <LogIn className="h-4 w-4" />
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
