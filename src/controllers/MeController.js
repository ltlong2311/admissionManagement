const News = require('../models/News');
const { multipleMongooseToOject } = require('../util/mongoose');

class MeController {
    // [GET] /me/stored/news
    storedNews(req, res, next) {
        News.find({})
            .then((newsList) =>
                res.render('me/stored-news', {
                    newsList: multipleMongooseToOject(newsList),
                })
            )
            .catch(next)
    }
    
    // [GET] /me/trash/news
    trashNews(req, res, next) {
        News.findDeleted({})
            .then((newsList) =>
                res.render('me/trash-news', {
                    newsList: multipleMongooseToOject(newsList),
                })
            )
            .catch(next)
    }
}

module.exports = new MeController();
