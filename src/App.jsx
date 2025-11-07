import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import ProductList from './components/ProductList';

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scans, setScans] = useState([]);
  const [scanCount, setScanCount] = useState(0);

  const recommended = useMemo(() => (
    [
      { id: 'alt-1', name: 'Eco Dish Soap', brand: 'GreenGrove', footprintKgCO2e: 0.92, rating: 82 },
      { id: 'alt-2', name: 'Bamboo Toothbrush', brand: 'PureEarth', footprintKgCO2e: 0.15, rating: 91 },
      { id: 'alt-3', name: 'Reusable Produce Bags', brand: 'LeafyLoop', footprintKgCO2e: 0.05, rating: 88 },
    ]
  ), []);

  const onDetected = (code) => {
    // Simple mock: turn a barcode into a product entry
    const product = {
      id: code,
      name: `Scanned Product ${code.slice(0, 4)}`,
      brand: 'Unknown Brand',
      footprintKgCO2e: (code.length % 10) + 0.37,
      rating: Math.max(20, 100 - (parseInt(code.slice(-2), 10) % 85)),
    };
    setScans((prev) => [product, ...prev].slice(0, 6));
    setScanCount((c) => c + 1);
  };

  const handleLogin = () => {
    alert('Sign-in is currently disabled in this preview. The Client ID setup page has been removed.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <Navbar
        user={null}
        onLogin={handleLogin}
        onLogout={() => {}}
        onToggleHistory={() => {}}
        scanCount={scanCount}
      />

      <main>
        <Hero onScan={() => setScannerOpen(true)} />

        {scans.length > 0 && (
          <ProductList title="Your recent scans" products={scans} />
        )}

        <ProductList title="Greener alternatives" products={recommended} />
      </main>

      <Scanner
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onDetected={onDetected}
      />

      <footer className="py-10 text-center text-sm text-slate-500">
        Built for a smoother eco-friendly shopping experience.
      </footer>
    </div>
  );
}
