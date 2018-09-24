var keystone = require('keystone'),
    Types = keystone.Field.Types;

SocialLink = new keystone.List('SocialLink', {
    label: 'SocialLinks'
});

SocialLink.add({
    name: {
        type: String
    },
    content: {
        type: Types.Text, 
        max: 256
    },
    member: { type: Types.Relationship, initial: true, ref: 'Member', index: true },
});

SocialLink.defaultColumns = 'name, content';

SocialLink.register();
