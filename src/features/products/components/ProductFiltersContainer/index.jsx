import React from 'react';
import ProductOffersFilter from '../ProductOffersFilter';
import ProductSorting from '../ProductSorting';

const ProductFiltersContainer = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange, 
  productsCount,
  showOffers,
  onOffersChange
}) => {
  return (
    <div className="px-4 py-4 border-b border-gray-100 max-w-7xl mx-auto mb-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* All Filters - Responsive Layout */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full lg:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Category:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px] shadow-sm"
            >
              <option value="all">All Categories</option>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id || category} value={category.mappedName || category.name || category}>
                    {category.mappedName || category.name || category}
                  </option>
                ))
              ) : (
                <option disabled>No categories available</option>
              )}
            </select>
          </div>
          
          {/* Sorting Filter */}
          <ProductSorting
            sortBy={sortBy}
            onSortChange={onSortChange}
          />
          
          {/* Offers Filter */}
          <ProductOffersFilter
            showOffers={showOffers}
            onOffersChange={onOffersChange}
          />
        </div>
        
        {/* Products Count - Right Side */}
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-2 rounded-lg shadow-sm w-full sm:w-auto justify-center sm:justify-start">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="font-medium">{productsCount}</span>
          <span>products</span>
          {selectedCategory !== 'all' && (
            <span className="text-blue-600 font-medium">in {selectedCategory}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFiltersContainer;
