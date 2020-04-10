((bookingService) => {
    bookingService.init = (app) => {
        const authModule = require('./../../modules/auth-module');
        const bookingModule = require('../../modules/booking-module');
        
        app.post('/booking', authModule.isLoggedIn, async (req, res) => {
            const slot = req.body.slot;
            const user =  req.currentUser;

            if (Number.isInteger(slot) && slot < 23 && slot > -1) {
                try {
                    await bookingModule.addBooking(user.email, user.groupId, slot);

                    res.sendStatus(201);
                } catch (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
            } else {
                res.status(400).send('Incomplete request');
            }
        });

        app.delete('/booking/:slot', authModule.isLoggedIn, async (req, res) => {
            const slot = parseInt(req.params.slot, 10);
            const hash = req.query.hash;
            const user =  req.currentUser;

            if (Number.isInteger(slot) && slot < 23 && slot > -1 && hash) {
                try {
                    await bookingModule.deleteBooking(user.email, user.groupId, slot, hash);

                    res.sendStatus(204);
                } catch (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
            } else {
                res.status(400).send('Incomplete request');
            }
        });
    };
})(module.exports);
