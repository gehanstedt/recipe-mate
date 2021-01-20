$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {    // $(".member-name").text(data.email);
    $("#favorite-link").attr(`href`,`/api/favorite/${data.id}`);
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
    console.log(result)
    
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
              '<h4 class="star-title">Star rating </h4>'+
              '<div class="rating"> <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label> <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label> <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label> <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label> <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label>'+
              '</div>'+
              '<a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">Favorite</a>'+
          '</div>'+
      '</div>'+
  '</div>'
    );


    console.log(result[i].recipe.image)
    console.log(result[i].recipe.label)
    console.log(result[i].recipe.url)
    }
  });
  $('#search-results').html = html_searchresults
// }
  });
});
