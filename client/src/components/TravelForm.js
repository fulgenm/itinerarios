import React, { useState } from 'react';
import axios from 'axios';
import { 
  MapPinIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon 
} from '@heroicons/react/24/outline';

const TravelForm = ({ onPlanGenerated, onLoading, onError }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    holidayType: 'leisure',
    persons: 1,
    preferences: ''
  });

  const [errors, setErrors] = useState({});

  const holidayTypes = [
    { value: 'leisure', label: 'Leisure & Sightseeing', icon: '🏖️' },
    { value: 'adventure', label: 'Adventure & Outdoor', icon: '⛰️' },
    { value: 'cultural', label: 'Cultural & Historical', icon: '🏛️' },
    { value: 'business', label: 'Business Travel', icon: '💼' },
    { value: 'romantic', label: 'Romantic Getaway', icon: '💕' },
    { value: 'family', label: 'Family Vacation', icon: '👨‍👩‍👧‍👦' },
    { value: 'budget', label: 'Budget Travel', icon: '💰' },
    { value: 'luxury', label: 'Luxury Experience', icon: '✨' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin is required';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }

      if (start >= end) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    }

    if (!formData.persons || isNaN(formData.persons) || parseInt(formData.persons) <= 0) {
      newErrors.persons = 'Number of persons must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/travel/plan', {
        ...formData,
        budget: parseFloat(formData.budget),
        persons: parseInt(formData.persons)
      });

      onPlanGenerated(response.data.travelPlan);
    } catch (error) {
      console.error('Error generating travel plan:', error);
      
      let errorMessage = 'Failed to generate travel plan. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Unable to connect to the server. Please make sure the backend is running.';
      }
      
      onError(errorMessage);
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white mb-2">Plan Your Perfect Trip</h2>
        <p className="text-blue-100">Tell us about your dream destination and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Origin and Destination */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 mr-2" />
              Origin (Departure City)
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleInputChange}
              placeholder="e.g., New York, NY"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.origin ? 'border-red-500' : ''
              }`}
            />
            {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 mr-2" />
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="e.g., Paris, France"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.destination ? 'border-red-500' : ''
              }`}
            />
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.startDate ? 'border-red-500' : ''
              }`}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CalendarDaysIcon className="h-4 w-4 mr-2" />
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.endDate ? 'border-red-500' : ''
              }`}
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
          </div>
        </div>

        {/* Budget and Persons */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <CurrencyDollarIcon className="h-4 w-4 mr-2" />
              Total Budget (USD)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., 3000"
              min="100"
              step="50"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.budget ? 'border-red-500' : ''
              }`}
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Number of Travelers
            </label>
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleInputChange}
              min="1"
              max="20"
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.persons ? 'border-red-500' : ''
              }`}
            />
            {errors.persons && <p className="text-red-500 text-sm mt-1">{errors.persons}</p>}
          </div>
        </div>

        {/* Holiday Type */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <HeartIcon className="h-4 w-4 mr-2" />
            Type of Holiday
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {holidayTypes.map((type) => (
              <label
                key={type.value}
                className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-300 ${
                  formData.holidayType === type.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="holidayType"
                  value={type.value}
                  checked={formData.holidayType === type.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <span className="text-2xl mb-2">{type.icon}</span>
                <span className="text-sm font-medium text-center">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Additional Preferences (Optional)
          </label>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleInputChange}
            placeholder="Any specific preferences, dietary restrictions, accessibility needs, or special interests..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            <span>Generate My Travel Plan</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;