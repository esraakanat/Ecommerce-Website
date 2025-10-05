
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../shared/components/Navbar';
import HeroSection from '../components/HeroSection';
import PromotionalBanner from '../components/PromotionalBanner';
import ProductShowcase from '../components/ProductShowcase';
import Footer from '../../../shared/components/Footer';
import FeaturesSection from '../../../shared/components/FeaturesSection';
import CategoryFilter from '../../products/product-list/components/CategoryHome';
import FlashProducts from '../components/FlashProducts';
import BestSellingProducts from '../components/BestSellingProducts';
import ExploreOurProducts from '../components/ExploreOurProducts';

const Home = () => {
  const location = useLocation();

  
  useEffect(() => {
    
    sessionStorage.setItem('previousPage', location.pathname + location.search);
  }, [location]);
  return (
    <div className='flex flex-col bg-white'>
      <Navbar  />
      <HeroSection />
      <div className="space-y-12">
       <div className='mt-16'> 
        <FlashProducts  />
        </div>
        <CategoryFilter />
        <BestSellingProducts  />
        <PromotionalBanner />
        <ExploreOurProducts />
        <ProductShowcase />
        <FeaturesSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
