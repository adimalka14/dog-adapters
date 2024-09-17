const { loadUsersFromFile, saveUsersToFile } = require('../models/user');

getUserDetails = async (req, res, next) => {
    const userId = req.params.id;
    const users = await loadUsersFromFile();
    const user = users.find((user) => user.id === userId);

    if (user) {
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id,
            gender: user.gender,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

updateUserDetails = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const users = await loadUsersFromFile();
        const user = users.find((user) => user.id === userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.first_name = req.body.first_name ?? user.first_name;
        user.last_name = req.body.last_name ?? user.last_name;
        user.gender = req.body.gender ?? user.gender;

        await saveUsersToFile(users);

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        next(error);
    }
};

deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        let users = await loadUsersFromFile();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }

        users.splice(userIndex, 1);

        await saveUsersToFile(users);

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserDetails,
    updateUserDetails,
    deleteUser,
};
