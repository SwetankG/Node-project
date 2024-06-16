const Q = require('q');
// const userService = require('./userService');


const userService = {};

userService.registerUser = () => {
    let deferred = Q.defer();
    deferred.resolve('I am coming from userSerice')
    return deferred.promise;
}
module.exports = userService;