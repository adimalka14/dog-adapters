# Dog Adapters Project

## Description

The **Dog Adapters** project is a web-based application designed for managing the process of adopting dogs. It includes user management and authentication systems, where users can register, log in, view, update, and delete dog profiles. The system also includes functionality to track each dog's status, vaccines, and behaviors. This application is built using Node.js and Express with authentication powered by Passport.js.

---

## Features

- **User Authentication**: Secure login, logout, and registration using `Passport.js` with `LocalStrategy`.
- **User Management**: CRUD (Create, Read, Update, Delete) functionality for users stored in JSON files.
- **Dog Management**: CRUD operations on dog profiles stored in JSON files, including dog details such as race, age, gender, behaviors, and vaccination history.
- **Rate Limiting**: Protects sensitive routes like login and registration from excessive requests using `express-rate-limit`.
- **Session Management**: User sessions handled using `express-session`.
- **Security**: Use of `Helmet.js` to enhance security by setting various HTTP headers.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Express.js**: Web framework for handling routes and middleware.
- **Passport.js**: Authentication middleware for Node.js with local strategy.
- **bcrypt**: Used for hashing passwords to securely store user credentials.
- **UUID**: To generate unique identifiers for both users and dog profiles.
- **Helmet.js**: Security middleware to secure the app with HTTP headers.
- **Express-rate-limit**: To prevent abuse of login and registration routes.
- **JSON**: User and dog data is stored in JSON format, offering a simple data persistence solution.

---

## Project Structure

```plaintext
/src
│
├── models
│   ├── user.js         # User model (load and save users from JSON)
│   └── dog.js          # Dog model (load and save dogs from JSON)
│
├── routes
│   ├── auth.js         # Authentication routes (login, logout, register)
│   ├── dog.js          # Dog routes (CRUD operations for dog profiles)
│   └── user.js         # User routes (CRUD operations for users)
│
├── middlewares
│   ├── passport.js     # Passport.js configuration for local strategy
│   ├── rateLimiter.js  # Rate limiting middleware
│   └── session.js      # Session handling using express-session
│
├── utils
│   └── helpers.js      # Helper functions for password hashing and validation
│
└── app.js              # Main app file that configures middleware and routes
```



## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-link
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