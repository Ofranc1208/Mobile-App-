import React, { useState } from 'react';
import { dealInfo, courtInfo } from '../data/mockData';

const CourtInfoScreen = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('court'); // 'court', 'deal', or 'history'

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-2xl">←</button>
          <span className="font-bold text-gray-800 text-lg">My Deal Info</span>
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('court')}
            className={`flex-1 py-3 px-3 text-center font-medium text-sm ${
              activeTab === 'court'
                ? 'bg-brand-yellow text-gray-800 border-b-2 border-orange-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Court Info
          </button>
          <button
            onClick={() => setActiveTab('deal')}
            className={`flex-1 py-3 px-3 text-center font-medium text-sm ${
              activeTab === 'deal'
                ? 'bg-brand-yellow text-gray-800 border-b-2 border-orange-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            My Deal
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-3 text-center font-medium text-sm ${
              activeTab === 'history'
                ? 'bg-brand-yellow text-gray-800 border-b-2 border-orange-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Offer History
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-24">
        {activeTab === 'court' && <CourtInfoView />}
        {activeTab === 'deal' && <MyDealView />}
        {activeTab === 'history' && <OfferHistoryView />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">🏠</span>
            <span className="text-xs text-gray-600">Home</span>
          </button>
          <button onClick={() => onNavigate('profile')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">👤</span>
            <span className="text-xs text-gray-600">My Profile</span>
          </button>
          <button onClick={() => onNavigate('support')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">📞</span>
            <span className="text-xs text-gray-600">Support</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <span className="text-2xl text-green-600">⚖️</span>
            <span className="text-xs text-green-600 font-semibold">Rewards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Court Info View Component - PRIMARY COURT INFORMATION
const CourtInfoView = () => {
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [showAttorneyDetails, setShowAttorneyDetails] = useState(false);
  const [showHearingDetails, setShowHearingDetails] = useState(false);
  const [showReasonsForExchange, setShowReasonsForExchange] = useState(false);

  return (
    <div className="space-y-4">
      {/* Court Date & Case Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Court Information</h3>
              <p className="text-gray-600 text-sm">Case & Hearing Details</p>
            </div>
          </div>
          <button
            onClick={() => setShowCaseDetails(!showCaseDetails)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showCaseDetails ? 'Hide' : 'Details'}
          </button>
        </div>

        {/* Collapsible Case Details */}
        {showCaseDetails && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">County</h4>
                <p className="text-yellow-700">{courtInfo.caseDetails.county}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Judge</h4>
                <p className="text-yellow-700">{courtInfo.caseDetails.judge}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Court Date</h4>
                <p className="text-yellow-700">{courtInfo.caseDetails.courtDate}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Time</h4>
                <p className="text-yellow-700">{courtInfo.caseDetails.time}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Case #</h4>
                <p className="text-yellow-700">{courtInfo.caseDetails.caseNumber}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Court Room No.</h4>
                <p className="text-yellow-700">{courtInfo.caseDetails.courtRoom}</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-1 text-sm">Location</h4>
              <p className="text-yellow-700">
                {courtInfo.caseDetails.location.address}<br/>
                {courtInfo.caseDetails.location.city}, {courtInfo.caseDetails.location.state} {courtInfo.caseDetails.location.zipCode}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Attorney Information */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">👨‍💼</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Attorney</h3>
              <p className="text-gray-600 text-sm">{courtInfo.attorney.name}</p>
            </div>
          </div>
          <button
            onClick={() => setShowAttorneyDetails(!showAttorneyDetails)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showAttorneyDetails ? 'Hide' : 'Details'}
          </button>
        </div>

        {/* Collapsible Attorney Details */}
        {showAttorneyDetails && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">Fax No</h4>
                <p className="text-blue-700">{courtInfo.attorney.faxNumber}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">Phone</h4>
                <p className="text-blue-700">{courtInfo.attorney.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">Email</h4>
                <p className="text-blue-700">{courtInfo.attorney.email}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-1 text-sm">Office Number</h4>
                <p className="text-blue-700">{courtInfo.attorney.officeNumber}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1 text-sm">Law Firm</h4>
              <p className="text-blue-700">{courtInfo.attorney.firm}</p>
              <p className="text-blue-600 text-xs mt-1">{courtInfo.attorney.specialization}</p>
            </div>
          </div>
        )}
      </div>

      {/* Hearing Details */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📅</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Hearing Details</h3>
              <p className="text-gray-600 text-sm">{courtInfo.hearingDetails.purpose}</p>
            </div>
          </div>
          <button
            onClick={() => setShowHearingDetails(!showHearingDetails)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showHearingDetails ? 'Hide' : 'Details'}
          </button>
        </div>

        {/* Collapsible Hearing Details */}
        {showHearingDetails && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1 text-sm">Status</h4>
                <p className="text-green-700">{courtInfo.hearingDetails.status}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1 text-sm">Duration</h4>
                <p className="text-green-700">{courtInfo.hearingDetails.estimatedDuration}</p>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg mb-4">
              <h4 className="font-semibold text-green-800 mb-2 text-sm">Required Documents</h4>
              <ul className="space-y-1">
                {courtInfo.hearingDetails.requiredDocuments.map((doc, index) => (
                  <li key={index} className="text-green-700 text-sm flex items-center">
                    <span className="text-green-600 mr-2">•</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-1 text-sm">Important Notes</h4>
              <p className="text-green-700 text-sm">{courtInfo.hearingDetails.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Reasons for Exchange */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📝</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Reasons for Exchange</h3>
              <p className="text-gray-600 text-sm">Structured Settlement Transfer</p>
            </div>
          </div>
          <button
            onClick={() => setShowReasonsForExchange(!showReasonsForExchange)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showReasonsForExchange ? 'Hide' : 'Details'}
          </button>
        </div>

        {/* Collapsible Reasons */}
        {showReasonsForExchange && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <ul className="space-y-3">
                {courtInfo.reasonsForExchange.map((reason, index) => (
                  <li key={index} className="text-purple-700 text-sm flex items-start">
                    <span className="text-purple-600 mr-2 mt-1">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// My Deal View Component (Screen 4) - COLLAPSIBLE DESIGN
const MyDealView = () => {
  const [showFundingDetails, setShowFundingDetails] = useState(false);
  const [showSettlementDetails, setShowSettlementDetails] = useState(false);
  const [showSellingReason, setShowSellingReason] = useState(false);

  return (
    <div className="space-y-4">
      {/* Current Offer Section - CLEAN TOP */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Current Offer</h3>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-4">
          <h4 className="text-3xl font-bold text-green-600 mb-2">
            ${dealInfo.currentOffer.amount.toLocaleString()}
          </h4>
          <p className="text-green-700 font-medium">
            Current Offer • {dealInfo.currentOffer.date}
          </p>
        </div>

        {/* Collapsible Funding Details Button */}
        <div className="text-center">
          <button
            onClick={() => setShowFundingDetails(!showFundingDetails)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            {showFundingDetails ? 'Hide Details' : 'Details'}
          </button>
        </div>

        {/* Collapsible Funding Details */}
        {showFundingDetails && (
          <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-800 text-lg">Funding Information</h4>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Funding Source:</span>
                <span className="font-medium">Advanced Funding Corp</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Funding Available:</span>
                <span className="font-medium text-green-600">✓ Ready to Fund</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Expected Funding Date:</span>
                <span className="font-medium">{new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Time to Fund:</span>
                <span className="font-medium text-orange-600">24 Days Left</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Amount Type:</span>
                <span className="font-medium">Bank Transfer</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Settlement Details Section - COLLAPSIBLE */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <span className="text-white text-xl">👤</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">Settlement Details</h2>
              <p className="text-gray-600 text-sm">Annuity Information</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettlementDetails(!showSettlementDetails)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showSettlementDetails ? 'Hide' : 'Details'}
          </button>
        </div>

        {/* Collapsible Settlement Details */}
        {showSettlementDetails && (
          <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Deal Category</h3>
                <p className="text-gray-800">Pacific Life</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Payment Type</h3>
                <p className="text-gray-800">LCP</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Payment Frequency</h3>
                <p className="text-gray-800">Monthly</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Payment Amount</h3>
                <p className="text-gray-800">$3,524.22</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Annuity Issue Date</h3>
                <p className="text-gray-800">10/18/2004</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-1 text-sm">Last Payment Date</h3>
                <p className="text-gray-800">12/18/2062</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Why Am I Selling Section - COLLAPSIBLE */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🏠</span>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Why Am I Selling?</h3>
              <p className="text-gray-600 text-sm">My reason for this transaction</p>
            </div>
          </div>
          <button
            onClick={() => setShowSellingReason(!showSellingReason)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showSellingReason ? 'Hide' : 'Details'}
          </button>
        </div>

        {/* Collapsible Selling Reason */}
        {showSellingReason && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Purchase a Home</h4>
              <p className="text-blue-700 text-sm">
                I am selling this annuity to purchase a home because I am currently renting. 
                This transaction will provide me with the immediate funds needed for a down payment 
                and closing costs, allowing me to transition from renting to homeownership.
              </p>
              <div className="mt-3 text-xs text-blue-600">
                <strong>Goal:</strong> Homeownership • <strong>Timeline:</strong> 24 Days • <strong>Status:</strong> Ready to Fund
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Offer History View Component (Screens 4.1) - COLLAPSIBLE DESIGN
const OfferHistoryView = () => {
  const [showAllOffers, setShowAllOffers] = useState(false);

  return (
    <div className="space-y-4">
      {/* Current Offer Header */}
      <div className="text-center bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Current Offer</h2>
        <div className="text-3xl font-bold text-green-600">
          ${dealInfo.currentOffer.amount.toLocaleString()}
        </div>
        <p className="text-gray-600 text-sm">{dealInfo.currentOffer.date}</p>
      </div>

      {/* Simple 3-Week Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">3-Week Progress Snapshot</h3>
        <SimpleProgressChart />
      </div>

      {/* Collapsible Offer History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Offer History</h3>
          <button
            onClick={() => setShowAllOffers(!showAllOffers)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm"
          >
            {showAllOffers ? 'Hide History' : 'View All Offers'}
          </button>
        </div>

        {/* Show only latest 3 offers by default */}
        <div className="space-y-3">
          {dealInfo.offerHistory.slice(0, showAllOffers ? dealInfo.offerHistory.length : 3).map((offer, index) => (
            <div 
              key={index}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-800">
                  ${offer.amount.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{offer.date}</div>
                <div className="text-xs text-gray-500 mt-1">{offer.description}</div>
              </div>
              
              <div className="text-right">
                {offer.increase > 0 && (
                  <div className="text-green-600 font-semibold text-sm mb-1">
                    +${offer.increase.toLocaleString()}
                  </div>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  offer.status === 'offer_increased' 
                    ? 'bg-green-100 text-green-800'
                    : offer.status === 'initial_offer'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {offer.status === 'offer_increased' ? '📈 Increased' : 
                   offer.status === 'initial_offer' ? '🎯 Initial' : 
                   offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Next Bonus Preview */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-purple-800">Next Bonus Coming</div>
                <div className="text-sm text-purple-600">Expected: {dealInfo.currentOffer.nextIncrease}</div>
                <div className="text-xs text-purple-500 mt-1">Check back this Friday!</div>
              </div>
              <div className="text-right">
                <div className="text-purple-600 font-semibold text-sm">
                  +$500-$1,200
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  ⏰ Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-bold text-green-800 mb-3">📈 Your Growth Journey</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ${dealInfo.engagementMetrics.totalBonusAdded.toLocaleString()}
            </div>
            <div className="text-xs text-green-700">Total Bonuses Added</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {dealInfo.engagementMetrics.totalIncreases}
            </div>
            <div className="text-xs text-blue-700">Weekly Increases</div>
          </div>
        </div>
        
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            🎯 <strong>Your streak:</strong> {dealInfo.engagementMetrics.fridayLoginStreak} weeks of growth!
          </p>
          <p>
            💰 <strong>Average weekly bonus:</strong> ${dealInfo.engagementMetrics.averageWeeklyIncrease.toLocaleString()}
          </p>
          <p>
            🗓️ <strong>Next bonus:</strong> {dealInfo.engagementMetrics.nextBonusDate} (This Friday!)
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
          <p className="text-xs text-green-800 font-medium">
            💡 <strong>Pro Tip:</strong> Check in every Friday to see your offer grow! No declines, no expiration - just continuous value increases.
          </p>
        </div>
      </div>
    </div>
  );
};

// Simple Chart Component for Offer History
const OfferChart = ({ offers }) => {
  // Sort offers by date for chart display
  const sortedOffers = [...offers].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Find min and max values for scaling
  const amounts = sortedOffers.map(offer => offer.amount);
  const maxAmount = Math.max(...amounts);
  const minAmount = Math.min(...amounts);
  const range = maxAmount - minAmount;

  return (
    <div className="space-y-4">
      {/* Chart Area */}
      <div className="relative h-40 bg-gray-50 rounded-lg p-4">
        <div className="flex items-end justify-between h-full">
          {sortedOffers.map((offer, index) => {
            const height = range > 0 ? ((offer.amount - minAmount) / range) * 100 : 50;
            const isCurrentOffer = offer.amount === dealInfo.currentOffer.amount;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-8 rounded-t-lg ${
                      isCurrentOffer ? 'bg-green-500' : 'bg-blue-400'
                    }`}
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2 text-center">
                  <div className="font-medium">
                    ${(offer.amount / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs">
                    {new Date(offer.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded"></div>
          <span className="text-gray-600">Previous Offers</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Current Offer</span>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div>
          <div className="font-semibold text-gray-800">
            ${maxAmount.toLocaleString()}
          </div>
          <div className="text-gray-600">Highest</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            ${minAmount.toLocaleString()}
          </div>
          <div className="text-gray-600">Lowest</div>
        </div>
        <div>
          <div className="font-semibold text-gray-800">
            {offers.length}
          </div>
          <div className="text-gray-600">Total Offers</div>
        </div>
      </div>
    </div>
  );
};

// Simple 3-Week Progress Chart Component
const SimpleProgressChart = () => {
  // Get the last 3 weeks of data
  const last3Weeks = dealInfo.offerHistory.slice(0, 3);
  const maxAmount = Math.max(...last3Weeks.map(offer => offer.amount));
  const minAmount = Math.min(...last3Weeks.map(offer => offer.amount));
  const range = maxAmount - minAmount;

  return (
    <div className="space-y-4">
      {/* Simple Bar Chart */}
      <div className="flex items-end justify-between h-32 bg-gray-50 rounded-lg p-4">
        {last3Weeks.reverse().map((offer, index) => {
          const height = range > 0 ? ((offer.amount - minAmount) / range) * 80 + 20 : 50;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex flex-col items-center justify-end h-full">
                <div
                  className="w-12 rounded-t-lg bg-gradient-to-t from-green-500 to-green-400 transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                <div className="font-medium">${(offer.amount / 1000).toFixed(0)}K</div>
                <div className="text-xs">{new Date(offer.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            </div>
          );
        })}
        
        {/* Arrow showing upward trend */}
        <div className="flex items-center ml-2">
          <div className="text-green-600 text-2xl">📈</div>
        </div>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-blue-600">${last3Weeks[0]?.amount.toLocaleString()}</div>
          <div className="text-xs text-blue-700">3 Weeks Ago</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-purple-600">${last3Weeks[1]?.amount.toLocaleString()}</div>
          <div className="text-xs text-purple-700">2 Weeks Ago</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-lg font-bold text-green-600">${last3Weeks[2]?.amount.toLocaleString()}</div>
          <div className="text-xs text-green-700">This Week</div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <span className="font-medium text-green-600">↗️ Continuous Growth</span> • No Declines • No Expiration
      </div>
    </div>
  );
};

export default CourtInfoScreen;