const Post = require('../models/Post');
const { mongooseToObject } = require('../util/mongoose');

class PostController {
    // [GET] /Post
    index(req, res, next) {
        // Post.find({ deleted: null })  or  Post.find({ deleted: false })
        //     .then((Post) => res.json(Post))
        //     .catch(next);

        Post.find({})
            .then((Post) => res.json(Post))
            .catch(next);
    }

    // [GET] /Post/:slug
    show(req, res, next) {
        // res.send('Detail by id ' + req.params.slug);

        Post.findOne({ slug: req.params.slug })
            .then((postItem) => {
                // res.json(new);
                res.render('Post/show', {
                    postItem: mongooseToObject(postItem),
                });
            })
            .catch(next);
    }

    // [GET] /Post/create
    create(req, res, next) {
        res.render('Post/create');
    }

    // [GET] /Post/:id/edit
    edit(req, res, next) {
        Post.findById(req.params.id)
            .then((postItem) => {
                res.render('Post/edit', {
                    postItem: mongooseToObject(postItem),
                });
            })
            .catch(next);
    }

    // [PUT] /Post/:id
    update(req, res, next) {
        Post.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/Post'))
            .catch(next);
    }

    // [DELETE] /Post/:id
    delete(req, res, next) {
        // delete
        // Post.deleteOne({_id: req.params.id})
        //     .then(() => res.redirect('back'))
        //     .catch(next);

        // soft delete
        Post.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /Post/:id/restore
    restore(req, res, next) {
        Post.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /Post/:id/force
    destroy(req, res, next) {
        delete
        Post.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /Post/store              -------create---------
    store(req, res, next) {
        const formData = req.body;
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        const Post = new Post(formData);
        Post.save()
            .then(() => res.redirect(`/`))
            .catch((error) => {});

        // res.send('Create success!' + JSON.stringify(req.body));
    }

}

module.exports = new PostController();
