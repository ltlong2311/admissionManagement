const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Infrastructure = new Schema(
    {
        _id: Number,
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        content: { type: String, required: true },
        type: { type: Number },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    }
);

// Add soft delete plugin
mongoose.plugin(slug);
// add auto increment
Infrastructure.plugin(AutoIncrement, { inc_field: '_id' });

Infrastructure.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Infrastructure', Infrastructure);
