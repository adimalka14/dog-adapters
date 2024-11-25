# Dog Adapters Project

## Description

The **Dog Adapters** project is a web-based application for managing the dog adoption process. Users can securely register and authenticate, view available dogs, and manage both user and dog profiles. The application tracks each dog's details, status, vaccination history, and behaviors. It is built with Node.js and Express.js, leveraging a robust MongoDB database and scalable architecture.



---

## Features

- **User Authentication**: Secure login, logout, and registration using `Passport.js` with `LocalStrategy`.
- **User Management**: Full CRUD operations for user profiles
- **Dog Management**:  Full CRUD functionality for dog profiles.
- **Search and Filtering**: Find dogs by attributes.
- **Session Management**: User sessions handled using `express-sessionConfig`.
- **API Documentation**: `Swagger` integration for easy API exploration.
- **Logging**: `Winston` for structured logging and debugging.
- **Testing**: Comprehensive tests for API endpoints using Jest and Supertest.
---

## Technologies Used
### Backend
- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web framework for building the backend RESTful API.
- **MongoDB**: Database for storing user and dog profiles.
### Authentication
- **Passport.js**: Authentication middleware for handling user login and registration.
- **bcrypt**: Library for hashing passwords and securing user credentials.
### Development and Maintenance
- **Jest**: Testing framework for API and functionality testing.
- **Swagger**: API documentation and testing interface.
- **Winston**: Logging library for error and activity tracking.
- **aggregations**: filter dogs by query which populate dogs by owner.
- **pagination**: pagination for data aggregations.
### Another tools
- **Dotenv**: Manage sensitive configurations through environment variables.
- **Prettier**: Enforce consistent code formatting.
- **status code**: return the correct status code for http requast response.
- **postman** send api request and check response.
---

## Mock Data

During the development process, **mock data** was used to simulate real-world scenarios. This included mock user data and dog profiles, which were stored in JSON format to test API endpoints and simulate database interactions.

- **Mock Users**: Simulated user data including first name, last name, email, gender, and hashed passwords.
- **Mock Dogs**: Simulated dog profiles with attributes such as race, gender, age, behaviors, and status.

The mock data was used extensively for testing user authentication, dog management functionalities, and overall application behavior before integrating with a real database.

---

## Project Structure

```plaintext
/src
│
├── models
│   ├── user.model.ts         # User model (load and save users from JSON)
│   └── dog.router.ts         # Dog model (load and save dogs from JSON)
│
├── routes
│   ├── index.ts              # index routes (init all routers)
│   ├── main.router.ts        # main router for '/'
│   ├── auth.router.ts        # Authentication routes (login, logout, register)
│   ├── dog.router.ts         # Dog routes (CRUD operations for dog profiles)
│   └── user.model.ts         # User routes (CRUD operations for users)
│
├── middlewares
│   ├── dog.mw.ts             # dog middleware
│   ├── auth.mw.ts            # auth middleware
│   ├── rateLimiter.mw.ts     # Rate limiting middleware
│   ├── logAPI.mw.ts          # write log with logger
│   └── requestID.mw.ts       # generate id for api requests 
│
├── config
│   ├── passport.config.ts    
│   ├── db.config.ts          
│   ├── session.config.ts    
│   └── swagger.config.ts
│    
├── controllers
│   ├── auth.ctrl.ts    
│   ├── dog.ctrl.ts          
│   └── users.ctrl.ts    
│
├── interfaces
│   ├── dog.interface.ts          
│   └── users.interface.ts
│
├── services
│   ├── dog.service.ts          
│   └── users.service.ts 
│
├── aggregations          
│   └── filterDogs.aggregations.ts    
│   
├── utils
│   ├── env-var.ts 
│   ├── logger.service.ts                  
│   └── hashingPassword.ts      # Helper functions for password hashing and validation
│
├── app.ts              # Main app file that configures middleware and routes
└── server.ts           # Start app and db.
```

---

## Installation
### Requirements
- Node.js version 20.12+
- MongoDB version 7.0+
1. Clone the repository:

   ```bash
   git clone https://github.com/adimalka14/dog-adapters.git
   cd dog-adapters

2. Install dependencies:

   ```bash
   npm install
3. Run the application:
- build of typescript and run js compiled project
   ```bash
    npm run build
   ```
    ```bash
    npm run start

- or runs typescript code for development with nodemon
   ```bash
    npm run dev
      

The app will run on http://localhost:3000.

---
---
## Testing
The project includes tests for key functionalities, including:
- User authentication and session management.
- CRUD operations for users and dogs.
- Validation and error handling.
  
 To run the tests:

   ```bash
   npm test
```
### Test Coverage
The current test coverage for the project is as follows:
![צילום מסך 2024-11-21 183724](https://github.com/user-attachments/assets/e640a60c-c6ff-4bdd-8c34-a9eb699053cc)

## API Documentation

The API is fully documented and available via **Swagger**.  
To explore and test the API endpoints:

1. Start the server:
   ```bash
   npm start
2. Open your browser and navigate to:
   ```bash
   http://localhost:3000/api-docs
*(Replace `localhost` and the port with your server's host and port if different.)*

#### This documentation provides an interactive interface for testing and exploring all available endpoints.
## Swagger Preview

Below is a preview of the Swagger API documentation:

<div style="max-height: 400px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;">
    <img src="swagger-full-page.png" alt="Swagger API Documentation" style="width: 100%;">
</div>
