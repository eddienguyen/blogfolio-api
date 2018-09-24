var keystone = require('keystone');

// Getting project models
var Project = keystone.list('Project');

/**
 * List all projects
 */
// TODO: keystone querying data .sort .populate
exports.list = function (req, res) {
    let page = req.query.page || 1,
        limitPages = Number(req.query.limit) || 5;
    Project.model
        .find()
        .skip((page - 1) * limitPages)
        .limit(limitPages)
        .where('active', true)
        .select('_id number name image description')
        .populate('author', '_id name')
        .exec()
        .then(items => {
            res.apiResponse({
                projects: items
            })
        })
        .catch(err => {
            if (err) return res.apiError('database error', err);
        });
};

/**
 * Get one project's detail
 */

exports.get = function (req, res) {
    // fiding in the data with id from req
    Project.model
        .findById(req.params.id)
        .where('active', true)
        .populate('author', '_id name profileImage')
        .exec()
        .then(item => {
            if (!item) return res.json('not found');

            res.json({
                project: item,
            });
        })
        .catch(err => {
            if (err) return res.json({ err: err });
        });
};

/**
 * Get all projects by member's _id
 */
exports.getProjectsByMember = function (req, res) {
    let memberId = req.params.id;

    Project.model
        .find({ 'author': memberId })
        .where('active', true)
        .populate('author', '_id')
        .exec()
        .then(items => {
            if (items.length == 0) return res.json('not found');
            res.json({
                projects: items
            })
        })
        .catch(err => {
            if (err) return res.json({ err: err });
        });
}