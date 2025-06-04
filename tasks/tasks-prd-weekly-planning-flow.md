## Relevant Files

- `src/pages/WeeklyPlanning.tsx` - Dedicated page for the weekly planning flow.
- `src/components/weeklyPlanning/PlanningStepper.tsx` - Step-by-step UI component for guiding users through the planning process.
- `src/components/weeklyPlanning/ConflictResolver.tsx` - Component for surfacing and resolving scheduling conflicts.
- `src/components/weeklyPlanning/ResponsibilityEditor.tsx` - Component for reviewing and modifying responsibility assignments.
- `src/components/weeklyPlanning/RecurringEventsAutoPopulator.tsx` - Logic/UI for auto-populating recurring events.
- `src/components/weeklyPlanning/FinalizePlan.tsx` - Component for finalizing, syncing, and notifying.
- `src/components/layout/Sidebar.tsx` - For adding the entry point to the weekly planning flow.
- `src/lib/calendarSync.ts` - Utility for syncing with external calendar providers.
- `src/lib/notifications.ts` - Utility for sending notifications to family members.
- `src/components/weeklyPlanning/__tests__/PlanningStepper.test.tsx` - Unit tests for the stepper component.
- `src/components/weeklyPlanning/__tests__/ConflictResolver.test.tsx` - Unit tests for conflict resolution.
- `src/pages/__tests__/WeeklyPlanning.test.tsx` - Page-level tests for the weekly planning flow.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Create entry point and dedicated page for the weekly planning flow
  - [x] 1.1 Add a "Weekly Planning" item to the sidebar in `Sidebar.tsx` with a suitable icon and link to `/weekly-planning`.
  - [x] 1.2 Create `src/pages/WeeklyPlanning.tsx` as a new page component.
  - [x] 1.3 Set up routing so `/weekly-planning` loads the new page.
  - [x] 1.4 Add a placeholder or basic layout for the weekly planning flow on the new page.
  - [x] 1.5 Write a basic test in `WeeklyPlanning.test.tsx` to verify the page renders.
- [ ] 2.0 Implement step-by-step planning UI and flow logic
  - [ ] 2.1 Create `PlanningStepper.tsx` to guide users through each step of the planning process.
  - [ ] 2.2 Add progress indicators and navigation buttons (Next, Back, Finish).
  - [ ] 2.3 Integrate the stepper into `WeeklyPlanning.tsx`.
  - [ ] 2.4 Ensure the UI matches the app's design principles (Nordic-inspired, calm, minimal).
  - [ ] 2.5 Write unit tests for the stepper component.
- [ ] 3.0 Integrate recurring events auto-population and schedule change input
  - [ ] 3.1 Create `RecurringEventsAutoPopulator.tsx` to fetch and display recurring events for the week.
  - [ ] 3.2 Allow users to input key schedule changes (e.g., extra rehearsals, travel).
  - [ ] 3.3 Validate event data using existing validation utilities.
  - [ ] 3.4 Ensure changes and recurring events are merged into the weekly plan.
  - [ ] 3.5 Write tests for recurring event logic and input handling.
- [ ] 4.0 Add responsibility assignment and conflict resolution features
  - [ ] 4.1 Create `ResponsibilityEditor.tsx` to review and modify who is responsible for each event/task.
  - [ ] 4.2 Create `ConflictResolver.tsx` to detect and display scheduling conflicts.
  - [ ] 4.3 Implement logic to suggest alternative assignments or resolutions for conflicts.
  - [ ] 4.4 Ensure the UI clearly surfaces conflicts and allows user action.
  - [ ] 4.5 Write unit tests for responsibility editing and conflict resolution.
- [ ] 5.0 Finalize plan, sync with external calendars, and notify family members
  - [ ] 5.1 Create `FinalizePlan.tsx` to review and confirm the weekly plan.
  - [ ] 5.2 Implement syncing logic with external calendars (Google Calendar, iCal) in `calendarSync.ts`.
  - [ ] 5.3 Use notification utilities to notify all family members of the finalized plan.
  - [ ] 5.4 Ensure data validation before finalization and sync.
  - [ ] 5.5 Write tests for finalization, sync, and notification logic. 