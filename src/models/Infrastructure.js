const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Infrastructure = new Schema(
    {
        _id: Number,
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
);

// Add soft delete plugin
mongoose.plugin(slug);
// add auto increment
Infrastructure.plugin(AutoIncrement, {
    id: 'infrastructure_id_counter',
    inc_field: '_id',
});

Infrastructure.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Infrastructure', Infrastructure);
