const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const News = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  slug: { type: String, slug: 'name', unique: true },
}, {
  timestamps: true,
});

// Add soft delete plugin
mongoose.plugin(slug);
News.plugin(mongooseDelete, { 
  overrideMethods: 'all',
  deletedAt: true,
 });

module.exports = mongoose.model('News', News);
