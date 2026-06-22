# PRITECH Task Manager

Repository: https://github.com/enisgjinii/pritech-task-manager

A clean, professional React Native task manager built with Expo and TypeScript. Manage personal tasks locally while enriching the experience with 15 free public APIs used as productivity widgets, imports, and fun rewards.

## PRITECH Technical Task Checklist

| Requirement                                               | Status | Implementation                                   |
| --------------------------------------------------------- | ------ | ------------------------------------------------ |
| Task list screen                                          | Done   | `HomeScreen` — FlatList with task cards          |
| Add new task                                              | Done   | `AddTaskScreen` — title, description, validation |
| Mark completed / not completed                            | Done   | Checkbox on list + button on details             |
| Delete task                                               | Done   | Delete on list and details (with confirmation)   |
| Simple task details view                                  | Done   | `TaskDetailsScreen` — full task info             |
| Basic input validation                                    | Done   | `validators.ts` — required fields, min length    |
| Clean and simple UI                                       | Done   | PRITECH colors, reusable components              |
| Fetch data from public API                                | Done   | Advice Slip, Open-Meteo, and 13 more APIs        |
| **Task fields:** title, description, status, created date | Done   | `src/types/task.ts`                              |
| **Bonus:** search by title                                | Done   | Search bar on Home                               |
| **Bonus:** filter by status                               | Done   | All / Active / Completed filters                 |
| **Bonus:** local storage                                  | Done   | AsyncStorage (`@pritech_tasks`)                  |
| **Bonus:** navigation between screens                     | Done   | Stack + tabs + drawer                            |

## Features

- Task list with search and status filters (All / Active / Completed)
- Add, view, complete, uncomplete, and delete tasks
- Task details with optional owner assignment
- Input validation with friendly error messages
- AsyncStorage persistence across app restarts
- Onboarding flow for first-time users
- **Public API Hub** demonstrating 15 free APIs
- API-powered widgets on Home and Details screens
- Import starter tasks from DummyJSON and JSONPlaceholder
- Create tasks from holidays, books, and meals
- Completion rewards (Pokémon, dog image, programming joke)

## Tech Stack

- Expo SDK 56
- React Native
- TypeScript
- React Navigation (Native Stack)
- AsyncStorage
- Native `fetch` API

## Public APIs Used

| #   | API                   | Purpose                        |
| --- | --------------------- | ------------------------------ |
| 1   | DummyJSON Todos       | Import starter tasks           |
| 2   | JSONPlaceholder Todos | Alternative task import        |
| 3   | Random User API       | Suggested task owners          |
| 4   | Open-Meteo            | Working weather widget         |
| 5   | Nager.Date            | Public holiday reminders       |
| 6   | PokéAPI               | Completion reward              |
| 7   | Open Library          | Learning / reading suggestions |
| 8   | Dog CEO               | Motivational dog image         |
| 9   | Cat Facts             | Fun fact widget                |
| 10  | Advice Slip           | Daily productivity advice      |
| 11  | JokeAPI               | Programming jokes              |
| 12  | Open Trivia DB        | Quick brain break              |
| 13  | TheMealDB             | Meal break ideas               |
| 14  | CoinGecko             | Market watch widget            |
| 15  | Open Notify ISS       | Space status widget            |

All APIs are free and require no API keys.

## Setup Instructions

```bash
npm install
npx expo start
```

Run on iOS Simulator, Android Emulator, or Expo Go.

## AsyncStorage

Tasks and onboarding status are stored locally:

- `@pritech_tasks` — task list
- `@pritech_onboarding_complete` — onboarding flag

Data persists after app reload. No backend or authentication is used.

## Screenshots

Add screenshots or a short screen recording before submission. Suggested captures:

1. Task list with search and filters
2. Add task form with validation errors
3. Task details screen
4. Public API Hub (optional bonus showcase)

Save images to `docs/screenshots/` and reference them here.

## Implementation Notes

### Folder Structure

```
src/
  api/publicApis.ts      — all API fetch functions
  components/            — reusable UI components
  screens/               — Home, AddTask, TaskDetails, ApiHub, Onboarding
  storage/               — AsyncStorage helpers
  types/                 — Task and API types
  utils/                 — date formatting and validators
  navigation/            — React Navigation setup
```

### Design Choices

- **Task-first UX** — APIs enhance the app as widgets, not as the main focus
- **Independent API cards** — each hub card manages its own loading/error state
- **Graceful failures** — friendly messages instead of raw errors
- **ISS HTTP endpoint** — handled with try/catch; shows a device-friendly fallback message
- **No location permissions** — weather uses fixed coordinates in `src/constants/config.ts`

## License

See [LICENSE](LICENSE).
