const { hashPassword } = require('../utils/helpers');
const {
    findUserByMail,
    loadUsersFromFile,
    saveUsersToFile,
} = require('../models/user');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
};

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: 'Logged out successfully' });
    });
};

const register = async (req, res, next) => {
    const { first_name, last_name, email, gender, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required' });
    }

    const userExist = await findUserByMail(email);

    if (userExist) {
        return res.status(409).json({
            message:
                'User already exists, please register with a different email',
        });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
        first_name,
        last_name,
        email,
        gender,
        password: hashedPassword,
        id: uuidv4(),
    };

    const users = await loadUsersFromFile();
    users.push(newUser);
    await saveUsersToFile(users);

    req.logIn(newUser, (err) => {
        if (err) {
            return next(err);
        }
        return res
            .status(201)
            .json({ message: 'User registered successfully' });
    });
};

module.exports = {
    login,
    logout,
    register,
};
