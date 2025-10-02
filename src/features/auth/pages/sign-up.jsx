import React from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import SignUp from '../components/sign-up';

const Signup = () => {
  return (
    <div className="bg-white">
<Navbar  />
<SignUp />
      <Footer />
    </div>
  );
};

export default Signup;
