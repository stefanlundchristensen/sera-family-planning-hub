# BMAD MVP Development Tasks: Family Planning & Calendar Integration

This file tracks all actionable stories/tasks for the MVP, grouped by major area. Use this as a local tracking board and reference for Linear.

---

## 1. Supabase Integration
- [ ] Set up Supabase project and configure environment variables
- [ ] Implement Supabase database schema (Users, Families, Family Members, Events)
- [ ] Configure Row Level Security (RLS) policies for roles
- [ ] Connect frontend to Supabase for authentication (login/registration)
- [ ] Implement protected routes using Supabase session state
- [ ] CRUD operations for events and family members via Supabase
- [ ] Update Zustand store to sync with remote data

## 2. Google Calendar Integration
- [ ] Implement OAuth 2.0 flow for Google Calendar
- [ ] UI for connecting/disconnecting Google account
- [ ] Securely store and manage tokens
- [ ] Sync events between SERA and Google Calendar (one-way MVP)
- [ ] Handle event mapping, conflict resolution, and error states
- [ ] Add manual sync trigger and sync status UI

## 3. Role-Based Access & Permissions
- [ ] Enforce role-based access in frontend and backend
- [ ] UI: Show/hide features based on user role
- [ ] Test RLS policies and permissions thoroughly

## 4. Family & Member Management
- [ ] Complete family group creation/join flows
- [ ] Finalize add/edit/remove family member features
- [ ] Ensure family association is enforced in all event and user queries

## 5. Event Management
- [ ] Finalize event CRUD with Supabase backend
- [ ] Implement event-level permissions and visibility
- [ ] Highlight event conflicts in the UI

## 6. Onboarding & Authentication
- [ ] Finalize onboarding flow (connect to Supabase, handle errors)
- [ ] Ensure onboarding and auth flows are accessible and user-friendly

## 7. Localization & Accessibility
- [ ] Implement language selection and i18n support
- [ ] Ensure all forms and UI components are accessible (ARIA, keyboard, color contrast)

## 8. Audit Logging & Compliance
- [ ] Implement audit logging for sensitive actions (login, event changes, deletions)
- [ ] Add user data export and deletion endpoints (GDPR compliance)

## 9. Testing & QA
- [ ] Write unit and integration tests for all new/modified code
- [ ] Manual QA for all critical user flows (auth, event CRUD, calendar sync, permissions)

## 10. Documentation & Developer Experience
- [ ] Update README and developer docs for new setup and flows
- [ ] Add OpenAPI/Swagger docs for all API endpoints 