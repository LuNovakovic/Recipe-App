const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");
const Recipe = require("../models/Recipe");

//@route    GET api/recipes
//@desc     Get all users recipes
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id }).sort({ date: -1 });
    res.json(recipes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/recipes
//@desc     Add new recipe
//@access   Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      numberofservings,
      cookingtime,
      ingredients,
      preparationsteps,
    } = req.body;

    try {
      const newRecipe = new Recipe({
        name,
        numberofservings,
        cookingtime,
        ingredients,
        preparationsteps,
        user: req.user.id,
      });

      const recipe = await newRecipe.save();

      res.json(recipe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    PUT api/recipes/:id
//@desc     Update recipe
//@access   Private
router.put("/:id", auth, async (req, res) => {
  const {
    name,
    numberofservings,
    cookingtime,
    ingredients,
    preparationsteps,
  } = req.body;

  //Build recipe object
  const recipeFields = {};
  if (name) recipeFields.name = name;
  if (numberofservings) recipeFields.numberofservings = numberofservings;
  if (cookingtime) recipeFields.cookingtime = cookingtime;
  if (ingredients) recipeFields.ingredients = ingredients;
  if (preparationsteps) recipeFields.preparationsteps = preparationsteps;

  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: "Recipe not found" });

    //Make sure user owns contact
    if (recipe.user.toString !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: recipeFields },
      { new: true }
    );

    res.json(recipe);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/recipes/:id
//@desc     Delete recipe
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) return res.status(404).json({ msg: "Recipe not found" });

    //Make sure user owns contact
    if (recipe.user.toString !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Recipe.findByIdAndRemove(req.params.id);

    res.json({ msg: "Recipe removed" });
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
