const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // http://mongoosejs.com/docs/promises.html
const Schema = mongoose.Schema;

/*  Schema for 'itemsmodels' collection
    ============================================================ */
const cartSchema = new Schema({
  id: Number,
  name: String,
  category: {
    id: Number,
    name: String,
  },
  count: Number,
  comment: String
});

module.exports = mongoose.model('Cartmodel', cartSchema);
