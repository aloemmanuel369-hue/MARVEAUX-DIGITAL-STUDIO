import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-50 to-white dark:from-rose-950 dark:via-slate-900 dark:to-slate-800"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-rose-200 dark:bg-rose-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-200 dark:bg-amber-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-amber-600 dark:from-rose-300 dark:to-amber-300 bg-clip-text text-transparent">
          Velvet & Vine
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Indulge in premium salon and spa experiences. Book your perfect appointment today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/book">
            <Button variant="primary" size="lg">
              Book Now
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="secondary" size="lg">
              Explore Services
            </Button>
          </Link>
        </div>

        {/* Featured highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: '✨', title: 'Expert Stylists', desc: 'Certified professionals' },
            { icon: '🌿', title: 'Premium Products', desc: 'Organic & natural' },
            { icon: '💆', title: 'Luxury Experience', desc: 'Relaxation guaranteed' }
          ].map((item, i) => (
            <div key={i} className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md p-6 rounded-xl border border-rose-200 dark:border-rose-900">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg text-rose-900 dark:text-rose-200">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;