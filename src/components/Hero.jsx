import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ onScan }) {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zks9uYILDPSX-UX6/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Scan any barcode. Choose greener.
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Point your camera, we analyze the code and estimate the carbon footprint. Find cleaner alternatives instantly.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onScan}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-medium shadow-lg shadow-emerald-500/20 transition"
            >
              Start scanning
            </button>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="px-5 py-3 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </section>
  );
}
