// Mock data structures that mirror what a real backend API would provide

// User Profile Data
export const userProfile = {
  id: "LM58324",
  firstName: "Adam",
  middleName: "James",
  lastName: "Smith",
  email: "adam.smith@email.com",
  phone: "954-847-7623",
  phoneSecondary: "954-847-7623",
  avatar: null, // URL to uploaded avatar
  dateOfBirth: "1/12/1985",
  gender: "Male",
  maritalStatus: "Divorced",
  address: {
    street: "710 West Ave",
    city: "Miami Beach",
    state: "FL",
    zipCode: "33139"
  },
  socialSecurity: "XXX-XX-1234", // Masked for security
  employment: {
    status: "Employed",
    employer: "Miami Construction LLC",
    position: "Project Manager",
    workPhone: "305-555-0123",
    yearsEmployed: "8 years",
    annualIncome: "$85,000"
  },
  emergencyContact: {
    name: "Jane Smith",
    relationship: "Sister",
    phone: "954-123-4567"
  }
};

// Payout Information
export const payoutData = {
  currentAmount: 26525.32,
  currency: "USD",
  daysToFund: 23,
  status: {
    currentStep: 1,
    totalSteps: 4,
    stepLabels: ["Step 1", "Step 2", "Step 3", "Complete"],
    statusText: "In Progress"
  }
};

// To Do List Data Structure - CLEAN & SIMPLE
export const todoCategories = [
  {
    id: "review-confirm",
    title: "Review & Confirm Deal",
    icon: "🎯",
    status: "attention",
    urgency: "high",
    description: "Review and finalize your settlement transaction",
    items: [
      {
        id: "disclosure-review",
        title: "Review Disclosure Documents",
        status: "completed",
        dueDate: null,
        completedDate: "2024-01-15",
        description: "Required disclosure documents reviewed and confirmed",
        actionType: "navigate",
        actionTarget: "court"
      },
      {
        id: "offer-confirmation",
        title: "Confirm Current Offer",
        status: "completed",
        dueDate: "2024-02-01",
        completedDate: "2024-01-20",
        description: "Review and confirm your current offer amount",
        actionType: "navigate",
        actionTarget: "court",
        tab: "deal"
      }
    ]
  },
  {
    id: "documents-needed",
    title: "Upload Documents",
    icon: "📤",
    status: "attention",
    urgency: "high", 
    description: "Complete required document uploads",
    items: [
      {
        id: "identity-docs",
        title: "Identity Verification",
        status: "completed",
        required: true,
        dueDate: "2024-02-01",
        completedDate: "2024-01-22",
        description: "Driver's License, Social Security Letter, W2",
        actionType: "component",
        actionTarget: "document-upload"
      },
      {
        id: "financial-docs",
        title: "Financial Documentation",
        status: "pending",
        required: false,
        dueDate: "2024-02-15",
        description: "Debt paperwork, utility bills, bank statements",
        actionType: "component",
        actionTarget: "document-upload"
      },
      {
        id: "additional-docs",
        title: "Additional Documents",
        status: "pending",
        required: false,
        dueDate: null,
        description: "Any other supporting documentation",
        actionType: "component",
        actionTarget: "document-upload"
      }
    ]
  },
  {
    id: "account-management",
    title: "Account & Payment Setup",
    icon: "⚙️",
    status: "pending",
    urgency: "medium",
    description: "Manage your account settings and payment information",
    items: [
      {
        id: "payment-verification",
        title: "Verify Payment Details",
        status: "pending",
        dueDate: "2025-02-10",
        description: "Confirm bank account and payment method",
        actionType: "navigate",
        actionTarget: "annuity-profile",
        tab: "payments"
      },
      {
        id: "beneficiary-review",
        title: "Update Beneficiaries",
        status: "completed",
        completedDate: "2024-01-10",
        description: "Review and update your beneficiary information",
        actionType: "navigate",
        actionTarget: "profile",
        tab: "beneficiaries"
      },
      {
        id: "insurance-review",
        title: "Insurance Company Info",
        status: "completed",
        completedDate: "2024-01-05",
        description: "Pacific Life A+ rating verified",
        actionType: "navigate",
        actionTarget: "annuity-profile",
        tab: "annuities"
      }
    ]
  },
  {
    id: "exclusive-offers",
    title: "Exclusive Client Offers",
    icon: "🎁", 
    status: "available",
    urgency: "low",
    description: "Special offers and services for settlement clients",
    items: [
      {
        id: "financial-services",
        title: "Financial Professional Services",
        status: "available",
        description: "Connect with certified financial advisors",
        actionType: "navigate",
        actionTarget: "rewards",
        tab: "offers"
      },
      {
        id: "real-estate",
        title: "Real Estate Investment Opportunities",
        status: "available",
        description: "Exclusive real estate investment programs",
        actionType: "navigate",
        actionTarget: "rewards",
        tab: "offers"
      }
    ]
  }
];

