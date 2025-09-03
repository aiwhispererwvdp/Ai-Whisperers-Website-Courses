# AI-Whisperers Testing Documentation

## 🎯 Overview

This document provides comprehensive guidance for testing the AI-Whisperers business website platform. Our testing strategy ensures reliability, security, and user experience excellence for critical business functions including course enrollment, payment processing, and user authentication.

## 📋 Testing Strategy

### Testing Pyramid

```
    /\     E2E Tests (5%)
   /  \    Integration Tests (20%)
  /____\   Unit Tests (75%)
```

- **Unit Tests (75%)**: Component logic, utility functions, business rules
- **Integration Tests (20%)**: API endpoints, database operations, payment flows
- **End-to-End Tests (5%)**: Critical user journeys, enrollment flows

## 🛠️ Testing Infrastructure

### Technology Stack
- **Test Runner**: Jest 30.x with Next.js integration
- **React Testing**: @testing-library/react with user-event
- **API Testing**: Supertest for endpoint testing
- **Mocking**: MSW (Mock Service Worker) for external APIs
- **E2E Testing**: Playwright (to be implemented)
- **Accessibility**: axe-core integration
- **Performance**: Lighthouse CI

### Environment Configuration
- **Unit Tests**: Fast, isolated, no external dependencies
- **Integration Tests**: Test database with SQLite, API mocking
- **E2E Tests**: Staging environment with real services

## 📁 Test File Structure

```
src/
├── __tests__/                     # Global test utilities
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       ├── ComponentName.unit.test.tsx      # Component unit tests
│       └── ComponentName.integration.test.tsx # Component integration tests
├── app/api/
│   └── route-name/
│       ├── route.ts
│       ├── route.unit.test.ts               # Route unit tests
│       └── route.integration.test.ts        # Route integration tests
├── lib/
│   ├── utils.ts
│   └── utils.unit.test.ts                   # Utility function tests
└── test-utils/
    ├── index.tsx                            # Test utilities and helpers
    └── setup-tests.ts                       # Global test setup
```

## 🧪 Test Categories

### 1. Unit Tests

**Purpose**: Test individual components and functions in isolation
**File Pattern**: `*.unit.test.{ts,tsx}`
**Run Command**: `npm run test:unit`

#### Example Structure:
```typescript
import { render, screen } from '@testing-library/react'
import { runUnitTest } from '@/test-utils'
import Component from './Component'

describe('Component - Unit Tests', () => {
  runUnitTest('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

#### Coverage Areas:
- React component rendering
- User interactions (clicks, form input)
- Props handling and validation
- State management
- Business logic functions
- Utility function behavior

### 2. Integration Tests

**Purpose**: Test component and API integration with external services
**File Pattern**: `*.integration.test.{ts,tsx}`
**Run Command**: `npm run test:integration`

#### Example Structure:
```typescript
import { POST } from './route'
import { NextRequest } from 'next/server'
import { runIntegrationTest } from '@/test-utils/setup-tests'

describe('API Route - Integration Tests', () => {
  runIntegrationTest('handles valid request', async () => {
    const request = new NextRequest('http://localhost:3000/api/test', {
      method: 'POST',
      body: JSON.stringify({ data: 'test' })
    })
    
    const response = await POST(request)
    expect(response.status).toBe(200)
  })
})
```

#### Coverage Areas:
- API endpoint functionality
- Database operations
- Payment processing flows
- Authentication workflows
- External service integration
- Error handling and edge cases

### 3. End-to-End Tests

**Purpose**: Test complete user journeys from start to finish
**File Pattern**: `*.e2e.test.{ts,tsx}`
**Run Command**: `npm run test:e2e` (to be implemented)

#### Coverage Areas:
- Course enrollment flow
- Payment processing completion
- User registration and login
- Course access after payment
- Multi-page navigation

## 🚀 Testing Commands

### Available Scripts

```bash
# Run all tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only  
npm run test:integration

# Watch mode for development
npm run test:watch

# Coverage reports
npm run test:coverage
npm run test:coverage:unit
npm run test:coverage:integration

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix
```

### Environment Variables

```bash
# Test environment configuration
NODE_ENV=test
TEST_TYPE=unit|integration  # Controls test database and setup
DATABASE_URL=file:./test.db  # Test database for integration tests
DEBUG_TESTS=true            # Enable console output in tests
```

## 🎯 Critical Testing Areas

### 1. Payment Processing (HIGH PRIORITY)
- **PayPal Order Creation**: API endpoint validation, error handling
- **Payment Capture**: Transaction completion, user notification
- **Security**: Input validation, authentication, rate limiting
- **Edge Cases**: Network failures, invalid payments, refunds

**Test Files**:
- `src/app/api/payment/create-order/route.integration.test.ts`
- `src/app/api/payment/capture-order/route.integration.test.ts`
- `src/lib/paypal.unit.test.ts`

### 2. User Authentication (HIGH PRIORITY)
- **OAuth Flows**: Google, GitHub integration
- **Session Management**: Token validation, expiration
- **Access Control**: Protected routes, role-based permissions
- **Security**: CSRF protection, secure cookies

**Test Files**:
- `src/app/api/auth/[...nextauth]/route.integration.test.ts` (to be created)
- `src/components/auth/*.unit.test.tsx` (to be created)

### 3. Course Enrollment (BUSINESS CRITICAL)
- **Enrollment Form**: Validation, user experience
- **Course Access**: Post-purchase delivery
- **Progress Tracking**: Lesson completion, certificates
- **Student Dashboard**: Course navigation, progress display

**Test Files**:
- `src/components/course/EnrollmentForm.unit.test.tsx` ✅
- `src/app/api/enrollment/prepare/route.integration.test.ts` ✅

### 4. React Components (USER EXPERIENCE)
- **Course Display**: Card components, listings
- **Navigation**: Header, footer, mobile menu
- **Forms**: Validation, error handling
- **Accessibility**: Screen reader support, keyboard navigation

**Test Files**:
- `src/components/course/CourseCard.unit.test.tsx` ✅
- `src/components/marketing/Hero.unit.test.tsx` ✅

## 📊 Test Coverage Goals

### Minimum Coverage Requirements
- **Overall Coverage**: 80%
- **Critical Payment Flows**: 95%
- **Authentication Systems**: 90%
- **Business Logic**: 85%
- **UI Components**: 75%

### Coverage Reporting
```bash
# Generate coverage report
npm run test:coverage

# View coverage report
open coverage/lcov-report/index.html
```

## 🔧 Testing Utilities

### Custom Test Helpers

#### `test-utils/index.tsx`
```typescript
// Custom render with providers
export const render = (ui, { session, ...options } = {}) => {
  // Wraps components with necessary providers
}

// Test data generators
export const createMockCourse = (overrides = {}) => { /* ... */ }
export const createMockUser = (overrides = {}) => { /* ... */ }
export const createMockEnrollment = (overrides = {}) => { /* ... */ }

