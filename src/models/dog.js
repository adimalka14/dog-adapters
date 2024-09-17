const fs = require('fs').promises;
const path = require('path');
const dogPathFile = path.join(__dirname, '..', 'mocks', 'mock_dogs_data.json');

async function loadDogsFromFile() {
    try {
        const data = await fs.readFile(dogPathFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading dogs from file:', error);
        throw error;
    }
}

async function saveDogsToFile(dogs) {
    try {
        const data = JSON.stringify(dogs, null, 4);
        await fs.writeFile(dogPathFile, data, 'utf-8');
        console.log('Dogs saved successfully!');
    } catch (error) {
        console.error('Error saving dogs to file:', error);
        throw error;
    }
}

module.exports = {
    loadDogsFromFile,
    saveDogsToFile,
};
