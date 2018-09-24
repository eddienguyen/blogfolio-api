var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create a new keystone list that called Project
var Project = new keystone.List('Project', {
    autokey: {path: 'slug', from: 'name', unique: true},
    defaultSort : '-createdAt'
});

// Adding an option to add an image to Project from LOCAL
var imageStorage = new keystone.Storage({
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

Project.add({
    name : {
        type: String,
    unique: true
    },
    description: {
        type: Types.Text,
    },
    number: {
        type: Number,
        unique: true
    },
    completionDate: {
        type: Date, 
        default: Date.now
    },
    author: {
        type: Types.Relationship,
        ref: 'Member',
        index: true
    },
    projectType: {
        type: String
    },
    image: {
        type: Types.CloudinaryImage,
        folder: 'keystone-blog/project',
        autoCleanup: true
    },
    imageDescription: {
        type: String
    },
    projectDetail: {
        type: Types.Html, 
        wysiwyg: true, 
        height: 600
    },
    active: {
        type: Types.Boolean,
        index: true,
        default: false
    }
});

Project.register();