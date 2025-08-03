import React, { useState, useEffect } from 'react';
import { supportInfo } from '../data/mockData';

const SupportScreen = ({ onNavigate, onBack }) => {
  const [activeView, setActiveView] = useState('main'); // main, chat, call, video, faq, financial
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi, how can I help you?",
      sender: "support",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // FAQ data
  const [faqData] = useState([
    {
      id: 1,
      question: "When will I receive my next payment?",
      answer: "Your next payment is scheduled for February 15, 2025. Payments are typically processed 2-3 business days before the scheduled date.",
      category: "Payments"
    },
    {
      id: 2,
      question: "Are my payments taxable?",
      answer: "No, your structured settlement payments are tax-free under IRC Section 104(a)(2). You will not receive a 1099 form for these payments.",
      category: "Tax"
    },
    {
      id: 3,
      question: "Can I change my beneficiaries?",
      answer: "Yes, you can update your beneficiaries through the My Profile section. Some changes may require court approval.",
      category: "Account"
    },
    {
      id: 4,
      question: "What if I need emergency access to funds?",
      answer: "Emergency situations may qualify for hardship withdrawals. Contact your settlement administrator to discuss options.",
      category: "Emergency"
    },
    {
      id: 5,
      question: "How secure are my payments?",
      answer: "Your payments are backed by Pacific Life Insurance Company (A+ rated) and protected by state guaranty funds.",
      category: "Security"
    }
  ]);

  // Financial planning tools data
  const [budgetData, setBudgetData] = useState({
    monthlyIncome: 1250,
    expenses: {
      housing: 800,
      utilities: 150,
      food: 300,
      transportation: 200,
      healthcare: 100,
      other: 150
    }
  });

  // Handle contact action
  const handleContactAction = (action) => {
    switch (action) {
      case 'call':
        setActiveView('call');
        break;
      case 'chat':
        setActiveView('chat');
        break;
      case 'video':
        setActiveView('video');
        break;
      case 'faq':
        setActiveView('faq');
        break;
      case 'financial':
        setActiveView('financial');
        break;
      case 'mailto:WilliamS@smarterpayouts.com':
        // In real app, would open email client
        console.log('Opening email client');
        alert('Opening email client...');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // Handle sending chat message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: chatMessages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me help you with that.",
        "Can you provide more details about your situation?",
        "I'll look into that right away for you.",
        "Thank you for contacting us. How else can I assist you?",
        "Let me check your account details..."
      ];
      
      const supportMessage = {
        id: chatMessages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "support",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 2000);
  };

  // Main Support View
  if (activeView === 'main') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b border-gray-200">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-700 text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Support Center</h1>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">🔔</span>
          </div>
        </div>

        <div className="pb-20 space-y-4">
          {/* Representative Card - Compact */}
          <div className="bg-white mx-4 mt-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  {supportInfo.representative.avatar ? (
                    <img 
                      src={supportInfo.representative.avatar} 
                      alt="Representative" 
                      className="w-full h-full object-cover rounded-full" 
                    />
                  ) : (
                    <span className="text-white text-2xl">👨‍💼</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">{supportInfo.representative.name}</h3>
                  <p className="text-sm text-gray-600">{supportInfo.representative.title}</p>
                  <p className="text-xs text-gray-500 mt-1">Available: Mon-Fri 8AM-6PM EST</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContactAction('call')}
                    className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
                  >
                    <span className="text-white text-lg">📞</span>
                  </button>
                  <button
                    onClick={() => handleContactAction('chat')}
                    className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
                  >
                    <span className="text-white text-lg">💬</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">Quick Support</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleContactAction('faq')}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">❓</span>
                </div>
                <h4 className="font-medium text-gray-800 text-sm">FAQ</h4>
                <p className="text-xs text-gray-500 mt-1">Common questions</p>
              </button>
              
              <button
                onClick={() => handleContactAction('video')}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📹</span>
                </div>
                <h4 className="font-medium text-gray-800 text-sm">Video Call</h4>
                <p className="text-xs text-gray-500 mt-1">Face-to-face chat</p>
              </button>
              
              <button
                onClick={() => handleContactAction('financial')}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-medium text-gray-800 text-sm">Financial Tools</h4>
                <p className="text-xs text-gray-500 mt-1">Budget & planning</p>
              </button>
              
              <button
                onClick={() => handleContactAction('mailto:WilliamS@smarterpayouts.com')}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📧</span>
                </div>
                <h4 className="font-medium text-gray-800 text-sm">Email</h4>
                <p className="text-xs text-gray-500 mt-1">Send message</p>
              </button>
            </div>
          </div>

          {/* Support Resources */}
          <div className="mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">Resources</h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Knowledge Base</h4>
                      <p className="text-sm text-gray-500">Articles and guides</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Submit Feedback</h4>
                      <p className="text-sm text-gray-500">Help us improve</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              
              <button className="w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">🚨</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Report Issue</h4>
                      <p className="text-sm text-gray-500">Technical problems</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              
              <button 
                onClick={() => setShowContactInfo(true)}
                className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📞</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Contact Information</h4>
                      <p className="text-sm text-gray-500">Phone, email & address</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information Modal */}
        {showContactInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Contact Information</h3>
                  <button 
                    onClick={() => setShowContactInfo(false)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-gray-600">✕</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📞</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Office</p>
                      <p className="font-medium text-gray-800">{supportInfo.representative.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📧</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-800">{supportInfo.representative.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📠</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Fax</p>
                      <p className="font-medium text-gray-800">{supportInfo.representative.fax}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">📍</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-800">{supportInfo.representative.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setShowContactInfo(false)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // FAQ View
  if (activeView === 'faq') {
    return <FAQView onBack={() => setActiveView('main')} faqData={faqData} />;
  }

  // Video Call View
  if (activeView === 'video') {
    return <VideoCallView onBack={() => setActiveView('main')} />;
  }

  // Financial Planning View
  if (activeView === 'financial') {
    return <FinancialPlanningView onBack={() => setActiveView('main')} budgetData={budgetData} setBudgetData={setBudgetData} />;
  }

  // Chat View
  if (activeView === 'chat') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b border-gray-200">
          <button 
            onClick={() => setActiveView('main')}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <span className="text-gray-700 text-lg">←</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👨‍💼</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">{supportInfo.representative.name}</h1>
              <p className="text-xs text-green-500">● Online</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">📞</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 pb-20 space-y-4">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Call View  
  if (activeView === 'call') {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Call Header */}
        <div className="p-6 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-6xl">👨‍💼</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{supportInfo.representative.name}</h2>
          <p className="text-gray-300 mb-2">{supportInfo.representative.title}</p>
          <p className="text-green-400 text-lg">Calling...</p>
        </div>

        {/* Call Controls */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-6">
            <button className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔇</span>
            </button>
            <button 
              onClick={() => setActiveView('main')}
              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">📞</span>
            </button>
            <button className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔊</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// FAQ View Component
const FAQView = ({ onBack, faqData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Payments', 'Tax', 'Account', 'Emergency', 'Security'];
  
  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b border-gray-200">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <span className="text-gray-700 text-lg">←</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">FAQ</h1>
        <div className="w-10 h-10"></div>
      </div>

      <div className="p-6 pb-24">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.answer}</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {filteredFAQ.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">🤔</div>
            <p className="text-gray-500">No FAQ items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Video Call View Component
const VideoCallView = ({ onBack }) => {
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b border-gray-200">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <span className="text-gray-700 text-lg">←</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Video Call</h1>
        <div className="w-10 h-10"></div>
      </div>

      <div className="p-6 pb-24">
        {isConnecting ? (
          <div className="text-center py-20">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Connecting to William Smith...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Video Area */}
            <div className="bg-gray-800 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <p className="text-lg font-semibold">William Smith</p>
                <p className="text-sm opacity-75">Settlement Administrator</p>
              </div>
            </div>

            {/* Call Status */}
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-gray-800">Connected</span>
              </div>
              <p className="text-sm text-gray-600">Video call in progress</p>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center space-x-4">
              <button className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔇</span>
              </button>
              <button className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">📹</span>
              </button>
              <button 
                onClick={onBack}
                className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center"
              >
                <span className="text-2xl text-white">📞</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Financial Planning View Component
const FinancialPlanningView = ({ onBack, budgetData, setBudgetData }) => {
  const totalExpenses = Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0);
  const remainingBudget = budgetData.monthlyIncome - totalExpenses;

  const handleExpenseChange = (category, value) => {
    setBudgetData(prev => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        [category]: parseFloat(value) || 0
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b border-gray-200">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <span className="text-gray-700 text-lg">←</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Budget Calculator</h1>
        <div className="w-10 h-10"></div>
      </div>

      <div className="p-6 pb-24 space-y-6">
        {/* Budget Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Budget Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Monthly Income:</span>
              <span className="font-bold text-green-600">${budgetData.monthlyIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Total Expenses:</span>
              <span className="font-bold text-red-600">${totalExpenses.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="font-bold text-gray-800">Remaining:</span>
              <span className={`font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${remainingBudget.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Budget Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(budgetData.expenses).map(([category, amount]) => {
              const percentage = (amount / budgetData.monthlyIncome) * 100;
              return (
                <div key={category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700 capitalize">{category}</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => handleExpenseChange(category, e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right"
                    />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% of income</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Financial Tips */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Tips</h3>
          <div className="space-y-3">
            {remainingBudget > 0 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-800 text-sm">
                  ✅ Great job! You have ${remainingBudget.toLocaleString()} left over each month. Consider saving or investing this surplus.
                </p>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">
                  ⚠️ Your expenses exceed your income by ${Math.abs(remainingBudget).toLocaleString()}. Consider reducing expenses.
                </p>
              </div>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                💡 Your structured settlement payments are tax-free, giving you an advantage over taxable income.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportScreen;