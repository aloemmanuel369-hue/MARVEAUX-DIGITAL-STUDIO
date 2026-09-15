import React, { useState } from 'react';
import Helmet from 'react-helmet';
import MultiStepForm from '../components/MultiStepForm';

const BookNow: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Book Now | Velvet & Vine</title>
        <meta name="description" content="Book your appointment at Velvet & Vine" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-rose-900 dark:text-rose-200">Book Your Appointment</h1>
          <MultiStepForm />
        </div>
      </div>
    </>
  );
};

export default BookNow;