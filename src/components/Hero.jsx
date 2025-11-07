import React from 'react';
import { Camera, ScanLine } from 'lucide-react';

const Hero = ({ onScan }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Scan barcodes. Shop greener.</h2>
          <p className="mt-3 text-gray-600">Point your camera at any product's barcode to estimate its carbon footprint, discover eco-friendly alternatives, and track your personal green score.</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onScan}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-md"
            >
              <Camera className="h-5 w-5" />
              Start Scan
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <ScanLine className="h-5 w-5" />
              <span className="text-sm">Works with any standard barcode</span>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-emerald-50 to-white p-6">
          <div className="aspect-video rounded-lg bg-white grid place-items-center border">
            <div className="text-center px-6">
              <p className="font-medium">Live preview area</p>
              <p className="text-sm text-gray-500">In the mobile app this becomes the camera scanner.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
