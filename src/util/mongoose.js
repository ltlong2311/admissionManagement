// helper mongoose for express-handlebar
module.exports = {
    multipleMongooseToObject: function (mongooseArr) {
        return mongooseArr.map((mongooseItem) => mongooseItem.toObject());
    },
    mongooseToObject: function (mongooseItem) {
        return mongooseItem ? mongooseItem.toObject() : mongooseItem;
    },
};
