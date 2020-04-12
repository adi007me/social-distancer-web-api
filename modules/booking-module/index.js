(bookingModule => {
    const data = require('../../data');
    const cryptoModule = require('../crypto-module');

    async function addBooking(userId, groupId, slot) {
        const hash = cryptoModule.encrypt(`${userId}:${groupId}:${slot}:${new Date().toDateString()}`);
        
        const result = await data.groups.addBooking(groupId, slot, hash);

        if (result && result.nModified) {
            return await data.user.addBooking(userId, slot, hash)
        } else {
            throw {type: 'unexpected-error-in-booking.addBooking'}
        }        
    }

    async function deleteBooking(userId, groupId, slot, hash) {
        const result = await data.groups.deleteBooking(groupId, slot, hash);

        if (result && result.nModified) {
            return await data.user.deleteBooking(userId, hash);
        } else {
            throw {type: 'unexpected-error-in-booking.deleteBooking'}
        }
    }

    bookingModule.addBooking = addBooking;
    bookingModule.deleteBooking = deleteBooking;

})(module.exports);
