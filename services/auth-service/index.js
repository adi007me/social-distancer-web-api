((authService) => {
    authService.init = (app) => {
        const authModule = require('../../modules/auth-module');
        const cryptoModule = require('../../modules/crypto-module');
        const userModule = require('../../modules/user-module');
        const constants = require('../../constants');
        
        app.get('/login', (req, res) => {
            res.render('login', { title: 'Login' });
        });

        app.get('/auth/logout', (req, res) => {
            var expirationDate = new Date();

            expirationDate.setDate(expirationDate.getDate() - 2);

            res.cookie(constants.cookieName, 'logout', {expires: expirationDate});

            res.status(200).send('OK');
        });

        app.get('/auth/currentuser', authModule.isLoggedIn, async (req, res) => {
            const user = await userModule.getUser(req.currentUser.email).catch(err => console.log(err));

            res.status(200).send(user);
        });

        app.get('/auth/loggedIn', async (req, res) => {
            const token = req.query.token;
            const latitude = req.query.latitude;
            const longitude = req.query.longitude;

            const location = {
                x: latitude,
                y: longitude
            }

            authModule.authenticate(token).then(async (user) => {
                if (!location.x || !location.y) {
                    res.status(400).send({type:"no-location", description: "Location not provided"});
                    return;
                }

                const userCreated = await userModule.createOrGetUser(user, location);

                user.groupId = userCreated.group;
                    
                const encryptedUser = cryptoModule.encrypt(JSON.stringify(user));

                var expirationDate = new Date();

                expirationDate.setDate(expirationDate.getDate() + 1);

                res.cookie(constants.cookieName, encryptedUser, {expires: expirationDate});

                res.status(200).send(userCreated);                
            });
        });
    };
})(module.exports);