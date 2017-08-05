const db = require('./firebase').database;
const moment = require('moment');

const config = require('../../config/config');

module.exports = {
    add: function(bcf, tbf){
        db.ref('daily').set({
            createdAt: moment().utcOffset(config.TIMEZONE).valueOf(),
            bcf: bcf,
            tbf: tbf
        });
    }
}