// Test environment helpers
export const runUnitTest = (name, testFn) => { /* ... */ }
export const runIntegrationTest = (name, testFn) => { /* ... */ }
```

### Mocking Strategy

#### External Services
- **PayPal API**: Mocked responses for order creation and capture
- **NextAuth**: Mocked session and authentication flows
- **Prisma**: Mocked database operations for unit tests
- **Email Services**: Mocked ConvertKit API calls
- **Analytics**: Mocked tracking and event collection

#### Component Mocks
```typescript
// Mock complex components in unit tests
jest.mock('@/components/payment/PayPalButton', () => {
  return function MockPayPalButton(props) {
    return <div data-testid="mock-paypal-button">{/* Mock UI */}</div>
  }
})
```

## 🛡️ Security Testing

### Authentication Security
- Session hijacking prevention
- CSRF token validation
- Secure cookie configuration
- OAuth flow security

### Payment Security
- Input validation for payment data
- SSL/TLS encryption verification
- PCI compliance adherence
- Rate limiting for payment attempts

### API Security
- Authorization header validation
- Input sanitization
- SQL injection prevention
- Rate limiting implementation

## 📱 Accessibility Testing

### Automated Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('has no accessibility violations', async () => {
  const { container } = render(<Component />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Manual Testing Checklist
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Focus management
- [ ] ARIA labels and roles
- [ ] Alternative text for images

## ⚡ Performance Testing

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Load Testing
- Payment processing under concurrent load
- API response times under stress
- Database query performance
- Course content delivery speed

## 🚨 Testing Best Practices

### Do's ✅
- Write descriptive test names
- Test user behavior, not implementation details
- Use proper test data generators
- Mock external dependencies
- Test error conditions and edge cases
- Maintain test isolation
- Keep tests fast and focused

### Don'ts ❌
- Don't test third-party library internals
- Don't write overly complex test setup
- Don't mock everything (integration tests need real interactions)
- Don't ignore failing tests
- Don't skip accessibility testing
- Don't forget to test error states

## 🐛 Debugging Tests

### Common Issues
1. **Async Timing**: Use `waitFor` for async operations
2. **DOM Queries**: Use proper queries and accessibility roles
3. **Mock Issues**: Ensure mocks are properly reset between tests
4. **Environment**: Check test environment variables

### Debugging Tools
```bash
# Run specific test file
npm test -- --testPathPatterns=ComponentName

# Run tests in watch mode with coverage
npm run test:watch -- --coverage

# Debug mode with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📚 Testing Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [React Testing Patterns](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Training
- [Testing JavaScript](https://testingjavascript.com/) by Kent C. Dodds
- [React Testing Library Tutorial](https://www.robinwieruch.de/react-testing-library/)

## 🔄 Continuous Integration

### GitHub Actions (to be implemented)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run pre-commit"
    }
  }
}
```

## 📈 Test Metrics and Reporting

### Key Metrics
- Test Coverage Percentage
- Test Execution Time
- Flaky Test Detection
- Security Vulnerability Scans
- Performance Regression Detection

### Reporting
- Coverage reports in CI/CD pipeline
- Failed test notifications
- Performance benchmark comparisons
- Security scan results

---

## 🎯 Quick Start Guide

### 1. Run Your First Test
```bash
# Clone and setup
git clone <repo>
cd ai-whisperers-website
npm install

# Run unit tests
npm run test:unit

# Run integration tests  
npm run test:integration
```

### 2. Write a New Test
```typescript
import { render, screen } from '@testing-library/react'
import { runUnitTest } from '@/test-utils'
import MyComponent from './MyComponent'

describe('MyComponent Tests', () => {
  runUnitTest('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })
})
```

### 3. Debug Failing Tests
```bash
# Run specific test with verbose output
npm test -- --testPathPatterns=MyComponent --verbose

# Run in watch mode for development
npm run test:watch
```

This testing documentation ensures comprehensive coverage of the AI-Whisperers platform, focusing on critical business functionality, user experience, and security. Regular updates to this documentation should reflect changes in testing strategy and new feature requirements.