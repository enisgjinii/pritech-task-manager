# PRITECH Task Manager

**PRITECH React Native Technical Task** — Junior / Junior-Mid Developer

**Repository:** https://github.com/enisgjinii/pritech-task-manager

A simple React Native mobile app that lets a user manage a small list of personal tasks. Built with Expo SDK 56, TypeScript, and functional components. Tasks are stored locally on the device; free public APIs are used as optional widgets and task imports.

---

## Task Overview

This project fulfills the PRITECH technical task: a personal task manager with a clean UI, basic validation, local persistence, and integration with public APIs. The focus is on clear code organization, reusable components, and practical React Native patterns.

---

## Requirements

| Requirement | Status | Implementation |
| ----------- | ------ | -------------- |
| Task list screen | Done | `HomeScreen` — scrollable list with task cards |
| Add new task | Done | `AddTaskScreen` — title and description form |
| Mark task as completed / not completed | Done | Checkbox on list; toggle on task details |
| Delete task | Done | Delete on list and details (with confirmation) |
| Simple task details view | Done | `TaskDetailsScreen` |
| Basic input validation | Done | `src/utils/validators.ts` |
| Clean and simple UI | Done | PRITECH branding, light/dark/system theme |
| Fetch data from a public API | Done | 15 free public APIs (see below) |

### Task Data

Each task includes the fields required by the spec:

| Field | Description | Implementation |
| ----- | ----------- | -------------- |
| Title | Task title entered by the user | `Task.title` — required, max 100 characters |
| Description | Short task description | `Task.description` — multiline text input |
| Status | Completed or not completed | `Task.completed` — boolean |
| Created date | Date when the task was created | `Task.createdAt` — ISO string, formatted in the UI |

---

## Bonus Features

| Bonus | Status | Implementation |
| ----- | ------ | -------------- |
| Search tasks by title | Done | Search bar on the Home screen |
| Filter tasks by status | Done | All / Active / Completed filters |
| Store tasks locally on the device | Done | AsyncStorage (`@pritech_tasks`) |
| Add simple navigation between screens | Done | Stack, tabs, and drawer navigation |

**Additional polish (beyond the spec):**

- Onboarding flow for first-time users
- Settings screen with System / Light / Dark theme
- Floating Action Button (FAB) to add tasks
- Public API Hub screen with 15 APIs
- Moti animations on screen transitions
- Native iOS tab bar; Material-style tabs on Android

---

## What Was Implemented

### Core task management

Users can view all tasks on the Home screen, add new tasks with validation, open a task for full details, mark tasks complete or incomplete, and delete tasks with a confirmation dialog. An empty state is shown when no tasks exist or when search/filter returns no results.

### Validation

Title and description are validated before saving. Required fields and minimum length rules produce clear, user-friendly error messages.

### Local storage

All tasks persist in AsyncStorage. Data survives app restarts with no backend or authentication.

### Public APIs

The app fetches data from multiple free public APIs (no API keys required). APIs are used as:

- **Widgets** on Home and Task Details (weather, advice, trivia, etc.)
- **Task imports** from DummyJSON and JSONPlaceholder
- **Task ideas** from holidays, books, and meals
- **Completion rewards** (Pokémon, dog image, programming joke)

Each API call handles loading and error states independently so one failure does not break the app.

### Navigation

- **Onboarding** → first launch only
- **Drawer** → app menu and branding
- **Tabs** → Tasks, API Hub, Settings
- **Tasks stack** → Home, Task Details, Add Task

### Technical approach

- **React Native + TypeScript** with functional components and hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, custom hooks)
- **Reusable components** — `TaskCard`, `InputField`, `PrimaryButton`, `EmptyState`, `LoadingState`, `ErrorState`, etc.
- **Organized folder structure** under `src/`
- **No unnecessary complexity** — offline-first task storage, graceful API error handling

---

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Expo SDK 56 | React Native framework and tooling |
| TypeScript | Type-safe application code |
| React Navigation | Stack, drawer, and tab navigation |
| AsyncStorage | Local task and settings persistence |
| Moti | Lightweight screen animations |
| Native `fetch` | Public API requests |

---

## Public APIs Used

All APIs are free and require no API keys.

