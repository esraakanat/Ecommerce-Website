
import React from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import CartSummary from '../components/CartSummary';

const Cart = () => {
  return (
    <div>
      <Navbar />
      <CartSummary />
      <Footer />
    </div>
  );
};

export default Cart;
