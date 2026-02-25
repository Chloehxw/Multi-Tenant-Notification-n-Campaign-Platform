# Multi-Tenant-Notification-n-Campaign-Platform

A mobile application built with React Native (Expo) that demonstrates:

- Real-time campaign health monitoring
- Offline caching using SQLite
- Push notification preview simulation
- Local failure alerts
- Biometric authentication (Face ID / Touch ID/ Passcode)

## Features

- Live dashboard with campaign metrics (Sent / Failed / Pending)
- Campaign health indicator (Healthy / High Failure)
- Local notification triggered when failure rate >= 20%
- Pull-to-refresh support
- Offline mode with SQLite caching
- Push notification preview screen
- Biometric lock before accessing dashboard

## Tech Stack

- React Native (Expo)
- TypeScript
- Expo SQLite (Offline caching)
- Expo Notifications (Local alerts)
- Expo Local Authentication (Biometrics)
- React Navigation (Native Stack)

## Installation & Running the App

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the App
```bash
npx expo start
```

## Important: Biometric Authentication

This app uses Face ID / Touch ID for security.

To test biometrics properly: 

- You must use a real physical device.
- Expo Go on a simulator may not properly simulate Face ID.

If biometrics are not supported or not enrolled on your device, the app will block access.

## Stimulate offline cache
Since this project uses a simulated API, offline mode can be tested by temporarily enabling the simulated network error inside campaignService.ts.