# Dog Registry - Backend

REST API for managing dog breeds, built with Express, TypeScript, and MongoDB.

## Tech Stack

- Express 5
- TypeScript
- MongoDB / Mongoose
- Zod (validation)
- Winston (logging)

## Setup

```bash
npm install
cp .env.example .env
```

Update `.env` with your values:

```
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/dog_dev
```

## Run

```bash
npm run dev    # development (nodemon)
npm start      # production
```

## API Endpoints

Base path: `/api/v1`

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | /dogs        | Get all dogs      |
| GET    | /dogs/:id    | Get dog by ID     |
| POST   | /dogs        | Create a new dog  |
| PUT    | /dogs/:id    | Update a dog      |
| DELETE | /dogs/:id    | Delete a dog      |

### Request Body (POST / PUT)

```json
{
  "breed": "Labrador",
  "subBreads": ["Yellow Lab", "Chocolate Lab"]
}
```