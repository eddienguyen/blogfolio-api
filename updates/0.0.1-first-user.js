var keystone = require('keystone'),
    User = keystone.list('User');

module.exports = function(done) {
    new User.model({
        displayName : 'admin',
        password: 'admin',
        email: 'admin@keystonejs.com'
    }).save(done);
}
// exports.create = {
//     User: [
//         {
//             displayName : 'admin',
//             password: 'admin',
//             email: 'admin@keystonejs.com'
//         }
//     ]
// }