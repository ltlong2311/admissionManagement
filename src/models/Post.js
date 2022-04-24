const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Post = new Schema(
    {
        _id: Number,
        title: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        content: { type: String, required: true },
        type: { type: Number },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: false, // de mongodb k can thiep vao truong nay
        timestamps: true,
        versionKey: false,
    }
);

// Add soft delete plugin
mongoose.plugin(slug);
// add auto increment
Post.plugin(AutoIncrement, { id: 'post_id_counter', inc_field: '_id' });

Post.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Post', Post);
