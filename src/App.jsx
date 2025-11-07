import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProductList from './components/ProductList.jsx';
import GreenScore from './components/GreenScore.jsx';
import Scanner from './components/Scanner.jsx';
import DetailsPanel from './components/DetailsPanel.jsx';

// Lightweight mock catalog for eco score demo (used for recommendations)
const CATALOG = [
  { id: '0001', name: 'Organic Oat Milk 1L', brand: 'GreenFields', footprintKgCO2e: 0.7, rating: 88 },
  { id: '0002', name: 'Beef Jerky Pack', brand: "Trail King's", footprintKgCO2e: 6.3, rating: 32 },
  { id: '0003', name: 'Plant-Based Protein Bar', brand: 'EcoFuel', footprintKgCO2e: 0.9, rating: 76 },
  { id: '0004', name: 'Recycled Paper Towels', brand: 'PlanetCare', footprintKgCO2e: 0.4, rating: 90 },
  { id: '0005', name: 'Aluminum Water Bottle', brand: 'EverSip', footprintKgCO2e: 1.1, rating: 81 },
];

const backendBase = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? window.location.origin.replace(':3000', ':8000') : '');

function App() {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    // Load persisted scans from backend on first load
    const load = async () => {
      try {
        setLoadingHistory(true);
        const res = await fetch(`${backendBase}/history`);
        if (!res.ok) throw new Error('Failed to load history');
        const data = await res.json();
        // Ensure unique id field
        const normalized = (data || []).map((d, idx) => ({ ...d, id: d.id || `${d.code}-${idx}` }));
        setHistory(normalized);
      } catch (e) {
        // fail soft: no history available
      } finally {
        setLoadingHistory(false);
      }
    };
    load();
  }, []);

  const score = useMemo(() => {
    if (history.length === 0) return 62; // baseline demo score
    const avg = history.reduce((acc, p) => acc + (p.rating ?? 60), 0) / history.length;
    return Math.round(Math.min(100, Math.max(1, avg)));
  }, [history]);

  const handleFakeScan = async () => {
    // Simulate: choose a high-rated item for demo purposes
    const item = CATALOG[Math.floor(Math.random() * CATALOG.length)];
    const enriched = { ...item, scannedAt: Date.now(), id: `${item.id}-${Date.now()}` };
    setHistory((prev) => [enriched, ...prev]);
    setShowHistory(true);
  };

  const handleDetected = async (code) => {
    try {
      const res = await fetch(`${backendBase}/scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) throw new Error('Scan failed');
      const data = await res.json();
      const item = { ...data, id: data.id || `${data.code}-${Date.now()}` };
      setHistory((prev) => [item, ...prev]);
      setSelected(item);
      setShowHistory(true);
    } catch (e) {
      // fallback: create a minimal item if backend fails
      const item = { id: `${code}-${Date.now()}`, code, name: 'Product', manufacturer: 'Unknown', category: 'General Merchandise', rating: 60, footprintKgCO2e: 2.0, scannedAt: Date.now() };
      setHistory((prev) => [item, ...prev]);
      setSelected(item);
      setShowHistory(true);
    }
  };

  const recommendations = useMemo(() => CATALOG.filter((p) => p.rating >= 75), []);

  const logoUrl = 'https://lh3.googleusercontent.com/gg-dl/ABS2GSlT7HRQg1ODqqtR8D_O_qLvXbj1aw8RDbiW7QIi2bEgmXVaerxxzzqMTBzyG7_MjlDDf4wm-3Pls4flVaZJduz6ysgkH4g8HNxom55SPby-nZlCjvK3TSiS7wUra37xa1qMlFw9FoJ0la7DPBp74mREtJu6_eYOyIy6vLvFMSP-MTnS=s1024';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 text-gray-900">
      <Navbar onShowHistory={() => setShowHistory((s) => !s)} scansCount={history.length} score={score} logoUrl={logoUrl} />

      <Hero onScan={() => setScannerOpen(true)} />

      <div className="max-w-5xl mx-auto px-4 -mt-4">
        <button onClick={handleFakeScan} className="text-xs text-gray-500 underline">
          Quick demo: simulate a scan
        </button>
      </div>

      <GreenScore score={score} scans={history.length} />

      {showHistory && (
        <ProductList
          title={loadingHistory ? 'Loading scans…' : 'Recent scans'}
          products={history.map((h, idx) => ({ ...h, id: h.id || `${h.code || h.id}-${idx}` }))}
        />
      )}

      <ProductList title="Recommended eco alternatives" products={recommendations} />

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-sm text-gray-500">
        When you start a scan, your browser will ask for camera permission. Allow access to use the live barcode scanner. On unsupported browsers, manual entry is available.
      </footer>

      <Scanner open={scannerOpen} onClose={() => setScannerOpen(false)} onDetected={handleDetected} />
      <DetailsPanel item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
