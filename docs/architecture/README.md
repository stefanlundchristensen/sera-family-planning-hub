# SERA Family Planning Hub Architecture

This directory contains architectural documentation for the SERA Family Planning Hub application.

## Architecture Diagram

![SERA Family Planning Hub Architecture](./SERA%20Family%20Planning%20Hub%20Architecture.png)

The diagram illustrates the key components and their relationships:

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
