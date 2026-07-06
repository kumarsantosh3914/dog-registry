# Dog Registry - Frontend

React single-page app for managing dog breeds via the Dog Registry API.

## Tech Stack

- React 19
- TypeScript
- Vite

## Setup

```bash
npm install
cp .env.example .env
```

Update `.env` with the API base URL:

```
VITE_API_BASE_URL=/api/v1
```

## Run

```bash
npm run dev      # development (http://localhost:5173)
npm run build    # production build
npm run preview  # preview production build
```

## Features

- View all registered dogs
- Create a new dog breed with sub-breeds
- Edit existing dog entries
- Delete dogs
- Request validation with toast notifications
