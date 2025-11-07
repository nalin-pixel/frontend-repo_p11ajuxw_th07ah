import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import ProductList from './components/ProductList';

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scans, setScans] = useState([]);
  const [scanCount, setScanCount] = useState(0);

  const onDetected = (barcodeText) => {
    const last4 = barcodeText.slice(-4).padStart(4, '0');
    const ratingScale = ['A', 'B', 'C', 'D', 'E'];
    const rating = ratingScale[parseInt(last4, 10) % ratingScale.length];
    const footprint = (parseInt(last4, 10) % 1200) / 10 + 0.5; // 0.5 to 120.5 kg CO2e

    const product = {
      id: `${Date.now()}-${barcodeText}`,
      name: `Product ${last4}`,
      brand: 'Mock Brand',
      footprintKgCO2e: footprint.toFixed(1),
      rating,
    };

    setScans((prev) => [product, ...prev]);
    setScanCount((c) => c + 1);
  };

  const recommended = useMemo(
    () => [
      { id: 'alt-1', name: 'EcoWash Detergent', brand: 'GreenDrop', footprintKgCO2e: '1.8', rating: 'A' },
      { id: 'alt-2', name: 'Plant-Based Milk', brand: 'Oat & Co.', footprintKgCO2e: '0.9', rating: 'A' },
      { id: 'alt-3', name: 'Bamboo Toothbrush', brand: 'TerraSmile', footprintKgCO2e: '0.2', rating: 'A' },
    ],
    []
  );

  const handleLogin = () => {
    alert('Sign-in is currently disabled in this sandbox build.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black">
      <Navbar onLogin={handleLogin} onLogout={() => {}} onToggleHistory={() => {}} scanCount={scanCount} />

      <Hero onScan={() => setScannerOpen(true)} />

      <ProductList title="Recent scans" products={scans} />
      <ProductList title="Greener alternatives" products={recommended} />

      <Scanner open={scannerOpen} onClose={() => setScannerOpen(false)} onDetected={onDetected} />
    </div>
  );
}
