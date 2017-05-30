const express = require('express');
const ItemsModel = require('../models/items-model');
const RecipesModel = require('../models/recipes-model');
const itemsController = require('../controllers/items-controller')(ItemsModel);
const recipesController = require('../controllers/recipes-controller')(RecipesModel);

/*  Routing
    ======================================================== */
const router = () => {
  const router = express.Router();
  router.route('/items')
    .get(itemsController.get)
    .post(itemsController.post);

  router.route('/items/:id')
    .put(itemsController.put)
    .delete(itemsController.httpDelete);

  router.route('/recipes')
    .get(recipesController.get)
    .post(recipesController.post);

  router.route('/recipes/:id')
    .put(recipesController.put)
    .delete(recipesController.httpDelete);

  return router;
};

module.exports = router;
