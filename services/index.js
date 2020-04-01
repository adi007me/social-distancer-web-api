((services) => {
    const authService = require('./auth-service');    

    services.init = (app) => {
        authService.init(app);

        require('./booking-service').init(app);
        require('./groups').init(app);
    };

})(module.exports);