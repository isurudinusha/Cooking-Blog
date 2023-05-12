require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);

    const food = { latest };

    res.render("index", {
      title: "Cooking Blog - Home",
      categories,
      food,
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Something went wrong" });
  }
};

/**
 * GET /categories
 * Categories
 */

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categories,
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Something went wrong" });
  }
};

// async function insertDymmyRecipeData() {
//   try {
//     await Recipe.insertMany([
//       {
//         name: "Tom Daley's sweet & sour chicken",
//         description: `Drain the juices from the tinned fruit into a bowl, add the soy and fish sauces, then whisk in 1 teaspoon of cornflour until smooth. Chop the pineapple and peaches into bite-sized chunks and put aside.
//         Pull off the chicken skin, lay it flat in a large, cold frying pan, place on a low heat and leave for a few minutes to render the fat, turning occasionally. Once golden, remove the crispy skin to a plate, adding a pinch of sea salt and five-spice.
//         Meanwhile, slice the chicken into 3cm chunks and place in a bowl with 1 heaped teaspoon of five-spice, a pinch of salt, 1 teaspoon of cornflour and half the lime juice. Peel, finely chop and add 1 clove of garlic, then toss to coat.
//         Next, prep the veg: trim and roughly slice the asparagus and broccoli at an angle, leaving the pretty tips intact. Peel the onion, cut into quarters and break apart into petals, then peel the remaining clove of garlic and finely slice with the chillies. Deseed and roughly chop the peppers, then peel and matchstick the ginger.
//         Place the frying pan on a high heat and cook the chicken for 5 to 6 minutes, or until golden and cooked through, turning halfway, then leave on a low heat.
//         Meanwhile, place a wok on a high heat and scatter in the pepper and onion to scald and char for 5 minutes. Add 1 tablespoon of oil, followed by the peaches, pineapple, ginger, garlic, most of the chillies, the baby sweetcorn, asparagus and broccoli.
//         Stir-fry for 3 minutes, then pour in the sauce. Cook for just a few minutes - you want to keep the veg on the edge of raw - adding a good splash of boiling water to loosen the sauce, if needed.
//         Drizzle the honey into the chicken pan, turn the heat back up to high, and toss until sticky and caramelized. Plate up the veg and top with the chicken. Clank up the reserved crispy skin, and scatter over with the remaining chilli.
//         Pick over the coriander leaves and serve right away, with lime wedges for squeezing over. Good with classic fluffy rice.`,
//         email: "info@isurucookingblog.uk",
//         ingredients: [
//           "1 x 227 g tin of pineapple in natural juice",
//           "1 x 213 g tin of peaches in natural juice",
//           "1 tablespoon low-salt soy sauce",
//           "1 tablespoon fish sauce",
//           "2 teaspoons cornflour",
//           "2 x 120 g free-range chicken breasts , skin on",
//           "Chinese five-spice",
//           "1 lime",
//           "2 cloves of garlic",
//           "1 bunch of asparagus , (350g)",
//           "100 g tenderstem broccoli",
//           "1 small onion",
//           "2 fresh red chillies",
//           "1 red pepper",
//           "1 yellow pepper",
//           "7 cm piece of ginger",
//           "groundnut oil",
//           "100 g baby sweetcorn",
//           "1 teaspoon runny honey",
//           "½ a bunch of fresh coriander , (15g)",
//         ],
//         category: "American",
//         image: "tom-daley.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyRecipeData();

// async function insertDummyCategoryData() {
//   try {
//     await Category.insertMany([
//       {
//         name: "Thai",
//         image: "thai-food.jpg",
//       },
//       {
//         name: "American",
//         image: "american-food.jpg",
//       },
//       {
//         name: "Chinese",
//         image: "chinese-food.jpg",
//       },
//       {
//         name: "Mexican",
//         image: "mexican-food.jpg",
//       },
//       {
//         name: "Indian",
//         image: "indian-food.jpg",
//       },
//       {
//         name: "Spanish",
//         image: "spanish-food.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("error", +error);
//   }
// }

// insertDummyCategoryData();
