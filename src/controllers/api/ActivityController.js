const Activity = require('../../models/Activity');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class ActivityController {
    // [GET] /api/Post
    getAll(req, res) {
        Activity.find({})
            .then((list) => res.status(200).json({ status: true, data: list }))
            .catch((err) => res.json({ message: err }));
    }
    // [GET] /api/Post/:id
    getById = async (req, res) => {
        console.log('id', req.params);
        Activity.findOne({ _id: req.params.id })
            .select('title description image')
            .then((item) => {
                console.log('findOne', item);
                res.json({ status: true, data: item });
            })
            .catch((err) => {
                res.json({ message: err });
                console.log('err', err);
            });
    };

    // [GET] /api/Post/:id
    getItemById = async (req, res) => {
        console.log('id', req.query.id);
        if (!!req.query.id) {
            Activity.findOne({ _id: req.query.id })
                .select('name description image')
                .then((item) => {
                    console.log('findOne', item);
                    res.json({ status: true, data: item });
                })
                .catch((err) => res.json({ message: err }));
        } else {
            Activity.find({})
                .select('name description image')
                .then((list) =>
                    res.status(200).json({ status: true, data: list })
                )
                .catch((err) => res.json({ message: err }));
        }
    };
    // [POST] /api/add-activity
    create = async (req, res) => {
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        console.log(req.body);
        const newItem = new Activity(req.body);
        newItem
            .save()
            .then(
                (result) =>
                    res.status(200).json({
                        status: true,
                        data: mongooseToObject(result),
                        message: 'Create Activity success!',
                    }) // doesn't run
                // (error) => console.log(error)
            )
            .catch((error) => {
                res.json({ status: false, message: error });
                // res.json({ status: false, message: error.message });
                console.log('err', error);
            });
        // console.log('create');
    };
    // [PUT] /update-Post:id
    update = async (req, res) => {
        if (!!req.query.id && !!Object.keys(req.body).length) {
            Activity.updateOne({ _id: req.query.id }, req.body)
                .then((result) => {
                    res.status(200).json({
                        status: true,
                        message: 'Updated success!',
                    });
                    console.log(result);
                })
                .catch((error) => {
                    res.json({ status: false, message: error.errors.content.message });
                    console.log(error);
                });
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required field',
            });
        }
    };
    // [POST] /delete:id
    delete(req, res, next) {
        // soft delete
        if (!!req.body.id) {
            Activity.delete({ _id: req.body.id })
                .then(res.json({ status: true, message: 'Delete success' }))
                .catch(next);
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }
    // [PATCH] /restore:id
    restore(req, res, next) {
        if (!!req.query.id) {
            Activity.restore({ _id: req.query.id })
                .then(res.json({ status: true, message: 'Restore success' }))
                .catch(next);
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }

    // [DELETE] /Post/:id/force
    destroy(req, res, next) {
        if (!!req.query.id) {
            delete Activity.deleteOne({ _id: req.query.id })
                .then(res.json({ status: true, message: 'Destroyed' }))
                .catch(next);
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }
}

module.exports = new ActivityController();
