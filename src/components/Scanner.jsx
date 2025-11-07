import React, { useEffect, useRef, useState } from 'react';
import { Camera, Keyboard, X } from 'lucide-react';
import { BrowserMultiFormatReader } from '@zxing/library';

export default function Scanner({ open, onClose, onDetected }) {
  const videoRef = useRef(null);
  const [manual, setManual] = useState('');
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const codeReaderRef = useRef(null);

  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    return () => {
      try {
        codeReaderRef.current?.reset();
      } catch (_) {}
    };
  }, []);

  useEffect(() => {
    const start = async () => {
      if (!open) return;
      setError('');
      setActive(true);
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === 'videoinput');
        const preferred = videoDevices.reverse().find((d) => /back|rear|environment/i.test(d.label)) || videoDevices[0];
        const stream = await navigator.mediaDevices.getUserMedia({
          video: preferred ? { deviceId: { exact: preferred.deviceId } } : { facingMode: { ideal: 'environment' } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        codeReaderRef.current?.decodeFromVideoDevice(preferred?.deviceId, videoRef.current, (result, err) => {
          if (result) {
            const text = result.getText();
            handleDetected(text);
          }
        });
      } catch (e) {
        console.error(e);
        setError('Camera access is blocked or unavailable. You can enter the barcode manually.');
      }
    };

    const stop = () => {
      setActive(false);
      try {
        codeReaderRef.current?.reset();
      } catch (_) {}
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((t) => t.stop());
      }
    };

    if (open) start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleDetected = (text) => {
    if (!text) return;
    onDetected?.(text);
    onClose?.();
  };

  const submitManual = (e) => {
    e.preventDefault();
    const value = manual.trim();
    if (!value) return;
    handleDetected(value);
    setManual('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="aspect-video relative bg-black">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-2 border-emerald-400/60 rounded-xl m-10" />
            <div className="absolute left-1/2 top-10 -translate-x-1/2 h-0.5 w-2/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Camera size={16} className="opacity-80" />
            {active ? 'Scanning… Point your camera at any barcode (UPC, EAN, Code128, QR, etc.)' : 'Camera inactive'}
          </div>

          <form onSubmit={submitManual} className="ml-auto flex w-full sm:w-auto items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Keyboard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
              <input
                value={manual}
                onChange={(e) => setManual(e.target.value)}
                placeholder="Enter barcode manually"
                className="w-full sm:w-72 pl-9 pr-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
              />
            </div>
            <button type="submit" className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-sm">
              Add
            </button>
          </form>
        </div>

        {error && (
          <div className="px-4 pb-4 -mt-1">
            <div className="text-sm text-amber-300/90 bg-amber-500/10 border border-amber-400/30 rounded-md px-3 py-2">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
