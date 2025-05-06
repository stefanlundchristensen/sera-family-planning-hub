# Testing Guide

This project uses Vitest with React Testing Library for testing.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized in `__tests__` directories, colocated with the files they test:

```
src/
├── components/
│   ├── ui/
│   │   ├── __tests__/
│   │   │   └── button.test.tsx
│   │   └── button.tsx
├── lib/
│   ├── __tests__/
│   │   └── utils.test.ts
│   └── utils.ts
└── utils/
    ├── __tests__/
    │   └── api.test.ts
    └── api.ts
```

## Testing Best Practices

1. **Component Testing**:
   - Test for correct rendering
   - Test props variations
   - Test user interactions
   - Test accessibility

2. **Hook Testing**:
   - Create a wrapper component
   - Verify state changes
   - Test side effects

3. **Utility Testing**:
   - Test input/output pairs
   - Test edge cases
   - Test error conditions

4. **Mock Patterns**:
   - Mock API calls using `vi.mock()`
   - Mock components when testing integration
   - Use `vi.fn()` for event handlers

## Testing Environment

The test environment is set up in `src/test/setup.ts` with:

- Jest DOM matchers for enhanced assertions
- Cleanup after each test
- Mocks for browser APIs like `matchMedia` and `IntersectionObserver`
- Mocks for Supabase client

## Guidelines

1. Aim for test coverage of at least 80% for critical paths
2. Write tests alongside new features
3. Run the full test suite before submitting PRs
4. Add tests for bugs before fixing them