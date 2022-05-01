const async = require('async');

const News = require('../models/News');
const Post = require('../models/Post');
const Infrastructure = require('../models/Infrastructure');
const Specialized = require('../models/Specialized');
const { multipleMongooseToObject } = require('../util/mongoose');
const Activity = require('../models/Activity');
const Tuition = require('../models/Tuition');
const Notification = require('../models/Notification');

class SiteController {
    // [GET] /
    home(req, res, next) {
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
        //                     newsList: multipleMongooseToObject(news),
        //                     postList: multipleMongooseToObject(posts),
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
                    }).sort({createdAt: -1}).limit(6); //6 latest news
                },
                mainPostList: function (callback) {
                    Post.find({ type: 1 }, function (err, posts) {
                        // main post
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, posts);
                        }
                    }).sort({createdAt: -1}).limit(6); 
                },
                admissionsPostList: function (callback) {
                    Post.find({ type: 2 }, function (err, posts) {
                        // main post
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, posts);
                        }
                    }).sort({createdAt: -1}).limit(4);;
                },
                activityPostList: function (callback) {
                    Post.find({ type: 3 }, function (err, posts) {
                        // main post
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, posts);
                        }
                    }).sort({createdAt: -1}).limit(4);;
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
                notificationList: function (callback) {
                    Notification.find({}, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    }).sort({createdAt: -1}).limit(10);
                },
                tuitionList: function (callback) {
                    Tuition.find({}, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    }).sort({createdAt: -1}).limit(10);
                },
                activityList: function (callback) {
                    Activity.find({}, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                        }
                    }).sort({createdAt: -1}).limit(4);;
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
                    newsList: multipleMongooseToObject(results.newsList),
                    mainPostList: multipleMongooseToObject(results.mainPostList),
                    admissionsPostList: multipleMongooseToObject(results.admissionsPostList),
                    specializedNorthList: multipleMongooseToObject(
                        specializedNorthList
                    ),
                    specializedSouthList: multipleMongooseToObject(
                        specializedSouthList
                    ),
                    infrastructureList: multipleMongooseToObject(
                        results.infrastructureList
                    ),
                    tuitionList: multipleMongooseToObject(results.tuitionList),
                    activityList: multipleMongooseToObject(results.activityList),
                    notificationList: multipleMongooseToObject(results.notificationList),
                    activityPostList: multipleMongooseToObject(results.activityPostList),
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
        //             newsList: multipleMongooseToObject(results.newsList),
        //             postList: multipleMongooseToObject(results.postList),
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
        //             newsList: multipleMongooseToObject(results.newsList),
        //             postList: multipleMongooseToObject(results.postList),
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

    activity(req, res) {
        res.render('activity');
    }
}

module.exports = new SiteController();
