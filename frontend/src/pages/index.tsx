import React from 'react';
import Helmet from 'react-helmet';
import Hero from '../components/Hero';
import FeaturedServices from '../components/FeaturedServices';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Velvet & Vine | Premium Salon & Spa Booking</title>
        <meta name="description" content="Book premium salon and spa services at Velvet & Vine. Hair, nails, facials, and massage treatments from expert stylists." />
        <meta name="og:title" content="Velvet & Vine | Premium Salon & Spa" />
        <meta name="og:description" content="Book your next beauty treatment with Velvet & Vine" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Velvet & Vine",
            "description": "Premium salon and spa booking service",
            "image": "https://velvetandvine.com/logo.png",
            "priceRange": "$$"
          })}
        </script>
      </Helmet>
      <main>
        <Hero />
        <FeaturedServices />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
    </>
  );
};

export default Home;