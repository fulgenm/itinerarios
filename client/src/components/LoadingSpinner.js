import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <SparklesIcon className="h-6 w-6 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Crafting Your Perfect Journey
        </h3>
        <p className="text-gray-600 max-w-md">
          Our AI is analyzing thousands of travel options to create your personalized itinerary. 
          This usually takes 30-60 seconds.
        </p>
      </div>
      
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;