// Document Upload Data
export const documentTypes = [
  {
    id: "drivers-license",
    name: "Driver License",
    required: true,
    acceptedFormats: ["jpg", "jpeg", "png", "pdf"],
    maxSize: "5MB",
    instructions: "Please upload a clear photo of both sides of your driver's license"
  },
  {
    id: "social-security", 
    name: "Social Security Letter",
    required: true,
    acceptedFormats: ["jpg", "jpeg", "png", "pdf"],
    maxSize: "5MB",
    instructions: "Upload your social security benefits verification letter"
  },
  {
    id: "ss-cert-w2",
    name: "S.S Cert/W2",
    required: true,
    acceptedFormats: ["jpg", "jpeg", "png", "pdf"],
    maxSize: "5MB"
  },
  {
    id: "debt-paperwork",
    name: "Debt Paperwork",
    required: false,
    acceptedFormats: ["jpg", "jpeg", "png", "pdf"],
    maxSize: "5MB"
  },
  {
    id: "utility-bills",
    name: "Utility Bills", 
    required: false,
    acceptedFormats: ["jpg", "jpeg", "png", "pdf"],
    maxSize: "5MB"
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    required: false,
    acceptedFormats: ["jpg", "jpeg", "png", "pdf"],
    maxSize: "5MB"
  }
];

// Annuity Data
export const annuityData = {
  primary: {
    insCompany: "Allstate",
    paymentType: "LCP",
    firstPaymentDate: "10/18/2025",
    lastPaymentDate: "12/18/2062", 
    paymentFrequency: "Monthly",
    paymentAmount: 13524.22,
    totalValue: 8500000,
    annuityIssueDate: "10/18/2004",
    increasePercentage: 3
  },
  secondary: null // Can be populated if user has secondary annuity
};

// Deal Information - FRIDAY ENGAGEMENT STRATEGY
export const dealInfo = {
  currentOffer: {
    amount: 36525.32,
    date: "12/13/2024", // This Friday
    status: "active",
    nextIncrease: "12/20/2024" // Next Friday
  },
  offerHistory: [
    {
      amount: 36525.32,
      date: "12/13/2024",
      status: "offer_increased",
      increase: 1000.00,
      description: "Weekly bonus added"
    },
    {
      amount: 35525.32,
      date: "12/6/2024", 
      status: "offer_increased",
      increase: 800.00,
      description: "Weekly bonus added"
    },
    {
      amount: 34725.32,
      date: "11/29/2024",
      status: "offer_increased", 
      increase: 725.32,
      description: "Weekly bonus added"
    },
    {
      amount: 34000.00,
      date: "11/22/2024",
      status: "offer_increased",
      increase: 1200.00,
      description: "Weekly bonus added"
    },
    {
      amount: 32800.00,
      date: "11/15/2024",
      status: "offer_increased",
      increase: 950.00,
      description: "Weekly bonus added"
    },
    {
      amount: 31850.00,
      date: "11/8/2024",
      status: "offer_increased",
      increase: 650.00,
      description: "Weekly bonus added"
    },
    {
      amount: 31200.00,
      date: "11/1/2024",
      status: "offer_increased",
      increase: 1100.00,
      description: "Weekly bonus added"
    },
    {
      amount: 30100.00,
      date: "10/25/2024",
      status: "offer_increased",
      increase: 875.00,
      description: "Weekly bonus added"
    },
    {
      amount: 29225.00,
      date: "10/18/2024",
      status: "offer_increased",
      increase: 725.00,
      description: "Weekly bonus added"
    },
    {
      amount: 28500.00,
      date: "10/11/2024",
      status: "offer_increased",
      increase: 500.00,
      description: "Weekly bonus added"
    },
    {
      amount: 28000.00,
      date: "10/4/2024",
      status: "offer_increased",
      increase: 600.00,
      description: "Weekly bonus added"
    },
    {
      amount: 27400.00,
      date: "9/27/2024",
      status: "offer_increased",
      increase: 900.00,
      description: "Weekly bonus added"
    },
    {
      amount: 26500.00,
      date: "9/20/2024",
      status: "initial_offer",
      increase: 0,
      description: "Initial offer"
    }
  ],
  dealDetails: {
    paymentType: "LCP",
    purchasingCompany: "Pacific Life", 
    paymentFrequency: "Monthly",
    paymentAmount: 3524.22,
    annuityIssueDate: "10/18/2004",
    lastPaymentDate: "12/18/2062"
  },
  engagementMetrics: {
    totalIncreases: 12,
    totalBonusAdded: 10025.32,
    averageWeeklyIncrease: 835.44,
    fridayLoginStreak: 8,
    nextBonusDate: "12/20/2024"
  }
};

