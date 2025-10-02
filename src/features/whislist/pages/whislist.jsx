import React from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import Wishlistcomponent from '../component/Wishlistcomponent';
import JustForYou from '../component/just-for-you';

function Wishlist() {
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