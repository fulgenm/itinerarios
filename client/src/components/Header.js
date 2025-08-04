import React from 'react';
import { MapPinIcon, SparklesIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <MapPinIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Travel Planner</h1>
              <p className="text-sm text-gray-600 flex items-center">
                <SparklesIcon className="h-4 w-4 mr-1" />
                Powered by AI
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Examples
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;