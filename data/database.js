(async function (database){    
    const MongoClient = require('mongodb').MongoClient;
    let mongoUrl = 'mongodb+srv://socialdistancer:social123@cluster0-oeiby.mongodb.net/test?retryWrites=true&w=majority';

    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

    let dbName = 'socialDistancer';
 
    let theDb = null;
        
    database.getDb = async function () {
        if (!theDb) {
            theDb = await createDbObject();
        }

        return theDb;
    }

    async function createDbObject() {
        await client.connect();

        const dbObject = client.db(dbName);
                        
        const theDbObject = {
            db: dbObject,
            users: dbObject.collection("users"),
            groups: dbObject.collection("groups"),
            configuration: dbObject.collection("configuration")
        };

        return theDbObject;
    }

    theDb = await createDbObject();

    console.log('theDB Created', theDb !== null);
})(module.exports);