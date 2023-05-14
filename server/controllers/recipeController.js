require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
const nodemailer = require("nodemailer");
/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ 'category': "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ 'category': "American" }).limit(limitNumber);
    const chinese = await Recipe.find({ 'category': "Chinese" }).limit(limitNumber);
    const mexican = await Recipe.find({ 'category': "Mexican" }).limit(limitNumber);
    const indian = await Recipe.find({ 'category': "Indian" }).limit(limitNumber);



    const food = { latest, thai, american, chinese, mexican, indian };

    res.render("index", {
      title: "Cooking Blog - Home",
      categories,
      food,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
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
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

/**
 * GET /recipe:id
 * Recipe
 */

exports.exploreRecipe = async (req, res) => {
  try {

    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);


    res.render("recipe", {
      title: "Cooking Blog - Recipe",
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};


/**
 * GET /categories:id
 * Categories By Id
 */


exports.exploreCategoriesById = async (req, res) => {
  try {


    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);

    res.render("categories", {
      title: "Cooking Blog - Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

/**
 * POST /search
 * Search
 */


exports.searchRecipe = async (req, res) => {


  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });
    res.render("search", {
      title: "Cooking Blog - Search",
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }


};

/**
 * GET /explore-latest
 * Explore Latest
 */


exports.exploreLatest = async (req, res) => {
  try {

    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);


    res.render("explore-latest", {
      title: "Cooking Blog - Explore Latest",
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

/**
 * GET /random-recipe
 * Random Recipe
 */


exports.randomRecipe = async (req, res) => {
  try {


    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).limit(1);

    res.render("random-recipe", {
      title: "Cooking Blog - Random Recipe",
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};


/**
 * GET /submit-recipe
 * Submit Recipe
 */


exports.submitRecipe = async (req, res) => {

  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  const recipeId = req.params.id

  try {
    let recipe = await Recipe.findById(recipeId);
    res.render("submit-recipe", {
      title: "Cooking Blog - Submit Recipe",
      infoErrorsObj,
      infoSubmitObj,
      recipe
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }

};

/**
 * POST /submit-recipe
 * Submit Recipe
 */


exports.submitRecipeOnPost = async (req, res) => {

  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (req.body.recipeId == "") {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No product image were uploaded.');
      } else {
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
        imageUploadFile.mv(uploadPath, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        })
      }

      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName,
      });

      await newRecipe.save();

      req.flash('infoSubmit', "Recipe Submitted Successfully!");
    } else {
      updateReceipeData(req.body.recipeId, req, res);
      req.flash('infoSubmit', "Recipe Updated Successfully!");
    }




    res.redirect("submit-recipe");
  } catch (error) {
    req.flash('infoErrors', "Error: " + error.message);
    res.redirect("submit-recipe");
  }


};


/**
 * GET /delete-recipe
 * Delete Recipe
 */


exports.deleteRecipe = async (req, res) => {
  try {
    let id = req.params.id;
    await deleteReceipeData(id);
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};


async function deleteReceipeData(id) {
  try {
    await Recipe.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }

}

async function updateReceipeData(id, req, res) {
  try {

    if (req.body.newImage == "1") {
      console.log(req.files);
      if (!req.files || Object.keys(req.files).length === 0) {

      } else {
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
        imageUploadFile.mv(uploadPath, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        })
      }
      await Recipe.findByIdAndUpdate(id, {
        image: newImageName
      })
    }

    await Recipe.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      ingredients: req.body.ingredients,
      category: req.body.category

    });

  } catch (error) {
    console.log(error);
  }
}

/**
 * GET /about
 * About
 */


exports.about = async (req, res) => {
  try {

    res.render("about", {
      title: "Cooking Blog - About",
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

/**
 * GET /contact
 * Contact
 */



exports.contact = async (req, res) => {


  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');


  try {

    res.render("contact", {
      title: "Cooking Blog - Contact",
      infoErrorsObj,
      infoSubmitObj

    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Something went wrong" });
  }
};

exports.contactSendMail = async (req, res) => {

  const { name, email, message } = req.body;



  try {

    if (!name || !email || !message) {
      req.flash('infoErrors', "Please fill out all required fields.");
      res.redirect("/contact");
    } else {
      const transporter = nodemailer.createTransport({
        host: 'live.smtp.mailtrap.io',
        port: 587,
        auth: {
          user: 'api',
          pass: '6c22efb89745c857672d859e11f28b66'
        }
      });

      const mailOptions = {
        from: "contact@isurucookingblog.uk",
        to: 'isurucookingblog@gmail.com',
        subject: "Isuru Cooking Blog Contact",
        text: "Name: " + req.body.name + "\n" + "Email: " + req.body.email + "\n" + "Message: " + req.body.message
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          req.flash('infoErrors', "Error: " + error.message);
          res.redirect("/contact");
        } else {
          req.flash('infoSubmit', "Your message has been sent!");
          res.redirect("/contact");
        }
      });
    }



  } catch (error) {
    req.flash('infoErrors', "Error: " + error.message);
    res.redirect("/contact");
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
