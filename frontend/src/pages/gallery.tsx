import React, { useState } from 'react';
import Helmet from 'react-helmet';
import Gallery from '../components/Gallery';

const GalleryPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Gallery | Velvet & Vine</title>
        <meta name="description" content="See our salon and spa gallery" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20">
        <Gallery />
      </div>
    </>
  );
};

export default GalleryPage;