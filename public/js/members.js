var userID;

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {    // $(".member-name").text(data.email);
    $("#favorite-link").attr(`href`,`/api/favorite/${data.id}`);
    userID = data.id;
  });

  // $(document).on("submit", "#searchRecipe", getRecipe);
  $("#search-bar").on("click", function(event) {
    // console.log("HERE")
    // var $newItemInput = $("input.search_input");
    // var $Ingred = $("input.search_input");
    var $Ingred = $("#search-text");

  // This function grabs recipes from the web and updates the view
// function getRecipe() {

  event.preventDefault();
  var ingredients = {
    // text: $search.val().trim()
    text: $Ingred.val().trim()
  };  
  console.log(ingredients)
  // console.log("HERE")
  $.post("/api/recipe", ingredients) 
  .done(function(result) {
    console.log(result);
    // Empty any previous results
    $('#search-results').empty ();
    
    for(var i=0; i < 10; i++){
      // $('#search-results').html(result[i].recipe.image);
      // append the search-result with child HTML 
      $('#search-results').append(
      '<div class="col-md-4 col-sm-6">'+
      '<div class="card mb-30 search-results"><a class="card-img-tiles" href="#" data-abc="true">'+
              '<div class="inner">'+                  
                  '<div class="main-img">'+
                  `<img src="${result[i].recipe.image}" alt="Category"></div>`+                  
              '</div>'+
          '</a>'+
          '<div class="card-body text-center">'+        
              `<h4 class="card-title"><a href="${result[i].recipe.url}" target="_blank">${result[i].recipe.label}</a></h4>`+
              `<a class="favorite-recipe-button btn btn-outline-primary btn-sm" href="#" data-abc="true" user-id="${userID}" title="${result[i].recipe.label}" url="${result[i].recipe.url}" image-url="${result[i].recipe.image}">Favorite</a>`+
          `</div>`+
      `</div>`+
  '</div>'
    );


    console.log(result[i].recipe.image)
    console.log(result[i].recipe.label)
    console.log(result[i].recipe.url)
    }
  });
// }
  });

  $("#search-results").on ("click", ".favorite-recipe-button", function (event) {
    event.preventDefault ();
    
    const favoriteObj = {
      "user_id": userID,
      "title": $(this).attr ("title"),
      "url": $(this).attr ("url"),
      "image_url": $(this).attr ("image-url"),
      "rating": 0
    };

    console.log (`Favorite Object:  ${favoriteObj}`);
    
    $.post("/api/favorite", favoriteObj)  
    .done(function(result) {
      alert (`Favorite added!`);
      console.log(result);
    });
  });
});
