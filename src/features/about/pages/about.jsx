import Navbar from '../../../shared/components/Navbar';
import Footer from '../../../shared/components/Footer';
import HeroSection from '../component/HeroSection/index.jsx';
import StatsCards from '../component/StatsCards/index.jsx';
import TeamSection from '../component/TeamSection/index.jsx';
import ServiceSection from '../component/service/index.jsx';
function About() {
    return (
        <div className="bg-white">
            <Navbar />
            <div className="space-y-16">
            <HeroSection />
            <StatsCards />
            <TeamSection />
            <ServiceSection />
            </div>
            <Footer />
        </div>
    )
}
export default About;