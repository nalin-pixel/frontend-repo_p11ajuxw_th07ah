import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorBanner({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%]">
      <div className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800 shadow-lg">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1 text-sm leading-relaxed">{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 rounded-md px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
