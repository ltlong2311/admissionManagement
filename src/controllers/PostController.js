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

}

module.exports = new PostController();
