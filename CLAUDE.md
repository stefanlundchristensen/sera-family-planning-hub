# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style Guidelines
- **TypeScript**: Relaxed configuration with `strict: false` and `noImplicitAny: false`
- **Imports**: Use path aliases (`@/` for src directory) for clean imports
- **Component Structure**: Use named exports for components, function declaration style
- **Props**: Define with interfaces, use optional chaining for optional props
- **Styling**: Use Tailwind CSS with `cn()` utility for merging classes
- **UI Components**: Use shadcn/ui components with consistent patterns
- **Error Handling**: Use try/catch blocks for async operations
- **Naming**: PascalCase for components/interfaces, camelCase for functions/variables
- **Types**: Define shared types in `/src/types` directory
- **File Organization**: Group related files by feature in `/src/components`