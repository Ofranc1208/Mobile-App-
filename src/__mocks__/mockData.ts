// Strongly-typed mock data and helpers used by services and screens
import { Achievement, AnnuityData, DealInfo, Document, PayoutData, RewardsData, SupportInfo, TodoCategory, TodoItem, User } from '../types';

// Helpers
export const simulateNetworkDelay = (minMs: number = 200, maxMs: number = 600): Promise<void> => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export const simulateRandomError = (probability: number = 0.02): boolean => {
  return Math.random() < probability;
};

// Users
export const mockUsers: User[] = [
  {
    id: 'user_001',
    clientId: 'SP001',
    firstName: 'Adam',
    lastName: 'Smith',
    email: 'adam.smith@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-03-15',
    ssn: '123-45-6789',
    address: {
      street: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    profileImage: undefined,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-08-01T00:00:00.000Z'
  }
];

// Payout (Dashboard) Data
export const mockPayoutData: PayoutData[] = [
  {
    id: 'payout_001',
    userId: 'user_001',
    totalAmount: 26525.32,
    paidAmount: 6525.32,
    remainingAmount: 20000.00,
    nextPaymentDate: '2024-09-15',
    paymentFrequency: 'monthly',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2034-01-15'
  }
];

// Annuity Data
export const mockAnnuityData: AnnuityData[] = [
  {
    id: 'annuity_001',
    userId: 'user_001',
    company: 'Pacific Life',
    policyNumber: 'PL-2024-001',
    startDate: '2024-01-15',
    endDate: '2034-01-15',
    monthlyPayment: 3524.22,
    totalValue: 850000,
    currentValue: 850000,
    status: 'active',
    beneficiary: 'Sarah Doe (Spouse)',
    surrenderValue: 750000
  }
];

// Deal Info
export const mockDealInfo: DealInfo[] = [
  {
    id: 'deal_001',
    userId: 'user_001',
    caseNumber: 'CV-2024-001',
    courtName: 'Superior Court of California',
    judgeName: 'Hon. Patricia Johnson',
    attorneyName: 'Robert Williams',
    attorneyPhone: '+1 (555) 234-5678',
    attorneyEmail: 'r.williams@lawfirm.com',
    settlementAmount: 900000,
    offerAmount: 850000,
    status: 'pending',
    offerExpiryDate: '2024-09-30',
    notes: 'Initial offer pending review.'
  }
];

// Todo Categories and Items
export const mockTodoCategories: TodoCategory[] = [
  { id: 'cat_1', name: 'Required Documents', description: 'Essential documents needed for processing', icon: '📋', items: [] },
  { id: 'cat_2', name: 'Verification', description: 'Identity and information verification', icon: '✅', items: [] },
  { id: 'cat_3', name: 'Additional Information', description: 'Supplementary information and forms', icon: '📝', items: [] }
];

export const mockTodoItems: TodoItem[] = [
  {
    id: 'todo_1',
    categoryId: 'cat_1',
    title: 'Upload Driver License',
    description: 'Please upload a clear photo of your driver license',
    status: 'completed',
    required: true,
    dueDate: '2024-08-10',
    completedAt: '2024-08-08',
    attachments: [{ id: 'att_1', name: 'dl.jpg', type: 'image/jpeg', size: 120000 }],
    priority: 'high'
  },
  {
    id: 'todo_2',
    categoryId: 'cat_1',
    title: 'Social Security Letter',
    description: 'Upload your social security letter or card',
    status: 'in_progress',
    required: true,
    dueDate: '2024-08-15',
    notes: 'Waiting on document from SSA.',
    priority: 'urgent'
  },
  {
    id: 'todo_3',
    categoryId: 'cat_1',
    title: 'Debt Paperwork',
    description: 'Provide any relevant debt documentation',
    status: 'pending',
    required: false,
    dueDate: '2024-08-20',
    priority: 'medium'
  },
  {
    id: 'todo_4',
    categoryId: 'cat_2',
    title: 'Address Verification',
    description: 'Verify your current address with utility bill',
    status: 'pending',
    required: true,
    dueDate: '2024-08-18',
    priority: 'high'
  },
  {
    id: 'todo_5',
    categoryId: 'cat_2',
    title: 'Employment Verification',
    description: 'Confirm your current employment status',
    status: 'pending',
    required: false,
    dueDate: '2024-08-25',
    priority: 'low'
  },
  {
    id: 'todo_6',
    categoryId: 'cat_3',
    title: 'Beneficiary Information',
    description: 'Provide beneficiary details if applicable',
    status: 'overdue',
    required: false,
    dueDate: '2024-08-01',
    priority: 'medium'
  }
];

// Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    userId: 'user_001',
    name: 'Driver License',
    type: 'id',
    fileName: 'dl.jpg',
    fileSize: 120000,
    mimeType: 'image/jpeg',
    uploadDate: '2024-08-08',
    status: 'approved',
    reviewNotes: 'Looks good.'
  }
];

// Support Tickets
export const mockSupportInfo: SupportInfo[] = [
  {
    id: 'ticket_001',
    userId: 'user_001',
    subject: 'Document upload issue',
    message: 'Having trouble uploading my SSN letter.',
    status: 'open',
    priority: 'medium',
    category: 'technical',
    createdAt: '2024-08-10T10:00:00.000Z',
    updatedAt: '2024-08-10T10:00:00.000Z',
    assignedTo: 'Sarah Johnson'
  }
];

// Rewards
export const mockAchievements: Achievement[] = [
  { id: 'ach_1', name: 'First Steps', description: 'Complete your first document upload', icon: '🎯', points: 50, isUnlocked: true, unlockedAt: '2024-08-08' },
  { id: 'ach_2', name: 'Document Master', description: 'Upload 5 documents successfully', icon: '📚', points: 100, isUnlocked: false },
  { id: 'ach_3', name: 'Task Champion', description: 'Complete 10 todo items', icon: '🏆', points: 200, isUnlocked: false }
];

export const mockRewardsData: RewardsData[] = [
  {
    id: 'rewards_001',
    userId: 'user_001',
    points: 150,
    level: 2,
    badges: ['First Steps'],
    achievements: [mockAchievements[0]],
    nextMilestone: 200,
    progressPercentage: 50
  }
];

