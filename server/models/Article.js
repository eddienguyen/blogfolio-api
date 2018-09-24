var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Create Article model
 */
Article = new keystone.List('Article', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    defaultSort: '-createdAt'
});

Article.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author: {type: Types.Relationship, ref: 'User'},
    createdAt: {type: Date, default: Date.now},
    publishedAt: Date,
    // Upload with Cloudinary
    mainImage: {
        type: Types.CloudinaryImage, 
        folder: 'keystone-blog/article', 
        autoCleanup: true
    },
    content: {
        summary: {type: Types.Html, wysiwyg: true, height: 150},
        extended: {type: Types.Html, wysiwyg: true, height: 400}
    },
});

Article.schema.virtual('content.full').get(function(){
    return this.content.extended || this.content.summary;
})

// 20%, 15% refers to the column width
Article.defaultColumns = 'title, state|20%, author, publishedAt|15%';

Article.register();