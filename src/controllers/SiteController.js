const News = require('../models/News');
const { multipleMongooseToOject } = require('../util/mongoose');

class SiteController {
    // [GET] /
    home(req, res, next) {
        // New.find({})
        // .then((news) => res.render('home', {
        //   news: news
        // }))
        // .catch(next);

        News.find({})
            .then((newsList) => {
                // news = news.map((item) => item.toObject());
                // res.render('home', { news });
                res.render('home', { newsList: multipleMongooseToOject(newsList) });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }
}

module.exports = new SiteController();
