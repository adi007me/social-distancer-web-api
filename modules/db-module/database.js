((database) => {
    let theDb = null;
    let dbClient = null;

    database.getDb = async () => {
        return new Promise((resolve, reject) => {
            if (!theDb) {
                const MongoClient = require('mongodb').MongoClient;

                const url = 'mongodb+srv://simayatravels:EfLtAUXLxDraM6Bd@cluster0-oeiby.mongodb.net/test?retryWrites=true&w=majority';
                const dbName = 'simayaTravelsDb';
            
                MongoClient.connect(url).then(client => {
                    theDb = client.db(dbName);
                    theDb.bookings = theDb.collection('bookings');
                    dbClient = client;

                    resolve(theDb);
                }).catch(err => {
                    reject(err);
                });
            } else {
                resolve(theDb);
            }
        });
    }

    database.close = () => {
        dbClient && dbClient.close();
    }
})(module.exports);
