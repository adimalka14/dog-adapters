const fs = require('fs').promises;
const path = require('path');
const usersPathFile = path.join(
    __dirname,
    '..',
    'mocks',
    'mock_users_data.json'
);
const { v4: uuidv4 } = require('uuid');

async function loadUsersFromFile() {
    try {
        const data = await fs.readFile(usersPathFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading users from file:', error);
        throw error;
    }
}

async function saveUsersToFile(users) {
    try {
        const data = JSON.stringify(users, null, 4);
        await fs.writeFile(usersPathFile, data, 'utf-8');
        console.log('Dogs saved successfully!');
    } catch (error) {
        console.error('Error saving users to file:', error);
        throw error;
    }
}

async function findUserByMail(email) {
    const users = await loadUsersFromFile();

    return users.find((user) => user.email === email);
}

module.exports = {
    loadUsersFromFile,
    saveUsersToFile,
    findUserByMail,
};