// Court Information for Structured Settlement Exchange
export const courtInfo = {
  caseDetails: {
    county: "Broward County",
    judge: "Sam Adams",
    courtDate: "02/15/2024",
    time: "2:15 pm",
    caseNumber: "2024 CA 002698 OC",
    courtRoom: "29-B",
    location: {
      address: "5254 W Broward, Blvd,",
      city: "Fort Lauderdale",
      state: "FL",
      zipCode: "33123"
    }
  },
  attorney: {
    name: "Smith Sims",
    faxNumber: "954-852-0865",
    phone: "954-852-8685",
    email: "ssims@gmail.com",
    officeNumber: "954-852-3695",
    firm: "Sims & Associates Law",
    specialization: "Structured Settlement Exchange"
  },
  hearingDetails: {
    purpose: "Structured Settlement Transfer Approval",
    status: "Scheduled",
    requiredDocuments: [
      "Transfer Agreement",
      "Disclosure Statement", 
      "Independent Professional Advice Certificate",
      "Financial Hardship Documentation"
    ],
    estimatedDuration: "45 minutes",
    notes: "Please arrive 15 minutes early for check-in"
  },
  reasonsForExchange: [
    "Life Contingent non-guaranteed payments.",
    "Purchasing our first home so we can not save on rent.",
    "Family Protection of $250,000.00 included."
  ]
};

// Support Contact Information
export const supportInfo = {
  representative: {
    name: "William Sone",
    title: "Account Executive", 
    phone: "561-858-4885",
    phoneSecondary: "561-858-4574", 
    email: "WilliamS@smarterpayouts.com",
    officeAddress: "7535 West Fort Lauderdale, FL 33321",
    availability: "9am - 5pm PST",
    avatar: null
  },
  supportOptions: [
    {
      type: "phone",
      label: "Call",
      primary: true,
      action: "tel:+15618584885"
    },
    {
      type: "chat", 
      label: "Chat",
      action: "chat"
    },
    {
      type: "email",
      label: "Email", 
      action: "mailto:WilliamS@smarterpayouts.com"
    }
  ]
};

// API Endpoints that would exist in real backend
export const apiEndpoints = {
  // Authentication
  login: "/api/auth/login",
  logout: "/api/auth/logout", 
  resetPassword: "/api/auth/reset-password",
  
  // User Profile
  getUserProfile: "/api/user/profile",
  updateUserProfile: "/api/user/profile",
  uploadAvatar: "/api/user/avatar",
  
  // Payout & Deal Info
  getPayoutInfo: "/api/user/payout",
  getDealInfo: "/api/user/deal",
  getOfferHistory: "/api/user/offers",
  
  // To Do & Tasks
  getTodoList: "/api/user/todos",
  updateTodoStatus: "/api/user/todos/:id",
  
  // Documents
  getDocuments: "/api/user/documents",
  uploadDocument: "/api/user/documents/upload",
  deleteDocument: "/api/user/documents/:id",
  
  // Annuity
  getAnnuityInfo: "/api/user/annuity",
  updateAnnuityInfo: "/api/user/annuity",
  
  // Support
  getSupportInfo: "/api/support/contact",
  createSupportTicket: "/api/support/tickets",
  
  // Reports
  submitHarassmentReport: "/api/reports/harassment"
};

