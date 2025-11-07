import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, Barcode } from 'lucide-react';

// Lightweight camera barcode scanner using the Shape Detection API when available
// Falls back to manual code entry on unsupported browsers
const Scanner = ({ open, onClose, onDetected }) => {
  const videoRef = useRef(null);
  const [supported, setSupported] = useState(false);
  const [error, setError] = useState('');
  const rafRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);

  useEffect(() => {
    // Check API support
    const isSupported = typeof window !== 'undefined' && 'BarcodeDetector' in window;
    setSupported(isSupported);
    if (isSupported) {
      try {
        detectorRef.current = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39', 'itf'] });
      } catch (_) {
        // Some browsers require no options
        try {
          detectorRef.current = new window.BarcodeDetector();
        } catch (e) {
          setSupported(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!open) {
      stop();
      return;
    }
    let cancelled = false;

    async function start() {
      setError('');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        if (detectorRef.current) loop();
      } catch (e) {
        setError('Camera access was blocked. Enter the barcode manually below.');
      }
    }

    function loop() {
      rafRef.current = requestAnimationFrame(loop);
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;
      detectorRef.current.detect(video)
        .then(codes => {
          const code = codes?.[0]?.rawValue;
          if (code) {
            onDetected(code);
            onClose();
          }
        })
        .catch(() => {});
    }

    function stop() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    }

    start();
    return () => {
      cancelled = true; // eslint guard
      stop();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const [manual, setManual] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold">Scan a barcode</h3>
          </div>
          <button onClick={() => { onClose(); }} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 grid gap-4">
          <div className="aspect-video rounded-lg bg-black/90 overflow-hidden grid place-items-center">
            {supported ? (
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            ) : (
              <div className="text-center text-white px-6">
                <p className="font-medium">Barcode scanning not supported on this browser.</p>
                <p className="text-sm text-white/80 mt-1">Enter the barcode manually below.</p>
              </div>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Barcode className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter barcode manually"
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={() => { if (manual.trim()) { onDetected(manual.trim()); onClose(); } }}
              className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
