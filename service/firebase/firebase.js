const firebase = require('firebase-admin');

const serviceAccount = require('./ps-finance-firebase-adminsdk-nbura-b21fbb7567.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://ps-finance.firebaseio.com"
});

module.exports = {
    database: firebase.database()
};