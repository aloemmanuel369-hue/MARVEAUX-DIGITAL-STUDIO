import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import ServiceCard from '../components/ServiceCard';
import { supabase } from '../lib/supabase';

interface Service {
  id: string;
  name: string;
  category: 'Hair' | 'Nails' | 'Facials' | 'Massage';
  price: number;
  duration: number;
  description: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('category');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Hair', 'Nails', 'Facials', 'Massage'];
  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Services | Velvet & Vine</title>
        <meta name="description" content="Browse our premium salon and spa services" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-rose-900 dark:text-rose-200">Our Services</h1>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-2 border-rose-200 dark:border-rose-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {loading ? (
              [...Array(6)].map((_, i) => <ServiceCard key={i} loading />)
            ) : (
              filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;