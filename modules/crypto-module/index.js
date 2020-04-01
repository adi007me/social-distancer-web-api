((cryptoModule) => {    
    const crypto = require('crypto');

    cryptoModule.encrypt = (data) => {      
        const cipher = crypto.createCipher('aes-192-cbc', 'simaya-travels-key');

        let cipherUser = cipher.update(data, 'utf8', 'hex');

        cipherUser += cipher.final('hex');

        return cipherUser;
    };

    cryptoModule.decrypt = (encryptedData) => {
        const deCipher = crypto.createDecipher('aes-192-cbc', 'simaya-travels-key');
        let user = deCipher.update(encryptedData, 'hex', 'utf8');

        user += deCipher.final('utf8');

        return user;
    }
})(module.exports);