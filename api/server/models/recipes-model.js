const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // http://mongoosejs.com/docs/promises.html
const Schema = mongoose.Schema;

/*  Schema for 'recipesmodels' collection
    ============================================================ */
const recipeSchema = new Schema({
  id: Number,
  name: String,
  items: [{
    id: Number,
    name: String,
    category: {
      id: Number,
      name: String,
    },
    count: Number
  }],
});

module.exports = mongoose.model('Recipesmodel', recipeSchema);
