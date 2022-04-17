const async = require('async');

const News = require('../models/News');
const Post = require('../models/Post');
const Infrastructure = require('../models/Infrastructure');
const Specialized = require('../models/Specialized');
const { multipleMongooseToOject } = require('../util/mongoose');

class SiteController {
    // [GET] /
    home(req, res, next) {
        // New.find({})
        // .then((news) => res.render('home', {
        //   news: news
        // }))
        // .catch(next);

        // News.find({})
        //     .then((newsList) => {
        //         // news = news.map((item) => item.toObject());
        //         // res.render('home', { news });
        //         res.render('home', {
        //             newsList: multipleMongooseToOject(newsList),
        //         });
        //     })
        //     .catch(next);

        /* Solution 1: if else -> working fine */

        // News.find({}, function (err, news) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         Post.find({}, function (err, posts) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 res.render('home', {
        //                     newsList: multipleMongooseToOject(news),
        //                     postList: multipleMongooseToOject(posts),
        //                 });
        //             }
        //         });
        //     }
        // });

        /* Solution 2: Using callbacks + Using an object -> working fine */
        async.parallel(
            {
                newsList: function (callback) {
                    News.find({}, function (err, news) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, news);
                        }
                    });
                },
                mainPostList: function (callback) {
                    Post.find({ type: 1 }, function (err, posts) {
                        // main post
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, posts);
                        }
                    });
                },
                admissionsPostList: function (callback) {
                    Post.find({ type: 2 }, function (err, posts) {
                        // main post
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, posts);
                        }
                    });
                },
                infrastructureList: function (callback) {
                    Infrastructure.find({}, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    });
                },
                specializedList: function (callback) {
                    Specialized.find({}, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    });
                },
            },
            function (err, results) {
                // results is equal to: { newsList: news, postList: posts }
                // res.render('home', results);
                const specializedList = results.specializedList;
                const specializedNorthList = specializedList.filter(
                    (item) => item.branch === 1
                );
                const specializedSouthList = specializedList.filter(
                    (item) => item.branch === 2
                );
                res.render('home', {
                    newsList: multipleMongooseToOject(results.newsList),
                    mainPostList: multipleMongooseToOject(results.mainPostList),
                    admissionsPostList: multipleMongooseToOject(results.admissionsPostList),
                    specializedNorthList: multipleMongooseToOject(
                        specializedNorthList
                    ),
                    specializedSouthList: multipleMongooseToOject(
                        specializedSouthList
                    ),
                    infrastructureList: multipleMongooseToOject(
                        results.infrastructureList
                    ),
                });
            }
        );

        /* Solution 3: Using Promises + using an object - not working */
        // async.parallel({
        //         newsList: function (callback) {
        //             News.find({}, function (err, news) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     callback(null, news);
        //                 }
        //             });
        //         },
        //         postList: function (callback) {
        //             Post.find({}, function (err, posts) {
        //                 if (err) {
        //                     callback(err, null);
        //                 } else {
        //                     callback(null, posts);
        //                 }
        //             });
        //         },
        //     })
        //     .then((results) => {
        //         res.render('home', {
        //             newsList: multipleMongooseToOject(results.newsList),
        //             postList: multipleMongooseToOject(results.postList),
        //         });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        /* Solution 4: Using async/await + using an object - not working */
        // async () => {
        //     try {
        //         let results = await async.parallel({
        //             newsList: function (callback) {
        //                 News.find({}, function (err, news) {
        //                     if (err) {
        //                         callback(err, null);
        //                     } else {
        //                         callback(null, news);
        //                     }
        //                 });
        //             },
        //             postList: function (callback) {
        //                 Post.find({}, function (err, posts) {
        //                     if (err) {
        //                         callback(err, null);
        //                     } else {
        //                         callback(null, posts);
        //                     }
        //                 });
        //             },
        //         });
        //         // results is equal to: { newsList: news, postList: posts }
        //         // res.render('home', results);
        //         res.render('home', {
        //             newsList: multipleMongooseToOject(results.newsList),
        //             postList: multipleMongooseToOject(results.postList),
        //         });
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };
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
