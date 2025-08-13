// Core data models (aligned with screens and services)
export interface User {
  id: string;
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayoutData {
  id: string;
  userId: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextPaymentDate: string;
  paymentFrequency: 'monthly' | 'quarterly' | 'annually';
  status: 'active' | 'completed' | 'suspended';
  startDate: string;
  endDate?: string;
}

export interface TodoCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: TodoItem[];
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  required: boolean;
  dueDate: string;
  completedAt?: string;
  attachments?: Array<{ id: string; name: string; type: string; size: number }>;
  notes?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  categoryId: string;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: 'id' | 'medical' | 'legal' | 'financial' | 'other';
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  reviewNotes?: string;
  expiresAt?: string;
}

export interface AnnuityData {
  id: string;
  userId: string;
  company: string;
  policyNumber: string;
  startDate: string;
  endDate?: string;
  monthlyPayment: number;
  totalValue: number;
  currentValue: number;
  status: 'active' | 'matured' | 'surrendered';
  beneficiary?: string;
  surrenderValue?: number;
}

export interface DealInfo {
  id: string;
  userId: string;
  caseNumber: string;
  courtName: string;
  judgeName?: string;
  attorneyName?: string;
  attorneyPhone?: string;
  attorneyEmail?: string;
  settlementAmount: number;
  offerAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'negotiating';
  offerExpiryDate: string;
  notes?: string;
}

export interface CourtInfo {
  id: string;
  userId: string;
  caseNumber: string;
  courtName: string;
  courtAddress: string;
  courtPhone: string;
  judgeName: string;
  nextHearingDate?: string;
  hearingType?: string;
  caseStatus: 'active' | 'closed' | 'appealed';
  lastUpdated: string;
}

export interface SupportInfo {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'general' | 'urgent';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolution?: string;
}

export interface RewardsData {
  id: string;
  userId: string;
  points: number;
  level: number;
  badges: string[];
  achievements: Achievement[];
  nextMilestone: number;
  progressPercentage: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: string;
  isUnlocked: boolean;
}

// Optional richer profile used by documentation/mocks
export interface UserProfile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  employment: {
    status: string;
    employer: string;
    position: string;
    annualIncome: string;
  };
  avatar?: string;
}

// Service interfaces (aligned with mock implementations)
export interface IAuthService {
  login(clientId: string, password: string): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
}

export interface IUserService {
  getUserProfile(userId: string): Promise<User>;
  updateUserProfile(userId: string, updates: Partial<User>): Promise<User>;
  uploadProfileImage(userId: string, imageFile: any): Promise<string>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}

export interface ITodoService {
  getTodoCategories(userId: string): Promise<TodoCategory[]>;
  getTodoItems(userId: string, categoryId?: string): Promise<TodoItem[]>;
  createTodoItem(
    userId: string,
    item: Omit<TodoItem, 'id' | 'status' | 'completedAt'> & { categoryId: string }
  ): Promise<TodoItem>;
  updateTodoItem(itemId: string, updates: Partial<TodoItem>): Promise<TodoItem>;
  deleteTodoItem(itemId: string): Promise<void>;
  markTodoComplete(itemId: string): Promise<TodoItem>;
}

export interface IDocumentService {
  getDocuments(userId: string): Promise<Document[]>;
  uploadDocument(userId: string, file: any, metadata: Partial<Document>): Promise<Document>;
  downloadDocument(documentId: string): Promise<any>;
  deleteDocument(documentId: string): Promise<void>;
  updateDocumentStatus(documentId: string, status: Document['status'], notes?: string): Promise<Document>;
}

export interface IDealService {
  getDealInfo(userId: string): Promise<DealInfo>;
  updateDealInfo(dealId: string, updates: Partial<DealInfo>): Promise<DealInfo>;
  acceptOffer(dealId: string): Promise<DealInfo>;
  rejectOffer(dealId: string, reason?: string): Promise<DealInfo>;
  negotiateOffer(dealId: string, counterOffer: number): Promise<DealInfo>;
}

export interface ISupportService {
  getSupportTickets(userId: string): Promise<SupportInfo[]>;
  createSupportTicket(
    userId: string,
    ticket: Omit<SupportInfo, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<SupportInfo>;
  updateSupportTicket(ticketId: string, updates: Partial<SupportInfo>): Promise<SupportInfo>;
  closeSupportTicket(ticketId: string, resolution?: string): Promise<SupportInfo>;
}

export interface IRewardsService {
  getRewardsData(userId: string): Promise<RewardsData>;
  addPoints(userId: string, points: number, reason: string): Promise<RewardsData>;
  unlockAchievement(userId: string, achievementId: string): Promise<RewardsData>;
  getAvailableAchievements(): Promise<Achievement[]>;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Todo: undefined;
  Profile: undefined;
  Support: undefined;
  Rewards: undefined;
};

export type DashboardStackParamList = {
  DashboardHome: undefined;
  AnnuityProfile: undefined;
  CourtInfo: undefined;
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Todo: undefined;
  Profile: undefined;
  Support: undefined;
  Rewards: undefined;
};

export type DashboardStackParamList = {
  DashboardHome: undefined;
  AnnuityProfile: undefined;
  CourtInfo: undefined;
};

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
