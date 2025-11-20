# KiFome API

A RESTful API for sharing, discovering, and interacting with cooking recipes. KiFome enables users to publish their favorite recipes,
engage through comments and likes, and rate recipes from other users.

## Built With

- Node.js
- Express.js
- PostgreSQL
- JWT

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL

### Installation

```bash
# clone the repo
git clone https://github.com/m4thewz/kifome-back.git

# go into the directory
cd kifome-back

# install packages
npm install
# or
yarn install

```

### Configuration

Create a `.env` file in the root of the project with the following variables:

```env
PORT=3000
NODE_ENV=development

DATABASE_NAME=your_database_name
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost

JWT_SECRET=your_secret # at least 32 characters recommended
JWT_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:3000,http://localhost:5173 # separate with ','
```

## Running application

```bash
# development
npm run dev

# production
npm start
```

API will run at `http://localhost:3000`

## Avaliable routes

| Method     | Endpoint                    | Description                   |
| ---------- | --------------------------- | ----------------------------- |
| **POST**   | `/api/auth/register`        | Register a new user           |
| **POST**   | `/api/auth/login`           | Login a user                  |
| **GET**    | `/api/auth/me`              | Get current logged-in user    |
| **GET**    | `/api/users/:id`            | Get user profile by ID        |
| **GET**    | `/api/users/:id/recipes`    | Get recipes by user ID        |
| **PUT**    | `/api/users/me`             | Update current user profile   |
| **DELETE** | `/api/users/me`             | Delete current user account   |
| **GET**    | `/api/recipes`              | Get all recipes               |
| **GET**    | `/api/recipes/:id`          | Get a recipe by ID            |
| **POST**   | `/api/recipes`              | Create a new recipe           |
| **PUT**    | `/api/recipes/:id`          | Update a recipe (owner only)  |
| **DELETE** | `/api/recipes/:id`          | Delete a recipe (owner only)  |
| **POST**   | `/api/recipes/:id/like`     | Like a recipe                 |
| **GET**    | `/api/recipes/:id/like`     | Get a like                    |
| **POST**   | `/api/recipes/:id/rate`     | Rate a recipe                 |
| **GET**    | `/api/recipes/:id/rating`   | Get recipe rating             |
| **GET**    | `/api/recipes/:id/comments` | Get all comments for a recipe |
| **POST**   | `/api/recipes/:id/comments` | Add a comment to a recipe     |
| **GET**    | `/api/comments/:id`         | Get a comment by ID           |
| **PUT**    | `/api/comments/:id`         | Update a comment (owner only) |
| **DELETE** | `/api/comments/:id`         | Delete a comment (owner only) |
| **GET**    | `/api/categories`           | Get all categories            |
| **GET**    | `/api/categories/:id`       | Get a category by ID          |
