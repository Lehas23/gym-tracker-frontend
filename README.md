# Gym Tracker Frontend

A full-stack workout tracking application built with React. Users can create workout templates, run live workout sessions, and review their session history.

**Live demo:** https://gym-tracker-frontend-xi.vercel.app

---

## Tech stack

- React + Vite
- Tailwind CSS
- Axios
- React Router

## Features

- JWT-based authentication (login and registration)
- Create, edit, and delete workout templates
- Add and reorder exercises within templates
- Start live workout sessions from a template
- Track sets, reps, and weight in real time during a session
- Review past workout sessions and logged data
- Dark mode support

## Architecture

The frontend is a single-page application that communicates with a REST API backend via Axios. Authentication is handled using JWT tokens stored in localStorage, with protected routes managed through React Router. Component structure follows a page-based layout with shared UI components.

The backend repository is here: [gym-tracker-api](https://github.com/Lehas23/gym-tracker-api)

## Running locally

```bash
npm install
npm run dev
```

Create a `.env.local` file in the root with:

```
VITE_API_URL=https://localhost:7149
```

Make sure the backend API is running before starting the frontend.

## What I'd add next

The current feature set covers the core workout logging loop. Given more time, I'd extend it with:

- Personal records tracking (automatic PR detection per exercise)
- Workout volume and progression charts over time
- More granular session stats (total volume per session, sets per muscle group)
- Rest timer during active workouts
