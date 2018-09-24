var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create a new keystone list that called Member(aka team member)
var Member = new keystone.List('Member', {
    autokey: {path: 'slug', from: 'name', unique: true},
    defaultSort : '-createdAt'
});

// Adding an option to add an image to Member from LOCAL
var profileImageStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        // required; path where the file should be stored
        path: keystone.expandPath('server/public/img'),
        generateFileName: function(file, index) {
            return file.originalName;
        },
        whenExists: 'error',
        // path where file will be served
        publicPath: '/public/img'
    }
});

// Adding fields for Member
Member.add({
    name: {
        type: String,
        required: true
    },
    profileImage: {
        type: Types.CloudinaryImage,
        folder: 'keystone-blog/team-members',
        autoCleanup: true
    },
    bio: {
        type: Types.Html,
        wysiwyg: true,
    },
    bioSummary: {
        type: Types.Html,
        wysiwyg: true
    },
    jobTitle: {
        type: String
    },
    email: {
        type: Types.Email,
        unique: true,
        required: true,
        default: ' '
    },
    phoneNumber: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: false
    }
});

Member.relationship({
    path: 'social-links',
    ref: 'SocialLink',
    refPath: 'member'
});

Member.relationship({ref: 'Project', path:'projects', refPath:'author'});

Member.register();