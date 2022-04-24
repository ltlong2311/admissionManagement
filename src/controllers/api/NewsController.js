const News = require('../../models/News');
// const { mongooseToObject } = require('../util/mongoose');

class NewsController {
    // [GET] /api/news
    getAll(req, res) {
        News.find({})
            // .select('name description image slug createAt updateAt')
            .then((news) => res.status(200).json({ status: true, data: news }))
            .catch((err) => res.json({ message: err }));
        // try {
        //     const news = await News.find({});
        //     res.status(200).json(news);
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).json({ message: 'Server Error' });
        // }
    }
    // [GET] /api/news/:id
    getById = async (req, res) => {
        console.log('id', req.params);
        News.findOne({ _id: req.params.id })
            .select('name description image')
            .then((newsItem) => {
                console.log('findOne', newsItem);
                res.json({ status: true, data: newsItem });
            })
            .catch((err) => res.json({ message: err }));
    };

    // [GET] /api/news/:id
    getItemById = async (req, res) => {
        console.log('id', req.query.id);
        if (!!req.query.id) {
            News.findOne({ _id: req.query.id })
                .select('name description image')
                .then((newsItem) => {
                    console.log('findOne', newsItem);
                    res.json({ status: true, data: newsItem });
                })
                .catch((err) => res.json({ message: err }));
        } else {
            News.find({})
                .select('name description image')
                .then((news) =>
                    res.status(200).json({ status: true, data: news })
                )
                .catch((err) => res.json({ message: err }));
        }
    };
    // [POST] /api/add-news
    create = async (req, res) => {
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        console.log(req.body);
        const news = new News(req.body);
        // const formData = req.body;
        // const news = new News({
        //     name: req.body.name,
        //     description: req.body.description,
        //     image: req.body.image,
        // });
        // console.log("news", news);
        news.save()
            .then((result) => {
                res.status(200).json({
                    status: true,
                    message: 'Create news success!',
                });
                console.log(result);
            })
            .catch((error) => {
                res.json({ status: false, message: error.errors.content.message });
                console.log(error);
            });
        // console.log('create');
    };
    // [PUT] /update-news:id
    update = async (req, res) => {
        // const news = news;
        console.log('query', req.query);
        console.log('body', req.body);
        if (!!req.query.id && !!Object.keys(req.body).length) {
            News.updateOne({ _id: req.query.id }, req.body)
                .then((result) => {
                    res.status(200).json({
                        status: true,
                        message: 'Update news success!',
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
    // [POST] /delete-news?id=
    delete(req, res, next) {
        // soft delete
        if (!!req.body.id) {
            News.delete({ _id: req.body.id })
                .then(
                    res
                        .status(200)
                        .json({ status: true, message: 'Delete success' })
                )
                .catch((error) => {
                    res.json({ status: false, message: error });
                    console.log(error);
                });
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }
    // [PATCH] /restore-news?id=
    restore(req, res, next) {
        console.log('query', req.query);
        if (!!req.query.id) {
            News.restore({ _id: req.query.id })
                .then(res.json({ status: true, message: 'Restore success' }))
                .catch((error) => {
                    res.json({ status: false, message: error });
                    console.log(error);
                });
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }

    // [DELETE] /destroy-news?id=
    destroy(req, res, next) {
        if (!!req.query.id) {
            delete News.deleteOne({ _id: req.query.id })
                .then(res.json({ status: true, message: 'Destroyed!' }))
                .catch((error) => {
                    res.json({ status: false, message: error });
                    console.log(error);
                });
        } else {
            res.status(400).json({
                status: false,
                message: 'Missing required id field',
            });
        }
    }
}

module.exports = new NewsController();
