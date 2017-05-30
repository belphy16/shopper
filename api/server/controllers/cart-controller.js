const cartController = (CartModel) => {
  const get = (req, res) => {
    CartModel.find().exec()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  };

  const post = (req, res) => {
    if (!validateItems(req.body)) {
      res.send('Please provide a valid cart');
    } else {
      CartModel.remove({})
      .exec()
      .then(() => {
        const entryPromiseArray = [];
        req.body.forEach((item) => {
          const itemEntry = new CartModel(item);
          const entryPromise = itemEntry.save((err) => {
            if (err) {
              console.error(err);
            }
          });
          entryPromiseArray.push(entryPromise)
        });

        return Promise.all(entryPromiseArray);
      })
      .then((items) => {
        res.json(items);
      })
      .catch((err) => {
        console.log('error');
        res.status(500).send(err);
      });
    }
  };

  const httpDelete = (req, res) => {
    CartModel.remove({}, () => (err) => {
      if (err) {
        console.error(err);
      }
    })
    .then((item) => {
      res.send('ok');
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }


  /*  Helper Functions
      ================================================================= */

  function validateItems(items) {
    return true;
  }

  return {
    get,
    post,
    httpDelete,
  };
};

module.exports = cartController;
