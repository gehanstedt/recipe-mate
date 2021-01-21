$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $("#favorite-link").attr(`href`, `/api/favorite/${data.id}`);
  });

  $(".delete-favorite-button").on("click", function (event) {
    event.preventDefault();
    id = $(this).attr("id");
    console.log(`ID selected:  ${id}`);

    $.post(`/api/favorite/${id}`)
      .done(function (result) {
        console.log(result);
        location.reload();
      });
  });

  $("#search-bar").on("click", function (event) {
    var $Ingred = $("input.search_input");
    // This function grabs recipes from the web and updates the view
    event.preventDefault();
    var ingredients = {
      // text: $search.val().trim()
      text: $Ingred.val().trim()
    };
    console.log(ingredients)
    // console.log("HERE")
    $.post("/api/recipe", ingredients)
      .done(function (result) {
        console.log(result)
        for (var i = 0; i < 10; i++) {
          console.log(result[i].recipe.image)
          console.log(result[i].recipe.label)
          console.log(result[i].recipe.url)
        }
      });
  });
});