| # | API | Purpose |
| - | --- | ------- |
| 1 | DummyJSON Todos | Import starter tasks |
| 2 | JSONPlaceholder Todos | Alternative task import |
| 3 | Random User API | Suggested task owners |
| 4 | Open-Meteo | Weather widget on Home |
| 5 | Nager.Date | Public holiday reminders |
| 6 | PokéAPI | Completion reward |
| 7 | Open Library | Reading suggestions |
| 8 | Dog CEO | Motivational dog image |
| 9 | Cat Facts | Fun fact widget |
| 10 | Advice Slip | Daily productivity advice |
| 11 | JokeAPI | Programming jokes |
| 12 | Open Trivia DB | Quick brain break |
| 13 | TheMealDB | Meal break ideas |
| 14 | CoinGecko | Market watch widget |
| 15 | Open Notify ISS | Space station status |

---

## Setup Instructions

**Prerequisites:** Node.js 18+ and npm

```bash
git clone https://github.com/enisgjinii/pritech-task-manager.git
cd pritech-task-manager
npm install
npx expo start
```

Then:

- Press **`i`** to open the iOS Simulator
- Press **`a`** to open the Android Emulator
- Scan the QR code with **Expo Go** on a physical device

The project runs locally using only the steps above. No backend setup is required.

### Quality checks

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run format:check # Prettier
npx expo-doctor      # Expo health check
npm run check        # typecheck + lint + format:check
```

---

## Release Builds (EAS Cloud)

APK and IPA builds run on [Expo EAS](https://expo.dev/accounts/enisgjini20/projects/pritech-task-manager) — no local Java, Gradle, or Xcode required.

```bash
npm run build:android:apk   # Start Android APK build in the cloud
npm run build:ios:ipa       # Start iOS IPA build (Apple credentials required)

# After a build finishes:
npm run build:android:download
npm run build:ios:download
```

Artifacts are saved to `./dist/`. You can also download builds from the [EAS dashboard](https://expo.dev/accounts/enisgjini20/projects/pritech-task-manager/builds).

---

## Screenshots

Screenshots or a short screen recording of the app in use. Suggested captures:

| # | Screen | Description |
| - | ------ | ----------- |
| 1 | Task list | Home screen with search, filters, and task cards |
| 2 | Add task | Form with validation error messages |
| 3 | Task details | Full task info, complete/uncomplete, delete |
| 4 | API Hub | Public API cards with loading states (optional) |

Save images to `docs/screenshots/` and add them here before submission:

```
docs/screenshots/01-home.png
docs/screenshots/02-add-task.png
docs/screenshots/03-task-details.png
docs/screenshots/04-api-hub.png
```

> **Note:** Add screenshot files to `docs/screenshots/` and replace the paths above with embedded images if desired, e.g. `![Home screen](docs/screenshots/01-home.png)`.

---

## Project Structure

```
src/
  api/publicApis.ts        — Public API fetch functions
  components/              — Reusable UI (TaskCard, InputField, PrimaryButton, …)
  constants/               — Colors and app config
  context/ThemeContext.tsx — Light / dark / system theme
  navigation/              — App, drawer, tab, and stack navigators
  screens/                 — Home, AddTask, TaskDetails, ApiHub, Settings, Onboarding
  storage/                 — AsyncStorage helpers (tasks, onboarding, theme)
  types/                   — Task and API TypeScript types
  utils/                   — Validators and date formatting
App.tsx                    — Root entry with theme provider
```

---

## AsyncStorage Keys

| Key | Purpose |
| --- | ------- |
| `@pritech_tasks` | Task list |
| `@pritech_onboarding_complete` | Onboarding completion flag |
| `@pritech_theme_mode` | Theme preference (system / light / dark) |

Data persists after app reload. No backend or authentication is used.

---

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| Git repository (public) | https://github.com/enisgjinii/pritech-task-manager |
| README with setup instructions | This file |
| Short explanation of what was implemented | [What Was Implemented](#what-was-implemented) |
| Screenshots or screen recording | `docs/screenshots/` |
| Android APK | `dist/pritech-task-manager.apk` (via EAS build) |
| iOS IPA | `dist/pritech-task-manager.ipa` (via EAS build) |

For a detailed submission write-up, see [`docs/PRITECH_SUBMISSION.md`](docs/PRITECH_SUBMISSION.md).

---

## License

See [LICENSE](LICENSE).
