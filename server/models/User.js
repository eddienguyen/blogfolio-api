var keystone = require('keystone');

User = new keystone.List('User', {
    map: { name: 'displayName' },
    autokey: { path: 'slug', from: 'displayName', unique: true }
});

User.add({
    displayName: { type: String },
    password: { type: keystone.Field.Types.Password },
    email: { type: keystone.Field.Types.Email, unique: true },
    createdAt: { type: keystone.Field.Types.Datetime, default: Date.now },
});

User.schema.virtual('canAccessKeystone').get(function () {
    return true;
});

User.relationship({ ref: 'Post', path: 'post', refPath: 'author' });

User.defaultColumns = 'id, displayName, email';

User.register();