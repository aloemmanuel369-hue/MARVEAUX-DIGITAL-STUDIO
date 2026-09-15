import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import { supabase } from '../lib/supabase';
import AppointmentsList from '../components/AppointmentsList';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;

  return (
    <>
      <Helmet>
        <title>My Dashboard | Velvet & Vine</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-12 text-rose-900 dark:text-rose-200">My Appointments</h1>
          <AppointmentsList userId={user.id} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;