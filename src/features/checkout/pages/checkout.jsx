
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import Checkoutcomponent from '../components/checkoutcomponent';
import { useEffect } from 'react';


function Checkout() {
  // Scroll to top when checkout page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className='bg-white'>
      <Navbar />
       <Checkoutcomponent />
      <Footer />
    </div>
  );
};

export default  Checkout;
