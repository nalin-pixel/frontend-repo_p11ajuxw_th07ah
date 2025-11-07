import React from 'react';
import { CheckCircle2, Factory, CalendarDays, Package } from 'lucide-react';

// Simple mapping from barcode prefix ranges (GS1) to product categories for demo
// This is a heuristic demo; real classification would rely on a backend or GS1 DB
const CATEGORY_MAP = [
  { range: [0, 19], label: 'Books & Media' },
  { range: [20, 29], label: 'Restricted distribution' },
  { range: [30, 39], label: 'Coupons' },
  { range: [40, 49], label: 'Local use' },
  { range: [50, 59], label: 'Pharmaceuticals' },
  { range: [60, 99], label: 'General Merchandise' },
];

const guessCategory = (code) => {
  const prefix = parseInt(String(code).slice(0, 2), 10);
  const rule = CATEGORY_MAP.find(r => prefix >= r.range[0] && prefix <= r.range[1]);
  return rule ? rule.label : 'General Merchandise';
};

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const DetailsPanel = ({ item, onClose }) => {
  if (!item) return null;
  const { code, name, manufacturer, mfgDate, expDate } = item;
  const category = item.category || guessCategory(code);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t rounded-t-2xl shadow-2xl">
      <div className="max-w-3xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{name}</h3>
            <p className="text-sm text-gray-500">{manufacturer}</p>
          </div>
          <button onClick={onClose} className="text-sm text-emerald-700 font-medium">Close</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Package className="h-4 w-4" />
              <span className="text-sm">Barcode</span>
            </div>
            <p className="mt-1 font-medium">{code}</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded bg-emerald-50 text-emerald-700 px-2 py-1 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{category}</span>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Factory className="h-4 w-4" />
              <span className="text-sm">Manufacturer</span>
            </div>
            <p className="mt-1 font-medium">{manufacturer}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>MFG: <span className="font-medium">{formatDate(mfgDate)}</span></span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>EXP: <span className="font-medium">{formatDate(expDate)}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPanel;
