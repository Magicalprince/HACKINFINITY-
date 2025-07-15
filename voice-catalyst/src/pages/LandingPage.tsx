import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Create Digital Catalogs with Voice
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Transform your products into a digital catalog using just your voice. 
              Simple, fast, and designed for local businesses.
            </p>
            <div className="flex space-x-4">
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
          
          <div className="w-full md:w-1/2">
            <div className="relative">
              {/* This would be an image in production */}
              <div className="bg-blue-50 rounded-3xl p-8 md:p-12 shadow-lg flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">Organic Rice</h3>
                      <p className="text-gray-600 text-sm">25 kg</p>
                    </div>
                    <p className="font-bold text-xl text-blue-600">₹1,200</p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 text-sm mb-2">Fresh organic rice grown without pesticides</p>
                    <p className="text-gray-500 text-xs">பூச்சிக்கொல்லிகள் இல்லாமல் வளர்க்கப்பட்ட புதிய கரிம அரிசி</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="py-12 md:py-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Speak Your Products</h3>
              <p className="text-gray-600">Simply describe your product in your language using the voice input</p>
            </div>
            
            <div className="card text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Catalog</h3>
              <p className="text-gray-600">We automatically create product listings with descriptions in multiple languages</p>
            </div>
            
            <div className="card text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
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
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Digitize Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of local businesses already using VoiceCatalyst
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