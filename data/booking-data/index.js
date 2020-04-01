(bookingData => {
    bookingData.init = (data) => {
        const database = require('./database');

        async function addDateSlot(groupId, dateString) {
            const db = await database.getDb();

            throw "Not implemented";
        }

        async function addTimeSlot(groupId, date, slotId) {
            const db = await database.getDb();

            throw "Not implemented";
        }

        async function addBooking(bookingDetails) {
            const db = await database.getDb();
            
            throw "Not implemented";            
        }

        function deleteBooking(bookingId) {
            throw "Not implemented";
        }

        data.booking.addBooking = addBooking;
        data.booking.deleteBooking = deleteBooking;
        data.booking.addDateSlot = addDateSlot;
    };
})(module.exports);