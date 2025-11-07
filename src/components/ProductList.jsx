import React from 'react';

function RatingBadge({ rating = 'C' }) {
  const color = {
    A: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    B: 'bg-lime-500/20 text-lime-300 border-lime-400/30',
    C: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    D: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
    E: 'bg-red-500/20 text-red-300 border-red-400/30',
  }[rating] || 'bg-white/10 text-white border-white/20';
  return (
    <span className={`inline-flex items-center text-xs px-2 py-1 rounded-md border ${color}`}>{rating}</span>
  );
}

export default function ProductList({ title, products = [] }) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          <p className="text-white/50 text-sm">{products.length} items</p>
        </div>
        {products.length === 0 ? (
          <div className="text-white/60 text-sm">No items yet. Scan a barcode to get started.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-white font-medium">{p.name}</p>
                    <p className="text-white/60 text-sm mt-0.5">{p.brand}</p>
                  </div>
                  <RatingBadge rating={p.rating} />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-white/70">
                  <span>Footprint</span>
                  <span className="font-medium text-white">{p.footprintKgCO2e} kg CO₂e</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
