import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import FormInput from '../components/FormInput';
import { DUMMY_USERS } from '../utils/dummyData';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '', // In a real app, this would be an OTP
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // For demo purposes, we'll check if the mobile number exists in dummy data
    setTimeout(() => {
      const user = DUMMY_USERS.find(u => u.mobileNumber === formData.mobileNumber);
      
      if (user) {
        // In a real app, we would verify the OTP/password here
        console.log('User authenticated:', user);
        setIsSubmitting(false);
        // Redirect to dashboard
        navigate('/dashboard', { state: { userId: user.id } });
      } else {
        setIsSubmitting(false);
        setError('Mobile number not found. Please try again or register.');
      }
    }, 1000);
  };
  
  return (
    <Layout showLoginButton={false}>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gradient">Login to Your Account</h1>
        
        <div className="card">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
            
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-primary py-3"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Demo Accounts</p>
          <ul className="mt-2">
            {DUMMY_USERS.map((user) => (
              <li key={user.id} className="mb-1">
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => {
                    setFormData({
                      mobileNumber: user.mobileNumber,
                      password: 'password123', // Dummy password
                    });
                  }}
                >
                  {user.name} ({user.role}) - {user.mobileNumber}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 