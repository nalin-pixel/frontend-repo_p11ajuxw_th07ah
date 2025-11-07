import React from 'react';
import { Leaf } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { name, brand, footprintKgCO2e, rating } = product;
  const badge = rating >= 80 ? 'bg-emerald-600' : rating >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="rounded-lg border p-4 hover:shadow-sm transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium leading-tight">{name}</h3>
          <p className="text-sm text-gray-500">{brand}</p>
        </div>
        <span className={`text-xs text-white px-2 py-1 rounded ${badge}`}>{rating}</span>
      </div>
      <div className="mt-3 text-sm text-gray-700">
        Estimated footprint: <span className="font-medium">{footprintKgCO2e.toFixed(2)} kg CO₂e</span>
      </div>
      <div className="mt-3 flex items-center gap-2 text-emerald-700">
        <Leaf className="h-4 w-4" />
        <span className="text-sm">Better choice for the planet</span>
      </div>
    </div>
  );
};

const ProductList = ({ title, products }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold tracking-tight mb-4">{title}</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No items yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
