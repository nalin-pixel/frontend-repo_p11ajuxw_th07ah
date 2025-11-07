import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProductList from './components/ProductList.jsx';
import GreenScore from './components/GreenScore.jsx';

// Lightweight mock catalog for demo interactions
const CATALOG = [
  { id: '0001', name: 'Organic Oat Milk 1L', brand: 'GreenFields', footprintKgCO2e: 0.7, rating: 88 },
  { id: '0002', name: 'Beef Jerky Pack', brand: "Trail King's", footprintKgCO2e: 6.3, rating: 32 },
  { id: '0003', name: 'Plant-Based Protein Bar', brand: 'EcoFuel', footprintKgCO2e: 0.9, rating: 76 },
  { id: '0004', name: 'Recycled Paper Towels', brand: 'PlanetCare', footprintKgCO2e: 0.4, rating: 90 },
  { id: '0005', name: 'Aluminum Water Bottle', brand: 'EverSip', footprintKgCO2e: 1.1, rating: 81 },
];

function App() {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const score = useMemo(() => {
    if (history.length === 0) return 62; // baseline demo score
    const avg = history.reduce((acc, p) => acc + p.rating, 0) / history.length;
    return Math.round(Math.min(100, Math.max(1, avg)));
  }, [history]);

  const handleScan = () => {
    // Simulate a scan by picking a random catalog item
    const item = CATALOG[Math.floor(Math.random() * CATALOG.length)];
    setHistory((prev) => [{ ...item, scannedAt: Date.now() }, ...prev]);
    setShowHistory(true);
  };

  const recommendations = useMemo(() => CATALOG.filter((p) => p.rating >= 75), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 text-gray-900">
      <Navbar onShowHistory={() => setShowHistory((s) => !s)} scansCount={history.length} />

      <Hero onScan={handleScan} />

      <GreenScore score={score} scans={history.length} />

      {showHistory && (
        <ProductList
          title="Recent scans"
          products={history.map((h, idx) => ({ ...h, id: `${h.id}-${idx}` }))}
        />
      )}

      <ProductList title="Recommended eco alternatives" products={recommendations} />

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-sm text-gray-500">
        Built as a web preview of the EcoShopper concept. The mobile app adds real barcode scanning and on-device camera access.
      </footer>
    </div>
  );
}

export default App;
