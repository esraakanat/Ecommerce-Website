import React, { useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import SignUp from '../components/sign-up';

const Signup = () => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="bg-white">
<Navbar  />
<SignUp />
      <Footer />
    </div>
  );
};

export default Signup;
