var mongoose = require('mongoose');
var gracefulShutdown;
// var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/loginapp/users';
var dbURI = process.env.MONGOLAB_URI || 'mongodb://alexqintest:alexqintest@ds127962.mlab.com:27962/heroku_kr6x4m02';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI || 'mongodb://alexqintest:alexqintest@ds127962.mlab.com:27962/heroku_kr6x4m02';
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
}); 

require('./users');