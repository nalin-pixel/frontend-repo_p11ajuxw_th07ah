import React from 'react';
import GuideHeader from './components/GuideHeader';
import StepList from './components/StepList';
import TipsCard from './components/TipsCard';
import Faq from './components/Faq';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <header className="mx-auto max-w-5xl px-4 py-10">
        <GuideHeader />
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-6">
          <h2 className="text-xl font-semibold text-slate-900">Step-by-step</h2>
          <StepList />
        </div>
        <TipsCard />
        <Faq />
      </main>

      <footer className="py-8 text-center text-sm text-slate-500">
        Need help? Paste your error message here and I can troubleshoot.
      </footer>
    </div>
  );
}
