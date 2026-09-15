import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import { supabase } from '../lib/supabase';
import AdminPanel from '../components/AdminPanel';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin: React.FC = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      // Check if user is admin (query user_role in profiles table)
      const { data } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', session.user.id)
        .single();
      
      if (data?.user_role === 'admin') {
        setUser(session.user);
        setIsAdmin(true);
      }
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!user || !isAdmin) return <Navigate to="/" />;

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Velvet & Vine</title>
      </Helmet>
      <div className="min-h-screen bg-slate-900 pt-20">
        <AdminPanel />
      </div>
    </>
  );
};

export default Admin;