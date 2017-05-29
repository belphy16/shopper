const itemsController = (ItemsModel) => {
  const get = (req, res) => {
    ItemsModel.find().exec()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  };

  const post = (req, res) => {
    if (!validateItem(req.body)) {
      res.send('Please provide a valid item');
    } else {
      ItemsModel.findOne({
        name: req.body.name,
      })
      .exec()
      .then((item) => {
        if (item) {
          res.send('Item name already exists');
        } else {
          saveItem(req.body)
          .then((item) => {
            res.json(item);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
        }
      });
    }

    function saveItem(item) {
      const itemEntry = new ItemsModel(item);
      return itemEntry.save((err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    function validateItem(item) {
      return true;
    }
  };

  return {
    get,
    post,
  };
};

module.exports = itemsController;
