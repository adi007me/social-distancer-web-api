(userModule => {
    const userData = require('../../data').user;
    const groupsModule = require('../groups-module');

    async function createOrGetUser (user, location) {
        const result = await userData.getUser(user.email);

        if (result) {
            return result;
        } else {
            let group = {};

            try {
                group = groupsModule.findGroupId(location)
            } catch(err) {
                throw err;
            }

            const userToInsert = { ...user, userId: user.email, group: group, regLocation: location, bookings: [] };

            await userData.addUser(userToInsert);

            return userToInsert;
        }
    }

    async function getUser(userId) {
        const result = await userData.getUser(userId);

        if (result) {
            return result;
        } else {
            throw "User not found";
        }
    }

    userModule.addBookingToUser = (user, slot, date) => {
        // Create Booking and mark as active
        throw "Not Implemented";
    }

    userModule.deleteBookingFromUser = (user, slot, date) => {
        // Mark booking as inactive
    }

    userModule.createOrGetUser = createOrGetUser;
    userModule.getUser = getUser;
})(module.exports);
