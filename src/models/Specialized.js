const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Specialized = new Schema(
    {
        _id: Number,
        name: { type: String, required: true },
        admission_quota: { type: String, required: true },
        industry_code: { type: Number, unique: true },
        branch: { type: Number },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        _id: false,       // de mongodb k can thiep vao truong nay
        timestamps: true,
        versionKey: false,
    }
);

// Add soft delete plugin
mongoose.plugin(slug);
// add auto increment
Specialized.plugin(AutoIncrement, {
    id: 'specialized_id_counter',
    inc_field: '_id',
});

Specialized.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Specialized', Specialized);
