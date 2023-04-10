const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => {
    return mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports = connect;