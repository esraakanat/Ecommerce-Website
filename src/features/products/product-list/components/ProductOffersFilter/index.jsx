import React from 'react';

const ProductOffersFilter = ({ 
  showOffers, 
  onOffersChange 
}) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <div className="flex items-center gap-1">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span className="text-sm font-medium text-gray-700">Offers:</span>
      </div>
      <select
        value={showOffers ? 'on' : 'off'}
        onChange={(e) => onOffersChange(e.target.value === 'on')}
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px] shadow-sm"
      >
        <option value="off">All Products</option>
        <option value="on">On Sale Only</option>
      </select>
    </div>
  );
};

export default ProductOffersFilter;
