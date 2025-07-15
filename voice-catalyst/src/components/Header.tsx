import React from 'react';
import { Link } from 'react-router-dom';
import { LANGUAGES } from '../utils/dummyData';

interface HeaderProps {
  showLoginButton?: boolean;
  showRegisterButton?: boolean;
  currentLanguage?: string;
  onLanguageChange?: (code: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  showLoginButton = true,
  showRegisterButton = true,
  currentLanguage = 'en',
  onLanguageChange = () => {},
}) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold mr-3">
            S2S
          </div>
          <span className="text-gradient font-bold text-xl">say2sale</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <select 
              className="appearance-none bg-white border border-gray-200 rounded-lg py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
            >
              {LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.displayName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {showLoginButton && (
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
            )}
            {showRegisterButton && (
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 