// Gamified Rewards System Data
export const myRewardsData = {
  currentBalance: 500.00,
  maxEarnings: 2000.00,
  expiresInDays: 7,
  currentLevel: 1,
  rewards: [
    {
      id: "reward-1",
      level: 1,
      title: "Welcome Bonus",
      amount: 100.00,
      unlocked: true,
      completed: true,
      description: "Complete profile setup"
    },
    {
      id: "reward-2", 
      level: 2,
      title: "Document Master",
      amount: 250.00,
      unlocked: false,
      completed: false,
      description: "Upload all required documents"
    },
    {
      id: "reward-3",
      level: 3, 
      title: "Process Champion",
      amount: 500.00,
      unlocked: false,
      completed: false,
      description: "Complete all review steps"
    }
  ],
  weeklySpins: {
    totalSpins: 5,
    spinsUsed: 0,
    spinsRemaining: 5,
    maxWinAmount: 2500.00,
    wheelSegments: [
      { value: 10, color: "#FF1744", label: "$10" },    // Bright red
      { value: 20, color: "#00E676", label: "$20" },    // Bright green
      { value: 30, color: "#2196F3", label: "$30" },    // Bright blue
      { value: 40, color: "#FF9800", label: "$40" },    // Bright orange
      { value: 50, color: "#E91E63", label: "$50" },    // Bright pink
      { value: 60, color: "#9C27B0", label: "$60" },    // Bright purple
      { value: 70, color: "#00BCD4", label: "$70" },    // Bright cyan
      { value: 100, color: "#FFD700", label: "$100" }   // Bright gold
    ]
  },
  achievements: [
    "You've unlocked Level 1",
    "First document uploaded", 
    "Profile completed"
  ]
};

// Exclusive Offers Data (for ToDo List connection)
export const exclusiveOffersData = {
  categories: [
    {
      id: "real-estate",
      name: "Real Estate Investment", 
      icon: "🏠",
      color: "bg-blue-500",
      offers: [
        {
          id: "home-purchase",
          title: "Home Purchase",
          subtitle: "Get a $50K down on a home you qualify for",
          description: "Exclusive home purchase assistance program for settlement clients",
          image: "/api/placeholder/400/200",
          featured: true,
          category: "Real Estate"
        }
      ]
    },
    {
      id: "financial",
      name: "Financial Professional",
      icon: "💰", 
      color: "bg-green-500",
      offers: [
        {
          id: "financial-services",
          title: "Financial Professional Services",
          subtitle: "Expert financial planning and investment advice",
          description: "Connect with certified financial professionals",
          image: "/api/placeholder/400/200",
          featured: false,
          category: "Financial"
        }
      ]
    },
    {
      id: "vacation",
      name: "Vacation Deals",
      icon: "✈️",
      color: "bg-purple-500", 
      offers: [
        {
          id: "cruise-deal",
          title: "Cruise Deals",
          subtitle: "Exclusive cruise packages at discounted rates",
          description: "Premium cruise experiences for settlement clients",
          image: "/api/placeholder/400/200",
          featured: false,
          category: "Vacation"
        }
      ]
    },
    {
      id: "car-purchase",
      name: "Car Purchase Loan",
      icon: "🚗",
      color: "bg-red-500",
      offers: [
        {
          id: "auto-loan",
          title: "Auto Loan Special",
          subtitle: "Low-interest auto loans for qualified clients",
          description: "Special financing rates for vehicle purchases",
          image: "/api/placeholder/400/200", 
          featured: false,
          category: "Automotive"
        }
      ]
    }
  ],
  
  featuredOffers: [
    {
      id: "wealth-builder",
      title: "BUILD YOUR WEALTH",
      subtitle: "FREE Investment Consultation", 
      description: "Get expert financial advice to grow your settlement",
      image: "/api/placeholder/400/300",
      ctaText: "Learn More",
      featured: true,
      category: "Investment"
    }
  ],

  promotionalBanners: [
    {
      id: "exclusive-access",
      title: "Exclusive Client Offers",
      subtitle: "Special deals only for settlement clients",
      background: "bg-gradient-to-r from-blue-500 to-purple-600"
    }
  ]
};

// Sample API Response Formats
export const sampleApiResponses = {
  loginSuccess: {
    success: true,
    data: {
      token: "jwt_token_here",
      user: userProfile,
      expiresIn: 3600
    }
  },
  
  todoListResponse: {
    success: true,
    data: {
      categories: todoCategories,
      lastUpdated: "2024-01-20T10:30:00Z"
    }
  },
  
  documentUploadResponse: {
    success: true,
    data: {
      documentId: "doc_12345",
      fileName: "drivers_license.jpg",
      uploadDate: "2024-01-20T15:45:00Z",
      status: "uploaded",
      reviewStatus: "pending"
    }
  }
};