import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import TravelPlan from './components/TravelPlan';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlanGenerated = (plan) => {
    setTravelPlan(plan);
    setError(null);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setTravelPlan(null);
  };

  const handleNewPlan = () => {
    setTravelPlan(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!travelPlan && !loading && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                AI Travel Planner
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Let artificial intelligence create the perfect travel itinerary for your next adventure. 
                Just provide your preferences and let us handle the rest.
              </p>
            </div>
            
            <TravelForm 
              onPlanGenerated={handlePlanGenerated}
              onLoading={handleLoading}
              onError={handleError}
            />
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 text-lg font-semibold mb-2">
                Oops! Something went wrong
              </div>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleNewPlan}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {travelPlan && !loading && (
          <TravelPlan 
            plan={travelPlan} 
            onNewPlan={handleNewPlan}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AI Travel Planner. Powered by artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
