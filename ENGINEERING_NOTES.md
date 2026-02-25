# ENGINEERING NOTES

## 1. Architecture Decisions and Tradeoffs

I structured the app into the following layers:

- Screens (UI layer)
- Custom hook: useCampaigns for state management and data loading
- Service layer: campaignService for API simulation
- SQLite database for offline caching (as requested)
- Reusable UI components such as Metric Circle and Status Badge to prevent duplication of code
- Shared layout and style files to maintain consistent UI design and avoid repeated styling

I separated UI from data logic so that screens focus on rendering while the custom hook handles fetching and caching.

### Tradeoffs

- I used a custom hook instead of Redux to keep the app simple and easier to understand.
- I used a mock API instead of a real backend.
- The SQLite schema only stores essential campaign fields to keep the database minimal.

## 2. How the System Scales

The system can scale in several ways:

- Reusable components allow easy addition of new UI elements.
- The service layer can be replaced with a real API without changing screen logic.
- SQLite enables offline support for campaign lists.

For larger datasets, pagination and background syncing would be added.


## 3. Failure Scenarios Considered

The following scenarios were handled:

- Network failure: Load campaigns from SQLite cache.
- High failure rate (>= 20%): Trigger local notification.
- Duplicate notifications: Prevented using a reference set.
- Biometric not supported: Show alert message.
- Biometric authentication failed: Block access to the dashboard.

## 4. Known Limitations

- Uses mock API instead of a real backend.
- SQLite stores limited campaign fields.
- No pagination for large campaign lists.
- No background data synchronization.
- Local notifications only (no remote push integration).
- Basic error UI handling.

## 5. What Would Change in Production

If this were a production application, I would:

- Replace the mock API with real backend integration.
- Add proper error UI and loading states.
- Implement pagination for large datasets.
- Add remote push notification service (e.g., Firebase).
- Introduce improved state management (Redux or similar).
- Add analytics, monitoring, and logging tools.

## 6. AI Assistance

AI was used to:

- Improve code structure suggestions.
- Help refine documentation.
- Clarify architectural explanations.

All implementation logic, feature integration, and testing were manually developed and validated.