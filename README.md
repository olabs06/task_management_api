# Task Management API

This is a simple Task Management API built with NestJS, TypeScript, and MongoDB. It supports user authentication and basic task CRUD operations. Below, I walk you through how to set it up locally, the reasoning behind my configuration choices, how to test the API via Postman, and how I’ve approached its design, including validation and error handling.

---

## How to Set Up and Run the Application Locally

### Requirements
- Node.js (v18+ recommended)
- MongoDB (local or cloud-based like MongoDB Atlas)
- npm
- Postman: For testing API endpoints
- Git: To clone the repository

### Installation Steps

1. **Clone the repository:**
   `git clone https://github.com/olabs06/task_management_api.git`
   `cd task_management_api`


2. **Install Dependencies:**
`$ npm install`

3. **Set Up Environment Variables:**
I created a .env file in the project root (task_management_api/.env) with the following:
    `MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>. mongodb.net/tasks?retryWrites=true&w=majority`
    `JWT_SECRET=your-secret-key`

-  Replace <username>, <password>, and <cluster> with my MongoDB Atlas credentials.
- Replace your-secret-key with a strong, unique secret for JWT signing.
- I ensure .env is listed in .gitignore to prevent exposing sensitive data.

### Compile and run the project

#### development
`$ npm run start`


## Run Linting and TypeScript Checks:
**To ensure code quality, I run:**
  `npx tsc`
  `npx eslint src --ext .ts --fix`

Create a .env file at the root of the project and define:
`PORT=3000`
`MONGODB_URI=mongodb://localhost:27017/task_mgt`
`JWT_SECRET=yourSuperSecretKey`

### CORS Configuration
I configured CORS in main.ts with the following settings:
   ```app.enableCors({`
      `origin: '*',`
      `methods: 'GET,POST',`
      `allowedHeaders: 'Content-Type,Authorization',`
    `});`

I chose this permissive CORS setup (origin: '*') for development purposes because it allows me to test the API from any client (e.g., Postman, local frontends) without CORS restrictions. This is not suitable for production, as it allows requests from any origin, which could expose the API to unauthorized access or attacks. In a production environment, I would restrict origin to specific domains (e.g., https://my-frontend.com) and implement additional security measures and stricter headers.

### A sample Postman Requests
I use Postman to test the API endpoints. Below is an example requests for user login.

1. **Login to Obtain JWT Token**
  - Method: POST
  - URL: http://localhost:3000/auth/login
  - Headers: Content-Type: application/json

#### Body (raw JSON):
  `{
    "username": "admin",
    "password": "securepassword"
  }`

#### Expected Response (200 OK):
`{
  "access_token": "<jwt-token>"
}`

### OpenAPI Documentation in Postman
To document the API automatically, I use NestJS’s built-in Swagger module to generate an OpenAPI (Swagger) specification, which I then import into Postman.

1. Add Swagger to the Project
I install the @nestjs/swagger package:
  `npm install @nestjs/swagger`

2. I configured Swagger in `main.ts` to include Swagger setup.

#Don't forget to give me a star on Github
