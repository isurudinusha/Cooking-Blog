const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
    required: "This field is required.",
  },
  ingredients: {
    type: Array,
    required: "This field is required.",
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian"],
    required: "This field is required.",
  },
  image: {
    type: String,
    required: "This field is required.",
  },
});

recipeSchema.index({ name: "text", description: "text" }); // text search

module.exports = mongoose.model("Recipe", recipeSchema);
