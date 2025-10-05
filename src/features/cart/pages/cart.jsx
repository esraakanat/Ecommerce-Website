
import React, { useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import CartSummary from '../components/CartSummary';

const Cart = () => {
 
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      <Navbar />
      <CartSummary />
      <Footer />
    </div>
  );
};

export default Cart;
