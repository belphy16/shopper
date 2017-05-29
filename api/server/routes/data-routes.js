const express = require('express');
const ItemsModel = require('../models/items-model');
const itemsController = require('../controllers/items-controller')(ItemsModel);

/*  Routing
    ======================================================== */
const router = () => {
  const itemsRouter = express.Router();
  itemsRouter.route('/items')
    .get(itemsController.get)
    .post(itemsController.post);
  return itemsRouter;
};

module.exports = router;
