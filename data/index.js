(data => {
    require('./database');

    require('./user-data').init(data);
    require('./groups-data').init(data);
})(module.exports);
