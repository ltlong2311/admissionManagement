const Specialized = require('../../models/Specialized');
// const { mongooseToObject } = require('../util/mongoose');

class SpecializedController {
    // [GET] /api/Post
    getAll(req, res) {
        Specialized.find({})
            .then((list) => res.status(200).json({ status: true, data: list }))
            .catch((err) => res.json({ message: err }));
    }
    // [GET] /api/Post/:id
    getById = async (req, res) => {
        console.log('id', req.params);
        Specialized.findOne({ _id: req.params.id })
            .select('title description image')
            .then((item) => {
                console.log('findOne', item);
                res.json({ status: true, data: item });
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
            Specialized.findOne({ _id: req.query.id })
                .select('name description image')
                .then((item) => {
                    console.log('findOne', item);
                    res.json({ status: true, data: item });
                })
                .catch((err) => res.json({ message: err }));
        } else {
            Specialized.find({})
                .select('name description image')
                .then((list) =>
                    res.status(200).json({ status: true, data: list })
                )
                .catch((err) => res.json({ message: err }));
        }
    };
    // [POST] /api/add-Post
    create = async (req, res) => {
        // formData.image = `https://image.com/${req.body.image}/kma.jpg`
        console.log(req.body);
        const newItem = new Specialized(req.body);
        newItem.save()
            .then(
                (result) =>
                    res.status(200).json({
                        status: true,
                        data: result,
                        message: 'Create specialized success!',
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
        Specialized.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/post'))
            .catch(next);
    };
    // [POST] /delete:id
    delete(req, res, next) {
        // soft delete
        Specialized.delete({ _id: req.params.id })
            .then(res.json({ status: true, message: 'Delete success' }))
            .catch(next);
    }
    // [POST] /restore:id
    restore(req, res, next) {
        Specialized.restore({ _id: req.params.id })
            .then(res.json({ status: true, message: 'Restore success' }))
            .catch(next);
    }

    // [DELETE] /Post/:id/force
    destroy(req, res, next) {
        delete Specialized.deleteOne({ _id: req.params.id })
            .then(res.json({ status: true, message: 'Destroyed' }))
            .catch(next);
    }
}

module.exports = new SpecializedController();
