const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // http://mongoosejs.com/docs/promises.html
const Schema = mongoose.Schema;

/*  Schema for 'itemsmodels' collection
    ============================================================ */
const itemSchema = new Schema({
  name: String,
  category: {
    id: Number,
    name: String,
  },
});

module.exports = mongoose.model('Itemsmodel', itemSchema);
