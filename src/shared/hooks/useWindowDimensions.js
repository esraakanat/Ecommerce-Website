import { useState, useEffect } from 'react';

/**
 * Custom hook لمراقبة أبعاد الشاشة في الوقت الفعلي
 * @returns {Object} - { width: number, height: number }
 */
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // إضافة event listener
    window.addEventListener('resize', handleResize);
    
    // تنظيف الـ listener عند unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
