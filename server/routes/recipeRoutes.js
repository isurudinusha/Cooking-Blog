const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController.js");

/**
 * App Routes
 */

router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/categories/:id", recipeController.exploreCategoriesById);
router.post("/search", recipeController.searchRecipe);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/random-recipe", recipeController.randomRecipe);
router.get("/submit-recipe/:id", recipeController.submitRecipe);
router.get("/submit-recipe", recipeController.submitRecipe);
router.post("/submit-recipe", recipeController.submitRecipeOnPost);
router.get("/delete-recipe/:id", recipeController.deleteRecipe);
router.get("/about", recipeController.about);
router.get("/contact", recipeController.contact);
router.post("/contact", recipeController.contactSendMail);








module.exports = router;
