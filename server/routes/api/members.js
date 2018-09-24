var keystone = require('keystone');

// Getting member models
var Member = keystone.list('Member');

/**
 * List all members who is active
 */
exports.list = function (req, res) {
    let page = req.query.page || 1,
        limitPage = Number(req.query.limit) || 5;

    Member.model
        .find()
        .where('active', true)
        .skip((page - 1) * limitPage)
        .limit(limitPage)
        .select('_id name profileImage bioSummary jobTitle')
        .exec()
        .then(items => {
            res.apiResponse({
                members: items,
            });
        })
        .catch(err => {
            if (err) return res.apiError('database error', err);
        });
};

/**
 * Get one member's detail
 */
exports.get = function (req, res) {
    // finding the data with id from request
    Member.model
        .findById(req.params.id)
        .where('active', true)
        .exec()
        .then(item => {
            if(!item) return res.json('not found');
            res.json ({
                member: item
            })
        })
        .catch(err => {
            if(err) return res.json({err: err});
        });
};