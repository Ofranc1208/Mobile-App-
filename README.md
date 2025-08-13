# Smarter Payouts (Prototype) — React Native + TypeScript

A lightweight prototype mobile app for exploring the Smarter Payouts experience. This project focuses on UI, navigation, and data flow using mock data and mock services. It is not production-ready and does not connect to real backends.

## What this is
- A React Native prototype using TypeScript
- Uses mock data and services to simulate real API behavior
- Demonstrates navigation, auth flow, and key screens (Dashboard, To‑Do, Profile, Support, Rewards)

## What this is not
- No real authentication, storage, or networking
- No production security or analytics
- Intended purely for design/flow prototyping and stakeholder demos

## Project Structure
```
src/
├── navigation/          # App navigation (stack + tabs)
├── screens/             # Feature screens (UI + basic logic)
├── components/          # Reusable UI components (placeholder)
├── services/            # Mock service classes (Auth, User, Todo, Docs, Deals, Support, Rewards)
├── contexts/            # React Context (Auth)
├── hooks/               # Custom hooks (placeholder)
├── utils/               # Helpers (placeholder)
├── types/               # TypeScript models and service interfaces
├── constants/           # App constants (placeholder)
├── assets/              # Static assets (placeholder)
└── __mocks__/           # Mock data and helpers used by services
```

Key files:
- `src/__mocks__/mockData.ts`: mock datasets and helpers (`simulateNetworkDelay`, `simulateRandomError`)
- `src/services/`: mock services consumed by screens
- `src/contexts/AuthContext.tsx`: simple auth context using `MockAuthService`
- `src/navigation/AppNavigator.tsx`: auth-gated root navigator

## Running the app

Prerequisites
- Node.js 16+
- React Native CLI
- Android Studio (Android)
- Xcode (iOS, macOS only)

Install dependencies
```bash
npm install
```

Start Metro
```bash
npm start
```

Run on device/emulator
```bash
# Android
npm run android

# iOS (macOS only)
npm run ios
```

Demo login (from mocks)
- Client ID: `SP001`
- Password: `password123`

## Testing and linting
This prototype ships with Jest configuration, but no test suites yet.
```bash
npm test
```

Run linter
```bash
npm run lint
```

## Mock data and services
All data is mocked and stored in code.
- Data sources: `src/__mocks__/mockData.ts`
- Service layer: `src/services/*` (e.g., `MockAuthService`, `MockTodoService`)
- The services simulate latency and occasional transient failures to mimic network behavior.

Service factory
```ts
// src/services/index.ts
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
  throw new Error('Real services not yet implemented');
};
```

## Purpose
This repository exists to prototype and iterate quickly on product flows, visuals, and interaction patterns before investing in real back-end integrations. Replace mock services with real ones when ready.
