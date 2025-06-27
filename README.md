# Task Management API

This is a simple Task Management API built with NestJS and MongoDB. It supports user authentication and basic task CRUD operations. Below, I walk you through how to set it up locally, the reasoning behind my configuration choices, how to test the API via Postman, and how I’ve approached its design, including validation and error handling.

---

## 🛠️ How I Set Up and Run the Application Locally

### 📦 Requirements
- Node.js (v18+ recommended)
- MongoDB (local or cloud-based like MongoDB Atlas)
- npm

### 🧰 Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Set up environment variables:

Create a .env file at the root of the project and define:
`PORT=3000`
`MONGODB_URI=mongodb://localhost:27017/task_mgt`
`JWT_SECRET=yourSuperSecretKey`

### Access the API:

The server should be running on `http://localhost:3000`

## Why I Configured CORS This Way
For this task, I enabled CORS using a relaxed setup that accepts requests from any origin (e.g., origin: true or '*'). This was intentional to simplify local development and testing across different frontend clients or Postman without running into cross-origin errors.

## Example Postman Requests

### Auth Routes

1. ### Register
  `POST /auth/register`

