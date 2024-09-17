const { loadDogsFromFile, saveDogsToFile } = require('../models/dog');
const { v4: uuidv4 } = require('uuid');

async function getDogById(req, res, next) {
    const dogId = req.params.id;
    const dogs = await loadDogsFromFile();
    const dog = dogs.find((dog) => dog.id === dogId);

    if (dog) {
        res.status(200).json(dog);
    } else {
        res.status(404).json({ message: 'Dog not Found' });
    }
}

async function getFilteredDogsListByParams(req, res, next) {
    try {
        const dogParams = {
            id: req.query.id ?? undefined,
            race: req.query.race ?? undefined,
            gender: req.query.gender ?? undefined,
            age: req.query.age ? parseInt(req.query.age) : undefined,
            vaccines: req.query.vaccines
                ? parseInt(req.query.vaccines)
                : undefined,
            behave: req.query.behave ? req.query.behave.split(',') : undefined,
            name: req.query.name ?? undefined,
            status: req.query.status ?? undefined,
        };

        const dogs = await loadDogsFromFile();
        let filteredDogs = dogs.filter((dog) => {
            return (
                (dogParams.id === undefined || dog.id === dogParams.id) &&
                (dogParams.race === undefined || dog.race === dogParams.race) &&
                (dogParams.gender === undefined ||
                    dog.gender === dogParams.gender) &&
                (dogParams.age === undefined || dog.age === dogParams.age) &&
                (dogParams.vaccines === undefined ||
                    dog.vaccines === dogParams.vaccines) &&
                (dogParams.behave === undefined ||
                    dogParams.behave.every((b) => dog.behave.includes(b))) &&
                (dogParams.name === undefined || dog.name === dogParams.name) &&
                (dogParams.status === undefined ||
                    dog.status === dogParams.status)
            );
        });

        return res.status(200).json(filteredDogs);
    } catch (error) {
        next(error);
    }
}

async function addNewDog(req, res, next) {
    try {
        console.log(req.body.behave);
        const newDog = {
            id: uuidv4(),
            race: req.body.race ?? undefined,
            gender: req.body.gender ?? undefined,
            age: req.body.age ? parseInt(req.body.age) : undefined,
            vaccines: req.body.vaccines
                ? parseInt(req.body.vaccines)
                : undefined,
            behave: req.body.behave ? req.body.behave : undefined,
            name: req.body.name ?? undefined,
            status: req.body.status ?? undefined,
        };

        const dogs = await loadDogsFromFile();
        dogs.push(newDog);
        await saveDogsToFile(dogs);

        return res.status(201).json(newDog);
    } catch (error) {
        next(error);
    }
}

async function updateDogDetails(req, res, next) {
    try {
        const dogId = req.params.id;
        const dogs = await loadDogsFromFile();
        const dog = dogs.find((dog) => dog.id === dogId);

        if (!dog) {
            return res.status(404).json({ message: 'Dog not found' });
        }
        console.log(req.body.behave);
        dog.race = req.body.race ?? dog.race;
        dog.age = req.body.age ? parseInt(req.body.age) : dog.age;
        dog.gender = req.body.gender ?? dog.gender;
        dog.vaccines = req.body.vaccines
            ? parseInt(req.body.vaccines)
            : dog.vaccines;
        dog.behave = req.body.behave ?? dog.behave;
        dog.name = req.body.name ?? dog.name;
        dog.status = req.body.status ?? dog.status;
        await saveDogsToFile(dogs);

        return res.status(200).json({ message: 'Dog updated' });
    } catch (error) {
        next(error);
    }
}

async function deleteDog(req, res, next) {
    try {
        const dogId = req.params.id;
        const dogs = await loadDogsFromFile();
        const dogIndex = dogs.findIndex((dog) => dog.id === dogId);

        if (dogIndex === -1) {
            return res.status(404).json({ message: 'Dog not found' });
        }

        dogs.splice(dogIndex, 1);
        await saveDogsToFile(dogs);

        return res.status(200).json({ message: 'Dog deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDogById,
    getFilteredDogsListByParams,
    addNewDog,
    updateDogDetails,
    deleteDog,
};
