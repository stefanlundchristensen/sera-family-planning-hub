
# Family Hub

Family Hub is a family management application designed to help households coordinate schedules, events, and responsibilities. The application provides a centralized platform for managing family calendars, events, and member information.

## Core Features

- Event management with calendar integration
- Family member profiles and management
- Weekly and monthly schedule overviews
- Color-coded event assignment by family member

## SERA – Brand & Visual Identity

### Brand Essence & Positioning

SERA exists to **bring calm and order to the chaos of family life**. The brand should feel like a **calm, structured presence** in a busy household—always reliable, intuitive, and reassuring.

#### Brand Pillars:

- **Calmness** – A sense of ease, reducing stress and mental load.
- **Structure** – Providing clarity and organization without feeling overwhelming.
- **Friendliness** – Approachable and intuitive, never rigid or bureaucratic.
- **Nordic Simplicity** – Inspired by Danish design principles: clean, minimal, functional.

### Logo & Visual Identity

#### Logo Concept:

- A minimalist **wordmark** design with **clean, modern typography**.
- Monotone color scheme (black, white, or gray) for **versatility and clarity**.
- Designed for digital use, ensuring readability and adaptability across devices.

### Color Palette – Inspired by Nordic Calm

| Color | Hex Code | Usage |
| --- | --- | --- |
| Soft Deep Blue | `#2C3E50` | Primary brand color – conveys trust and stability. |
| Muted Sage Green | `#A3B18A` | Secondary – represents balance, nature, and calm. |
| Warm Sand Beige | `#EDE0D4` | Backgrounds and neutral spaces – warmth without being stark white. |
| Pale Sky Blue | `#BFD7EA` | Subtle highlights for UI, soft callouts. |
| Deep Slate Gray | `#6C757D` | Text and contrast elements – clear but not harsh. |

🔹 **Avoid overly bright or artificial colors** – the goal is a natural, harmonious look.

### Typography – Functional Yet Friendly

- **Primary Font:** **"Work Sans" or "Inter"** – modern, legible sans-serif with warmth and structure.
- **Secondary Font:** **"Source Serif Pro"** – soft serif for occasional elegant contrast.

🔹 **Text Guidelines:**
- **Headlines:** Large, bold but not aggressive.
- **Body Text:** Ample spacing, easy to read.
- **Buttons:** Rounded edges, soft yet clear action cues.

### UI & Iconography Style

- **Rounded, soft-edged UI elements** (avoiding harsh angles).
- **Minimalistic, line-based icons** inspired by Scandinavian simplicity.
- **White space-heavy layouts** to maintain clarity and a sense of calm.
- **Smooth, subtle animations** (fade-ins, gentle transitions—no harsh pop-ups).

**Example UI inspirations:**
- Apple's native iOS apps (clean and structured).
- Notion's soft aesthetic (organized but inviting).
- Nordic interior design—**light, breathable, uncluttered**.

### Brand Voice & Messaging

#### Tone of Voice:

- **Reassuring & Supportive** – "We've got this covered for you."
- **Structured, Yet Human** – "Here's what's next, step by step."
- **Down-to-Earth** – "No jargon, just clear and simple guidance."

#### Tagline Ideas:

- **"Bringing Calm to Family Chaos."**
- **"Family Life, Organized Simply."**
- **"Less Stress, More Together."**

🔹 **Messaging Guidelines:**
- Never feel overwhelming—avoid long walls of text.
- Always offer **clear actions** (e.g., "Tap here to plan your week").
- Use **gentle, positive reinforcement** (e.g., "Great job! Next, let's plan your meals").

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn-ui components
- **Build Tool**: Vite
- **State Management**: React Context API and hooks
- **Routing**: React Router

## Directory Structure

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
