(data => {
    require('./database');

    require('./users-data').init(data);
    require('./groups-data').init(data);
})(module.exports);
