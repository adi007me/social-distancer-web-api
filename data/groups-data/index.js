(groupsData => {
    const database = require('../database');
    const constants = require('../../constants');

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

        async function addBooking(groupId, slot, hash) {
            const db = await database.getDb();

            if (!parseInt(slot, 10) && slot > 23) {
                throw { type: `invalid slot: ${slot}` };
            }

            const query = JSON.parse( `{ "id": "${groupId}", "slots.${slot}.${constants.maxBookingAllowedPerGroup}":{ "$exists": false } }`);
            const slotPush = JSON.parse( `{ "slots.${slot}": "${hash}" }` );
            
            const commandResult = await db.groups.update(
                query,
                { $push: slotPush }
            );

            if (commandResult.result.n === 1 && commandResult.result.nModified === 1) {
                return {
                    nMatched: commandResult.result.n,
                    nModified: commandResult.result.nModified
                };
            } else {
                throw {type: "group-or-Slot-not-found-or-full" };
            }
        }

        async function deleteBooking(groupId, slot, hash) {
            const db = await database.getDb();

            if (!parseInt(slot, 10) && slot > 23) {
                throw { type: `invalid slot: ${slot}` };
            }

            const query = JSON.parse( `{ "id": "${groupId}" }`);
            const slotPull = JSON.parse( `{ "slots.${slot}": "${hash}" }` );
            
            const commandResult = await db.groups.update(
                query,
                { $pull: slotPull }
            );

            if (commandResult.result.n === 1 && commandResult.result.nModified === 1) {
                return {
                    nMatched: commandResult.result.n,
                    nModified: commandResult.result.nModified
                };
            } else {
                throw {type: "group-or-Slot-not-found-or-full" };
            }
        }

        data.groups = {
            getAll: getAllGroups,
            getGroup,
            addBooking,
            deleteBooking
        };
    };
})(module.exports);
