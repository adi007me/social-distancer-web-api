(bookingModule => {
    const groupsData = require('../../data').groups;
    const constants = require('../../constants');

    function addBooking(user, group, slot, date) {
        //Get group from groups collection in db
        const group = groupsData.getGroup(user.groupId);

        //Check if there is space left
        if (group.slots && group.slots.length < constants.allowedCount) {
            //If yes then 
            //1. Insert userId/guid in the booking array
            
            //2. Insert slot under booking array of user object along with booking id
            //3. return booking id
        }

        
        
    }

    function deleteBooking(user, bookingId) {
        // if exists, delete booking id from
        //1. booking collection
        //2. from user's booking array. just mark as inactive 
    }
})(module.exports);
