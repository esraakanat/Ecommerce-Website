import React, { useEffect } from 'react';
import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import HeroSection from '../component/HeroSection/index.jsx';
import StatsCards from '../component/StatsCards/index.jsx';
import TeamSection from '../component/TeamSection/index.jsx';
import FeaturesSection from '../../../shared/components/FeaturesSection';

function About() {
    
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
            <div className="space-y-16">
            <HeroSection />
            <StatsCards />
            <TeamSection />
            <FeaturesSection />
            </div>
            <Footer />
        </div>
    )
}
export default About;