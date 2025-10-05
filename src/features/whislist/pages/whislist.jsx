import React, { useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import Wishlistcomponent from '../component/Wishlistcomponent';
import JustForYou from '../component/just-for-you';

function Wishlist() {
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <Wishlistcomponent />
            <JustForYou />
            <Footer />
        </div>
    );
}

export default Wishlist;