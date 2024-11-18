# Dog Adapters Project

## Description

The **Dog Adapters** project is a web-based application for managing the dog adoption process. Users can securely register and authenticate, view available dogs, and manage both user and dog profiles. The application tracks each dog's details, status, vaccination history, and behaviors. It is built with Node.js and Express.js, leveraging a robust MongoDB database and scalable architecture.



---

## Features

- **User Authentication**: Secure login, logout, and registration using `Passport.js` with `LocalStrategy`.
- **User Management**: Full CRUD operations for user profiles
- **Dog Management**:  Full CRUD functionality for dog profiles, including fields like race, age, gender, behavior, and vaccination status.
- **Search and Filtering**: Find dogs by attributes such as breed, age, or availability.
- **Session Management**: User sessions handled using `express-sessionConfig`.
- **API Documentation**: Swagger integration for easy API exploration.
- **Logging**: Winston for structured logging and debugging.
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
- **Morgan**: HTTP request logging during development.
- **Dotenv**: Manage sensitive configurations through environment variables.
- **Prettier**: Enforce consistent code formatting.

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

1. Clone the repository:

   ```bash
   git clone https://github.com/adimalka14/dog-adapters.git
   cd dog-adapters

2. Install dependencies:

   ```bash
   npm install
   
3. Create .env file in the root directory and set the following variables:
    
    ```bash
    SESSION_SECRET=your_secret_key
4. Run the application:

    ```bash
    npm start

The app will run on http://localhost:3000.

---

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
---
![צילום מסך 2024-11-18 184856](https://github.com/user-attachments/assets/265a58e9-1287-4df9-a099-909dc8737b26)
![צילום מסך 2024-11-18 184910](https://github.com/user-attachments/assets/25ac4f47-ccfe-4ad1-8c35-27ee6a96c0b3)
![צילום מסך 2024-11-18 184948](https://github.com/user-attachments/assets/c67bf767-26f5-4a94-868d-af558a07fb4a)

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
---
## Next Steps
- Integration with cloud storage for dog images.
- Real-time notifications for adoption status changes.
- Enhanced search filters and recommendations.
