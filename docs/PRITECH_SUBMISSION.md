# PRITECH Task Manager — Submission Document

**Candidate project for PRITECH React Native Technical Task**  
**Repository:** https://github.com/enisgjinii/pritech-task-manager  
**Stack:** Expo SDK 56 · React Native · TypeScript

---

## 1. Task Overview

I built a personal task manager mobile app that lets users create, view, complete, and delete tasks. Tasks are stored locally on the device. The app also integrates free public APIs as productivity widgets and optional task imports.

The project is organized for clarity, uses reusable components, and follows React Native best practices with functional components and hooks.

---

## 2. Requirements Checklist

| Requirement | Status | How it was implemented |
|-------------|--------|------------------------|
| Task list screen | Done | `HomeScreen` — scrollable list with task cards |
| Add new task | Done | `AddTaskScreen` — form with title & description |
| Mark completed / not completed | Done | Checkbox on list; toggle button on details |
| Delete task | Done | Delete on list & details (with confirmation) |
| Simple task details view | Done | `TaskDetailsScreen` |
| Basic input validation | Done | `validators.ts` — required fields, min length |
| Clean and simple UI | Done | PRITECH branding, light/dark/system theme |
| Fetch data from public API | Done | 15 free APIs (see section 5) |

### Task Data Model

| Field | Implementation |
|-------|----------------|
| Title | User input, max 100 chars |
| Description | User input, multiline |
| Status | `completed: boolean` |
| Created date | `createdAt` ISO string, formatted in UI |

---

## 3. Bonus Features

| Bonus | Status | Implementation |
|-------|--------|----------------|
| Search tasks by title | Done | Search bar on Home screen |
| Filter by status | Done | All / Active / Completed filters |
| Local storage | Done | AsyncStorage (`@pritech_tasks`) |
| Navigation between screens | Done | Stack + native/JS tabs + drawer |

**Extra polish (beyond spec):**

- Onboarding flow for first-time users
- Light / Dark / System appearance (Settings)
- Moti animations on screen transitions
- Floating Action Button (FAB) for Add Task
- Native iOS tab bar + Material-style Android tabs
- Public API Hub screen with 15 APIs

---

## 4. Technical Expectations

| Expectation | Status |
|-------------|--------|
| React Native + TypeScript | Done |
| Functional components | Done |
| Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`, custom hooks) | Done |
| Clean, organized code | Done — `src/` folder structure |
| Reusable components | Done — `TaskCard`, `InputField`, `PrimaryButton`, etc. |
| Empty states | Done — `EmptyState` component on task list |
| Avoid unnecessary complexity | Done — focused scope |

---

## 5. Public APIs Used

All APIs are free and require no API keys:

1. **DummyJSON** — import starter tasks  
2. **JSONPlaceholder** — alternative task import  
3. **Random User** — suggested task owners on Add Task  
4. **Open-Meteo** — weather widget on Home  
5. **Nager.Date** — public holiday task ideas  
6. **PokéAPI** — completion reward  
7. **Open Library** — reading suggestions  
8. **Dog CEO** — motivational image  
9. **Cat Facts** — fun fact on details  
10. **Advice Slip** — daily advice widget  
11. **JokeAPI** — programming jokes  
12. **Open Trivia DB** — brain break trivia  
13. **TheMealDB** — meal break ideas  
14. **CoinGecko** — crypto market widget  
15. **Open Notify ISS** — space station status  

---

## 6. Project Structure

```
src/
  api/publicApis.ts       — API fetch functions
  components/             — Reusable UI (TaskCard, InputField, etc.)
  context/ThemeContext.tsx — Light / dark / system theme
  navigation/             — App, drawer, tab, stack navigators
  screens/                — Home, AddTask, TaskDetails, ApiHub, Settings, Onboarding
  storage/                — AsyncStorage helpers
  types/                  — Task & API TypeScript types
  utils/                  — Validators, date formatting
App.tsx                   — Root entry with theme provider
```

---

## 7. How to Run Locally

```bash
git clone https://github.com/enisgjinii/pritech-task-manager.git
cd pritech-task-manager
npm install
npx expo start
```

Press `i` for iOS Simulator or `a` for Android Emulator.

### Quality checks

```bash
npm run typecheck    # TypeScript
npm run lint         # ESLint
npm run format:check # Prettier
npx expo-doctor      # Expo health check
npm run check        # All of the above (except expo-doctor)
```

---

## 8. Build Artifacts

Release builds are configured via EAS (`eas.json`):

```bash
# Android APK
npm run build:android:apk

# iOS IPA (requires macOS + Apple signing or EAS credentials)
npm run build:ios:ipa
```

Output files are placed in `./dist/`:

- `pritech-task-manager.apk` — Android  
- `pritech-task-manager.ipa` — iOS  

---

## 9. Deliverables Summary

| Deliverable | Location |
|-------------|----------|
| Git repository (public) | https://github.com/enisgjinii/pritech-task-manager |
| README with setup | `README.md` |
| Implementation explanation | This document + README |
| Screenshots | `docs/screenshots/` (capture before final submit) |
| Android APK | `dist/pritech-task-manager.apk` |
| iOS IPA | `dist/pritech-task-manager.ipa` |

---

## 10. What I Would Demo in an Interview

1. **Home** — task list, search, filters, API widgets, empty state  
2. **Add Task** — validation errors, optional owner from Random User API  
3. **Task Details** — full task info, complete/uncomplete, delete  
4. **Settings** — theme switcher (System / Light / Dark)  
5. **API Hub** — independent loading states for each public API card  
6. **Persistence** — reload app, tasks remain in AsyncStorage  

---

## 11. Notes

- No backend or authentication — fully offline-capable task storage  
- Graceful API error handling with user-friendly messages  
- Repository is public and runnable with the README instructions  

**Thank you for reviewing my submission.**
