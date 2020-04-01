((adminDbModule) => {
    const database = require('./database');
    const objectID = require('mongodb').ObjectID;

    adminDbModule.getAllBookings = (fromDate, toDate) => {
        return new Promise((resolve, reject) => {
            database.getDb().then(db => {
                const bookingsCollection = db.collection('bookings');

                bookingsCollection.find({}).toArray().then(bookings => {
                    resolve(bookings);
                }).catch(err => reject(err));
            });
        });
    };

    adminDbModule.addBooking = (booking) => {
        return new Promise((resolve, reject) => {
            booking.created = new Date();
            booking.createdBy = "Admin";
            booking.updated = null;
            booking.updatedBy = null;

            database.getDb().then(db => {
                const bookingsCollection = db.collection('bookings');

                bookingsCollection.insert(booking).then(result => {
                    resolve(result);
                }).catch(err => reject(err));
            });
        });
    };

    adminDbModule.getBooking = (id) => {
        return new Promise((resolve, reject) => {
            database.getDb().then(db => {
                db.bookings.find({"_id": objectID(id)}).toArray().then(booking => {
                    if (booking.length) {
                        resolve(booking);
                    } else {
                        reject('Booking not found');
                    }
                }).catch(err => reject(err));
            });
        });
    };

    adminDbModule.updateBooking = (booking) => {
        return new Promise((resolve, reject) => {
            database.getDb().then(db => {
                db.bookings.updateOne(
                    {"_id": booking._id},
                    {$set: {
                        "updated": new Date(),
                        "updatedBy": "Admin"
                    }}).then(result => {
                        resolve(result);
                    }).catch(err => {
                        console.log(err);

                        reject(err);
                    })
            }).catch(err => reject(err));
        });
    };
})(module.exports);
