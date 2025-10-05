import React, { useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import LoginComponent from '../components/login';
import Footer from '../../../shared/components/Footer';

const Login = () => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <LoginComponent />
      <Footer />
    </div>
  );
};

export default Login;
