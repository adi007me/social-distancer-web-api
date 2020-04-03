(userData => {
    userData.init = (data) => {

        const database = require('../database');

        async function getUser(userId) {
            const db = await database.getDb();

            const user = await db.users.findOne({ userId: userId });

            return user;
        }

        async function addUser(user) {
            const db = await database.getDb();

            const result = await db.users.findOne({ userId: user.userId });

            if (!result) {
                await db.users.insertOne(user);
            } else {
                throw "Duplicate UserId";
            }
        }

        async function addBooking(userId, slot, hash) {
            const db = await database.getDb();

            return await db.users.update(
                { "userId": userId },
                { $push: {"bookings": {"slot": slot, "hash": hash, "date": new Date()} } },
            );
        }

        data.user = {
            getUser,
            addUser,
            addBooking
        }

    } 

})(module.exports);
