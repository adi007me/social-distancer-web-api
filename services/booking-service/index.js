((bookingService) => {
    bookingService.init = (app) => {
        const authModule = require('./../../modules/auth-module');
        
        app.post('/booking', authModule.isLoggedIn, (req, res) => {
            const newBooking = req.body;

            throw "Not Implemented";

            if (!req.currentUser) {
                res.status(401).send("Unauthorized");
                
                return;
            }
            
            if (newBooking.slot && newBooking.date) {
                // create a booking in Mongo DB
                // send 201 response


                res.status(201).send(newBooking);
            } else {
                console.log('Incomplete Request', req.body);

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
