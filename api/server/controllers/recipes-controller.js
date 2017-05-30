const recipesController = (RecipesModel) => {
  const get = (req, res) => {
    RecipesModel.find().exec()
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  };

  const post = (req, res) => {
    if (!validateRecipe(req.body)) {
      res.send('Please provide a valid recipe');
    } else {
      RecipesModel.findOne({
        id: req.body.id,
      })
      .exec()
      .then((recipe) => {
        if (recipe) {
          res.send('Recipe already exists');
        } else {
          const recipeEntry = new RecipesModel(req.body);
          recipeEntry.save((err) => {
            if (err) {
              console.error(err);
            }
          })
          .then((recipe) => {
            res.json(recipe);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
        }
      });
    }
  };

  const put = (req, res) => {
    if (!validateRecipe(req.body)) {
      res.send('Please provide a valid recipe');
    } else {
      RecipesModel.where({
        id: req.params.id,
      })
      .update(req.body, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        }

        res.json(req.body);
      });
    }
  };

  const httpDelete = (req, res) => {
    const params = {
      id: parseInt(req.params.id, 10)
    }
    RecipesModel.remove(params, () => (err) => {
      if (err) {
        console.error(err);
      }
    })
    .then((recipe) => {
      res.json({ id: recipe.id });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  }


  /*  Helper Functions
      ================================================================= */

  function validateRecipe(recipe) {
    return true;
  }

  return {
    get,
    post,
    put,
    httpDelete,
  };
};

module.exports = recipesController;
