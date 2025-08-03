import React from 'react';
import PayoutCard from '../components/PayoutCard';
import RadialMenu from '../components/RadialMenu';

const DashboardScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-main flex flex-col">
      {/* Top Section - User Info */}
      <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white text-2xl">👤</span>
          </div>
          <span className="font-bold text-gray-800 text-lg">ID LM58324</span>
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 p-6">
        
        {/* Payout Section */}
        <div className="text-center mb-4">
          <p className="text-lg font-medium text-gray-700 mb-3">My Payout</p>
          <div className="border-2 border-gray-300 rounded-xl p-4 bg-white shadow-md">
            <p className="text-4xl font-bold text-green-600">$26,525.32</p>
          </div>
        </div>

        {/* Radial Menu */}
        <div className="mt-2">
          <RadialMenu onNavigate={onNavigate} />
        </div>

        {/* Status Section */}
        <div className="mt-16 text-center">
          <p className="text-base font-semibold text-gray-700 mb-6">Status</p>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full shadow-md"></div>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full shadow-sm"></div>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full shadow-sm"></div>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full shadow-sm"></div>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mt-4 max-w-sm mx-auto">
            <span className="text-green-600 font-semibold">Step 1</span>
            <span>Step 2</span>
            <span>Step 3</span>
            <span>Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen; 