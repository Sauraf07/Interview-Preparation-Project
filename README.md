# Interview Preparation Platform

A full-stack interview preparation app for practicing coding questions, exploring company interview guides, reading learning materials, and managing content through an admin panel.

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express
- Database: MySQL with Sequelize
- Auth: JWT
- File uploads: Multer, Cloudinary
- Code execution: Judge0 integration

## Project Structure

- `client/` - React frontend
- `server/` - Express API and Sequelize models

## Features

- User registration, login, and profile session handling
- Company interview pages and company-specific prep content
- Coding practice questions with filtering and submission support
- Learning roadmap and study materials
- Admin endpoints for content and user management

## Requirements

- Node.js 18+ recommended
- MySQL 8+
- npm

## Setup

### 1) Clone and install dependencies

From the project root:

```bash
cd server
npm install
cd ..\client
npm install
```

### 2) Configure the backend environment

Edit `server/.env` with your local MySQL credentials.

Example:

```env
PORT=5000
DB_NAME=interviewdb
DB_USER=root
DB_PASS=root
DB_HOST=localhost
DB_DIALECT=mysql
DB_SYNC=true
SEED_DB=true
JWT_SECRET=interview
```

- `DB_SYNC=true` creates or updates tables on startup.
- `SEED_DB=true` loads the sample companies, questions, coding problems, and materials.

### 3) Create the database

Create the database in MySQL if it does not already exist:

```sql
CREATE DATABASE interviewdb;
```

### 4) Start the backend

```bash
cd server
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 5) Start the frontend

In a separate terminal:

```bash
cd client
npm run dev
```

The Vite app runs on `http://localhost:5173` by default.

## API Notes

- `GET /api/health` - health check
- `POST /api/auth/register` - create account
- `POST /api/auth/login` - login
- `GET /api/auth/me` - current user profile
- `GET /api/home` - home page data
- `GET /api/questions` - interview questions
- `GET /api/companies` - company list
- `GET /api/coding` - coding problems
- `GET /api/materials` - learning materials

## Troubleshooting

- If registration fails, confirm MySQL is running and `server/.env` has valid credentials.
- If the home page is empty, make sure `DB_SYNC=true` and `SEED_DB=true`, then restart the backend.
- If the frontend cannot reach the API, check `client/src/api/axios.js` and confirm `VITE_API_URL` points to the backend.

## Notes

- The server is now configured for MySQL/Sequelize.
- Seed data is loaded from `server/config/seedData.js`.