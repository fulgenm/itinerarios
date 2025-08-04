import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  PrinterIcon, 
  ShareIcon, 
  CalendarDaysIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const TravelPlan = ({ plan, onNewPlan }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Travel Plan: ${plan.tripOverview.destination}`,
          text: `Check out my AI-generated travel plan for ${plan.tripOverview.destination}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: SparklesIcon },
    { id: 'itinerary', label: 'Daily Itinerary', icon: CalendarDaysIcon },
    { id: 'budget', label: 'Budget Breakdown', icon: CurrencyDollarIcon },
    { id: 'tips', label: 'Tips & Info', icon: ClockIcon }
  ];

  // Parse the plan content into sections (this is a simplified parser)
  const parsePlanContent = () => {
    const content = plan.plan;
    const sections = {};
    
    // Split by major headings
    const parts = content.split(/(?=##\s)/);
    
    parts.forEach(part => {
      if (part.includes('OVERVIEW') || part.includes('Overview')) {
        sections.overview = part;
      } else if (part.includes('ITINERARY') || part.includes('Itinerary') || part.includes('DAY')) {
        sections.itinerary = part;
      } else if (part.includes('BUDGET') || part.includes('Budget')) {
        sections.budget = part;
      } else if (part.includes('TIPS') || part.includes('Tips') || part.includes('CONSIDERATIONS')) {
        sections.tips = part;
      }
    });
    
    // If sections aren't clearly delineated, show full content
    if (Object.keys(sections).length === 0) {
      sections.overview = content;
    }
    
    return sections;
  };

  const planSections = parsePlanContent();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">
                Your AI-Generated Travel Plan
              </h1>
              <p className="text-blue-100 flex items-center">
                <SparklesIcon className="h-4 w-4 mr-2" />
                Generated on {new Date(plan.generatedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={onNewPlan}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>New Plan</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <PrinterIcon className="h-4 w-4" />
                <span>Print</span>
              </button>
              
              <button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <ShareIcon className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="p-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Destination</p>
                <p className="font-semibold">{plan.tripOverview.destination}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CalendarDaysIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{plan.tripOverview.duration} days</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-semibold">${plan.tripOverview.budget}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Travelers</p>
                <p className="font-semibold">{plan.tripOverview.persons} person{plan.tripOverview.persons > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">From:</span> {plan.tripOverview.origin}
              </div>
              <div>
                <span className="font-medium">Travel Style:</span> {plan.tripOverview.holidayType}
              </div>
              <div>
                <span className="font-medium">Start Date:</span> {formatDate(plan.tripOverview.startDate)}
              </div>
              <div>
                <span className="font-medium">End Date:</span> {formatDate(plan.tripOverview.endDate)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeSection === section.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-8">
          {planSections[activeSection] ? (
            <div className="prose max-w-none">
              <div 
                className="whitespace-pre-wrap text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: planSections[activeSection]
                    .replace(/#{1,6}\s/g, '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }}
              />
            </div>
          ) : (
            <div className="prose max-w-none">
              <div 
                className="whitespace-pre-wrap text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: plan.plan
                    .replace(/#{1,6}\s/g, '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      {plan.fallback && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <ClockIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Basic Plan Generated
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                This is a basic template plan. For detailed AI-generated recommendations, 
                please ensure the OpenAI API is properly configured in the backend.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPlan;