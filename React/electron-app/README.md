## One‑liner
A desktop application built with Electron and React, written in TypeScript, that provides a fast, offline-first experience with local data storage and modern testing.
## Overview
This project is a cross‑platform desktop app that combines:
- Electron for packaging and native desktop capabilities
- React for building interactive user interfaces
- TypeScript for type‑safe development
- SQLite (via Sequelize) for a local, embedded database
- A modern toolchain for fast builds and testing

It is designed to run fully on the user’s machine, without requiring a network connection for core functionality. The UI renders charts, manages local state with Redux Toolkit, and communicates with the Electron main process using a secure preload bridge. End‑to‑end tests validate key user flows, while unit and component tests keep logic and UI predictable.
## Key features
- Desktop‑native app powered by Electron, with auto‑update support
- Fast React UI with TypeScript and modern tooling
- Centralized state management with Redux Toolkit
- Local persistence using SQLite; data access via Sequelize ORM
- Charts and visualizations using Chart.js and react-chartjs-2
- Secure communication between renderer and main process (preload, IPC)
- Test coverage across layers (Jest + React Testing Library, Playwright)
- Sensible defaults for linting, formatting, and builds

## Architecture
The codebase follows the typical Electron + React separation of concerns:
- Main process (Electron)
    - Creates application windows and handles native integrations (menu, tray, dialogs, updates).
    - Hosts the app lifecycle (launch, quit, updates) and OS‑level capabilities (file system, auto‑launch if applicable).

- Preload
    - Acts as a narrow, secure bridge between the renderer and main process via IPC.
    - Exposes a minimal API surface to the renderer (contextIsolation enabled).

- Renderer (React)
    - The UI layer built with React 18 and TypeScript.
    - Uses React Router for navigation and Redux Toolkit for application state.
    - Renders charts with Chart.js and react-chartjs-2.

- Data layer
    - SQLite for storage (sqlite3).
    - Sequelize provides models and queries. Data is accessed through clearly defined services to keep UI logic simple and testable.

IPC boundaries are kept small and explicit. Any file system or OS action happens in the main process. The renderer never receives Node.js primitives directly; it calls the preload‑exposed API instead.
## Tech stack
- Language: TypeScript 5.5.2
- UI: React 18.3.1, react-dom 18.3.1, react-router-dom 7.0.1
- State: @reduxjs/toolkit 2.4.0, react-redux 9.1.2
- Desktop: Electron 33.2.1, electron-vite 2.3.0, electron-builder 24.13.3, electron-updater 6.1.7
- Data: sqlite3 5.1.7, Sequelize 6.37.5
- Charts: chart.js 4.4.7, react-chartjs-2 5.2.0
- Testing:
    - Unit/Component: Jest 29.7.0, @testing-library/react 16.0.1, @testing-library/jest-dom 6.6.3
    - E2E: Playwright/@playwright/test 1.52.0

- Tooling: Vite 5.4.11, ESLint 8.57.0, Prettier 3.3.2
- Accessibility: focus-trap-react 10.3.1
- Utilities: fs-extra 11.2.0
