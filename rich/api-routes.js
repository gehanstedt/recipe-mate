// *** Dependencies
// Goes to edamam api to pull recipes with selected ingredients
var request = require("request");
const axios = require("axios");

const apiURL = "https://api.edamam.com/search?&app_id=424a8caa&app_key=8a5f2c782654123ddad8e6b7d7073ef1&q="
// Routes =============================================================
module.exports = function(app) {

  // post route for getting the recipes
  app.post("/api/recipe", function(req, res) {

    food = req.body.text 
    ingredients = food.split(" ");
    console.log(ingredients)
    
    // findAll returns all entries for a table when used with no options
    const fetchRecipes = async (...ingredients) => {
        // const mappedIngreds = ingredients
        var mappedIngreds = ingredients
          .map((ingredient, idx) => {
            if (idx < ingredients.length - 1) {
              return ingredient + "+";
            } else {
              return ingredient;
            }
          })
          .join("");
      
        // const url = `${apiURL}${mappedIngreds}${apiKey}`;
        const url = `${apiURL}${mappedIngreds}`;
        console.log(url)

        request(url, function (error, response, body) {
            if (error) {console.log('error:', error);} // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (JSON.parse(body).count === 0){
                res.send("No Recipes Found");
            }else{
                res.send(JSON.parse(body).hits);
            }
        });

      };
      fetchRecipes(ingredients)
    //   fetchRecipes("chicken", "steak", "pork");

  });
};