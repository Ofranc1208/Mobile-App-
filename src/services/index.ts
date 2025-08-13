import { MockAuthService } from './MockAuthService';
import { MockUserService } from './MockUserService';
import { MockTodoService } from './MockTodoService';
import { MockDocumentService } from './MockDocumentService';
import { MockDealService } from './MockDealService';
import { MockSupportService } from './MockSupportService';
import { MockRewardsService } from './MockRewardsService';

// Service factory for easy switching between mock and real services
export const createServices = (useMock: boolean = true) => {
  if (useMock) {
    return {
      authService: new MockAuthService(),
      userService: new MockUserService(),
      todoService: new MockTodoService(),
      documentService: new MockDocumentService(),
      dealService: new MockDealService(),
      supportService: new MockSupportService(),
      rewardsService: new MockRewardsService(),
    };
  }
  
  // TODO: Return real Firebase services when implemented
  // return {
  //   authService: new FirebaseAuthService(),
  //   userService: new FirebaseUserService(),
  //   todoService: new FirebaseTodoService(),
  //   documentService: new FirebaseDocumentService(),
  //   dealService: new FirebaseDealService(),
  //   supportService: new FirebaseSupportService(),
  //   rewardsService: new FirebaseRewardsService(),
  // };
  
  throw new Error('Real services not yet implemented');
};

// Export individual mock services for direct use
export { MockAuthService } from './MockAuthService';
export { MockUserService } from './MockUserService';
export { MockTodoService } from './MockTodoService';
export { MockDocumentService } from './MockDocumentService';
export { MockDealService } from './MockDealService';
export { MockSupportService } from './MockSupportService';
export { MockRewardsService } from './MockRewardsService';

// Export default services (mock for now)
export const services = createServices(true);

