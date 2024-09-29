import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
}
