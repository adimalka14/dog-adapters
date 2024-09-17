const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function comparePasswords(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
}

module.exports = {
    hashPassword,
    comparePasswords,
};
