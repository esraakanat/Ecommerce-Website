import React from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';

/**
 * مكون لعرض أبعاد الشاشة الحالية
 * مفيد للتطوير واختبار التصميم المتجاوب
 */
const WindowDimensionsDisplay = ({ 
  show = true, 
  position = 'top-right',
  className = '' 
}) => {
  const { width, height } = useWindowDimensions();

  if (!show) return null;

  // تحديد نوع الشاشة
  const getScreenType = (width) => {
    if (width < 640) return 'Mobile';
    if (width < 768) return 'SM';
    if (width < 1024) return 'MD';
    if (width < 1280) return 'LG';
    return 'XL';
  };

  // تحديد الموضع
  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div 
      className={`fixed ${getPositionClasses(position)} bg-black bg-opacity-75 text-white p-2 rounded-lg text-sm z-50 ${className}`}
    >
      <div className="font-mono">
        <div>العرض: {width}px</div>
        <div>الارتفاع: {height}px</div>
        <div className="text-xs mt-1 text-blue-300">
          {getScreenType(width)}
        </div>
      </div>
    </div>
  );
};

export default WindowDimensionsDisplay;
