$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    // var $todoContainer = $(".recipe-container");

    $(document).on("submit", "#searchRecipe", getRecipe);
  
    // Our initial recipe array
    var recipes = [];
 
    // This function grabs todos from the database and updates the view
  function getRecipe() {
    event.preventDefault();
    var ingredients = {
      text: $newItemInput.val().trim()
    };  
    console.log(ingredients)
    $.get("/api/recipe", ingredients) 
    .done(function(result) {
      console.log(result)
      for(var i=0; i < 10; i++){
      console.log(result[i].recipe.label)
      console.log(result[i].recipe.url)
      console.log(result[i].recipe.url)
      }
    });
  }
});