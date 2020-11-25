

// var images = [
//     "https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg",
//     "https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg",
//     "https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg",
//     "https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
// ];

var queryIngredientsURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+carrots,+flour,+potatoes,+milk&number=5&apiKey=27846b408a8344708ee32a5c91abf0a8";

$.ajax({
    url: queryIngredientsURL,
    method: "GET"
  }).then(function(response) {
        console.log(response);

    var caraselCardWrapper = $(".carousel-inner");
    var caraselIndicatorWrapper = $(".carousel-indicators");

    var cardsPerPage = 4;
    var isActiveCardSet = false;


    var caraselItem, indicatorItem;
    var cardIndex = 0;
    var indicatorIndex = 0;

    while(cardIndex < response.length) {
        if(isActiveCardSet === false) {
            caraselItem = $("<div>").attr("class", "carousel-item active");
            indicatorItem = $("<li>").attr("data-target", "#multi-item-example").attr("data-slide-to", indicatorIndex).attr("class", "active");
            
            isActiveCardSet = true;
        } else {
            caraselItem = $("<div>").attr("class", "carousel-item");
            indicatorItem = $("<li>").attr("data-target", "#multi-item-example").attr("data-slide-to", indicatorIndex);
        }

        // Append indicator
        caraselIndicatorWrapper.append(indicatorItem);
        indicatorIndex++; // Add 1 to indicator index

        while(cardIndex < response.length) {

            // Create main div that holds your single card
            var cardOuterDiv = $("<div>").attr("class", "col-md-3 left");

            // Create inner div that will hold the card image and body
            var cardInnerDiv = $("<div>").attr("class", "card mb-2");

            // Create image
            var image = $("<img>").attr("class", "card-img-top").attr("src", response[cardIndex].image);
            cardInnerDiv.append(image);

            // Create body
            var recipeTitle = response[cardIndex].title;
            var missedCount = response[cardIndex].missedIngredientCount;
            var usedCount = response[cardIndex].usedIngredientCount;
            var percentMatch = parseInt((usedCount/(missedCount + usedCount))* 100) + "% match";
            var cardBody = $("<div>").attr("class", "card-body");
            var h4 = $("<h4>").attr("class", "card-title").text(recipeTitle);
            var pTag = $("<p>").attr("class", "card-text").text(percentMatch);
            var button = $("<button>").attr("class", "btn btn-primary").text("Button");
            cardBody.append(h4, pTag, button);
            cardInnerDiv.append(cardBody);

            // Append card inner div to outer div
            cardOuterDiv.append(cardInnerDiv);

            // Append card outer div to carasel item, and then to main carasel wrapper
            caraselItem.append(cardOuterDiv);
            caraselCardWrapper.append(caraselItem);

            if((cardIndex + 1) % cardsPerPage === 0) {
                cardIndex++;
                break;
            }

            // increment my index
            cardIndex++;
        }
    }
})
