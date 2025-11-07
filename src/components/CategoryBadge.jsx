import React from 'react';

const colorForCategory = (cat) => {
  const c = String(cat || '').toLowerCase();
  if (c.includes('food') || c.includes('beverage') || c.includes('drink')) return 'bg-emerald-600';
  if (c.includes('furniture')) return 'bg-amber-600';
  if (c.includes('pharma')) return 'bg-sky-600';
  return 'bg-gray-700';
};

const CategoryBadge = ({ category }) => {
  const color = colorForCategory(category);
  return (
    <span className={`inline-flex items-center text-xs text-white px-2 py-0.5 rounded ${color}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;
