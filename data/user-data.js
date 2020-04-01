(userData => {
    userData.init = (data) => {

        const database = require('./database');

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


        data.user = {
            getUser,
            addUser
        }

    } 

})(module.exports);
