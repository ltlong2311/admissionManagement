const Post = require('../../models/Post');
// const { mongooseToObject } = require('../util/mongoose');

class PostController {
    // [GET] /api/Post
    getAll(req, res) {
        Post.find({})
            .then((post) => res.status(200).json({ status: true, data: post }))
            .catch((err) => res.json({ message: err }));
    }
    // [GET] /api/Post/:id
    getById = async (req, res) => {
        console.log('id', req.params);
        Post.findOne({ _id: req.params.id })
            .select('name description image')
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
                        data: result,
                        message: 'Create Post success!',
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
        const Post = Post;
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/psost'))
            .catch(next);
    };
    // [POST] /delete:id
    delete(req, res, next) {
        // soft delete
        Post.delete({ _id: req.params.id })
            .then(res.json({ status: true, message: 'Delete success' }))
            .catch(next);
    }
    // [POST] /restore:id
    restore(req, res, next) {
        Post.restore({ _id: req.params.id })
            .then(res.json({ status: true, message: 'Restore success' }))
            .catch(next);
    }

    // [DELETE] /Post/:id/force
    destroy(req, res, next) {
        delete Post.deleteOne({ _id: req.params.id })
            .then(res.json({ status: true, message: 'Destroyed' }))
            .catch(next);
    }
}

module.exports = new PostController();
