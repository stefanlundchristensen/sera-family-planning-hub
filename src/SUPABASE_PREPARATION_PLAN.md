

# Supabase Integration Preparation Plan

This document outlines the steps to prepare our application before integrating with Supabase.

## Prerequisites to Complete

1. **Local/Mock Data Structure**
   - [x] Set up local state management with Zustand
   - [x] Implement mock data and event creation utilities
   - [x] Ensure all components can work with local data before moving to remote data

2. **State Management**
   - [x] Set up Zustand store structure
   - [x] Implement optimistic updates in state modifications
   - [x] Add error handling and state reversal on failed operations
   - [x] Review store structure to ensure it matches intended backend data model

3. **Type Definitions**
   - [x] Define core types for events and family members
   - [x] Ensure consistent type usage across the application
   - [x] Add validation for data structures
   - [x] Consider adding Zod schemas for runtime validation

4. **UI Loading & Error States**
   - [x] Add proper loading indicators for async operations
   - [x] Implement consistent error handling UI
   - [x] Add toast notifications for operation success/failure
   - [x] Ensure all forms handle submission states properly

5. **API Client Layer**
   - [x] Set up initial API client structure
   - [x] Implement caching mechanism
   - [x] Add request/response interceptors
   - [x] Ensure consistent error handling

6. **Authentication Flow**
   - [x] Plan user authentication flow
     - Will use Supabase's built-in authentication
     - Email/password authentication method
   - [x] Define required user profile information
     - Name
     - Email
     - Date of birth (to compute ages)
     - Type of family member (parent, child, extended family)
   - [ ] Set up protected routes
   - [ ] Implement login/registration forms

## Authorization Structure

- Parents will have admin privileges
- Extended family members can create and edit events
- Children will have view-only access
- Only parents can invite other users to join the family

## Next Steps for Supabase Integration

Once the above prerequisites are met:

1. Connect the Lovable project to Supabase via the green Supabase button
2. Set up database tables matching our data models:
   - Users (profile information)
   - Family groups
   - Family members (connecting users to families with proper roles)
   - Events
3. Configure Row Level Security (RLS) policies based on user roles
4. Implement authentication with Supabase Auth
5. Update API client to use Supabase client
6. Test all CRUD operations with real database

## Notes

- Keep the frontend working with local data until Supabase integration is complete
- Consider implementing feature flags to switch between local and Supabase data
- Test thoroughly after each integration step

