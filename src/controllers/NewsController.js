const News = require('../models/News');
const { mongooseToObject } = require('../util/mongoose');

class NewsController {
    // [GET] /news
    index(req, res, next) {
        // News.find({ deleted: null })  or  News.find({ deleted: false })
        //     .then((news) => res.json(news))
        //     .catch(next);

        News.find({})
            .then((news) => res.json(news))
            .catch(next);
    }

    // [GET] /news/:slug
    show(req, res, next) {
        // res.send('Detail by id ' + req.params.slug);

        News.findOne({ slug: req.params.slug })
            .then((newsItem) => {
                // res.json(new);
                res.render('news/show', {
                    newsItem: mongooseToObject(newsItem),
                });
            })
            .catch(next);
    }

    // [GET] /news/create
    create(req, res, next) {
        res.render('news/create');
    }

    // [GET] /news/:id/edit
    edit(req, res, next) {
        News.findById(req.params.id)
            .then((newsItem) => {
                res.render('news/edit', {
                    newsItem: mongooseToObject(newsItem),
                });
            })
            .catch(next);
    }

    // [PUT] /news/:id
    update(req, res, next) {
        News.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/news'))
            .catch(next);
    }

    // [DELETE] /news/:id
    delete(req, res, next) {
        // delete
        // News.deleteOne({_id: req.params.id})
        //     .then(() => res.redirect('back'))
        //     .catch(next);

        // soft delete
        News.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /news/:id/restore
    restore(req, res, next) {
        News.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /news/:id/force
    destroy(req, res, next) {
        delete
        News.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /news/store              -------create---------
    store(req, res, next) {
        const formData = req.body;
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        const news = new News(formData);
        news.save()
            .then(() => res.redirect(`/`))
            .catch((error) => {});

        // res.send('Create success!' + JSON.stringify(req.body));
    }

}

module.exports = new NewsController();
