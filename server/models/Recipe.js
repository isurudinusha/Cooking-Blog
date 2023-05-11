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
    type: Array,
    enum: ["Thai", "Ameirican", "Chinese", "Mexican", "Indian"],
    required: "This field is required.",
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
