var keystone = require('keystone');

// Getting article models
var Article = keystone.list('Article');

/**
 * List Posts/Articles
 */

// Creating the API endpoint
exports.list = function (req, res) {
    let page = req.query.page || 1,
        limitPages = Number(req.query.limit) || 10;
    // Querying the data this works similarity to the Mongo db.collection.find() method
    Article.model
        .find()
        .where('state', 'published')
        .populate('author', '_id')
        .skip((page - 1) * limitPages)
        .limit(limitPages)
        .exec()
        .then(items => {
            if (items.length == 0) return res.send('end of page');
            res.apiResponse({
                // filter post by
                articles: items,
                thisPageNum: req.query.page || 1
            });
        })
        .catch(err => {
            // Make sure we are handling errors
            if (err) return res.apiError('database error', err);
        });
};

/**
 * Get One article's detail
 */

// Creating the API endpoint
exports.get = function (req, res) {
    // Finding the data with id from request
    // this works similarity to Mongo db.collection.findById()
    let id = req.params.id;
    Article.model
        .findById(req.params.id)
        .where('state', 'published', 'archived')
        .exec(function (err, item) {
            if (err) return res.json({ err: err });
            if (!item) return res.json('not found');

            res.json({
                article: item
            });
        });
};
