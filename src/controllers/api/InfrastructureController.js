const Infrastructure = require('../../models/Infrastructure');
// const { mongooseToObject } = require('../util/mongoose');

class InfrastructureController {
    // [GET] /api/Post
    getAll(req, res) {
        Infrastructure.find({})
            .then((list) => res.status(200).json({ status: true, data: list }))
            .catch((err) => res.json({ message: err }));
    }
    // [GET] /api/Post/:id
    getById = async (req, res) => {
        console.log('id', req.params);
        Infrastructure.findOne({ _id: req.params.id })
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
            Infrastructure.findOne({ _id: req.query.id })
                .select('name description image')
                .then((item) => {
                    console.log('findOne', item);
                    res.json({ status: true, data: item });
                })
                .catch((err) => res.json({ message: err }));
        } else {
            Infrastructure.find({})
                .select('name description image')
                .then((list) =>
                    res.status(200).json({ status: true, data: list })
                )
                .catch((err) => res.json({ message: err }));
        }
    };
    // [POST] /api/add-Post
    create = async (req, res) => {
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        console.log(req.body);
        const newItem = new Infrastructure(req.body);
        newItem
            .save()
            .then(
                (result) =>
                    res.status(200).json({
                        status: true,
                        // data: result,
                        message: 'Create Infrastructure success!',
                    }) // doesn't run
                // (error) => console.log(error)
            )
            .catch((error) => {
                res.json({ status: false, message: error });
                console.log('err', error);
            });
        // console.log('create');
    };
    // [PUT] /update-Post:id
    update = async (req, res) => {
        if (!!req.query.id && !!Object.keys(req.body).length) {
            Infrastructure.updateOne({ _id: req.query.id }, req.body)
                .then((result) => {
                    res.status(200).json({
                        status: true,
                        message: 'Updated success!',
                    });
                    console.log(result);
                })
                .catch((error) => {
                    res.json({ status: false, message: error });
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
            Infrastructure.delete({ _id: req.body.id })
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
            Infrastructure.restore({ _id: req.query.id })
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
            delete Infrastructure.deleteOne({ _id: req.query.id })
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

module.exports = new InfrastructureController();
