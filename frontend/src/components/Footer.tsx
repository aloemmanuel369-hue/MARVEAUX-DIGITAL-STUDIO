import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              Velvet & Vine
            </h3>
            <p className="text-gray-400">Premium salon and spa services for your ultimate relaxation.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services" className="hover:text-rose-400">Services</Link></li>
              <li><Link to="/stylists" className="hover:text-rose-400">Stylists</Link></li>
              <li><Link to="/gallery" className="hover:text-rose-400">Gallery</Link></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Mon-Fri: 9 AM - 7 PM</li>
              <li>Sat: 10 AM - 6 PM</li>
              <li>Sun: 12 PM - 5 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 hello@velvetandvine.com</li>
              <li>📞 (555) 123-4567</li>
              <li>📍 123 Spa Street, City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Velvet & Vine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;