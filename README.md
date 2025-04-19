# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4913516a-9855-479c-9c15-6cc0e7f3a3ed

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4913516a-9855-479c-9c15-6cc0e7f3a3ed) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/4913516a-9855-479c-9c15-6cc0e7f3a3ed) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Family Hub Development Specification

## Project Overview

Family Hub is a family management application designed to help households coordinate schedules, events, and responsibilities. The application provides a centralized platform for managing family calendars, events, and member information.

### Core Features

- Event management with calendar integration
- Family member profiles and management
- Weekly and monthly schedule overviews
- Color-coded event assignment by family member

## Architecture

### Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn-ui components
- **Build Tool**: Vite
- **State Management**: React Context API and hooks
- **Routing**: React Router

### Directory Structure

```
src/
├── components/
│   ├── ui/            # Shadcn UI components
│   ├── layout/        # Layout components (Sidebar, Layout)
│   ├── calendar/      # Calendar-related components
│   ├── events/        # Event-related components
│   ├── family/        # Family member components
│   └── dashboard/     # Dashboard components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components
└── App.tsx            # Main application component
```

## Code Standards

### TypeScript

- Use explicit typing for all functions, components, and variables
- Prefer interfaces for object shapes that will be used across multiple components
- Use type guards for runtime type checking when necessary

```typescript
// Good example
interface EventProps {
  id: string;
  title: string;
  date: Date;
}

const Event = ({ id, title, date }: EventProps) => {
  // Component implementation
};
```

### Component Structure

- Use functional components with hooks
- Keep components focused on a single responsibility
- Implement proper prop validation with TypeScript

```typescript
// Component template
import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
  // Other props...
}

export function Component({ children }: ComponentProps) {
  // Implementation
  return <div>{children}</div>;
}
```

## Component Guidelines

### Component Size

- Keep components under 150 lines of code
- Extract complex logic into custom hooks
- Create small, focused components that can be composed together

### Component Naming

- Use PascalCase for component files and function names
- Use descriptive names that reflect the component's purpose
- Suffix test files with `.test.tsx`

### Props

- Destructure props in function parameters
- Provide default props when appropriate
- Document complex props with TSDoc comments

## State Management

### Local State

- Use `useState` for component-specific state
- Extract complex state logic into custom hooks

### Global State

- Use React Context for state that needs to be accessed by multiple components
- Create specialized contexts for different domains (events, family members, etc.)
- Implement custom hooks to access context state and actions

```typescript
// Example pattern
export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Omit<Event, "id">) => {
    // Implementation
  };

  const updateEvent = (event: Event) => {
    // Implementation
  };

  return { events, addEvent, updateEvent };
}
```

## UI/UX Guidelines

### Design System

- Use the shadcn/ui component library for consistent design
- Follow the established color system defined in Tailwind config
- Maintain responsive design for all components

### Accessibility

- Use semantic HTML elements
- Ensure proper keyboard navigation
- Add ARIA attributes when necessary
- Maintain proper color contrast ratios

### Responsive Design

- Design for mobile-first
- Use Tailwind's responsive classes for different viewport sizes
- Test across various screen sizes and devices

## Testing Strategy

### Component Testing

- Unit test components with React Testing Library
- Test component rendering and user interactions
- Mock external dependencies and context providers

### Hook Testing

- Test custom hooks with React Hooks Testing Library
- Verify state changes and side effects

### Integration Testing

- Test component integration points
- Verify data flow between components

## Development Roadmap

### Phase 1: Core Infrastructure

- [x] Project setup with Vite, React, TypeScript
- [x] UI component library integration
- [x] Basic layout and navigation
- [x] Initial dashboard setup

### Phase 2: Event Management (In Progress)

- [x] Event data model
- [x] Weekly overview component
- [ ] Event creation, editing, and deletion
- [ ] Event detail view
- [ ] Event filtering and sorting

### Phase 3: Calendar Integration

- [ ] Calendar view components
- [ ] Day, week, and month views
- [ ] Event visualization on calendar
- [ ] Drag-and-drop event scheduling

### Phase 4: Family Member Management

- [ ] Family member profiles
- [ ] Member-specific event views
- [ ] Permission system for family members
- [ ] Member activity tracking

### Phase 5: Notifications & Reminders

- [ ] Notification system
- [ ] Email notifications for events
- [ ] Reminder settings
- [ ] Push notifications

### Phase 6: Mobile Optimization

- [ ] Responsive design improvements
- [ ] Touch interactions
- [ ] Offline capability
- [ ] Progressive Web App features

## Conclusion

This development specification provides guidelines for maintaining consistency and quality in the Family Hub application. As the project evolves, this document should be updated to reflect changes in best practices and development plans.
