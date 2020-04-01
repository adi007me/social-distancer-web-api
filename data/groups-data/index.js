(groupsData => {
    const database = require('../database');

    groupsData.init = (data) => {
        async function getAllGroups() {
            const db = await database.getDb();

            const groups = await db.groups.find({});

            return groups;
        }

        async function getGroup(groupId) {
            const db = await database.getDb();

            const group = await db.groups.find({id: groupId});

            if (group) {
                return group;
            } else {
                throw {type: 'group-not-found'};
            }
        }

        data.groups = {
            getAll: getAllGroups,
            getGroup
        };
    };
})(module.exports);
