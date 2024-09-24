const { uuidValidate } = require('uuid');

async function validateDogBodyMW(req, res, next) {
    let { id, race, gender, age, vaccines, behave, image, name, status } =
        req.body;

    if (id !== undefined && !uuidValidate(id)) {
        return res.status(400).json({ message: 'Invalid or missing id' });
    }

    if (!race || typeof race !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing race' });
    }

    if (!gender || !['male', 'female'].includes(gender.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid or missing gender' });
    }

    req.body.gender = gender.toLowerCase();

    if (age === undefined || typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ message: 'Invalid or missing age' });
    }

    if (
        vaccines === undefined ||
        typeof vaccines !== 'number' ||
        vaccines < 0
    ) {
        return res.status(400).json({ message: 'Invalid or missing vaccines' });
    }

    if (!Array.isArray(behave) || behave.some((b) => typeof b !== 'string')) {
        return res.status(400).json({ message: 'Invalid or missing behave' });
    }

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing name' });
    }

    if (
        !status ||
        !['available', 'adopted', 'pending'].includes(status.toLowerCase())
    ) {
        return res.status(400).json({ message: 'Invalid or missing status' });
    }
    req.body.status = status.toLowerCase();

    next();
}

async function requiredDogBodyFieldMW(req, res, next) {
    const { gender, age } = req.body;

    if (!gender || !['male', 'female'].includes(gender.toLowerCase())) {
        return res
            .status(400)
            .json({ message: 'Gender is required and must be Male or Female' });
    }

    if (age === undefined || typeof age !== 'number' || age <= 0) {
        return res
            .status(400)
            .json({ message: 'Age is required and must be a positive number' });
    }

    next();
}

module.exports = {
    validateDogBodyMW,
    requiredDogBodyFieldMW,
};
