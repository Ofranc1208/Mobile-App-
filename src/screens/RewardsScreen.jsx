import React, { useState } from 'react';
import { exclusiveOffersData as rewardsData } from '../data/mockData';

const ExclusiveOffersScreen = ({ onNavigate, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Get all offers from all categories
  const allOffers = rewardsData.categories.flatMap(category => 
    category.offers.map(offer => ({ ...offer, categoryInfo: category }))
  );

  // Filter offers based on selected category
  const filteredOffers = selectedCategory === 'all' 
    ? allOffers
    : allOffers.filter(offer => offer.categoryInfo.id === selectedCategory);

  // Handle offer selection
  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
  };

  // Main Rewards View
  if (!selectedOffer) {
    return (
      <div className="min-h-screen bg-background-main">
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-2xl">←</button>
            <span className="font-bold text-gray-800 text-lg">Exclusive Client Offers</span>
          </div>
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white text-lg">🔔</span>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Categories</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Categories
            </button>
            {rewardsData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-brand-green text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Offers Banner */}
        {rewardsData.featuredOffers.length > 0 && (
          <div className="px-6 pb-4">
            {rewardsData.featuredOffers.map((offer) => (
              <div 
                key={offer.id}
                onClick={() => handleOfferClick(offer)}
                className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-blue-100 mb-4">{offer.subtitle}</p>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
                      {offer.ctaText || "Learn More"}
                    </button>
                  </div>
                  <div className="text-6xl opacity-20">💰</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Offers Grid */}
        <div className="px-6 pb-24">
          <div className="grid grid-cols-1 gap-4">
            {filteredOffers.map((offer) => (
              <OfferCard 
                key={offer.id}
                offer={offer}
                onClick={() => handleOfferClick(offer)}
              />
            ))}
          </div>

          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Offers Available</h3>
              <p className="text-gray-600">Check back later for new exclusive offers!</p>
            </div>
          )}
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
              <span className="text-2xl text-green-600">🎁</span>
              <span className="text-xs text-green-600 font-semibold">Rewards</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Offer Detail View
  return (
    <OfferDetailView 
      offer={selectedOffer}
      onBack={() => setSelectedOffer(null)}
    />
  );
};

// Offer Card Component
const OfferCard = ({ offer, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* Offer Image Placeholder */}
      <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center">
        <span className="text-4xl">{offer.categoryInfo.icon}</span>
      </div>

      {/* Offer Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{offer.title}</h3>
            <p className="text-gray-600 text-sm">{offer.subtitle}</p>
          </div>
          {offer.featured && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>

        <p className="text-gray-700 text-sm mb-4">{offer.description}</p>

        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${offer.categoryInfo.color} text-white`}>
            {offer.category}
          </span>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-800">
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
};

// Offer Detail View Component
const OfferDetailView = ({ offer, onBack }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  if (showContactForm) {
    return <ContactForm offer={offer} onBack={() => setShowContactForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-2xl">←</button>
          <span className="font-bold text-gray-800 text-lg">Offer Details</span>
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Offer Detail Content */}
      <div className="p-6 pb-24">
        {/* Hero Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">
              {offer.categoryInfo ? offer.categoryInfo.icon : '💰'}
            </div>
            <h1 className="text-2xl font-bold">{offer.title}</h1>
          </div>
        </div>

        {/* Offer Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">{offer.title}</h2>
          <p className="text-gray-600 mb-4">{offer.subtitle}</p>
          <p className="text-gray-700 mb-6">{offer.description}</p>

          {/* Offer Benefits */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-800">What You Get:</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Exclusive access to premium services</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Special pricing for settlement clients</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Professional consultation included</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">No hidden fees or obligations</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="flex items-center justify-between">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              offer.categoryInfo ? offer.categoryInfo.color : 'bg-gray-500'
            } text-white`}>
              {offer.category}
            </span>
            {offer.featured && (
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                ⭐ Featured Offer
              </span>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">How to Get Started</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <span className="text-gray-700">Click "Get Started" below</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <span className="text-gray-700">Fill out the quick contact form</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <span className="text-gray-700">We'll connect you with a specialist</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setShowContactForm(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Get Started Now
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-4 px-6 rounded-xl transition-colors"
          >
            Back to Offers
          </button>
        </div>
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = ({ offer, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, would send to backend
    console.log('Contact form submitted:', { offer: offer.id, formData });
    setIsSubmitted(true);
    
    // Show success message for 3 seconds
    setTimeout(() => {
      onBack();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-main flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Request Submitted!</h2>
          <p className="text-gray-700 mb-6">
            Thank you for your interest in {offer.title}. A specialist will contact you within 24 hours.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting back to offers...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-2xl">←</button>
          <span className="font-bold text-gray-800 text-lg">Contact Form</span>
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Get Started with {offer.title}</h2>
          <p className="text-gray-600 mb-6">Fill out this form and we'll connect you with a specialist.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Tell us more about your needs..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors"
            >
              Submit Request
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOffersScreen;