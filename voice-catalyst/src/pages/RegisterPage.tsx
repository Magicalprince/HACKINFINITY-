import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { LANGUAGES } from '../utils/dummyData';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    location: '',
    preferredLanguage: '',
    role: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Here you would normally make an API request to register the user
      console.log('Registering user:', formData);
      setIsSubmitting(false);
      // Redirect to login page after successful registration
      navigate('/login');
    }, 1500);
  };
  
  const roleOptions = [
    { value: 'Farmer', label: 'Farmer' },
    { value: 'Artisan', label: 'Artisan' },
    { value: 'Kirana Shop Owner', label: 'Kirana Shop Owner' },
  ];
  
  const languageOptions = LANGUAGES.map((lang) => ({
    value: lang.code,
    label: lang.displayName,
  }));
  
  const locationOptions = [
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Other', label: 'Other' },
  ];
  
  return (
    <Layout showRegisterButton={false}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Create Your Account</h1>
        
        <div className="card">
          <form onSubmit={handleSubmit}>
            <FormInput
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
            
            <FormInput
              id="mobileNumber"
              label="Mobile Number"
              type="tel"
              placeholder="Enter your 10-digit mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              autoComplete="tel"
            />
            
            <FormSelect
              id="location"
              label="Location"
              options={locationOptions}
              value={formData.location}
              onChange={handleChange}
              required
            />
            
            <FormSelect
              id="preferredLanguage"
              label="Preferred Language"
              options={languageOptions}
              value={formData.preferredLanguage}
              onChange={handleChange}
              required
            />
            
            <FormSelect
              id="role"
              label="I am a"
              options={roleOptions}
              value={formData.role}
              onChange={handleChange}
              required
            />
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-3"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage; 