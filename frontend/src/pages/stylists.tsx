import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import StylistCard from '../components/StylistCard';
import { supabase } from '../lib/supabase';

interface Stylist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image_url: string;
  rating: number;
}

const Stylists: React.FC = () => {
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    try {
      const { data, error } = await supabase
        .from('stylists')
        .select('*')
        .order('name');

      if (error) throw error;
      setStylists(data || []);
    } catch (error) {
      console.error('Error fetching stylists:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Stylists | Velvet & Vine</title>
        <meta name="description" content="Meet our expert stylists at Velvet & Vine" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-rose-900 dark:text-rose-200">Meet Our Stylists</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {loading ? (
              [...Array(6)].map((_, i) => <StylistCard key={i} loading />)
            ) : (
              stylists.map(stylist => (
                <StylistCard key={stylist.id} stylist={stylist} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stylists;