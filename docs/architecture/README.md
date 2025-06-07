# SERA Family Planning Hub Architecture

This directory contains architectural documentation for the SERA Family Planning Hub application.

## Architecture Diagram

![SERA Family Planning Hub Architecture](./SERA%20Family%20Planning%20Hub%20Architecture.png)

The diagram illustrates the key components and their relationships:

## Component & Module Diagram (BMAD Architecture)

The following Mermaid diagram provides a detailed view of the main components/modules, their responsibilities, and how they interact within the SERA Family Planning Hub. This reflects both the current stack and the latest BMAD-driven requirements (privacy, GDPR, multi-generational, localization, etc.):

```mermaid
flowchart TD
    FE[Frontend (React, Zustand, i18n)]
    LOC[Localization & Accessibility]
    APIClient[API Client & Integration Utilities]
    SUPA[Supabase Backend]
    AUTH[Supabase Auth]
    DB[(Postgres DB)]
    RBAC[RBAC & Compliance Layer]
    CAL[Calendar Integration Layer]
    GC[Google Calendar API]
    SC[School System APIs (future)]

    FE -- "UI, State, Auth" --> APIClient
    FE -- "Localization, Accessibility" --> LOC
    APIClient -- "REST/GraphQL" --> SUPA
    APIClient -- "OAuth, Sync" --> CAL
    SUPA -- "User Mgmt, Events, Families" --> DB
    SUPA -- "Auth" --> AUTH
    SUPA -- "RBAC, Compliance" --> RBAC
    CAL -- "Sync" --> GC
    CAL -- "Future: School Sync" --> SC
```

This diagram highlights:
- Clear separation of frontend, backend, and integration responsibilities
- Centralized API client for all data and integration flows
- Privacy, RBAC, and compliance as first-class backend concerns
- Extensibility for future integrations (school systems, additional calendars)

### Key Components

1. **Frontend Application** - The main React application container
2. **Authentication System** - Manages user authentication via Supabase
3. **Calendar System** - Handles calendar views (day, week, month) and event management
4. **State Management** - Uses Zustand for state management with local storage persistence
5. **API Client** - Handles API requests with caching and retry mechanisms

### Architecture Highlights

- The application follows a component-based architecture with React
- Authentication is handled through Supabase
- State management uses Zustand with local storage persistence
- The calendar system is the core functionality with multiple view components
- The API client provides robust error handling and caching

---

## API & Integration Design

### API Principles
- RESTful (with potential for GraphQL in the future)
- Role-based access control enforced at the API and DB layer
- Stateless endpoints, with authentication via JWT (Supabase Auth)
- Versioned endpoints for future-proofing
- OpenAPI/Swagger documentation for clarity and AI agent compatibility

### Core API Endpoints

#### Authentication & User Management
```http
POST /auth/register      # Register new user (email/password, role, family)
POST /auth/login         # User login
POST /auth/logout        # User logout
POST /auth/refresh       # Refresh JWT
GET  /user/me            # Get current user profile
PATCH /user/me           # Update profile, locale, etc.
GET  /user/family        # Get family group info
POST /user/invite        # Invite new family member
```

#### Family Management
```http
POST   /family                # Create new family group
GET    /family/:id            # Get family details
PATCH  /family/:id            # Update family info
GET    /family/:id/members    # List family members
```

#### Event Management
```http
POST   /event                 # Create event (with visibility, recurrence, etc.)
GET    /event/:id             # Get event details
PATCH  /event/:id             # Update event
DELETE /event/:id             # Delete event
GET    /family/:id/events     # List all family events (filtered by role/permissions)
GET    /user/:id/events       # List user-specific events
```

#### Role & Permission Management
```http
GET   /roles                  # List available roles
PATCH /user/:id/role          # Change user role (parent only)
GET   /user/:id/permissions   # Get user permissions
```

#### Calendar Integration
```http
POST /calendar/connect        # Connect Google Calendar (OAuth flow)
GET  /calendar/sync           # Trigger manual sync
GET  /calendar/status         # Get sync status/logs
```

#### Localization & Settings
```http
GET   /locales                # List supported languages/regions
PATCH /user/me/locale         # Set user locale
```

#### Audit & Compliance
```http
GET    /auditlog              # (Admin/parent) View audit logs for family
GET    /user/me/export        # Export user data (GDPR compliance)
DELETE /user/me               # Delete user account (GDPR right to be forgotten)
```

### Integration Flows
- **Google Calendar Sync:** OAuth 2.0 flow, backend polling/pushing, webhooks, event mapping, conflict resolution
- **Supabase Integration:** Auth for JWT, Postgres for data, RLS for RBAC
- **Future Integrations:** iCal/CalDAV, school APIs, modular integration layer

### API Security & Best Practices
- All endpoints require authentication (except registration/login)
- RBAC enforced at both API and DB level
- Input validation and sanitization on all endpoints
- Rate limiting and monitoring for abuse prevention
- All data in transit encrypted (HTTPS/TLS)

### Documentation & Developer Experience
- OpenAPI/Swagger spec auto-generated and published
- Example requests/responses for each endpoint
- Clear error codes and messages
- Guides for integrating with Google Calendar and other providers
