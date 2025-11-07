import React from 'react';

const progressColor = (score) => {
  if (score >= 80) return 'bg-emerald-600';
  if (score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

const GreenScore = ({ score = 62, scans = 0 }) => {
  const color = progressColor(score);
  return (
    <section className="max-w-5xl mx-auto px-4 pb-10">
      <div className="rounded-xl border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Your Green Score</h2>
          <span className="text-sm text-gray-500">Based on your recent scans</span>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
          <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>Score: <span className="font-medium text-gray-900">{score}</span></span>
          <span>Total scans: <span className="font-medium text-gray-900">{scans}</span></span>
        </div>
      </div>
    </section>
  );
};

export default GreenScore;
