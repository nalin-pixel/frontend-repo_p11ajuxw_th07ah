import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProductList from './components/ProductList.jsx';
import GreenScore from './components/GreenScore.jsx';
import Scanner from './components/Scanner.jsx';
import DetailsPanel from './components/DetailsPanel.jsx';

// Demo product enrichment based on barcode; in a real app this comes from backend/APIs
const MOCK_DB = {
  '8901063010805': { name: 'Whole Wheat Bread', manufacturer: 'Healthy Bakes Co.', category: 'Food & Beverages' },
  '012345678905': { name: 'Sparkle Soda 330ml', manufacturer: 'FizzCraft Beverages', category: 'Beverages' },
  '9780306406157': { name: 'Sustainable Living Guide', manufacturer: 'EcoPrint Publishers', category: 'Books & Media' },
  '4901234567894': { name: 'Bamboo Toothbrush 2-Pack', manufacturer: 'GreenSmile', category: 'Personal Care' },
  '0012345678905': { name: 'Oak Side Table', manufacturer: 'HomeCraft Furnishings', category: 'Furniture' },
};

const randomInPastMonths = (months = 6) => {
  const now = new Date();
  const past = new Date(now);
  past.setMonth(now.getMonth() - Math.floor(Math.random() * months));
  return past;
};

const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

// Lightweight mock catalog for eco score demo
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
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const score = useMemo(() => {
    if (history.length === 0) return 62; // baseline demo score
    const avg = history.reduce((acc, p) => acc + (p.rating ?? 60), 0) / history.length;
    return Math.round(Math.min(100, Math.max(1, avg)));
  }, [history]);

  const handleFakeScan = () => {
    // Simulate an eco score item to keep the demo engaging
    const item = CATALOG[Math.floor(Math.random() * CATALOG.length)];
    setHistory((prev) => [{ ...item, scannedAt: Date.now() }, ...prev]);
    setShowHistory(true);
  };

  const handleDetected = (code) => {
    // Enrich with mock DB; otherwise synthesize sensible details
    const base = MOCK_DB[code] || {
      name: 'Product',
      manufacturer: 'Unknown Manufacturer',
      category: 'General Merchandise',
    };
    const mfgDate = randomInPastMonths(9);
    const expDate = addMonths(mfgDate, 12 + Math.floor(Math.random() * 12));

    const enriched = {
      id: `${code}-${Date.now()}`,
      code,
      name: base.name,
      manufacturer: base.manufacturer,
      category: base.category,
      mfgDate: mfgDate.toISOString(),
      expDate: expDate.toISOString(),
      // attach a mock eco rating so the score widget remains relevant
      rating: 50 + Math.floor(Math.random() * 50),
      footprintKgCO2e: +(0.5 + Math.random() * 5).toFixed(2),
    };

    setHistory((prev) => [enriched, ...prev]);
    setSelected(enriched);
    setShowHistory(true);
  };

  const recommendations = useMemo(() => CATALOG.filter((p) => p.rating >= 75), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 text-gray-900">
      <Navbar onShowHistory={() => setShowHistory((s) => !s)} scansCount={history.length} />

      <Hero onScan={() => setScannerOpen(true)} />

      <div className="max-w-5xl mx-auto px-4 -mt-4">
        <button onClick={handleFakeScan} className="text-xs text-gray-500 underline">
          Quick demo: simulate a scan
        </button>
      </div>

      <GreenScore score={score} scans={history.length} />

      {showHistory && (
        <ProductList
          title="Recent scans"
          products={history.map((h, idx) => ({ ...h, id: h.id || `${h.code || h.id}-${idx}` }))}
        />
      )}

      <ProductList title="Recommended eco alternatives" products={recommendations} />

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-sm text-gray-500">
        Use the camera scanner on a phone to read EAN/UPC/Code128 barcodes. On unsupported browsers, manual entry is available.
      </footer>

      <Scanner open={scannerOpen} onClose={() => setScannerOpen(false)} onDetected={handleDetected} />
      <DetailsPanel item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

export default App;
