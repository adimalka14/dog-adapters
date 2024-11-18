# Dog Adapters Project

## Description

The **Dog Adapters** project is a web-based application designed for managing the process of adopting dogs. It includes user management and authentication systems, where users can register, log in, view, update, and delete dog profiles. The system also includes functionality to track each dog's status, vaccines, and behaviors. This application is built using Node.js and Express with authentication powered by Passport.js.

---

## Features

- **User Authentication**: Secure login, logout, and registration using `Passport.js` with `LocalStrategy`.
- **User Management**: CRUD (Create, Read, Update, Delete) functionality for users stored in JSON files.
- **Dog Management**: CRUD operations on dog profiles stored in JSON files, including dog details such as race, age, gender, behaviors, and vaccination history.
- **Rate Limiting**: Protects sensitive routes like login and registration from excessive requests using `express-rate-limit`.
- **Session Management**: User sessions handled using `express-sessionConfig`.
- **Security**: Use of `Helmet.js` to enhance security by setting various HTTP headers.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web framework for building the backend RESTful API.
- **Passport.js**: Authentication middleware for handling user login and registration.
- **bcrypt**: Library for hashing passwords and securing user credentials.
- **UUID**: To generate unique identifiers for users and dog profiles.
- **Helmet.js**: Security middleware to help secure HTTP headers.
- **Express-rate-limit**: Middleware to prevent abuse of routes like login and registration.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing in the app.
- **Morgan**: HTTP request logger middleware for logging requests to the server.
- **Dotenv**: Module for loading environment variables from a `.env` file.
- **Compression**: Middleware for compressing HTTP responses to improve performance.
- **Postman**: Tool for testing and documenting API requests during development.
- **nodemon**: Tool for automatically restarting the server during development.
- **Prettier**: Code formatting tool to maintain consistency in code style.
- **Mock Data (JSON)**: Used to simulate real-world data for users and dog profiles during development.
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
│   └── dog.router.ts          # Dog model (load and save dogs from JSON)
│
├── routes
│   ├── index.ts               # index routes (init all routers)
│   ├── main.router.ts          # main router for '/'
│   ├── auth.router.ts         # Authentication routes (login, logout, register)
│   ├── dog.router.ts          # Dog routes (CRUD operations for dog profiles)
│   └── user.model.ts         # User routes (CRUD operations for users)
│
├── middlewares
│   ├── dog.mw.אד             # dog middleware
│   ├── rateLimiter.mw.ts     # Rate limiting middleware
│   └── auth.mw.js            # auth middleware 
│
├── config
│   ├── passportConfig.js     # Passport.js configuration for local strategy
│   └── sessionConfig.js      # Session handling using express-sessionConfig
|
├── utils
│   └── hashingPassword.ts      # Helper functions for password hashing and validation
│
└── app.ts              # Main app file that configures middleware and routes
```



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
```
```


## Usage

1. **Register a new user**:
    - Endpoint: `POST /auth/register`
    - Body:
    ```json
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "gender": "Male",
        "password": "password123"
    }
    ```

2. **Login a user**:
    - Endpoint: `POST /auth/login`
    - Body:
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

3. **View all dogs**:
    - Endpoint: `GET /dogs`

4. **Add a new dog**:
    - Endpoint: `POST /dogs`
    - Body:
    ```json
    {
        "race": "Labrador",
        "gender": "Male",
        "age": 3,
        "vaccines": 2,
        "behave": ["Friendly", "Playful"],
        "name": "Buddy",
        "status": "Available"
    }
    ```

## Next Steps

- **Database Integration**: Migrate data storage from JSON files to a proper database such as MongoDB for better scalability.
- **JWT Authentication**: Move to token-based authentication using JWT for stateless sessions.
- **Deployment**: Deploy the app on a cloud platform like Heroku or AWS.
