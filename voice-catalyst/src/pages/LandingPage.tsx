import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
          <div className="w-full max-w-xl mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Create Digital Catalogs with Voice
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Transform your products into a digital catalog using just your voice. 
              Simple, fast, and designed for local businesses.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
              <Link 
                to="/register" 
                className="btn btn-primary text-center px-8 py-3"
              >
                Get Started
              </Link>
              <Link 
                to="/login" 
                className="btn btn-secondary text-center px-8 py-3"
              >
                Login
              </Link>
            </div>
          </div>
          
          <div className="w-full max-w-md mt-10">
            <div className="h-1 w-20 bg-green-500 mx-auto mb-12 rounded-full"></div>
          </div>
        </div>
        
        {/* Features */}
        <div className="py-12 md:py-20 bg-gray-50 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-6">
            <div className="card text-center border-t-4 border-t-green-500">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Speak Your Products</h3>
              <p className="text-gray-600">Simply describe your product in your language using the voice input</p>
            </div>
            
            <div className="card text-center border-t-4 border-t-green-600">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Catalog</h3>
              <p className="text-gray-600">We automatically create product listings with descriptions in multiple languages</p>
            </div>
            
            <div className="card text-center border-t-4 border-t-green-700">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share with QR Code</h3>
              <p className="text-gray-600">Get a QR code to share your digital catalog with customers instantly</p>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="py-12 md:py-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gradient">Ready to Digitize Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of local businesses already using say2sale
          </p>
          <Link 
            to="/register" 
            className="btn btn-primary text-center px-8 py-3 text-lg"
          >
            Create Your Catalog Now
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage; 