// recipe = JSON

function saveRecipe(recipe){
    // Get saved recipes from local storage
    var savedRecipesArray = getSavedRecipes();

    // Add new recipe
    savedRecipesArray.push(recipe);

    // Store saved recipes in local storage
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipesArray));
}

function unsaveRecipe(recipeID) {
    // Get saved recipes from local storage
    var savedRecipesArray = getSavedRecipes();
    // filter will check if each item matches certain criteria
    // criteria is the id of the recipe; we are filtering out the recipe that has the ID we want to unsave
    var filteredArray = savedRecipesArray.filter(function(recipe){
        return recipe.id !== recipeID
    });

    // Store saved recipes in local storage
    localStorage.setItem('savedRecipes', JSON.stringify(filteredArray));
};

function getSavedRecipes(){
    // Get saved recipes from local storage
    var savedRecipesJson = localStorage.getItem('savedRecipes');
    if (!savedRecipesJson) {
        savedRecipesJson = "[]"
    }
    var savedRecipesArray = JSON.parse(savedRecipesJson);

    return savedRecipesArray;
}

function isRecipeSaved(recipeID){
    var savedRecipesArray = getSavedRecipes();
    var recipeFound = false;
    // Check if recipe exists
    savedRecipesArray.forEach(function(recipe){
        if (recipe.id === recipeID) {
            recipeFound = true;
        }
    })
    return recipeFound;
};