const Post = require('../../models/Post');
// const { mongooseToObject } = require('../util/mongoose');

class PostController {
    // [GET] /api/Post
    getAll(req, res) {
        if (!!req.query.type) {
            Post.find({ type: req.query.type })
                .then((post) =>
                    res.status(200).json({ status: true, data: post })
                )
                .catch((err) => res.json({ message: err }));
        } else {
            Post.find({})
                .then((post) =>
                    res.status(200).json({ status: true, data: post })
                )
                .catch((err) => res.json({ message: err }));
        }
    }
    // [GET] /api/Post/:id
    getById = async (req, res) => {
        console.log('id', req.params);
        Post.findOne({ _id: req.params.id })
            .select('title description image')
            .then((postItem) => {
                console.log('findOne', postItem);
                res.json({ status: true, data: postItem });
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
            Post.findOne({ _id: req.query.id })
                .select('name description image')
                .then((postItem) => {
                    console.log('findOne', postItem);
                    res.json({ status: true, data: postItem });
                })
                .catch((err) => res.json({ message: err }));
        } else {
            Post.find({})
                .select('name description image')
                .then((post) =>
                    res.status(200).json({ status: true, data: post })
                )
                .catch((err) => res.json({ message: err }));
        }
    };
    // [POST] /api/add-Post
    create = async (req, res) => {
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        console.log(req.body);
        const post = new Post(req.body);
        post.save()
            .then(
                (result) =>
                    res.status(200).json({
                        status: true,
                        message: 'Create post success!',
                    }) // doesn't run
                // (error) => console.log(error)
            )
            .catch((error) => {
                res.json({ status: false, message: error });
                console.log('err', error);
            });
        // console.log('create');
    };
    // [PUT] /update-post:id
    update = async (req, res) => {
        // const post = post;
        console.log('param', req.query);
        console.log('body', req.body);
        if (!!req.query.id && !!Object.keys(req.body).length) {
            Post.updateOne({ _id: req.query.id }, req.body)
                .then((result) => {
                    res.status(200).json({
                        status: true,
                        message: 'Update post success!',
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
    // [POST] /delete
    delete(req, res, next) {
        // soft delete
        if (!!req.body.id) {
            Post.delete({ _id: req.body.id })
                .then(res.json({ status: true, message: 'Delete success' }))
                .catch(next);
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }
    // [POST] /restore/:id
    restore(req, res, next) {
        if (!!req.query.id) {
            Post.restore({ _id: req.query.id })
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
            delete Post.deleteOne({ _id: req.query.id })
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

module.exports = new PostController();
