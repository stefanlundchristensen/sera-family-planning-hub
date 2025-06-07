# BMAD MVP User Stories: Family Planning & Calendar Integration

This file contains user stories derived from the MVP development tasks, ready for review and implementation.

---

## Supabase Integration

### Story 1: Supabase Project Setup
**As a** developer
**I want to** set up the Supabase project and configure environment variables
**So that** the team has a secure, consistent backend environment for development and testing

**Acceptance Criteria:**
- Supabase project is created and accessible
- All required environment variables are documented and set for local/dev
- Supabase keys/secrets are not committed to the repo
- Team can connect to Supabase from local/dev
- README updated with setup instructions

---

### Story 2: Database Schema & RLS
**As a** backend developer
**I want to** implement the Supabase database schema (Users, Families, Family Members, Events) and configure Row Level Security (RLS) policies
**So that** data is structured and securely accessible by the right users

**Acceptance Criteria:**
- Tables for Users, Families, Family Members, Events exist
- RLS policies are implemented for all tables
- Schema and policies reviewed by team
- Migration scripts committed

---

### Story 3: Auth Integration (Frontend)
**As a** user
**I want to** log in and register using Supabase Auth
**So that** my account and data are secure and accessible only to me

**Acceptance Criteria:**
- Login and registration forms are functional
- Auth state managed via Supabase
- Protected routes redirect unauthenticated users
- Error handling for auth failures

---

### Story 4: CRUD Operations & State Sync
**As a** family member
**I want to** create, update, and delete events and family members
**So that** our family calendar and group stay up to date

**Acceptance Criteria:**
- CRUD endpoints for events and family members implemented
- Zustand store updates in real-time with Supabase
- Optimistic UI updates for CRUD actions
- Error handling for failed operations

---

## Google Calendar Integration

### Story 5: Google Calendar OAuth Flow
**As a** user
**I want to** connect and disconnect my Google account securely
**So that** I can sync my family calendar with Google Calendar

**Acceptance Criteria:**
- OAuth 2.0 flow implemented
- User can connect/disconnect Google account
- Tokens securely stored and never exposed in frontend
- UI feedback for connection status

---

### Story 6: Event Sync MVP
**As a** family member
**I want to** sync events between SERA and Google Calendar (one-way MVP)
**So that** my family's events are visible in both systems

**Acceptance Criteria:**
- Events from Google Calendar are imported into SERA
- Event mapping logic handles timezones and conflicts
- Sync errors are logged and surfaced to user
- Manual sync can be triggered

---

### Story 7: Manual Sync Trigger & Status UI
**As a** user
**I want to** manually trigger a calendar sync and see sync status
**So that** I know when my data is up to date

**Acceptance Criteria:**
- Manual sync button available in UI
- Sync status (success, error, in progress) visible to user
- Last sync timestamp displayed

---

## Role-Based Access & Permissions

### Story 8: Enforce Role-Based Access
**As a** developer
**I want to** enforce role-based access in frontend and backend
**So that** users only see and do what their role allows

**Acceptance Criteria:**
- Roles defined and enforced in backend (Supabase RLS)
- Frontend hides/shows features based on user role
- Tests for role-based access

---

### Story 9: Test RLS Policies & Permissions
**As a** QA engineer
**I want to** test RLS policies and permissions for all user roles
**So that** data is secure and access is correct

**Acceptance Criteria:**
- RLS policies tested for all roles
- Attempted privilege escalation is blocked
- Test cases documented

---

## Family & Member Management

### Story 10: Family Group Creation & Join
**As a** user
**I want to** create or join a family group
**So that** I can collaborate and share events with my family

**Acceptance Criteria:**
- Family group creation flow works end-to-end
- Users can join existing family via invite
- Proper association in database
- Onboarding triggers after join

---

### Story 11: Manage Family Members
**As a** family admin
**I want to** add, edit, and remove family members
**So that** my family group stays accurate and up to date

**Acceptance Criteria:**
- Add/edit/remove family member features implemented
- Changes reflected in database and UI
- Role assignment UI present

---

## Event Management

### Story 12: Event CRUD
**As a** family member
**I want to** create, edit, and delete events
**So that** our family calendar is always current

**Acceptance Criteria:**
- Event CRUD with Supabase backend finalized
- Event-level permissions and visibility enforced
- Error handling and conflict highlighting in UI

---

## Onboarding & Authentication

### Story 13: Onboarding Flow
**As a** new user
**I want to** be guided through onboarding (family creation/join, calendar connection, privacy)
**So that** I can get started quickly and securely

**Acceptance Criteria:**
- Onboarding flow covers all first-time user needs
- Calendar connection included in onboarding
- Privacy education step present
- User can skip and return to onboarding

---

### Story 14: Authentication UX
**As a** user
**I want to** log in, register, and recover my account easily
**So that** I can always access my data

**Acceptance Criteria:**
- Auth flows are accessible and user-friendly
- Error handling for auth failures
- Password reset and account recovery implemented

---

## Localization & Accessibility

### Story 15: Localization & i18n
**As a** user
**I want to** select my language and see the app in my preferred language
**So that** the app is usable for my family

**Acceptance Criteria:**
- Language selection and i18n support implemented
- All UI components translated

---

### Story 16: Accessibility
**As a** user with accessibility needs
**I want to** use the app with assistive technologies
**So that** everyone in my family can participate

**Acceptance Criteria:**
- All forms and UI components are accessible (ARIA, keyboard, color contrast)
- Accessibility tested with common tools

---

## Audit Logging & Compliance

### Story 17: Audit Logging
**As a** system admin
**I want to** log sensitive actions (login, event changes, deletions)
**So that** we can audit and investigate issues

**Acceptance Criteria:**
- Audit logging implemented for sensitive actions
- Logs are secure and accessible to admins only

---

### Story 18: GDPR Compliance
**As a** user
**I want to** export and delete my data
**So that** I can exercise my GDPR rights

**Acceptance Criteria:**
- User data export and deletion endpoints implemented
- GDPR compliance documented

---

## Testing & QA

### Story 19: Automated & Manual Testing
**As a** QA engineer
**I want to** test all critical user flows and code
**So that** the app is reliable and bug-free

**Acceptance Criteria:**
- Unit and integration tests for all new/modified code
- Manual QA for auth, event CRUD, calendar sync, permissions

---

## Documentation & Developer Experience

### Story 20: Developer Docs & API
**As a** developer
**I want to** have clear documentation for setup, flows, and APIs
**So that** onboarding and collaboration are easy

**Acceptance Criteria:**
- README and developer docs updated for new setup and flows
- OpenAPI/Swagger docs for all API endpoints 