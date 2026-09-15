import React from 'react';
import Helmet from 'react-helmet';
import ContactForm from '../components/ContactForm';
import MapEmbed from '../components/MapEmbed';

const Contact: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Velvet & Vine</title>
        <meta name="description" content="Get in touch with Velvet & Vine" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-12 text-rose-900 dark:text-rose-200">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <ContactForm />
            </div>
            <div className="space-y-8">
              <MapEmbed />
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-rose-900 dark:text-rose-200">Hours</h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 6:00 PM</p>
                  <p><strong>Sunday:</strong> 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;