((bookingService) => {
    bookingService.init = (app) => {
        const authModule = require('./../../modules/auth-module');
        const bookingModule = require('../../modules/booking-module');
        
        app.post('/booking', authModule.isLoggedIn, async (req, res) => {
            const slot = req.body.slot;
            const user =  req.currentUser;

            if (Number.isInteger(slot) && slot < 23 && slot > -1) {
                try {
                    const result = await bookingModule.addBooking(user.email, user.groupId, slot);

                    res.sendStatus(201);
                } catch (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
            } else {
                res.status(400).send('Incomplete request');
            }
        });

        app.delete('/booking/:id', authModule.isLoggedIn, (req, res) => {
            const newBooking = req.body;
            const bookingId = req.params.id;

            throw "Not Implemented";

            // fetch the booking by booking id from DB
            let booking = {};
            
            if (booking) {
                // update only fields that are modified in the request 
                // update in DB
                // send 200 status

                res.status(201).send(booking);
            } else {
                console.log('Booking not found to update', req.params, req.body);

                res.status(400).send('Bad Request');
            }            
        });
    };
})(module.exports);
