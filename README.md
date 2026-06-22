# PRITECH Task Manager

A clean, simple React Native mobile application for managing personal tasks. Built as a technical demonstration project showcasing React Native fundamentals, TypeScript, navigation, local storage, and API integration.

## Features

- **Task List** — View all tasks with title, description preview, completion status, and created date
- **Add Task** — Form with title and description fields, auto-generated date and default active status
- **Input Validation** — Required fields with minimum length checks and inline error messages
- **Toggle Completion** — Mark tasks complete/incomplete from list or details screen
- **Delete Task** — Remove tasks with confirmation dialog
- **Task Details** — Full task view with status toggle and delete actions
- **Search** — Real-time, case-insensitive title search
- **Filter** — Filter by All, Active, or Completed (works with search)
- **Local Storage** — Tasks persist via AsyncStorage across app reloads
- **Motivational Quote** — Random quote from [Quotable API](https://api.quotable.io) with loading and error states

## Tech Stack

- React Native
- TypeScript
- Expo SDK 56
- React Native Paper (Material Design UI)
- Motion on Native (Framer Motion–style animations via Reanimated)
- React Navigation (Native Stack)
- AsyncStorage
- Functional components and React hooks

## Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Run the app**

   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan the QR code with **Expo Go** on a physical device

## Public API Usage

The app fetches a random motivational quote from `https://api.quotable.io/random` on the task list screen. The quote card shows:

- Quote text and author on success
- A loading spinner while fetching
- Fallback message *"Could not load quote. Stay productive today."* on failure
- A refresh button to fetch a new quote

No API key is required. The endpoint is called over HTTPS with standard `fetch`.

## Implementation Overview

### Project Structure

```
src/
  components/     Reusable UI (TaskCard, QuoteCard, FilterTabs, etc.)
  screens/        TaskListScreen, AddTaskScreen, TaskDetailsScreen
  navigation/     React Navigation stack setup
  types/          TypeScript interfaces
  utils/          AsyncStorage helpers and date formatting
  constants/      Color palette
  services/       Quote API fetch logic
```

### Data Model

Each task is stored as:

```typescript
{
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string; // ISO date string
}
```

### Key Design Decisions

- **AsyncStorage** — All CRUD operations go through utility functions in `src/utils/storage.ts`, keeping persistence logic centralized
- **Screen focus refresh** — Task list and details screens reload data when focused, ensuring UI stays in sync after navigation
- **Combined search + filter** — Filtering is applied in a single `useMemo` so search and status filters work together
- **Validation on submit** — Form validation runs before save; errors display below each input field

## License

See [LICENSE](LICENSE).
