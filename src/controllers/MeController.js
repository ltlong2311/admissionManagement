const News = require('../models/News');
const { multipleMongooseToOject } = require('../util/mongoose');

class MeController {
    // [GET] /me/stored/news
    storedNews(req, res, next) {
        // News.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // News.find({})
        //     .then((newsList) =>
        //         res.render('me/stored-news', {
        //             newsList: multipleMongooseToOject(newsList),
        //         })
        //     )
        //     .catch(next);

        // destructuring
        Promise.all([News.find({}), News.countDocumentsDeleted()])
            .then(([newsList, deletedCount]) =>
                res.render('me/stored-news', {
                    deletedCount, 
                    newsList: multipleMongooseToOject(newsList),
                })
            )
            .catch(next);
    }

    // [GET] /me/trash/news
    trashNews(req, res, next) {
        News.findDeleted({})
            .then((newsList) =>
                res.render('me/trash-news', {
                    newsList: multipleMongooseToOject(newsList),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
