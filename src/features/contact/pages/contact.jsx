import React, { useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import ContactComponent from '../ContactComponent/index.jsx';

function Contact() {
  
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
            <ContactComponent />
            <Footer />
        </div>
    )   
}
export default Contact;