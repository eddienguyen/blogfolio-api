const keystone = require('keystone');
require('dotenv').config();

// 'name' value = name of db in mongoDB
// 'auth' = true to accessing the Keystone Admin UI requires a user to log in
// 'auto update' = true enable Keystone's application update feature.
keystone.init({
    'name': 'keystone-blog',
    'cookie secret': process.env.COOKIE_SECRET,
    'user model': 'User',
    'auth': true,
    'auto update': true,
    'mongo': process.env.MONGO_URI,

    /** Basic Keystone setup views template */
    // views: './server/templates/views',
    // 'view engine': 'pug',

    // Paths to our application static files
    'static': [
        './server/public/js/',
        './server/public/img/'
    ],
    'cloudinary config' : process.env.CLOUDINARY_URL
});

keystone.import('./server/models');

// Add routes
keystone.set('routes', require('./server/routes'));

// Set cors on allow-origins
keystone.set('cors allow origin', true);
// keystone.set('cors allow methods', true);
// keystone.set('cors allow headers', true);

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    articles : 'articles',
    users : 'users',
    projects : 'projects',
    members: 'members',
})

keystone.start();