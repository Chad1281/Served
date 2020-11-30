var recipeCardDiv = document.querySelector("#recipe-card-div")

// Get saved recipes from local storage
var savedRecipesArray = getSavedRecipes()

savedRecipesArray.forEach(function (recipe) {

    // Create inner div that will hold the card image and body
    var cardInnerDiv = $("<div>").attr("class", "card");

    // Create image
    var image = $("<img>").attr("class", "card-img-top").attr("src", recipe.image);
    cardInnerDiv.append(image);

    // Create body
    var recipeTitle = recipe.title;
    var missedCount = recipe.missedIngredientCount;
    var usedCount = recipe.usedIngredientCount;
    var percentMatch = parseInt((usedCount / (missedCount + usedCount)) * 100) + "% match";

    var recipeId = recipe.id;
    // console.log(recipeId);
    var cardBody = $("<div>").attr("class", "card-body");
    var h4 = $("<h4>").attr("class", "card-title").text(recipeTitle);
    var pTag = $("<p>").attr("class", "card-text").text(percentMatch);
    var button = $("<button>").attr("id", recipeId).addClass("btn btn-primary recipeBtn").text("Go to Recipe");

    var saveBtn = $("<a href:''>").attr("id", "save-button");
    var saveHeart = $("<img>")
    if (isRecipeSaved(recipe.id)) {
        saveHeart.attr("src", "./img/heart.png").attr("class", "heart-btn");
    } else {
        saveHeart.attr("src", "./img/emptyHeart.png").attr("class", "heart-btn empty");
    }
    let recipeToSave = recipe
    saveHeart.on("click", function() {
        // Toggles the empty/full heart
        if ($(this).hasClass("empty")) {
            $(this).attr('src', './img/heart.png');
            $(this).addClass('full').removeClass('empty');
    
            // Save recipe in local storage
            saveRecipe(recipeToSave)
        }
        else {
            $(this).attr('src', './img/emptyHeart.png');
            $(this).addClass('empty').removeClass('full');
    
            // Unsave recipe in local storage
            unsaveRecipe(recipeToSave.id)
        }
    })

    saveBtn.append(saveHeart);

    cardBody.append(h4, pTag, button, saveBtn);
    cardInnerDiv.append(cardBody);

    // Append card inner div to outer div
    recipeCardDiv.append(cardInnerDiv[0]);

})


