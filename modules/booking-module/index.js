(bookingModule => {
    const data = require('../../data');
    const cryptoModule = require('../crypto-module');

    async function addBooking(userId, groupId, slot) {
        const hash = cryptoModule.encrypt(`${userId}:${groupId}:${slot}`);
        
        const result = await data.groups.addBooking(groupId, slot, hash);

        if (result && result.nModified) {
            return await data.user.addBooking(userId, slot, hash)
        } else {
            throw {type: 'enexpected-error-in-booking.addBooking'}
        }        
    }

    function deleteBooking(user, bookingId) {
        // if exists, delete booking id from
        //1. booking collection
        //2. from user's booking array. just mark as inactive 
    }

    bookingModule.addBooking = addBooking;

})(module.exports);
