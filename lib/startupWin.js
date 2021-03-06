var Winreg = require('winreg');
var Promise = require('bluebird');

var regKey = new Winreg({
    hive: Winreg.HKCU,
    key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {
    enableStartOnBoot: function(opts) {
        return new Promise((resolve, reject) => {
            try {
                regKey.set(opts.appName, Winreg.REG_SZ, '\"' + opts.appPath + '\"', function() {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    disableStartOnBoot: function(appName) {
        return new Promise((resolve) => {
            regKey.remove(appName, function() {
                resolve(true);
            });
        });
    },
    statusStartOnBoot: function(appName) {
        return new Promise((resolve) => {
            regKey.get(appName, function(error, item) {
                resolve(item !== null);
            });
        });
    }
};
