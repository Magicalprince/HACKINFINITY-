import React, { useState } from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showLoginButton?: boolean;
  showRegisterButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showLoginButton = true,
  showRegisterButton = true,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code);
    // Here you would add logic to change app language
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        showLoginButton={showLoginButton} 
        showRegisterButton={showRegisterButton} 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white shadow-inner py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-4">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-xs mr-2">
              S2S
            </div>
            <span className="text-gradient font-bold text-lg">say2sale</span>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} say2sale - Creating Digital Catalogs with Voice
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 